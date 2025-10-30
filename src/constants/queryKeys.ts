export type ReviewSortOrder = 'asc' | 'desc';

export const queryKey = {
  gatherings: () => ['gatherings'] as const,
  // 내가 참여한 모임 (MyMeeting)
  myMeetings: () => ['gatherings', 'myMeetings'] as const,

  // 내가 만든 모임 (Created)
  myCreatedGroups: (userId?: number) => ['gatherings', 'created', userId ?? ''] as const,

  // 내가 작성 가능한 리뷰 (MyReview)
  myReviewsWritable: () => ['gatherings', 'myReviews', 'writable'] as const,

  // 내가 작성한 리뷰 (MyReview)
  myReviewsWritten: (userId?: number | null) =>
    ['reviews', 'my', 'written', userId ?? null] as const,

  // 모든 리뷰
  allReviews: (params?: Record<string, string>) => ['reviews', 'all', params || {}] as const,

  participants: (id?: number | string | null) =>
    ['gatheringParticipants', id == null ? null : Number(id)] as const,

  joinedGatherings: (userId?: number | null) => ['joinedGatherings', userId ?? null] as const,
};
