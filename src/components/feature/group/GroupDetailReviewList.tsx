'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import ReviewCard from './GroupDetailReview';
import { Pagination } from '@/components/ui/Pagination';
import { reviewService } from '@/services/reviews/reviewService';
import Image from 'next/image';
import { IReviewWithRelations } from '@/types/reviews';

export default function GroupDetailReviewList() {
  const [reviews, setReviews] = useState<IReviewWithRelations[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const pageSize = 4;
  const totalPages = Math.ceil(reviews.length / pageSize);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const res = await reviewService.getReviews();
        setReviews(res.data || []);
      } catch (err) {
        console.error('리뷰 불러오기 실패:', err);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  const list = reviews.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section>
      <h3 className="md:typo-title text-lg font-semibold text-[var(--color-gray-900)]">
        리뷰 모아보기
      </h3>

      <div
        className={cn(
          'bg-surface rounded-md px-5 pt-[2px] pb-8 sm:mt-4 sm:rounded-md sm:px-10 md:mt-6 md:rounded-2xl md:px-12 md:pb-10',
        )}>
        {loading ? (
          <div className="flex h-48 items-center justify-center text-gray-500">로딩 중...</div>
        ) : list.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-12">
            <Image
              src="/images/empty.png"
              alt="empty"
              width={171}
              height={115}
              className="opacity-70"
            />
            <span className="text-sm text-gray-400 md:text-base">아직 작성된 리뷰가 없어요.</span>
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
