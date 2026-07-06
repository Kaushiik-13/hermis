import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map();

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const attempts = rateLimitStore.get(ip) || [];
  const recentAttempts = attempts.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentAttempts.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, recentAttempts);
    return true;
  }

  recentAttempts.push(now);
  rateLimitStore.set(ip, recentAttempts);
  return false;
}

function getSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

async function sendWaitlistNotification({ email, source, createdAt }) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.WAITLIST_NOTIFICATION_EMAIL;
  const fromEmail = process.env.WAITLIST_FROM_EMAIL || "Hermis <onboarding@resend.dev>";

  if (!resendApiKey || !notificationEmail) {
    return;
  }

  const subject = `New Hermis waitlist signup (${source})`;
  const html = `
    <div style="font-family: Inter, Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New waitlist signup</h2>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${email}</p>
      <p style="margin: 0 0 8px;"><strong>Source:</strong> ${source}</p>
      <p style="margin: 0;"><strong>Created at:</strong> ${createdAt}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [notificationEmail],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend notification failed: ${response.status} ${errorText}`);
  }
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const rawEmail = typeof body?.email === "string" ? body.email : "";
    const honeypot = typeof body?.company === "string" ? body.company.trim() : "";
    const source = body?.source === "home" ? "home" : "join-waitlist";

    if (honeypot) {
      return NextResponse.json({ ok: true, status: "created" });
    }

    const normalizedEmail = normalizeEmail(rawEmail);

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      return NextResponse.json(
        { ok: false, error: "Waitlist is not configured yet." },
        { status: 500 }
      );
    }

    const createdAt = new Date().toISOString();
    const { error } = await supabase.from("waitlist_signups").insert({
      email: rawEmail.trim(),
      normalized_email: normalizedEmail,
      source,
      created_at: createdAt,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ ok: true, status: "duplicate" });
      }

      console.error("Waitlist insert failed", {
        code: error.code,
        message: error.message,
        details: error.details,
      });

      return NextResponse.json(
        { ok: false, error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    try {
      await sendWaitlistNotification({
        email: rawEmail.trim(),
        source,
        createdAt,
      });
    } catch (notificationError) {
      console.error("Waitlist notification failed", notificationError);
    }

    return NextResponse.json({ ok: true, status: "created" });
  } catch (error) {
    console.error("Waitlist request failed", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
