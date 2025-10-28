import { normalizeReviewFilters, type AllReviewFilters } from '@/constants/queryKeys';

export type AllReviewParams = Record<string, string | number | boolean>;

export function normalizeReviewParams(filters?: AllReviewFilters): {
  keyPart: ReturnType<typeof normalizeReviewFilters>; // queryKey에 붙일 안정된 값
  params: AllReviewParams; // 실제 API 파라미터
} {
  const filter = normalizeReviewFilters(filters);
  const param: AllReviewParams = {};
  if (filter.sort) param.sort = filter.sort;
  if (filter.order) param.order = filter.order;
  if (typeof filter.ratingGte === 'number') param.ratingGte = filter.ratingGte;
  if (filter.tagIds?.length) param.tagIds = filter.tagIds.join(',');
  if (filter.period?.from) param.from = filter.period.from;
  if (filter.period?.to) param.to = filter.period.to;
  if (filter.query) param.query = filter.query;
  if (typeof filter.userId === 'number') param.userId = filter.userId;
  return { keyPart: filter, params: param };
}
