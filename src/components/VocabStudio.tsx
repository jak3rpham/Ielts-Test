// src/components/VocabStudio.tsx
"use client";
import { useState } from "react";
import { VOCAB } from "@/data/vocab";
import Quiz from "./Quiz";

export default function VocabStudio() {
  const [topicIdx, setTopicIdx] = useState(0);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [order, setOrder] = useState<number[]>(VOCAB[0].cards.map((_, i) => i));

  const topic = VOCAB[topicIdx];
  const card = topic.cards[order[cardIdx]];

  function selectTopic(i: number) {
    setTopicIdx(i);
    setCardIdx(0);
    setFlipped(false);
    setOrder(VOCAB[i].cards.map((_, k) => k));
  }
  function next() {
    setFlipped(false);
    setCardIdx((c) => (c + 1) % topic.cards.length);
  }
  function prev() {
    setFlipped(false);
    setCardIdx((c) => (c - 1 + topic.cards.length) % topic.cards.length);
  }
  function shuffle() {
    const o = [...order];
    for (let i = o.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [o[i], o[j]] = [o[j], o[i]];
    }
    setOrder(o);
    setCardIdx(0);
    setFlipped(false);
  }

  return (
    <div>
      <div className="chips">
        {VOCAB.map((t, i) => (
          <button key={t.id} className={"chip" + (i === topicIdx ? " active" : "")} onClick={() => selectTopic(i)}>
            {t.name}
          </button>
        ))}
      </div>

      <div className="fc-wrap">
        <div className={"fc" + (flipped ? " flip" : "")} onClick={() => setFlipped((f) => !f)}>
          <div className="fc-inner">
            <div className="fc-face fc-front">
              <div className="word">{card.word}</div>
              <div className="pos">{card.pos}</div>
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
          <span className="fc-count">{cardIdx + 1} / {topic.cards.length}</span>
          <button className="btn sm" onClick={next}>Sau ›</button>
          <button className="btn ghost sm" onClick={shuffle}>↺ Xáo</button>
        </div>
      </div>

      <div className="card" style={{ marginTop: 26 }}>
        <h3>Quiz nhanh — {topic.name}</h3>
        <Quiz key={topic.id} items={topic.quiz} ns={`vocab:${topic.id}`} />
      </div>
    </div>
  );
}
