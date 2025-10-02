// src/types/reviews/list.ts

import { IReviewWithRelations } from './models';
import { IPagination } from '@/types/common';

export interface GetReviewsResponse extends IPagination {
  data: IReviewWithRelations[];
}
