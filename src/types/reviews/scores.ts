// src/types/reviews/scores.ts

import { ReviewType } from '@/types/common';

export interface IReviewScore {
  teamId: string;
  gatheringId: number;
  type: ReviewType;
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
}

export type GetReviewScoresResponse = IReviewScore[];
