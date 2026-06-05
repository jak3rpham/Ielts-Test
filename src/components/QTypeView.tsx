// src/components/QTypeView.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { QType } from "@/data/qtypes";

export default function QTypeView({ qt }: { qt: QType }) {
  const [lang, setLang] = useState<"vi" | "en">("vi");

  return (
    <section>
      <Link href="/qtypes" style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--amber-deep)", textDecoration: "none" }}>‹ Thư viện dạng đề</Link>
      <div className="sec-head" style={{ marginTop: 10 }}>
        <span className="eyebrow">{qt.skill} · {qt.group}</span>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
          <h2>{qt.name[lang]}</h2>
          <div className="chips" style={{ marginBottom: 0 }}>
            <button className={"chip" + (lang === "vi" ? " active" : "")} onClick={() => setLang("vi")}>Tiếng Việt</button>
            <button className={"chip" + (lang === "en" ? " active" : "")} onClick={() => setLang("en")}>English</button>
          </div>
        </div>
        <p>{qt.summary[lang]}</p>
      </div>

      {!qt.built || !qt.sections ? (
        <div className="card"><h3>Đang biên soạn</h3><p style={{ color: "var(--ink-soft)", fontSize: 14 }}>Dạng này sẽ sớm có nội dung chi tiết.</p></div>
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
