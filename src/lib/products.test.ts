import { afterAll, describe, expect, it, vi } from "vitest";
import { seedProducts } from "../../prisma/seed-data";
import { prisma } from "./prisma";
import { getProductList } from "./products";

// 이 테스트는 vitest.global-setup.ts 가 만든 test.db(시드 6개)를 실제로 조회한다.
afterAll(async () => {
  await prisma.$disconnect();
});

describe("getProductList", () => {
  it("DB 에 저장된 6개 상품을 모두 반환한다", async () => {
    const products = await getProductList();

    expect(products).toHaveLength(6);
  });

  it("각 상품은 카드용 필드(id·imageUrl·name·price)만 가진다", async () => {
    const products = await getProductList();

    for (const product of products) {
      expect(Object.keys(product).sort()).toEqual([
        "id",
        "imageUrl",
        "name",
        "price",
      ]);
    }
  });

  it("id 오름차순으로 정렬되고 PRD 샘플 데이터와 값이 일치한다", async () => {
    const products = await getProductList();

    expect(products.map((product) => product.id)).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
    ]);
    expect(products).toEqual(
      seedProducts.map(({ id, name, price, imageUrl }) => ({
        id,
        name,
        price,
        imageUrl,
      })),
    );
  });

  it("Prisma 에 카드용 필드만 select 하고 id 오름차순으로 요청한다", async () => {
    const spy = vi.spyOn(prisma.product, "findMany");

    await getProductList();

    expect(spy).toHaveBeenCalledWith({
      select: { id: true, name: true, price: true, imageUrl: true },
      orderBy: { id: "asc" },
    });
    spy.mockRestore();
  });

  it("DB 오류는 삼키지 않고 호출한 쪽(API)으로 그대로 던진다", async () => {
    const spy = vi
      .spyOn(prisma.product, "findMany")
      .mockRejectedValueOnce(new Error("DB 오류"));

    await expect(getProductList()).rejects.toThrow("DB 오류");
    spy.mockRestore();
  });
});
