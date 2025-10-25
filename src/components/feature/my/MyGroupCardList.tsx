'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';

import MyGroupCardSkeleton from '@/components/ui/Skeleton/MyGroupCardSkeleton';
import MyGroupCard from './MyGroupCard';

import { TabVariant } from '@/app/mypage/page';
import type { IJoinedGathering } from '@/types/gatherings';
import { useMounted } from '@/hooks/useMounted';
import { isClosed } from '@/utils/date';

interface MyGroupCardListProps {
  emptyMsg: string;
  queryKey: (string | number | object)[];
  getPage: (pageParam: number) => Promise<{ data: IJoinedGathering[]; nextPage?: number }>;
  variant: TabVariant;
  reviewFilter?: 'writable' | 'written';
  enabled?: boolean;
}

export default function MyGroupCardList({
  emptyMsg,
  queryKey,
  getPage,
  variant,
  reviewFilter,
  enabled = true,
}: MyGroupCardListProps) {
  const mounted = useMounted();

  const { ref, inView } = useInView({ threshold: 0, rootMargin: '100px 0px' });

  // tanStackQuery로 무한 스크롤 구현하기
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam = 1 }) => getPage(pageParam),
      initialPageParam: 1,
      getNextPageParam: lastPage => lastPage.nextPage,
      enabled: mounted && enabled,
    });

  // useMounted 훅으로 mounted(CSR 환경)되었으며,
  useEffect(() => {
    if (mounted && enabled) refetch();
  }, [mounted, enabled, refetch]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const list: IJoinedGathering[] = data?.pages?.flatMap(p => p.data) ?? [];

  const filtered =
    variant === 'myReviews' && reviewFilter
      ? list.filter(item => {
          const completed = (item.isCompleted ?? false) || isClosed(item.dateTime);
          const reviewed = !!item.isReviewed;
          if (reviewFilter === 'writable') return completed && !reviewed;
          if (reviewFilter === 'written') return completed && reviewed;
          return true;
        })
      : list;

  if (isLoading) {
    return (
      <div className="mx-auto mt-6 flex w-full flex-col items-center gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <MyGroupCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center text-gray-500">
        데이터를 불러오는 중 오류가 발생했습니다.
        <button
          onClick={() => refetch()}
          className="mt-2 rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600">
          다시 시도
        </button>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center" ref={ref}>
        <Image src="/images/empty.png" alt="모임 빈화면 이미지" width={171} height={115} />
        <span className="card-title text-gray-400">{emptyMsg}</span>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 flex w-full flex-col items-center gap-4 sm:mt-8 md:gap-6">
      {filtered.map(item => (
        <div key={item.id} className="w-full">
          <MyGroupCard variant={variant} item={item} />
        </div>
      ))}
      {/* sentinel */}
      <div ref={ref} className="my-4 text-gray-500">
        {isFetchingNextPage ? '불러오는 중...' : hasNextPage ? '' : ''}
      </div>
    </div>
  );
}
