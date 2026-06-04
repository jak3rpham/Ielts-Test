"use client";
import { TIPS } from "@/data/tips";
import { TipGroup } from "@/data/tips";
import { useContent } from "@/lib/content";

const BAND: Record<string, string> = { b6: "Nền tảng", b7: "Band 7", b8: "Band 8" };

export default function TipsList() {
  const { items: groups } = useContent<TipGroup>("tips", TIPS);
  return (
    <>
      {groups.map((g) => (
        <details className="acc" key={g.id}>
          <summary><span>{g.name} <span className={"pill " + g.band}>{BAND[g.band]}</span></span><span className="chev">›</span></summary>
          <div className="acc-body">
            <p className="lesson-intro">{g.intro}</p>
            {g.tips.map((t, i) => (
              <div className="rule" key={i}>
                <div className="rule-t">{t.tip}</div>
                <div className="ex" style={{ fontFamily: "var(--body)", fontSize: 14, color: "var(--ink-soft)" }}>{t.detail}</div>
              </div>
            ))}
          </div>
        </details>
      ))}
    </>
  );
}
