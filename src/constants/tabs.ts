export type TapOption = { title: string; subtitle: string };

export const TAB_OPTIONS: Readonly<TapOption[]> = [
  { title: '성장', subtitle: '스킬업' },
  { title: '성장', subtitle: '챌린지' },
  { title: '네트워킹', subtitle: '' },
] as const;
