import { execSync } from "node:child_process";
import { rmSync } from "node:fs";
import path from "node:path";

export const TEST_DATABASE_URL = "file:./test.db";

// 서버(API·DB) 테스트 전에 한 번 실행된다.
// 개발 DB(dev.db)는 건드리지 않고, test.db 를 매번 새로 만들어 마이그레이션 + 시드를 적용한다.
// CI 에 Prisma 단계가 없어도 테스트가 스스로 준비하도록 generate 도 여기서 실행한다.
export default function setup(): void {
  rmSync(path.resolve(import.meta.dirname, "test.db"), { force: true });
  const env = { ...process.env, DATABASE_URL: TEST_DATABASE_URL };
  const run = (command: string) => execSync(command, { env, stdio: "inherit" });

  run("pnpm exec prisma generate");
  run("pnpm exec prisma migrate deploy");
  run("pnpm exec prisma db seed");
}
