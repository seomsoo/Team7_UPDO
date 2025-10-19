'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import Icon from '@/components/ui/Icon';
import { IGathering } from '@/types/gatherings/models';
import Tag from '@/components/ui/Tag';
import IconText from '@/components/ui/IconText';
import { formatTime, formatDate, formatDeadline, isClosed as checkClosed } from '@/utils/date';
import { LocationToTag } from '@/utils/mapping';
import { TAG_OPTIONS } from '@/constants';
import { useState } from 'react';
import SaveButton from '@/components/ui/SaveButton';
import Link from 'next/link';
interface GroupCardProps {
  data: IGathering;
}

export default function GroupCard({ data }: GroupCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const onToggle = () => setIsSaved(prev => !prev);
  const { name, location, dateTime, registrationEnd, participantCount, capacity, image } = data;
  const isClosed = checkClosed(registrationEnd);
  const topic = LocationToTag(location) as 'growth' | 'learn' | 'challenge' | 'connect' | 'default';
  const safeCapacity = Math.max(1, capacity);
  const category = TAG_OPTIONS.find(option => option.value === topic)?.label ?? '';
  return (
    <Link
      href={`/gathering/${data.id}`}
      className="contents"
      role="link"
      aria-label={`${name} 상세 페이지로 이동`}>
      <article className="relative flex h-[346px] w-full max-w-[460px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all sm:h-[219px] sm:max-w-[696px] sm:flex-row sm:rounded-2xl sm:p-6 md:max-w-[640px]">
        <div className="relative h-[160px] w-full sm:h-[170px] sm:w-[170px] md:h-auto">
          {!image ? (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400 sm:rounded-xl"></div>
          ) : (
            <>
              <Image src={image} alt={name} fill className="object-cover sm:rounded-xl" />
              {isClosed && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 sm:rounded-xl">
                  <span className="bg-grad-500 bg-clip-text text-3xl leading-[1.1] font-bold text-transparent">
                    모집 마감
                  </span>
                </div>
              )}
            </>
          )}
        </div>
        <div className="absolute top-5 right-5">
          {isClosed ? (
            <div role="img" aria-label="모집 마감됨">
              <Icon name="save" size={48} />
            </div>
          ) : (
            <SaveButton isSaved={isSaved} onToggle={onToggle} size={48} />
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between p-4 sm:pt-4 sm:pl-4">
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
              <div className="flex w-full items-center gap-1 sm:max-w-[260px] md:max-w-[230px]">
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
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                }}>
                참여하기
              </Button>
            </footer>
          </div>
        </div>
      </article>
    </Link>
  );
}
