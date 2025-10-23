'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Icon from '@/components/ui/Icon';
import Tab, { TabItem } from '@/components/ui/Tab';
import { ConfirmModal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';

import UserProfileCard from '@/components/feature/auth/UserProfileCard';

import { useAuthStore } from '@/stores/useAuthStore';
import { authService } from '@/services/auths/authService';
import { IUser } from '@/types/auths';
import { IJoinedGathering } from '@/types/gatherings';
import EditProfileModal from '@/components/feature/profile/EditProfileModal';

const MYPAGETABS: (TabItem & { emptyMsg: string })[] = [
  {
    value: 'myMeetings',
    label: '나의 모임',
    content: <div>나의 모임</div>,
    emptyMsg: '아직 가입한 모임이 없어요.',
  },
  {
    value: 'myReviews',
    label: '나의 리뷰',
    content: <div>나의 리뷰</div>,
    emptyMsg: '아직 참여한 모임이 없어요.',
  },
  {
    value: 'created',
    label: '내가 만든 모임',
    content: <div>내가 만든 모임</div>,
    emptyMsg: '아직 생성한 모임이 없어요.',
  },
];

const TAB_EMPTY_MSG: Record<string, string> = Object.fromEntries(
  MYPAGETABS.map(t => [t.value, t.emptyMsg]),
);

export default function MyPage() {
  const { token, checkTokenValidity, logout } = useAuthStore();

  const router = useRouter();
  const toast = useToast();

  const [selectedTab, setSelectedTab] = useState('myMeetings');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [userGatherings, setUserGatherings] = useState<IJoinedGathering[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlerLogout = () => {
    try {
      logout();
      toast.showToast('로그아웃에 성공하였습니다.', 'success');
      setIsLogoutModalOpen(false);
      router.push('/');
    } catch (e) {
      console.error(e);
      toast.showToast('로그아웃에 실패하였습니다. 잠시 후 다시 시도해주세요.', 'error');
    }
  };

  // 사용자 정보 가져오기
  useEffect(() => {
    const valid = checkTokenValidity();
    if (!valid) {
      setUser(null);
      return;
    }

    async function fetchUser() {
      setLoading(true);
      setError(null);
      try {
        const res = await authService.getUser();
        setUser(res as IUser);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else if (typeof e === 'object' && e !== null && 'status' in e) {
          const err = e as { status?: number; message?: string };
          if (err.status === 401) logout();
          setError(err.message ?? '사용자 정보를 불러오지 못했어요.');
        } else {
          setError('사용자 정보를 불러오지 못했어요.');
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [token, checkTokenValidity, logout]);

  // 사용자의 모임 가져오기
  useEffect(() => {
    // const payload = {};
    setUserGatherings(null);
  }, [user]);

  return (
    <>
      {isLogoutModalOpen && (
        <ConfirmModal
          open={isLogoutModalOpen}
          onOpenChange={setIsLogoutModalOpen}
          content="로그아웃 하시겠습니까?"
          onConfirm={handlerLogout}
        />
      )}

      {isEditProfileModalOpen && user && (
        <EditProfileModal
          user={user}
          open={isEditProfileModalOpen}
          onOpenChange={setIsEditProfileModalOpen}
          onSaved={next => {
            setUser(prev => (prev ? ({ ...prev, ...next } as IUser) : prev));
          }}
        />
      )}

      <div className="mt-10 flex h-full w-full flex-col gap-6 md:flex-row md:gap-15">
        {/* 좌측(PC) 겸 상단(태블릿, 모바일) */}
        <div className="shrink-0 flex-col md:min-w-[282px]">
          <div className="mb-2 flex w-full items-center justify-between sm:mb-6 md:mb-11">
            <span className="typo-body-bold sm:h3Semibold text-gray-900">마이페이지</span>
            <button
              className="cursor-pointer"
              onClick={() => {
                setIsLogoutModalOpen(true);
              }}>
              <Icon name="logout" size={24} />
            </button>
          </div>
          <div>
            {loading && <div className="text-gray-500">내 정보를 불러오는 중…</div>}
            {error && !loading && <div className="text-red-600">{error}</div>}
            {!loading && !error && user && (
              <UserProfileCard
                key={`${user.image ?? ''}-${user.companyName ?? ''}`}
                onOpenChange={setIsEditProfileModalOpen}
                user={user}
              />
            )}
          </div>
        </div>

        {/* 우측(PC) 겸 하단(태블릿, 모바일) */}
        <div className="flex min-h-0 w-full flex-1 flex-col">
          <Tab items={MYPAGETABS} value={selectedTab} onChange={setSelectedTab} />
          {userGatherings && userGatherings.length > 0 ? (
            // 데이터가 있으면, CardList
            <div></div>
          ) : (
            // 데이터가 없으면, 빈화면
            <div className="flex min-h-100 flex-col items-center justify-center">
              <Image src="/images/empty.png" alt="모임 빈화면 이미지" width={171} height={115} />
              <span className="card-title text-gray-400">{TAB_EMPTY_MSG[selectedTab]}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
