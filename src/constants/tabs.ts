export type MainCategory = (typeof TAB_OPTIONS)[number]['title'];

export type TabOption = { title: string; subtitle: string; value: string; type: string };

export const tabs = ['스킬업', '챌린지', '네트워킹', '성장'];
export const types = ['OFFICE_STRETCHING', 'MINDFULNESS', 'WORKATION', 'DALLAEMFIT'];

export const TAB_OPTIONS: Readonly<TabOption[]> = [
  { title: '성장', subtitle: '전체', value: '성장', type: 'DALLAEMFIT' },
  { title: '성장', subtitle: '스킬업', value: '스킬업', type: 'OFFICE_STRETCHING' },
  { title: '성장', subtitle: '챌린지', value: '챌린지', type: 'MINDFULNESS' },
  { title: '네트워킹', subtitle: '', value: '네트워킹', type: 'WORKATION' },
] as const;
