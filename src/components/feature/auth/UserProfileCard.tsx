'use client';
import { useState } from 'react';
import Image from 'next/image';

import { IUser } from '@/types/auths';
import { cn } from '@/utils/cn';
import Icon from '@/components/ui/Icon';

interface UserProfileCardProps {
  user: IUser;
  onEdit?: () => void;
  onOpenChange: (value: boolean) => void;
}

export default function UserProfileCard({ user, onEdit, onOpenChange }: UserProfileCardProps) {
  const { email, name, image, companyName } = user;

  // default avatar in /public
  const DEFAULT_AVATAR_SRC = '/images/avatar-default.png';
  const [avatarSrc, setAvatarSrc] = useState<string>(image ?? DEFAULT_AVATAR_SRC);

  const cardPadding = 'py-6 px-4 sm:px-6 sm:py-8 md:pt-5 md:px-6 md:pb-10';
  const backgroundBorder = 'bg-grad-100-v border border-purple-100';
  const responsiveMargin = 'mr-7 mb-0 md:mr-0 md:mb-7';
  const responsiveHr =
    'border-l-[1px] md:border-t-[1px] md:border-l-0 md:pt-8 md:pl-0 sm:pl-8 pl-4';

  return (
    <div
      className={cn(
        'relative flex w-full rounded-2xl shadow-xl sm:rounded-3xl md:flex-col',
        cardPadding,
        backgroundBorder,
      )}>
      {/* 프로필 수정 버튼 */}
      <button
        className="absolute top-6 right-3 cursor-pointer sm:top-8 md:top-auto"
        aria-label="프로필 수정"
        onClick={() => onOpenChange(true)}
        type="button">
        <Icon name="edit" />
      </button>

      {/* 이미지, 이름 */}
      <div
        className={cn(
          'flex flex-row items-center gap-3 md:mt-12 md:flex-col md:gap-5',
          responsiveMargin,
        )}>
        <Image
          src={avatarSrc}
          alt={`${name ?? '사용자'} 프로필 이미지`}
          width={112}
          height={112}
          className="h-10 w-10 rounded-full object-cover shadow ring-2 ring-gray-100 sm:h-11 sm:w-11 md:h-28 md:w-28"
          onError={() => setAvatarSrc(DEFAULT_AVATAR_SRC)}
          priority
        />
        <div className="label sm:card-title text-center text-gray-900">{name}</div>
      </div>

      {/* 직업, 이메일 */}
      <div
        className={cn(
          'typo-body-sm sm:typo-body grid grid-cols-[auto,1fr] items-center gap-x-4 gap-y-3 border-black/10',
          responsiveHr,
        )}>
        <div className="flex gap-5">
          <div className="text-gray-500">직업</div>
          <div className="text-gray-700">{companyName}</div>
        </div>

        <div className="flex min-w-0 gap-2">
          <div className="shrink-0 text-gray-500">이메일</div>
          <div className="truncate text-gray-700">{email}</div>
        </div>
      </div>
    </div>
  );
}
