"use client";
import { TIPS } from "@/data/tips";
import { TipGroup } from "@/data/tips";
import { useContent } from "@/lib/content";
import { useLang, pick } from "@/lib/i18n";

export default function TipsList() {
  const { lang } = useLang();
  const { items: groups } = useContent<TipGroup>("tips", TIPS);
  const BAND: Record<string, string> = { b6: pick(lang, { vi: "Nền tảng", en: "Foundation" }), b7: "Band 7", b8: "Band 8" };
  return (
    <>
      {groups.map((g) => (
        <details className="acc" key={g.id}>
          <summary><span>{pick(lang, g.name)} <span className={"pill " + g.band}>{BAND[g.band]}</span></span><span className="chev">›</span></summary>
          <div className="acc-body">
            <p className="lesson-intro">{pick(lang, g.intro)}</p>
            {g.tips.map((t, i) => (
              <div className="rule" key={i}>
                <div className="rule-t">{pick(lang, t.tip)}</div>
                <div className="ex" style={{ fontFamily: "var(--body)", fontSize: 14, color: "var(--ink-soft)" }}>{pick(lang, t.detail)}</div>
              </div>
            ))}
          </div>
        </details>
      ))}
    </>
  );
}
