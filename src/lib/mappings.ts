// src/lib/mappings.ts
import { GatheringType, GatheringLocation } from '@/types/common';

// ----------------------
// 서비스 라벨 정의 (UI 노출용)
// ----------------------
export const GatheringServiceLabels = ['스킬업', '챌린지', '네트워킹'] as const;
export type GatheringServiceLabel = (typeof GatheringServiceLabels)[number];

// 라벨 ↔ API 값 매핑
export function toApiGatheringService(
  label: GatheringServiceLabel,
): Exclude<GatheringType, 'DALLAEMFIT'> {
  switch (label) {
    case '스킬업':
      return 'OFFICE_STRETCHING';
    case '챌린지':
      return 'MINDFULNESS';
    case '네트워킹':
      return 'WORKATION';
    default:
      throw new Error(`Invalid service label: ${label}`);
  }
}

export function fromApiGatheringService(
  type: Exclude<GatheringType, 'DALLAEMFIT'>,
): GatheringServiceLabel {
  switch (type) {
    case 'OFFICE_STRETCHING':
      return '스킬업';
    case 'MINDFULNESS':
      return '챌린지';
    case 'WORKATION':
      return '네트워킹';
  }
}

// ----------------------
// 장소 매핑 (API 값 ↔ UI 태그)
// ----------------------
export const GatheringLocationMap: Record<GatheringLocation, string> = {
  건대입구: '배움',
  을지로3가: '도전',
  신림: '성장',
  홍대입구: '연결',
};

// UI 라벨 배열 (schemas 검증용)
export const GatheringLocationLabels = Object.values(GatheringLocationMap) as [string, ...string[]];

// 라벨 → API 값 변환
export function toApiGatheringLocation(label: string): GatheringLocation {
  const entry = Object.entries(GatheringLocationMap).find(([, value]) => value === label);
  if (!entry) throw new Error(`Invalid gathering location label: ${label}`);
  return entry[0] as GatheringLocation;
}

// API 값 → UI 태그 변환
export function fromApiGatheringLocation(location: GatheringLocation): string {
  return GatheringLocationMap[location];
}

// ----------------------
// 계층형 카테고리 트리 (UI 전용)
// ----------------------
export const GatheringCategoryTree = [
  {
    label: '성장',
    children: [
      { label: '스킬업', type: 'OFFICE_STRETCHING' as GatheringType },
      { label: '챌린지', type: 'MINDFULNESS' as GatheringType },
    ],
  },
  {
    label: '네트워킹',
    children: [{ label: '네트워킹', type: 'WORKATION' as GatheringType }],
  },
  {
    label: '성장(개별)', // 독립 모임
    children: [{ label: '성장', type: 'DALLAEMFIT' as GatheringType }],
  },
] as const;
