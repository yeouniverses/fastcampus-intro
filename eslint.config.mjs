import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Next.js에 어울리는 규칙 모음(eslint-config-next)을 한 번에 끼운다.
// - core-web-vitals: Next.js + React 규칙 (성능에 영향을 주는 실수는 에러로)
// - typescript: TypeScript 전용 규칙
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 우리 팀의 약속 (docs/lecture-notes/01-linter.md)
  {
    rules: {
      // 사용하지 않는 변수는 경고
      "@typescript-eslint/no-unused-vars": "warn",
      // 디버깅용 console.log를 코드에 남기지 않기
      "no-console": "warn",
      // `any` 금지 (CLAUDE.md 규칙)
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  // 검사하지 않을 폴더 (빌드 결과물 등)
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "generated/**"]),
]);

export default eslintConfig;
