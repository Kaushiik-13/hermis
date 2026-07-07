import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Hermis",
  description: "Hermis turns technical sources into platform-ready drafts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
