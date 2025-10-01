// src/types/common/pagination.ts

// 공통 페이지네이션 구조
export interface IPagination {
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
}
