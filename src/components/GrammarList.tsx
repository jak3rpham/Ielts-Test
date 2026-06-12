// src/components/GrammarList.tsx
"use client";
import { useState } from "react";
import { GRAMMAR, GRAMMAR_CATEGORIES } from "@/data/grammar";
import { GrammarLesson } from "@/data/types";
import { useLang, pick } from "@/lib/i18n";
import Quiz from "./Quiz";

const byId = Object.fromEntries(GRAMMAR.map((g) => [g.id, g])) as Record<string, GrammarLesson>;

function Lesson({ g }: { g: GrammarLesson }) {
  const { lang } = useLang();
  return (
    <details className="acc">
      <summary>
        <span>{pick(lang, g.title)} <span className={"pill " + g.band}>{g.band === "b6" ? (lang === "en" ? "Foundation" : "Nền tảng") : g.band === "b7" ? "Band 7" : "Band 8"}</span></span>
        <span className="chev">›</span>
      </summary>
      <div className="acc-body">
        <p className="lesson-intro">{pick(lang, g.intro)}</p>
        {g.points.map((p, i) => (
          <div className="rule" key={i}>
            <div className="rule-t">{pick(lang, p.rule)}</div>
            {p.examples.map((e, j) => (
              <div className="ex" key={j}>
                {e.kind === "good" && <span className="good">✓ </span>}
                {e.kind === "bad" && <span className="bad">✗ </span>}
                <span dangerouslySetInnerHTML={{ __html: pick(lang, e.html) }} />
              </div>
            ))}
          </div>
        ))}
        <div className="vmis"><b>⚠ {pick(lang, { vi: "Lỗi người Việt hay mắc:", en: "Common mistake for Vietnamese learners:" })}</b> <span dangerouslySetInnerHTML={{ __html: pick(lang, g.vietMistake) }} /></div>
        <Quiz items={g.quiz} ns={`grammar:${g.id}`} />
      </div>
    </details>
  );
}

export default function GrammarList() {
  const { lang } = useLang();
  const en = lang === "en";
  const [band, setBand] = useState<string | null>(null);
  const filters = [
    { key: null, label: en ? "All" : "Tất cả" },
    { key: "b6", label: en ? "Foundation" : "Nền tảng" },
    { key: "b7", label: "Band 7" },
    { key: "b8", label: "Band 8" },
  ];
  const CAT_EN: Record<string, { name: string; note: string }> = {
    "Nền tảng": { name: "Foundation", note: "Start here — fix root errors first" },
    "Câu & mệnh đề": { name: "Sentences & clauses", note: "Complex sentences, structural range" },
    "Mạch lạc & học thuật": { name: "Cohesion & academic style", note: "The band-7+ feel" },
    "Nâng cao (band 8)": { name: "Advanced (band 8)", note: "Standout flourishes" },
  };

  return (
    <div>
      <div className="chips">
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, alignSelf: "center", color: "var(--ink-soft)", marginRight: 4 }}>{en ? "FILTER:" : "LỌC:"}</span>
        {filters.map((f) => (
          <button key={f.label} className={"chip" + (band === f.key ? " active" : "")} onClick={() => setBand(f.key)}>{f.label}</button>
        ))}
      </div>

      {GRAMMAR_CATEGORIES.map((cat) => {
        const lessons = cat.ids.map((id) => byId[id]).filter((g) => g && (band === null || g.band === band));
        if (lessons.length === 0) return null;
        const catName = en && CAT_EN[cat.name] ? CAT_EN[cat.name].name : cat.name;
        const catNote = en && CAT_EN[cat.name] ? CAT_EN[cat.name].note : cat.note;
        return (
          <div key={cat.name} style={{ marginBottom: 26 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, margin: "0 0 12px", paddingBottom: 6, borderBottom: "2px solid var(--line)" }}>
              <h3 style={{ fontFamily: "var(--display)", fontWeight: 900, fontSize: 22, letterSpacing: "-.01em" }}>{catName}</h3>
              {catNote && <span style={{ fontSize: 12.5, color: "var(--ink-soft)", fontStyle: "italic", fontFamily: "var(--display)" }}>{catNote}</span>}
            </div>
            {lessons.map((g) => <Lesson key={g.id} g={g} />)}
          </div>
        );
      })}
    </div>
  );
}
