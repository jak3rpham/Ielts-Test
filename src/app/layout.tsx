// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "IELTS Studio — Lò luyện band 7.5+",
  description: "Grammar · Vocabulary · Writing · Reading · Speaking. Một bộ công cụ để học và để dạy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,900;1,9..144,500&family=Hanken+Grotesk:wght@400;500;600;700&family=Spline+Sans+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <Nav />
          <main>{children}</main>
          <div className="footer">
            IELTS Studio — tự build để học và để dạy.
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
