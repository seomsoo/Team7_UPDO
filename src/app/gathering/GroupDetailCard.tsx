'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import IconText from '@/components/ui/IconText';
import Tag from '@/components/ui/Tag';
import SaveButton from '@/components/ui/SaveButton';
import Icon from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

type Topic = 'growth' | 'learn' | 'challenge' | 'connect' | 'default';

interface HeaderData {
  id: number;
  name: string;
  topic: Topic;
  deadlineText: string;
  dateText: string;
  timeText: string;
}

interface GroupDetailHeaderProps {
  data: HeaderData;
  isHost?: boolean;
}

export default function GroupDetailHeader({ data, isHost = false }: GroupDetailHeaderProps) {
  const { name, deadlineText, dateText, timeText, topic } = data;
  const [isSaved, setIsSaved] = useState(false);

  return (
    <section
      className={cn(
        'bg-surface isolate flex flex-col gap-6 rounded-md p-5 shadow-md sm:rounded-md md:rounded-2xl md:p-10 lg:p-10',
      )}>
      <div className="flex items-start justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <IconText
            icon="alarm"
            size="sm"
            density="tight"
            radius="rounded"
            tone="topicSoft"
            typo="tag"
            className="pr-2 pl-1">
            {deadlineText}
          </IconText>
          <IconText
            tone="outline"
            size="sm"
            density="tight"
            radius="rounded"
            typo="tag"
            className="text-gray-500">
            {dateText}
          </IconText>
          <IconText
            tone="outline"
            size="sm"
            density="tight"
            radius="rounded"
            typo="tag"
            className="text-gray-500">
            {timeText}
          </IconText>
        </div>
        {isHost && (
          <div className="text-[var(--color-purple-600)]">
            <Icon name="crown" size={32} />
          </div>
        )}
      </div>

      {/* 타이틀 + 태그 */}
      <div>
        <h1 className="typo-title text-[var(--color-gray-900)]">{name}</h1>
        <div className="mt-3">
          <Tag label={`${topic === 'growth' ? '성장' : topic}`} topic={topic} />
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex w-full items-center justify-between gap-4 sm:gap-2 md:gap-4">
        {/* 왼쪽: 찜 버튼 */}

        <SaveButton
          isSaved={isSaved}
          onToggle={() => setIsSaved(s => !s)}
          ariaLabel="찜하기"
          size="responsive"
        />

        {/* 오른쪽: 버튼 그룹 */}
        <div className="flex flex-1 items-center gap-2 sm:gap-3">
          {isHost ? (
            <>
              <Button
                variant="secondary"
                size="responsive_full"
                className="typo-xl h-10 rounded-md border border-gray-400 font-medium sm:h-12 sm:rounded-md md:h-15 md:rounded-xl">
                삭제하기
              </Button>
              <Button
                variant="primary"
                size="responsive_full"
                className="typo-xl h-10 rounded-md font-bold sm:h-12 sm:rounded-md md:h-15 md:rounded-xl">
                공유하기
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              size="responsive_full"
              className="typo-xl h-10 rounded-md font-bold sm:h-12 sm:rounded-md md:h-15 md:rounded-xl">
              참여하기
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
