import MyMeeting from '@/components/feature/my/content/MyMeeting';
import MyCreatedGroup from '@/components/feature/my/content/MyCreatedGroup';
import MyReview from '@/components/feature/my/content/MyReview';

import { TabValue } from '@/app/mypage/[tab]/page';

export default function MyPageContentControl({ tab }: { tab: TabValue }) {
  return (
    <div className="flex flex-col gap-6">
      {tab === 'myMeeting' && <MyMeeting />}
      {tab === 'myCreated' && <MyCreatedGroup />}
      {tab === 'myReview' && <MyReview />}
    </div>
  );
}
