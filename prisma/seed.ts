import { prisma } from "../src/lib/prisma";
import { seedProducts } from "./seed-data";

// 여러 번 실행해도 결과가 같도록 upsert 로 넣는다(중복 키 오류 방지).
async function main() {
  await prisma.$transaction(
    seedProducts.map((product) =>
      prisma.product.upsert({
        where: { id: product.id },
        update: product,
        create: product,
      }),
    ),
  );
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error: unknown) => {
    await prisma.$disconnect();
    throw error;
  });
