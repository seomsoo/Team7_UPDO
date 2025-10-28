'use client';

import { useRouter } from 'next/navigation';

import Tab from '@/components/ui/Tab';
import MyPageContentControl from '@/components/feature/my/MyPageContentControl';
import { TabValue } from '@/app/mypage/[tab]/page';

const TAB_ITEMS = [
  { label: '나의 모임', value: 'myMeeting' },
  { label: '나의 리뷰', value: 'myReview' },
  { label: '내가 만든 모임', value: 'myCreated' },
];

export default function MyPageContentPane({ tab }: { tab: TabValue }) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <Tab
        items={TAB_ITEMS}
        value={tab ?? 'myMeeting'}
        onChange={val => router.push(`/mypage/${val}`)}
      />
      <div>
        <MyPageContentControl tab={tab} />
      </div>
    </div>
  );
}
