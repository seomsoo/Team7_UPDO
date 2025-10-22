'use client';

import GroupDetailHeader from '@/components/feature/group/GroupDetailCard';
import GroupDetailParticipation from '@/components/feature/group/GroupDetailParticipationCard';
import GroupDetailReviewList from '@/components/feature/group/GroupDetailReviewList';
import Image from 'next/image';

export default function GroupDetailPage() {
  const data = {
    id: 1,
    name: '성장 스킬업',
    topic: 'growth' as const,
    dateText: '1월 7일',
    timeText: '17:30',
    deadlineText: '오늘 21시 마감',
    isHost: false,
    participantCount: 16,
    capacity: 20,
    minParticipants: 5,
    participants: [
      { id: 1, image: '/images/profile.png' },
      { id: 2, image: '/images/profile.png' },
      { id: 3, image: '/images/profile.png' },
      { id: 4, image: '/images/profile.png' },
      { id: 5, image: '/images/profile.png' },
    ],
  };

  return (
    <main className="px-0 py-10">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <div className="relative h-60 w-full overflow-hidden rounded-md bg-amber-50 shadow-sm sm:h-auto sm:rounded-md md:rounded-2xl">
          <Image src="/images/spot.jpg" alt={data.name} fill className="object-cover" />
        </div>

        {/* 상세/참여자 카드 */}
        <div className="flex flex-col justify-between gap-4">
          <GroupDetailHeader
            data={{
              id: data.id,
              name: data.name,
              topic: data.topic,
              deadlineText: data.deadlineText,
              dateText: data.dateText,
              timeText: data.timeText,
            }}
            isHost={data.isHost}
          />

          <GroupDetailParticipation
            current={data.participantCount}
            max={data.capacity}
            min={data.minParticipants}
            participants={data.participants}
            showConfirm={true}
          />
        </div>
      </section>

      <section className="mt-6 sm:mt-12 md:mt-16">
        <GroupDetailReviewList />
      </section>
    </main>
  );
}
