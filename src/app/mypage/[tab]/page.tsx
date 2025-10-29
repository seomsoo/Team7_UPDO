import { redirect } from 'next/navigation';

import MyMeeting from '@/components/feature/my/content/MyMeeting';
import MyCreatedGroup from '@/components/feature/my/content/MyCreatedGroup';
import MyReview from '@/components/feature/my/content/MyReview';

const TAB_VALUES = ['myMeeting', 'myCreated', 'myReview'] as const;
type TabValue = (typeof TAB_VALUES)[number];

function isValidTab(tab: string): tab is TabValue {
  return TAB_VALUES.includes(tab as TabValue);
}

export default async function MyPageTabPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params;

  if (!isValidTab(tab)) redirect('/mypage/myMeeting');

  return (
    <div className="flex flex-col gap-6">
      {tab === 'myMeeting' && <MyMeeting />}
      {tab === 'myCreated' && <MyCreatedGroup />}
      {tab === 'myReview' && <MyReview />}
    </div>
  );
}
