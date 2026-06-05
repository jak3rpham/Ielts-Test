// src/components/QTypeView.tsx
"use client";
import Link from "next/link";
import { QType } from "@/data/qtypes";
import { useLang } from "@/lib/i18n";

export default function QTypeView({ qt }: { qt: QType }) {
  const { lang } = useLang();
  return (
    <section>
      <Link href="/qtypes" style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--amber-deep)", textDecoration: "none" }}>
        ‹ {lang === "en" ? "Question-type library" : "Thư viện dạng đề"}
      </Link>
      <div className="sec-head" style={{ marginTop: 10 }}>
        <span className="eyebrow">{qt.skill} · {qt.group}</span>
        <h2>{qt.name[lang]}</h2>
        <p>{qt.summary[lang]}</p>
      </div>

      {!qt.built || !qt.sections ? (
        <div className="card"><h3>{lang === "en" ? "Coming soon" : "Đang biên soạn"}</h3></div>
      ) : (
        qt.sections.map((s, i) => (
          <div className="card" key={i}>
            <h3>{s.heading[lang]}</h3>
            <div className="ex" style={{ fontFamily: "var(--body)", fontSize: 14.5, color: "var(--ink)" }} dangerouslySetInnerHTML={{ __html: s.body[lang] }} />
          </div>
        ))
      )}
    </section>
  );
}
