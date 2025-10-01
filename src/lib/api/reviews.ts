// src/lib/api/reviews.ts

import { apiClient } from './client';
import {
  CreateReviewRequest,
  CreateReviewResponse,
  GetReviewsParams,
  GetReviewsResponse,
  GetReviewScoresParams,
  GetReviewScoresResponse,
} from '@/types/reviews';

function toQuery<T extends object>(params?: T): string {
  if (!params) return '';
  return (
    '?' + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString()
  );
}

// 리뷰 추가
export async function createReview(teamId: string, data: CreateReviewRequest) {
  return apiClient<CreateReviewResponse>(`/${teamId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// 리뷰 목록 조회
export async function getReviews(teamId: string, params?: GetReviewsParams) {
  return apiClient<GetReviewsResponse>(`/${teamId}/reviews${toQuery(params)}`);
}

// 리뷰 평점 목록 조회
export async function getReviewScores(teamId: string, params?: GetReviewScoresParams) {
  return apiClient<GetReviewScoresResponse>(`/${teamId}/reviews/scores${toQuery(params)}`);
}
