'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import ReviewCard from './GroupDetailReview';
import { Pagination } from '@/components/ui/Pagination';

const mock = [
  {
    id: 1,
    user: { nickname: '럽윈즈올', image: '/images/profile.png' },
    score: 5,
    comment:
      '따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요.',
    createdAt: '2024.01.25',
  },
  {
    id: 2,
    user: { nickname: '슈크림', image: '/images/profile.png' },
    score: 4,
    comment: '두번째 이용이에요! 만족합니다.',
    createdAt: '2024.01.25',
  },
  {
    id: 3,
    user: { nickname: '당근조아', image: '/images/profile.png' },
    score: 5,
    comment: '강사분도 친절하시고 ~ ^^ 너무 좋은 공간에서 긴장과 스트레스 모두 잘 풀고 가요 ~ ^^',
    createdAt: '2024.01.25',
  },
  {
    id: 4,
    user: { nickname: '모카브레드', image: '/images/profile.png' },
    score: 5,
    comment: '분위기가 좋아서 다음엔 친구랑 같이 오려구요!',
    createdAt: '2024.01.25',
  },
  {
    id: 5,
    user: { nickname: '블루문', image: '/images/profile.png' },
    score: 5,
    comment: '시간이 너무 빨리 지나갔어요! 다음에도 꼭 참여하고 싶어요 🌸',
    createdAt: '2024.01.25',
  },
];

export default function GroupDetailReviewList() {
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const totalPages = Math.ceil(mock.length / pageSize);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const list = mock.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section>
      <h3 className="md:typo-title text-lg font-semibold text-[var(--color-gray-900)]">
        리뷰 모아보기
      </h3>

      <div
        className={cn(
          'bg-surface sm: mt-4 rounded-md px-5 pt-[2px] pb-8 sm:rounded-md sm:px-10 md:mt-6 md:rounded-2xl md:px-12 md:pb-10',
        )}>
        {list.length === 0 ? (
          <div className="flex h-48 items-center justify-center">
            <img
              src="/images/empty.png"
              alt="empty"
              className="h-20 w-20 object-contain opacity-70 md:h-24 md:w-24"
            />
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {list.map(item => (
              <ReviewCard key={item.id} {...item} />
            ))}
          </ul>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center md:mt-6">
          <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
        </div>
      )}
    </section>
  );
}
