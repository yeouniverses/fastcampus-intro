import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { TEST_DATABASE_URL } from "./vitest.global-setup";

// tsconfig의 `@/*` → `src/*` 별칭을 테스트에서도 똑같이 쓴다
const alias = { "@": path.resolve(import.meta.dirname, "src") };

// 서버 테스트 위치: API 라우트·DB 로직
const serverTests = ["src/app/api/**/*.test.ts", "src/lib/**/*.test.ts"];

export default defineConfig({
  test: {
    // 아직 테스트가 하나도 없어도 실패로 치지 않는다 (스캐폴드 단계)
    passWithNoTests: true,
    projects: [
      {
        // 백엔드: Node 환경에서 실제 test.db 를 조회한다
        resolve: { alias },
        test: {
          name: "server",
          environment: "node",
          include: serverTests,
          globalSetup: ["./vitest.global-setup.ts"],
          env: { DATABASE_URL: TEST_DATABASE_URL },
        },
      },
      {
        // 프론트엔드: 브라우저 흉내(DOM) 환경 — 컴포넌트 테스트에 필요
        plugins: [react()],
        resolve: { alias },
        test: {
          name: "client",
          environment: "jsdom",
          // 각 테스트 파일 실행 전에 한 번 불러오는 준비 파일
          setupFiles: ["./vitest.setup.ts"],
          // 테스트 파일 위치: 소스 옆에 `*.test.ts(x)`로 둔다
          include: ["src/**/*.test.{ts,tsx}"],
          exclude: serverTests,
        },
      },
    ],
  },
});
