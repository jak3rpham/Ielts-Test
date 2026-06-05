// src/components/VocabStudio.tsx
"use client";
import { useState, useMemo } from "react";
import { VOCAB, VOCAB_SOURCES } from "@/data/vocab";
import { VocabCard, VocabTopic } from "@/data/types";
import { useContent } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import Quiz from "./Quiz";

const SKILL_LABEL: Record<string, string> = { W: "Writing", S: "Speaking", R: "Reading", L: "Listening" };
const LEVELS = ["B1", "B2", "C1", "C2"] as const;

export default function VocabStudio() {
  const { lang } = useLang();
  const en = lang === "en";
  const REGISTER_LABEL: Record<string, string> = { formal: en ? "formal" : "trang trọng", neutral: en ? "neutral" : "trung tính", informal: en ? "informal" : "thân mật" };
  const T = {
    level: en ? "LEVEL:" : "LEVEL:", all: en ? "All" : "Tất cả", tap: en ? "tap to flip" : "bấm để lật",
    prev: en ? "‹ Prev" : "‹ Trước", next: en ? "Next ›" : "Sau ›",
    syn: en ? "Synonyms" : "Đồng nghĩa", ant: en ? "Antonyms" : "Trái nghĩa", phr: en ? "Collocations" : "Cụm đi kèm",
    strong: en ? "Strong in" : "Mạnh ở", use: en ? "Use when" : "Dùng khi",
    informalNote: en ? "Informal — good for Speaking, avoid in academic Writing." : "Từ/cụm thân mật — hợp Speaking, tránh dùng trong Writing học thuật.",
    quiz: en ? "Quick quiz —" : "Quiz nhanh —", none: en ? "No words at this level in this topic. Try another level." : "Không có từ nào ở level này trong chủ đề. Chọn level khác.",
    sources: en ? "Sources to go deeper" : "Nguồn từ vựng để học sâu thêm",
  };
  const { items: topics } = useContent<VocabTopic>("vocab", VOCAB);
  const [topicIdx, setTopicIdx] = useState(0);
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const topic = topics[Math.min(topicIdx, topics.length - 1)];
  const cards = useMemo(
    () => (levelFilter ? topic.cards.filter((c) => c.level === levelFilter) : topic.cards),
    [topic, levelFilter]
  );
  const safe = cards.length ? Math.min(cardIdx, cards.length - 1) : 0;
  const card: VocabCard | undefined = cards[safe];

  function selectTopic(i: number) {
    setTopicIdx(i);
    setCardIdx(0);
    setFlipped(false);
  }
  function setLevel(l: string | null) {
    setLevelFilter(l);
    setCardIdx(0);
    setFlipped(false);
  }
  function next() { setFlipped(false); setCardIdx((c) => (c + 1) % cards.length); }
  function prev() { setFlipped(false); setCardIdx((c) => (c - 1 + cards.length) % cards.length); }

  return (
    <div>
      <div className="chips">
        {topics.map((t, i) => (
          <button key={t.id} className={"chip" + (i === Math.min(topicIdx, topics.length - 1) ? " active" : "")} onClick={() => selectTopic(i)}>
            {t.name}
          </button>
        ))}
      </div>

      <div className="chips" style={{ marginTop: -6 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, alignSelf: "center", color: "var(--ink-soft)", marginRight: 4 }}>{T.level}</span>
        <button className={"chip" + (levelFilter === null ? " active" : "")} onClick={() => setLevel(null)}>{T.all}</button>
        {LEVELS.map((l) => (
          <button key={l} className={"chip" + (levelFilter === l ? " active" : "")} onClick={() => setLevel(l)}>{l}</button>
        ))}
      </div>

      {card ? (
        <>
          <div className="fc-wrap">
            <div className={"fc" + (flipped ? " flip" : "")} onClick={() => setFlipped((f) => !f)}>
              <div className="fc-inner">
                <div className="fc-face fc-front">
                  <div className="word">{card.word}</div>
                  <div className="pos">{card.pos}{card.level ? ` · ${card.level}` : ""}</div>
                  <div className="tap">{T.tap}</div>
                </div>
                <div className="fc-face fc-back">
                  <div className="def">{card.def}</div>
                  <div className="eg" dangerouslySetInnerHTML={{ __html: card.example }} />
                </div>
              </div>
            </div>
            <div className="fc-ctrl">
              <button className="btn ghost sm" onClick={prev}>{T.prev}</button>
              <span className="fc-count">{safe + 1} / {cards.length}</span>
              <button className="btn sm" onClick={next}>{T.next}</button>
            </div>
          </div>

          {/* Bảng từ điển chi tiết */}
          <div className="card" style={{ marginTop: 18 }}>
            <h3 style={{ justifyContent: "space-between", fontSize: 20 }}>
              {card.word}
              <span style={{ display: "flex", gap: 6 }}>
                {card.level && <span className="pill b7">{card.level}</span>}
                {card.register && <span className="pill b6">{REGISTER_LABEL[card.register]}</span>}
              </span>
            </h3>
            <table className="tbl">
              <tbody>
                {card.synonyms?.length ? (<tr><td>{T.syn}</td><td>{card.synonyms.join(", ")}</td></tr>) : null}
                {card.antonyms?.length ? (<tr><td>{T.ant}</td><td>{card.antonyms.join(", ")}</td></tr>) : null}
                {card.phrases?.length ? (<tr><td>{T.phr}</td><td>{card.phrases.join(" · ")}</td></tr>) : null}
                {card.skills?.length ? (<tr><td>{T.strong}</td><td>{card.skills.map((s) => SKILL_LABEL[s]).join(", ")}</td></tr>) : null}
                {card.useCase ? (<tr><td>{T.use}</td><td>{card.useCase}</td></tr>) : null}
              </tbody>
            </table>
            {card.register === "informal" && (
              <div className="note">{T.informalNote}</div>
            )}
          </div>
        </>
      ) : (
        <div className="card"><p style={{ color: "var(--ink-soft)" }}>{T.none}</p></div>
      )}

      <div className="card" style={{ marginTop: 18 }}>
        <h3>{T.quiz} {topic.name}</h3>
        <Quiz key={topic.id} items={topic.quiz} ns={`vocab:${topic.id}`} />
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <h3 style={{ fontSize: 17 }}>{T.sources}</h3>
        {VOCAB_SOURCES.map((s) => (
          <div key={s.url} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: "1px dashed var(--line)" }}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, fontSize: 14 }}>{s.name} ↗</a>
            <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{s.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
