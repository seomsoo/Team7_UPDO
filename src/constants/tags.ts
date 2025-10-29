export const tags = ['growth', 'learn', 'challenge', 'connect'];
export const locations = ['건대입구', '신림', '을지로3가', '홍대입구'];

export type Option = { label: string; value: string; location: string };

export const TAG_OPTIONS: Readonly<Option[]> = [
  { label: '태그 전체', value: 'default', location: '' },
  { label: '성장', value: 'growth', location: '건대입구' },
  { label: '배움', value: 'learn', location: '을지로3가' },
  { label: '도전', value: 'challenge', location: '신림' },
  { label: '연결', value: 'connect', location: '홍대입구' },
] as const;

export type SortOption = {
  label: string;
  value: 'dateTime' | 'registrationEnd' | 'participantCount' | 'createdAt';
};
export const SORT_OPTIONS: Readonly<SortOption[]> = [
  { label: '참여 인원순', value: 'participantCount' },
  { label: '마감 임박', value: 'registrationEnd' },
] as const;

export const REVIEW_SORT_OPTIONS: Readonly<SortOption[]> = [
  { label: '참여 인원순', value: 'participantCount' },
  { label: '최신 등록순', value: 'createdAt' },
] as const;
