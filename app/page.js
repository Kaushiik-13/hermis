const orbitLogos = [
  { label: "DEV", className: "logo-devto", orbit: "orbit-large", angle: 214 },
  { label: "B", className: "logo-bluesky", orbit: "orbit-outer", angle: 192 },
  { label: "X", className: "logo-x", orbit: "orbit-outer", angle: 235 },
  { label: "in", className: "logo-linkedin", orbit: "orbit-small", angle: 178 },
  { label: "@", className: "logo-threads", orbit: "orbit-large", angle: 145 },
  { label: "M", className: "logo-medium", orbit: "orbit-large", angle: 328 },
  { label: "DEV", className: "logo-devto", orbit: "orbit-outer", angle: 347 },
  { label: "B", className: "logo-bluesky", orbit: "orbit-small", angle: 352 },
  { label: "X", className: "logo-x", orbit: "orbit-outer", angle: 20 },
  { label: "@", className: "logo-threads", orbit: "orbit-large", angle: 36 },
];

const platformNames = ["Dev.to", "Bluesky", "X", "LinkedIn", "Threads"];

export default function Home() {
  return (
    <main className="replica-page">
      <section className="replica-stage">
        <header className="replica-nav">
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
              <span className="workflow-icon source-icon">S</span>
              <div>
                <strong>Source imported</strong>
                <small>Docs, changelog, repo notes</small>
              </div>
            </div>
            <div className="activity-card activity-mid">
              <span className="workflow-icon drafts-icon">5</span>
              <div>
                <strong>Platform drafts generated</strong>
                <small>X, LinkedIn, Dev.to, Threads, Bluesky</small>
              </div>
              <span className="status-pill">Review</span>
            </div>
            <div className="activity-card activity-low">
              <span className="workflow-icon approval-icon">A</span>
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
    </main>
  );
}
