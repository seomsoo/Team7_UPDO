'use client';

import { useParams, useRouter } from 'next/navigation';

import Tab from '@/components/ui/Tab';

const TAB_ITEMS = [
  { label: '나의 모임', value: 'myMeeting' },
  { label: '나의 리뷰', value: 'myReview' },
  { label: '내가 만든 모임', value: 'myCreated' },
];

export default function MyPageContentPane({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { tab } = useParams<{ tab?: string }>();

  return (
    <div className="flex flex-col gap-6">
      <Tab
        items={TAB_ITEMS}
        value={tab ?? 'myMeeting'}
        onChange={val => router.push(`/mypage/${val}`)}
      />
      <div>{children}</div>
    </div>
  );
}
