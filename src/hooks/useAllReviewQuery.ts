'use client';

import { useMemo } from 'react';

import { useInfiniteListQuery } from '@/hooks/useInfiniteListQuery';

import { queryKey, type AllReviewFilters } from '@/constants/queryKeys';

import { normalizeReviewParams } from '@/utils/normalizeReviewParams';
import type { IReviewWithRelations } from '@/types/reviews';
import anonReviewService from '@/services/reviews/anonReviewService';

export type AllReviewPage = {
  data: IReviewWithRelations[];
  nextPage?: number | null;
};

// src/hooks/useAllReviewQuery.ts
export function useAllReviewQuery(filters?: AllReviewFilters) {
  const { keyPart, params } = normalizeReviewParams(filters);

  // 공통 무한 스크롤 쿼리
  const query = useInfiniteListQuery<AllReviewPage>({
    queryKey: queryKey.allReviews(keyPart),
    queryFn: page => anonReviewService.getReviewInfiniteList(page, params),
  });

  const items = useMemo(() => query.data?.pages?.flatMap(p => p.data) ?? [], [query.data]);

  return { ...query, items };
}
