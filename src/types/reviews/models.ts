// src/types/reviews/models.ts

import { ReviewType, ReviewLocation } from '@/types/common';

// Review 공통 모델
export interface IReview {
  teamId: string;
  id: number;
  userId: number;
  gatheringId: number;
  score: number;
  comment: string;
  createdAt: string; // ISO date-time
}

// Review + 연관 데이터
export interface IReviewWithRelations extends IReview {
  Gathering: {
    teamId: string;
    id: number;
    type: ReviewType;
    name: string;
    dateTime: string;
    location: ReviewLocation;
    image?: string;
  };
  User: {
    teamId: string;
    id: number;
    name: string;
    image?: string;
  };
}
