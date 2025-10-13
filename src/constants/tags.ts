export type Option = { label: string; value: string };

export const TAG_OPTIONS: Readonly<Option[]> = [
  { label: '태그 전체', value: 'default' },
  { label: '성장', value: 'growth' },
  { label: '배움', value: 'learn' },
  { label: '도전', value: 'challenge' },
  { label: '연결', value: 'connect' },
] as const;

export const KEYWORD_LABEL_BY_VALUE: Readonly<Record<string, string>> = Object.fromEntries(
  TAG_OPTIONS.map(o => [o.value, o.label]),
);
// 사용 예: TAG_LABEL_BY_VALUE['growth'] === '성장'
