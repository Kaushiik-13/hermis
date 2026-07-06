"use client";

import { useState } from "react";

const avatars = [
  "https://framerusercontent.com/images/2Bg3DOpSy1S4vTayVOKiVtJKds.png?width=707&height=689",
  "https://framerusercontent.com/images/vFRLbcbgJI1r9z7ZWnJ264cxkho.png?width=861&height=849",
  "https://framerusercontent.com/images/YES2ysESbz1MBub19UyR4PzQLM.png?width=946&height=870",
];

const footerLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "X (@arul_kaush2963)", href: "https://x.com/arul_kaush2963", external: true },
];

function ThunderIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M11.47 1.25 4.9 10.08h4.08L8.53 18.75l6.57-8.83h-4.08l.45-8.67Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="spinner-icon">
      <circle cx="12" cy="12" r="8.5" className="spinner-track" />
      <path d="M12 3.5a8.5 8.5 0 0 1 8.5 8.5" className="spinner-head" />
    </svg>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!valid) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          source: "join-waitlist",
          company: "",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      if (data.status === "duplicate") {
        setStatus("success");
        setMessage("You're already on the waitlist.");
        return;
      }

      setStatus("success");
      setMessage("You're on the list. We'll reach out soon.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="page-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="replica-nav join-waitlist-nav">
        <a className="replica-brand" href="/">
          <img src="/icon.svg" alt="" />
          <span>Hermis</span>
        </a>

        <div className="replica-actions">
          <a className="contact" href="/join-waitlist">
            Join waitlist
          </a>
        </div>
      </header>

      <section className="hero-frame">
        <div className="mesh-layer" />

        <div className="hero-rings" aria-hidden="true">
          <div className="ring ring-1" />
          <div className="ring ring-2" />
          <div className="ring ring-3" />
          <div className="ring ring-4" />

          <div className="orbit orbit-inner">
            <span className="ring-star orbit-star" />
          </div>
          <div className="orbit orbit-middle">
            <span className="ring-star orbit-star" />
          </div>
          <div className="orbit orbit-outer">
            <span className="ring-star orbit-star" />
          </div>
        </div>

        <div className="content-wrap">
          <div className="badge">
            <span className="badge-icon">
              <ThunderIcon />
            </span>
            <span>Hermis is launching soon</span>
          </div>

          <h1 className="hero-title">
            Ready to launch your
            <br />
            next big product?
          </h1>

          <p className="hero-copy">
            Get early access to our upcoming release
            <br />
            and secure your spot on the waitlist.
          </p>

          <div className="waitlist-card">
            <div className="waitlist-card-inner">
              <div className="avatar-row" aria-hidden="true">
                {avatars.map((src, index) => (
                  <span
                    className="avatar-chip"
                    key={src}
                    style={{ zIndex: avatars.length - index }}
                  >
                    <img src={src} alt="" />
                  </span>
                ))}
                <span className="avatar-count">+2K</span>
              </div>

              <h2>Join the waitlist</h2>
              <p>Sign up to be one of the first to use Hermis.</p>

              <form className="waitlist-form" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="email">
                  Email address
                </label>
                <label className="sr-only honeypot-field" htmlFor="company">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="honeypot-field"
                />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email..."
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status !== "idle") {
                      setStatus("idle");
                      setMessage("");
                    }
                  }}
                  className={status === "error" ? "error" : status === "success" ? "success" : ""}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-busy={status === "loading"}
                >
                  <span>{status === "loading" ? "Sending..." : "Get Notified"}</span>
                  {status === "loading" ? <SpinnerIcon /> : <ArrowIcon />}
                </button>
              </form>

              <p className={`form-message ${status}`}>
                {message}
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <div className="footer-row">
          <span className="footer-caption">Built solo by Kaushik</span>
          {footerLinks.map((link, index) => (
            <div className="footer-link-group" key={link.label}>
              {index > 0 ? <span className="footer-dot" aria-hidden="true" /> : null}
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            </div>
          ))}
          <div className="footer-link-group">
            <span className="footer-dot" aria-hidden="true" />
            <span>Copyright 2026 Kaushik</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

