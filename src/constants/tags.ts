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
