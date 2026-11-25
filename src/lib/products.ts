import { prisma } from "./prisma";

/**
 * 상품 목록 카드(ProductCard)에 필요한 필드만 담은 요약 타입.
 * - id: 상세 페이지 링크(/products/[id])
 * - name: 상품명 / 이미지 alt
 * - price: 정수(원). 화면에서 formatPrice() 로 "12,000원" 표시
 * - imageUrl: /images/ 로 시작하는 로컬 경로 (next/image src)
 * description 은 상세 화면 전용이므로 목록에는 포함하지 않는다.
 */
export interface ProductSummary {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

/** GET /api/products 성공 응답 본문 */
export interface ProductListResponse {
  products: ProductSummary[];
}

/** GET /api/products 실패 응답 본문 */
export interface ApiErrorResponse {
  message: string;
}

/** 전체 상품을 id 오름차순으로 조회한다. (PRD: 페이지네이션 없음) */
export async function getProductList(): Promise<ProductSummary[]> {
  return prisma.product.findMany({
    select: { id: true, name: true, price: true, imageUrl: true },
    orderBy: { id: "asc" },
  });
}
