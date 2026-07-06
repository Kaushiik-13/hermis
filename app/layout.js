import "./globals.css";

export const metadata = {
  title: "Hermis",
  description: "Hermis turns technical sources into platform-ready drafts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
