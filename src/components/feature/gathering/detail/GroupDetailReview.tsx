import ReviewScore from '@/components/ui/ReviewScore';
import { IReviewWithRelations } from '@/types/reviews';
import { formatReviewDate } from '@/utils/date';

export default function ReviewCard({ User, score, comment, createdAt }: IReviewWithRelations) {
  return (
    <li className="pt-6 md:pt-8">
      <div className="flex items-center gap-2">
        <img
          src={User.image ?? '/images/profile.png'}
          alt={User.name}
          className="h-8 w-8 flex-shrink-0 rounded-full object-cover md:h-10 md:w-10"
        />
        <div className="min-w-0 flex-1">
          <span className="text-sm text-[var(--color-gray-500)]">{User.name}</span>
          <div className="flex items-center justify-start">
            <ReviewScore value={score} disabled label="" size="sm" className="w-32" />
            <span className="text-sm text-gray-400">{formatReviewDate(createdAt)}</span>
          </div>
        </div>
      </div>
      <p className="typo-sm md:typo-base mt-4 mb-5 font-medium text-[var(--color-gray-700)] md:mt-6 md:mb-7">
        {comment}
      </p>
    </li>
  );
}
