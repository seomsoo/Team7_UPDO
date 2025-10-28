'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import FavoriteButton from '../favorites/FavoriteButton';
import Tag from '@/components/ui/Tag';
import Icon from '@/components/ui/Icon';
import IconText from '@/components/ui/IconText';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { IGathering } from '@/types/gatherings/models';
import { formatTime, formatDate, formatDeadline } from '@/utils/date';
import { ConfirmModal } from '@/components/ui/Modal';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { useGatheringQuery } from '@/hooks/useGatheringQuery';
import { useGatheringStatus } from '@/hooks/useGatheringStatus';

interface GroupCardProps {
  data: IGathering;
}

export default function GroupCard({ data }: GroupCardProps) {
  const { name, location, dateTime, registrationEnd, capacity, image } = data;
  const { participantCount, isJoined, handleJoinClick, modalOpen, setModalOpen, loading } =
    useGatheringQuery(data.id);
  const { isFull, isClosed, topic, safeCapacity, category } = useGatheringStatus(
    location,
    capacity,
    participantCount,
    registrationEnd,
  );
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <Link
        href={`/gathering/${data.id}`}
        className="contents"
        role="link"
        aria-label={`${name} 상세 페이지로 이동`}>
        <article className="relative flex h-[346px] w-full max-w-[650px] flex-col overflow-hidden rounded-xl bg-white transition-transform duration-300 will-change-transform hover:scale-105 hover:shadow-md sm:h-[219px] sm:max-w-[1280px] sm:flex-row sm:rounded-2xl sm:p-6 md:max-w-[640px]">
          <div className="relative h-[160px] w-full sm:h-[170px] sm:w-[170px] md:h-auto">
            {!image ? (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400 sm:rounded-xl"></div>
            ) : (
              <>
                <Image
                  src={image}
                  alt={name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover sm:rounded-xl"
                />
                {isClosed && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 sm:rounded-xl">
                    <span className="bg-grad-500 bg-clip-text text-3xl leading-[1.1] font-bold text-transparent">
                      {isFull ? '정원 마감' : '모집 마감'}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="absolute top-5 right-5">
            {isClosed ? (
              <div role="img" aria-label="모집 마감됨" className="cursor-not-allowed">
                <Icon name="save" size={48} />
              </div>
            ) : (
              <FavoriteButton itemId={data.id} />
            )}
          </div>
          <div className="flex flex-1 flex-col justify-between p-4 sm:pt-4 sm:pl-4 md:pr-0">
            <header className="flex flex-col gap-2 sm:order-1">
              <div className="flex flex-col items-start gap-1.5">
                <div className="flex items-center">
                  <h3 className="h5Semibold max-w-[200px] truncate">{name}</h3>
                  {participantCount >= 5 && (
                    <IconText
                      tone="none"
                      icon="check"
                      typo="tag"
                      className="border-purple-400 pl-1 text-purple-600">
                      개설 확정
                    </IconText>
                  )}
                </div>
                <Tag topic={topic} label={category} />
              </div>
            </header>

            <div className="flex flex-col gap-2 sm:order-2 sm:gap-0">
              <section className="flex flex-nowrap items-center gap-2 sm:mt-8">
                {dateTime && (
                  <>
                    <span>
                      <IconText
                        tone="outline"
                        size="sm"
                        radius="rounded"
                        density="tight"
                        typo="tag"
                        className="text-gray-500">
                        {formatDate(dateTime)}
                      </IconText>
                    </span>
                    <span>
                      <IconText
                        tone="outline"
                        size="sm"
                        radius="rounded"
                        density="tight"
                        typo="tag"
                        className="text-gray-500">
                        {formatTime(dateTime)}
                      </IconText>
                    </span>
                    <span>
                      {registrationEnd && (
                        <IconText
                          icon="alarm"
                          tone="topicSolid"
                          topic={topic}
                          size="sm"
                          radius="rounded"
                          density="tight"
                          typo="captionBold">
                          {formatDeadline(registrationEnd)}
                        </IconText>
                      )}
                    </span>
                  </>
                )}
              </section>

              <footer className="flex w-full items-center gap-3 sm:justify-between">
                <div className="flex w-full items-center gap-1 sm:max-w-[800px] md:max-w-[230px]">
                  <Icon name="person" size={18} />
                  <ProgressBar current={participantCount} max={safeCapacity} min={5} />
                  <span
                    className="label ml-2 text-[var(--color-purple-500)]"
                    aria-label={`현재 ${participantCount}명 참여, 정원 ${capacity}명`}>
                    {participantCount}/{capacity}
                  </span>
                </div>
                <Button
                  size="small"
                  variant="primary"
                  className="h-[44px] sm:ml-4"
                  disabled={loading || (isClosed && !isJoined)}
                  onClick={handleJoinClick}>
                  {!isAuthenticated ? '참여하기' : isJoined ? '참여취소' : '참여하기'}
                </Button>
              </footer>
            </div>
          </div>
        </article>
      </Link>
      <ConfirmModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        content="로그인 페이지로 이동할까요?"
        onConfirm={() => {
          setModalOpen(false);
          router.push('/login');
        }}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
}
