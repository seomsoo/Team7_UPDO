import { redirect } from 'next/navigation';

import MyPageContentPane from '@/components/feature/my/MyPageContentPane';

const TAB_VALUES = ['myMeeting', 'myCreated', 'myReview'] as const;
export type TabValue = (typeof TAB_VALUES)[number];

function isValidTab(tab: string): tab is TabValue {
  return TAB_VALUES.includes(tab as TabValue);
}

export default async function MyPageTabPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params;

  if (!isValidTab(tab)) redirect('/mypage/myMeeting');

  return <MyPageContentPane tab={tab} />;
}
