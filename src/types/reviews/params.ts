// GET /{teamId}/reviews
export interface GetReviewsParams {
  teamId?: string;
  gatheringId?: number;
  userId?: number;
  type?: string;
  location?: string;
  date?: string;
  registrationEnd?: string;
  sortBy?: 'createdAt' | 'score' | 'participantCount';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// GET /{teamId}/reviews/scores
export interface GetReviewScoresParams {
  teamId: string;
  gatheringId?: string; // 쉼표 구분 ID
  type?: string;
}
