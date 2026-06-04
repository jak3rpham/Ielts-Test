// src/components/VocabStudio.tsx
"use client";
import { useState, useMemo } from "react";
import { VOCAB } from "@/data/vocab";
import { VocabCard, VocabTopic } from "@/data/types";
import { useContent } from "@/lib/content";
import Quiz from "./Quiz";

const SKILL_LABEL: Record<string, string> = { W: "Writing", S: "Speaking", R: "Reading", L: "Listening" };
const REGISTER_LABEL: Record<string, string> = { formal: "trang trọng", neutral: "trung tính", informal: "thân mật" };
const LEVELS = ["B1", "B2", "C1", "C2"] as const;

export default function VocabStudio() {
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
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, alignSelf: "center", color: "var(--ink-soft)", marginRight: 4 }}>LEVEL:</span>
        <button className={"chip" + (levelFilter === null ? " active" : "")} onClick={() => setLevel(null)}>Tất cả</button>
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
                  <div className="tap">bấm để lật</div>
                </div>
                <div className="fc-face fc-back">
                  <div className="def">{card.def}</div>
                  <div className="eg" dangerouslySetInnerHTML={{ __html: card.example }} />
                </div>
              </div>
            </div>
            <div className="fc-ctrl">
              <button className="btn ghost sm" onClick={prev}>‹ Trước</button>
              <span className="fc-count">{safe + 1} / {cards.length}</span>
              <button className="btn sm" onClick={next}>Sau ›</button>
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
                {card.synonyms?.length ? (<tr><td>Đồng nghĩa</td><td>{card.synonyms.join(", ")}</td></tr>) : null}
                {card.antonyms?.length ? (<tr><td>Trái nghĩa</td><td>{card.antonyms.join(", ")}</td></tr>) : null}
                {card.phrases?.length ? (<tr><td>Cụm đi kèm</td><td>{card.phrases.join(" · ")}</td></tr>) : null}
                {card.skills?.length ? (<tr><td>Mạnh ở</td><td>{card.skills.map((s) => SKILL_LABEL[s]).join(", ")}</td></tr>) : null}
                {card.useCase ? (<tr><td>Dùng khi</td><td>{card.useCase}</td></tr>) : null}
              </tbody>
            </table>
            {card.register === "informal" && (
              <div className="note">Từ/cụm thân mật — hợp <b>Speaking</b>, tránh dùng trong Writing học thuật.</div>
            )}
          </div>
        </>
      ) : (
        <div className="card"><p style={{ color: "var(--ink-soft)" }}>Không có từ nào ở level này trong chủ đề. Chọn level khác.</p></div>
      )}

      <div className="card" style={{ marginTop: 18 }}>
        <h3>Quiz nhanh — {topic.name}</h3>
        <Quiz key={topic.id} items={topic.quiz} ns={`vocab:${topic.id}`} />
      </div>
    </div>
  );
}
