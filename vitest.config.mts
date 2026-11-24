import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // tsconfig의 `@/*` → `src/*` 별칭을 테스트에서도 똑같이 쓴다
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  test: {
    // 브라우저 흉내(DOM)를 내는 환경 — 컴포넌트 테스트에 필요
    environment: "jsdom",
    // 각 테스트 파일 실행 전에 한 번 불러오는 준비 파일
    setupFiles: ["./vitest.setup.ts"],
    // 테스트 파일 위치: 소스 옆에 `*.test.ts(x)`로 둔다
    include: ["src/**/*.test.{ts,tsx}"],
    // 아직 테스트가 하나도 없어도 실패로 치지 않는다 (스캐폴드 단계)
    passWithNoTests: true,
  },
});
