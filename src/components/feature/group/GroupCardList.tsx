'use client';

import { fetchGatherings } from '@/mocks/gatherings';
import GroupCard from './GroupCard';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Image from 'next/image';

export default function GroupCardList() {
  const { ref, inView } = useInView({ threshold: 0.5 });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['gatherings'],
    queryFn: ({ pageParam = 1 }) => fetchGatherings(pageParam),
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.nextPage,
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const gatherings = data?.pages.flatMap(page => page.data) ?? [];

  return (
    <>
      {gatherings.length === 0 ? (
        <span className="mt-16 flex flex-col items-center text-gray-400">
          <Image src="/images/empty.png" alt="empty" width={180} height={100} />
          현재 등록된 모임이 없습니다.
        </span>
      ) : (
        <div className="mx-auto flex flex-col items-center gap-6 md:grid md:grid-cols-2">
          {gatherings.map(item => (
            <GroupCard key={item.id} data={item} />
          ))}
          <div ref={ref} className="text-gray-500">
            {isFetchingNextPage ? '불러오는 중...' : hasNextPage}
          </div>
        </div>
      )}
    </>
  );
}
