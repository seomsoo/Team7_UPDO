'use client';

import ReviewScore from '@/components/ui/ReviewScore';

interface ReviewCardProps {
  id: number;
  user: { nickname: string; image?: string };
  score: number;
  comment: string;
  createdAt: string;
}

export default function ReviewCard({ user, score, comment, createdAt }: ReviewCardProps) {
  return (
    <li className="pt-6 md:pt-8">
      <div className="flex items-center gap-2">
        <img
          src={user.image ?? '/images/profile.png'}
          alt={user.nickname}
          className="h-8 w-8 flex-shrink-0 rounded-full object-cover md:h-10 md:w-10"
        />
        <div className="min-w-0 flex-1">
          <span className="text-sm text-[var(--color-gray-500)]">{user.nickname}</span>
          <div className="flex items-center justify-start">
            <ReviewScore value={score} disabled label="" size="sm" className="w-32" />
            <span className="text-sm text-[var(--color-gray-400)]">{createdAt}</span>
          </div>
        </div>
      </div>
      <p className="typo-sm md:typo-base mt-4 mb-5 font-medium text-[var(--color-gray-700)] md:mt-6 md:mb-7 md:text-sm">
        {comment}
      </p>
    </li>
  );
}
