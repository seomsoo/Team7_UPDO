import { Type } from '@/utils/mapping';

export interface IReviewScore {
  teamId: string;
  gatheringId: number;
  type: Type;
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
}

export type GetReviewScoresResponse = IReviewScore[];
