"use client";

import { useEffect, useState } from "react";

const orbitLogos = [
  { label: "DEV", className: "logo-devto", orbit: "orbit-large", angle: 214 },
  { label: "B", className: "logo-bluesky", orbit: "orbit-outer", angle: 192 },
  { label: "X", className: "logo-x", orbit: "orbit-outer", angle: 235 },
  { label: "in", className: "logo-linkedin", orbit: "orbit-small", angle: 168 },
  { label: "@", className: "logo-threads", orbit: "orbit-large", angle: 145 },
  { label: "M", className: "logo-medium", orbit: "orbit-large", angle: 328 },
  { label: "DEV", className: "logo-devto", orbit: "orbit-outer", angle: 347 },
  { label: "B", className: "logo-bluesky", orbit: "orbit-small", angle: 352 },
  { label: "X", className: "logo-x", orbit: "orbit-outer", angle: 20 },
  { label: "@", className: "logo-threads", orbit: "orbit-large", angle: 36 },
];

const platformNames = ["Dev.to", "Bluesky", "X", "LinkedIn", "Threads"];
const footerLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "X (@arul_kaush2963)", href: "https://x.com/arul_kaush2963", external: true },
];

const featureCards = [
  {
    title: "Smart Source Discovery",
    copy: "Automatically ingests content from 22 technical sources — arXiv, GitHub releases, Hacker News, and more. Always fresh, zero manual monitoring.",
    icon: "rss",
    className: "feature-top-left",
  },
  {
    title: "Semantic Deduplication",
    copy: "Same story covered by 5 different sources? Hermis recognizes it and merges it into one — so your queue stays clean, not flooded.",
    icon: "merge",
    className: "feature-top-center",
    visual: "pipeline",
  },
  {
    title: "Zero AI Slop",
    copy: "The Critic agent reviews every draft before it reaches you — killing generic phrases, symmetrical paragraphs, and robotic transitions.",
    icon: "shield-check",
    className: "feature-top-right",
  },
  {
    title: "Your Voice, Always",
    copy: "Choose your content style at onboarding. Hermis generates every draft around your tone — not a generic template, your actual voice.",
    icon: "fingerprint",
    className: "feature-middle-left",
  },
  {
    title: "",
    copy: "From raw signal to approved draft — without touching a single source manually.",
    icon: null,
    className: "feature-middle-center",
  },
  {
    title: "Approval Dashboard",
    copy: "Every draft lands in your queue before anything goes live. Review, edit, approve or reject — full control, none of the grunt work.",
    icon: "layout-dashboard",
    className: "feature-middle-right",
  },
  {
    title: "Engagement Intelligence",
    copy: "Platform-specific formatting baked into every draft. LinkedIn hooks, X punchy openers, Dev.to technical depth — built to perform.",
    icon: "trending-up",
    className: "feature-bottom-left",
  },
  {
    title: "",
    copy: "",
    icon: null,
    className: "feature-bottom-center",
    visual: "queue",
  },
  {
    title: "Multi-Platform Publishing",
    copy: "Connect LinkedIn, X, Dev.to, Bluesky, and Threads. One approval — published everywhere you need to be.",
    icon: "share-2",
    className: "feature-bottom-right",
  },
];

