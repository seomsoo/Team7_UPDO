'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/stores/useAuthStore';

interface HeaderProfileProps {
  user?: {
    id: number;
    name: string;
    image?: string;
  };
}

export default function HeaderProfile({ user }: HeaderProfileProps) {
  const { isAuthenticated, checkTokenValidity } = useAuthStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    checkTokenValidity();
    setMounted(true);
  }, [checkTokenValidity]);
  if (!mounted) return null;

  return (
    <Link
      href={isAuthenticated ? '/mypage' : '/login'}
      className="flex-shrink-0 overflow-hidden rounded-full transition-opacity hover:opacity-80">
      <Image
        src={user?.image || '/images/profile.png'}
        alt={user?.name || '프로필'}
        width={54}
        height={54}
        sizes="54px"
        className="mx-[1px] h-[34px] w-[34px] object-cover md:mx-[5px] md:h-[54px] md:w-[54px]"
      />
    </Link>
  );
}
