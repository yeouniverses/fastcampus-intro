import { afterAll, describe, expect, it, vi } from "vitest";
import { seedProducts } from "../../../../prisma/seed-data";
import { prisma } from "@/lib/prisma";
import type { ProductListResponse } from "@/lib/products";
import { GET } from "./route";

// 이 테스트는 vitest.global-setup.ts 가 만든 test.db(시드 6개)를 실제로 조회한다.
afterAll(async () => {
  await prisma.$disconnect();
});

describe("GET /api/products", () => {
  it("200 과 함께 DB 에 저장된 6개 상품을 JSON 으로 반환한다", async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");

    const body = (await response.json()) as ProductListResponse;
    expect(body.products).toHaveLength(6);
  });

  it("목록 카드용 필드(id·name·price·imageUrl)만 id 순서대로 내려준다", async () => {
    const body = (await (await GET()).json()) as ProductListResponse;

    expect(body.products).toEqual(
      seedProducts.map(({ id, name, price, imageUrl }) => ({
        id,
        name,
        price,
        imageUrl,
      })),
    );
    for (const product of body.products) {
      expect(product).not.toHaveProperty("description");
    }
  });

  it("price 는 정수(원), imageUrl 은 /images/ 로컬 경로다", async () => {
    const body = (await (await GET()).json()) as ProductListResponse;

    for (const product of body.products) {
      expect(Number.isInteger(product.price)).toBe(true);
      expect(product.imageUrl.startsWith("/images/")).toBe(true);
    }
  });

  it("DB 조회에 실패하면 500 과 한글 에러 메시지를 반환한다", async () => {
    const spy = vi
      .spyOn(prisma.product, "findMany")
      .mockRejectedValueOnce(new Error("DB 오류"));

    const response = await GET();

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      message: "상품 목록을 조회하지 못했습니다.",
    });
    spy.mockRestore();
  });
});
