export const metadata = {
  title: "Hermis - Privacy",
  description: "Privacy information for the Hermis waitlist.",
};

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Waitlist", href: "/join-waitlist" },
  { label: "X (@arul_kaush2963)", href: "https://x.com/arul_kaush2963", external: true },
];

const policySections = [
  {
    title: "What we collect",
    body: [
      "If you join the Hermis waitlist, the only information collected is the email address you submit.",
    ],
  },
  {
    title: "Why we collect it",
    body: ["Your email is used only to:"],
    list: [
      "Manage your place on the waitlist",
      "Send product updates and progress news",
      "Notify you directly when Hermis launches",
    ],
    closing:
      "We do not use it for anything else.",
  },
  {
    title: "Sharing",
    body: [
      "Your email is never sold, rented, or shared with third parties for advertising or marketing purposes. It may be stored with a third-party email or waitlist service provider solely to send you the communications above.",
    ],
  },
  {
    title: "How long we keep it",
    body: [
      "Your email is kept until Hermis launches and the waitlist period ends, or until you ask for it to be removed - whichever comes first.",
    ],
  },
  {
    title: "Your control",
    body: [
      <>
        You can ask to have your email removed at any time. Just message Kaushik on X (
        <a href="https://x.com/arul_kaush2963" target="_blank" rel="noreferrer">
          @arul_kaush2963
        </a>
        ) and it will be deleted, no questions asked.
      </>,
    ],
  },
  {
    title: "Contact",
    body: [
      <>
        For any privacy questions, reach out on X:{" "}
        <a href="https://x.com/arul_kaush2963" target="_blank" rel="noreferrer">
          @arul_kaush2963
        </a>
      </>,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="page-shell privacy-page">
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

      <section className="privacy-content">
        <article className="privacy-card">
          <div className="privacy-header">
            <p className="privacy-eyebrow">Privacy</p>
            <h1>Privacy Policy</h1>
            <p className="privacy-meta">Last updated: July 2026</p>
            <p className="privacy-intro">
              Hermis is built and run by a solo developer. This policy explains, simply, what
              happens with your information if you join the waitlist.
            </p>
          </div>

          <div className="privacy-sections">
            {policySections.map((section) => (
              <section className="privacy-section" key={section.title}>
                <h2>{section.title}</h2>
                {section.body.map((paragraph, index) => (
                  <p key={`${section.title}-${index}`}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul className="privacy-list">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.closing ? <p>{section.closing}</p> : null}
              </section>
            ))}
          </div>
        </article>
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
            <span>© 2026 Kaushik</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
