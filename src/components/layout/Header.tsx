'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import Badge from '@/components/ui/Badge';

interface HeaderProps {
  user?: {
    id: number;
    name: string;
    image?: string;
  };
  favoriteCount?: number;
  className?: string;
}

interface NavItem {
  label: string;
  href: string;
  hasBadge?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: '모임 찾기', href: '/gathering' },
  { label: '찜한 모임', href: '/favorites', hasBadge: true },
  { label: '모든 리뷰', href: '/allreviews' },
];

export default function Header({ user, favoriteCount = 0, className }: HeaderProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/gathering') {
      return pathname === '/' || pathname === '/gathering';
    }
    return pathname?.startsWith(href);
  };

  return (
    <header
      className={cn('layout-container sticky top-0 z-50 m-auto w-full px-4 md:px-6', className)}>
      <div className="flex items-center justify-between py-2 md:py-4">
        {/* Left Group: Logo + Navigation */}
        <div className="flex items-center md:gap-8 lg:gap-10">
          {/* Logo */}
          <Link
            href="/"
            className="relative h-[44px] w-[50px] md:h-[50px] md:w-[57px] lg:h-[70px] lg:w-[80px]">
            <Image
              src="/images/header_logo.png"
              alt="UPDO"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center md:gap-4 lg:gap-6" role="navigation">
            {NAV_ITEMS.map(item => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative inline-flex items-center transition-colors',
                    'px-2 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2',
                    'typo-xs md:typo-base md:tracking-[-0.48px]',
                    active
                      ? 'font-semibold text-[var(--color-purple-600)] md:font-bold'
                      : 'font-medium text-[var(--color-gray-500)] hover:text-[var(--color-purple-450)]',
                  )}>
                  <span className="inline-flex flex-shrink-0 items-center gap-1 whitespace-nowrap md:gap-2 lg:gap-2">
                    {item.label}
                    {item.hasBadge && favoriteCount > 0 && (
                      <Badge value={favoriteCount} size="responsive" />
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Profile(MyPage) */}
        <Link
          href="/mypage"
          className="flex-shrink-0 overflow-hidden rounded-full transition-opacity hover:opacity-80">
          <Image
            src={user?.image || '/images/profile.png'}
            alt={user?.name || '프로필'}
            width={54}
            height={54}
            className="mx-[1px] h-[34px] w-[34px] object-cover md:mx-[5px] md:h-[54px] md:w-[54px]"
          />
        </Link>
      </div>
    </header>
  );
}
