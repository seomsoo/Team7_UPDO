export type TabOption = { title: string; subtitle: string; value: string };

export const TAB_OPTIONS: Readonly<TabOption[]> = [
  { title: '성장', subtitle: '스킬업', value: '스킬업' },
  { title: '성장', subtitle: '챌린지', value: '챌린지' },
  { title: '네트워킹', subtitle: '', value: '네트워킹' },
] as const;
