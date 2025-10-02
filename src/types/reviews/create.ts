// src/types/reviews/create.ts

import { IReview } from './models';

export interface CreateReviewRequest {
  gatheringId: number;
  score: number;
  comment: string;
}

export type CreateReviewResponse = IReview;
