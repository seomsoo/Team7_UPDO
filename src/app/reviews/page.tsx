import ReviewCardList from '@/components/feature/review/ReviewCardList';

export default function ReviewsPage() {
  return (
    <div>
      <ReviewCardList variants="all" emptyMsg="아직 리뷰가 없어요." />
    </div>
  );
}
