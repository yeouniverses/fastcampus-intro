import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// `toBeInTheDocument()` 같은 DOM 전용 검사(matcher)를 추가한다 (위 import).
// 각 테스트가 끝나면 그렸던 화면을 지운다 — 테스트끼리 상태를 공유하지 않도록.
afterEach(() => {
  cleanup();
});