function FeatureGlyph({ icon }) {
  switch (icon) {
    case "rss":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 18.5a1.5 1.5 0 1 0 0 .01Z" />
          <path d="M4.5 11.5A8 8 0 0 1 12.5 19.5" />
          <path d="M4.5 6A13.5 13.5 0 0 1 18 19.5" />
        </svg>
      );
    case "merge":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="6" cy="6" r="2" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="12" r="2" />
          <path d="M8 6h2a6 6 0 0 1 6 6v0" />
          <path d="M8 18h2a6 6 0 0 0 6-6v0" />
        </svg>
      );
    case "shield-check":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4.5 18 7v4.8c0 3.2-2.15 6.2-6 7.7-3.85-1.5-6-4.5-6-7.7V7l6-2.5Z" />
          <path d="m9.6 12.1 1.6 1.6 3.35-3.35" />
        </svg>
      );
    case "fingerprint":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 10a4 4 0 1 1 8 0v2.5" />
          <path d="M6.5 10.5A5.5 5.5 0 0 1 17.5 10v3" />
          <path d="M10 18.5c1.4-1 2-2.5 2-4.5v-1" />
          <path d="M7.5 16c.9-.9 1.5-2.2 1.5-4v-1" />
          <path d="M14.5 18.2c1-.9 1.8-2.6 1.8-4.7v-1.5" />
        </svg>
      );
    case "layout-dashboard":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="5" width="16" height="14" rx="2.5" />
          <path d="M10 5v14M10 10.5h10" />
        </svg>
      );
    case "trending-up":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 19h14" />
          <path d="m6.5 14.5 4-4 3 3L19 8" />
          <path d="M15 8h4v4" />
        </svg>
      );
    case "share-2":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="18" cy="5.5" r="2" />
          <circle cx="6" cy="12" r="2" />
          <circle cx="18" cy="18.5" r="2" />
          <path d="m7.8 11 8-4.2M7.8 13l8 4.2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  const [navState, setNavState] = useState("top");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const updateNav = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (currentY < 18) {
        setNavState("top");
      } else if (delta > 4) {
        setNavState("down");
      } else if (delta < -4) {
        setNavState("up");
      }

      lastY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateNav();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("hermis-home-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("hermis-home-theme", theme);
  }, [theme]);

  return (
    <main className={`replica-page theme-${theme}`}>
      <section className="replica-stage">
        <header className={`replica-nav nav-state-${navState}`}>
          <a className="replica-brand" href="/">
            <img src="/icon.svg" alt="" />
            <span>Hermis</span>
          </a>

          <div className="replica-actions">
            <button
              type="button"
              className="theme-toggle"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              aria-pressed={theme === "dark"}
              onClick={() => setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="4.5" />
                  <path d="M12 2.5v2.4M12 19.1v2.4M4.93 4.93l1.7 1.7M17.37 17.37l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.93 19.07l1.7-1.7M17.37 6.63l1.7-1.7" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.7 6.7 0 0 0 9.8 9.8Z" />
                </svg>
              )}
            </button>
            <a className="contact" href="/join-waitlist">
              Join waitlist
            </a>
          </div>
        </header>

        <section className="replica-hero-shell">
          <div className="replica-orbits" aria-hidden="true">
            <span className="replica-ring ring-b" />
            <span className="replica-ring ring-c" />
            <span className="replica-ring ring-d" />
            <span className="replica-ring ring-e" />
            <span className="replica-ring ring-f" />
            <span className="ring-accent accent-left" />
            <span className="ring-accent accent-right" />

            {orbitLogos.map((logo) => (
              <span
                className={`orbit-logo ${logo.className} ${logo.orbit}`}
                key={`${logo.label}-${logo.className}-${logo.angle}`}
                style={{ "--angle": `${logo.angle}deg` }}
              >
                {logo.label}
              </span>
            ))}
          </div>

          <div className="replica-hero">
            <div className="launch-badge">
              <span>
                <img src="/icon.svg" alt="" />
              </span>
              Hermis is launching soon
            </div>

            <h1>
              Stop reformatting.
              <br />
              Start publishing.
            </h1>

            <p>
              Hermis turns your technical sources into platform-ready drafts.{" "}
              <br />
              Your voice. Your approval. Zero AI slop.
            </p>

            <div className="replica-ctas">
              <a className="start-free" href="/join-waitlist">
                Join the waitlist
              </a>
            </div>

            <div className="activity-stack" aria-hidden="true">
              <div className="activity-card activity-main">
                <span className="workflow-icon source-icon">
                  <FeatureGlyph icon="rss" />
                </span>
                <div>
                  <strong>Source imported</strong>
                  <small>Docs, changelog, repo notes</small>
                </div>
              </div>
              <div className="activity-card activity-mid">
                <span className="workflow-icon drafts-icon">
                  <FeatureGlyph icon="layout-dashboard" />
                </span>
                <div>
                  <strong>Platform drafts generated</strong>
                  <small>Structured, platform-ready versions queued</small>
                </div>
                <span className="status-pill">Review</span>
              </div>
              <div className="activity-card activity-low">
                <span className="workflow-icon approval-icon">
                  <FeatureGlyph icon="shield-check" />
                </span>
                <div>
                  <strong>Your approval required</strong>
                  <small>Voice locked. No auto-posting.</small>
                </div>
              </div>
            </div>
          </div>

          <footer className="trusted-strip">
            <p>Publishing integrations</p>
            <div className="platform-row" aria-label="Publishing integrations">
              {platformNames.map((platform) => (
                <span key={platform}>{platform}</span>
              ))}
            </div>
          </footer>
        </section>

        <section className="feature-replica-section">
          <div className="feature-backdrop-word" aria-hidden="true">
            FEATURES
          </div>
          <div className="feature-replica-grid">
            {featureCards.map((card, index) => (
              <article
                className={`feature-replica-card ${card.className}`}
                key={`${card.className}-${card.title || "untitled"}-${index}`}
              >
                {card.icon ? (
                  <span className="feature-replica-icon">
                    <FeatureGlyph icon={card.icon} />
                  </span>
                ) : null}

                {card.className === "feature-middle-center" ? (
                  <div className="feature-text-highlight">
                    <p>{card.copy}</p>
                  </div>
                ) : (
                  <div className="feature-replica-copy">
                    <h3>{card.title}</h3>
                    <p>{card.copy}</p>
                  </div>
                )}

                {card.visual === "pipeline" ? (
                  <div className="feature-pipeline-visual" aria-hidden="true">
                    <div className="pipeline-source-stack">
                      <span>arXiv</span>
                      <span>GitHub</span>
                      <span>HN</span>
                    </div>
                    <div className="pipeline-lines">
                      <span className="pipeline-line pipeline-line-a" />
                      <span className="pipeline-line pipeline-line-b" />
                      <span className="pipeline-line pipeline-line-c" />
                    </div>
                    <div className="pipeline-output">
                      <strong>1 merged signal</strong>
                      <small>deduped and queued</small>
                    </div>
                  </div>
                ) : null}

                {card.visual === "queue" ? (
                  <div className="feature-queue-visual" aria-hidden="true">
                    <div className="queue-card queue-card-a">
                      <span className="queue-chip">LI</span>
                      <div>
                        <strong>LinkedIn draft ready</strong>
                        <small>Hook adjusted for founders</small>
                      </div>
                    </div>
                    <div className="queue-card queue-card-b">
                      <span className="queue-chip">X</span>
                      <div>
                        <strong>Thread version pending</strong>
                        <small>Needs final approval</small>
                      </div>
                    </div>
                    <div className="queue-actions">
                      <span className="queue-action queue-approve">Approve</span>
                      <span className="queue-action">Edit</span>
                      <span className="queue-action">Reject</span>
                    </div>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="closing-note-section">
          <div className="closing-note">
            <p>
              Hermis helps technical teams turn raw source material into platform-ready drafts with
              your voice, your approval, and none of the repetitive publishing work.
            </p>
          </div>
        </section>

        <footer className="page-footer home-page-footer">
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
      </section>
    </main>
  );
}


