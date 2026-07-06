import "./globals.css";

export const metadata = {
  title: "Hermis - Waitlist",
  description: "Join the Hermis waitlist for early access.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
