// src/types/common/constants.ts

// ----------------------
// 모임 종류 (API 값 기준)
// ----------------------
export const GATHERING_TYPES = [
  'DALLAEMFIT',
  'OFFICE_STRETCHING',
  'MINDFULNESS',
  'WORKATION',
] as const;

export type GatheringType = (typeof GATHERING_TYPES)[number];

// ----------------------
// 모임 위치 (API 값 기준)
// ----------------------
export const GATHERING_LOCATIONS = ['건대입구', '을지로3가', '신림', '홍대입구'] as const;

export type GatheringLocation = (typeof GATHERING_LOCATIONS)[number];

// ----------------------
// 리뷰에서도 동일 값 사용
// ----------------------
export type ReviewType = GatheringType;
export type ReviewLocation = GatheringLocation;
