'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import IconText from '@/components/ui/IconText';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface Participant {
  id: number;
  image: string;
}
interface Props {
  current: number;
  min: number;
  max: number;
  participants: Participant[];
  showConfirm?: boolean;
}

const GroupDetailParticipation = ({
  current,
  min,
  max,
  participants,
  showConfirm = true,
}: Props) => {
  const confirmed = current >= min;
  const last4 = participants.slice(-4);
  const remain = Math.max(0, current - 4);

  return (
    <section
      className={cn(
        'bg-purple-10 flex w-full flex-col gap-3 rounded-md px-5 pt-[14px] pb-5 shadow-sm sm:rounded-md sm:px-6 sm:py-5 sm:pt-5 sm:pb-[22px] md:rounded-2xl md:px-10 md:pt-7 md:pb-[34px] lg:mt-4 lg:rounded-2xl lg:pt-7 lg:pb-8',
      )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="typo-body-lg font-medium text-[var(--color-gray-800)]">
            <span className="typo-body-lg font-bold text-[var(--color-purple-600)]">{current}</span>
            명 참여
          </p>

          <div className="relative flex items-center overflow-visible">
            {last4.map((p, i) => (
              <div
                key={p.id}
                className={cn('relative shrink-0', i !== 0 && '-ml-[15px]')}
                style={{ zIndex: i }}>
                <Image
                  src={p.image}
                  alt="participant"
                  width={29}
                  height={29}
                  className="rounded-full border border-[var(--surface-card)] object-cover"
                />
              </div>
            ))}

            {remain > 0 && (
              <div className="caption-bold relative z-[5] -ml-[15px] flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-full bg-white font-medium text-[var(--color-gray-500)]">
                +{remain}
              </div>
            )}
          </div>
        </div>

        {showConfirm && confirmed && (
          <IconText
            icon="check"
            size="sm"
            density="tight"
            iconPosition="leading"
            className="typo-body-bold text-[var(--color-purple-600)]">
            개설확정
          </IconText>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs text-[var(--color-gray-500)]">
          <span>최소 {min}명</span>
          <span>최대 {max}명</span>
        </div>

        <ProgressBar current={current} max={max} min={min} height="6px" />
      </div>
    </section>
  );
};

export default GroupDetailParticipation;
