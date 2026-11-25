import { NextResponse } from "next/server";
import {
  getProductList,
  type ApiErrorResponse,
  type ProductListResponse,
} from "@/lib/products";

// 요청마다 DB 에서 최신 데이터를 읽는다(빌드 시 정적 캐시 방지).
export const dynamic = "force-dynamic";

export async function GET(): Promise<
  NextResponse<ProductListResponse | ApiErrorResponse>
> {
  try {
    const products = await getProductList();
    return NextResponse.json({ products });
  } catch {
    return NextResponse.json(
      { message: "상품 목록을 조회하지 못했습니다." },
      { status: 500 },
    );
  }
}
