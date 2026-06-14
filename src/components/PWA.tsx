"use client";
import { useEffect } from "react";
// Đăng ký service worker (để cài app). Lỗi thì bỏ qua, không ảnh hưởng app.
export default function PWA() {
  useEffect(() => {
    if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
