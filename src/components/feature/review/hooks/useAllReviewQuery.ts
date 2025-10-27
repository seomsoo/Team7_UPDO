'use client';

import { useEffect, useMemo } from 'react';
import type { UseInfiniteQueryResult, InfiniteData } from '@tanstack/react-query';

import { useInfiniteListQuery } from '@/hooks/useInfiniteListQuery';
import { qk, type AllReviewFilters, normalizeReviewFilters } from '@/constants/queryKeys';
import anonReviewService from '@/services/reviews/anonReviewService';
import type { IReviewWithRelations } from '@/types/reviews';

export type AllReviewPage = {
  data: IReviewWithRelations[];
  nextPage?: number | null;
};

export function useAllReviewQuery(
  filters?: AllReviewFilters,
): UseInfiniteQueryResult<InfiniteData<AllReviewPage>, Error> {
  // 얕은 비교이기에 같은 객체로 인식되기 위한 '정규화' 진행
  const normalized = useMemo(() => normalizeReviewFilters(filters), [filters]);
  const params = useMemo(() => {
    const p: Record<string, string | number | boolean> = {};
    if (normalized.sort) p.sort = normalized.sort;
    if (normalized.order) p.order = normalized.order;
    if (typeof normalized.ratingGte === 'number') p.ratingGte = normalized.ratingGte;
    if (normalized.tagIds && normalized.tagIds.length > 0) p.tagIds = normalized.tagIds.join(',');
    if (normalized.period) {
      if (normalized.period.from) p.from = normalized.period.from;
      if (normalized.period.to) p.to = normalized.period.to;
    }
    if (normalized.query) p.query = normalized.query;
    if (typeof normalized.userId === 'number') p.userId = normalized.userId;
    return p;
  }, [normalized]);

  // 공통 무한 스크롤 쿼리
  const query = useInfiniteListQuery<AllReviewPage>({
    queryKey: qk.allReviews(normalized),
    queryFn: page => anonReviewService.getReviewInfiniteList(page, params),
  });

  useEffect(() => {
    query.refetch();
  }, [query, normalized]);

  return query;
}

export function useAllReviewList(filters?: AllReviewFilters) {
  const query = useAllReviewQuery(filters);
  const items = useMemo(() => query.data?.pages?.flatMap(p => p.data) ?? [], [query.data]);
  return { ...query, items };
}
