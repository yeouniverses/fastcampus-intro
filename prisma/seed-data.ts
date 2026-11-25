import type { ProductCreateInput } from "../generated/prisma/models";

// PRD(docs/prd/README.md) 샘플 데이터 6종. 시드 스크립트와 테스트가 함께 사용한다.
export const seedProducts: ProductCreateInput[] = [
  {
    id: "1",
    name: "미니멀 화이트 머그컵",
    price: 12000,
    imageUrl: "/images/product-01.png",
    description:
      "군더더기 없는 디자인의 300ml 세라믹 머그컵입니다. 매일 쓰기 좋은 넉넉한 용량과 손에 잘 감기는 손잡이를 갖췄습니다.",
  },
  {
    id: "2",
    name: "원목 도마 세트",
    price: 29000,
    imageUrl: "/images/product-02.png",
    description:
      "아카시아 원목으로 만든 대·소 2종 도마 세트입니다. 자연스러운 나뭇결이 서빙 플레이트로도 잘 어울립니다.",
  },
  {
    id: "3",
    name: "코튼 캔버스 에코백",
    price: 18000,
    imageUrl: "/images/product-03.png",
    description:
      "두툼한 12온스 캔버스로 만든 데일리 에코백입니다. 작은 소지품을 정리하기 좋은 안주머니가 있습니다.",
  },
  {
    id: "4",
    name: "아로마 소이 캔들",
    price: 22000,
    imageUrl: "/images/product-04.png",
    description:
      "100% 천연 소이왁스로 만든 향초입니다. 은은한 우디 향이 공간을 차분하게 채워 줍니다.",
  },
  {
    id: "5",
    name: "스테인리스 텀블러 500ml",
    price: 25000,
    imageUrl: "/images/product-05.png",
    description:
      "이중 진공 단열로 보온·보냉을 유지하는 텀블러입니다. 누수 방지 뚜껑을 갖췄습니다.",
  },
  {
    id: "6",
    name: "리넨 룸슬리퍼",
    price: 15000,
    imageUrl: "/images/product-06.png",
    description:
      "통기성 좋은 리넨 소재의 실내 슬리퍼입니다. 논슬립 밑창으로 편안하고 안정적으로 사용합니다.",
  },
];
