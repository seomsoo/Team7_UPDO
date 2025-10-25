'use client';

<<<<<<< HEAD
import { useEffect, useState } from 'react';
=======
import { useState } from 'react';
>>>>>>> aa1484a (✨ [FEAT] #160 CreateGatheringButton 컴포넌트 추가 및 모임 생성 기능 구현)
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { IconButton } from '@/components/ui/IconButton';
import CreateGroupModal from '@/components/feature/group/CreateGroupModal';
import { ConfirmModal } from '@/components/ui/Modal';

export default function CreateGatheringButton() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
<<<<<<< HEAD
  const [isScrolled, setIsScrolled] = useState(false);
=======
>>>>>>> aa1484a (✨ [FEAT] #160 CreateGatheringButton 컴포넌트 추가 및 모임 생성 기능 구현)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

<<<<<<< HEAD
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 120);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

=======
>>>>>>> aa1484a (✨ [FEAT] #160 CreateGatheringButton 컴포넌트 추가 및 모임 생성 기능 구현)
  const handleClick = () => {
    if (isAuthenticated) {
      setIsCreateModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <IconButton
        label="모임 만들기"
        className={`fixed right-8 bottom-16 shadow-lg transition-opacity duration-300 md:right-24 lg:right-32 ${
          isScrolled ? 'opacity-55 hover:opacity-100' : 'opacity-100'
        }`}
        onClick={handleClick}
      />
      <CreateGroupModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
      <ConfirmModal
        open={isLoginModalOpen}
        onOpenChange={setIsLoginModalOpen}
        content="로그인 페이지로 이동할까요?"
        onConfirm={() => {
          setIsLoginModalOpen(false);
          router.push('/login');
        }}
      />
    </>
  );
}
