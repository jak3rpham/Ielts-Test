// src/components/ReadingStudio.tsx
"use client";
import { useState } from "react";
import { READING } from "@/data/reading";
import { ReadingTest } from "@/data/types";
import { useContent } from "@/lib/content";
import ReadingTestView from "./ReadingTest";

export default function ReadingStudio() {
  const { items: tests } = useContent<ReadingTest>("reading", READING);
  const [idx, setIdx] = useState(0);
  const safeIdx = Math.min(idx, tests.length - 1);
  return (
    <div>
      <div className="chips">
        {tests.map((t, i) => (
          <button key={t.id} className={"chip" + (i === safeIdx ? " active" : "")} onClick={() => setIdx(i)}>
            {t.title}
          </button>
        ))}
      </div>
      <ReadingTestView key={tests[safeIdx].id} test={tests[safeIdx]} />
    </div>
  );
}
