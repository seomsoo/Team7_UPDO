// -----------------------------------------------------------------------------
// NOTE: Next.js 환경 전용 로그인 폼 래퍼 컴포넌트
//       - router.replace('/') 라우팅 동작을 수행
//       - 실제 로그인 폼(LoginForm.tsx)은 Router 미의존 구조로 Storybook에서도 작동
//       - 향후 페이지 개발 시 '/mypage'나 '/dashboard'로 손쉽게 경로 변경 가능
// -----------------------------------------------------------------------------

'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // ✅ App Router 훅
import LoginForm from './LoginForm';

export default function LoginFormNext() {
  // ---------------------------------------------------------------------------
  // Next.js 라우터 인스턴스
  // ---------------------------------------------------------------------------
  const router = useRouter();

  // ---------------------------------------------------------------------------
  // 로그인 성공 시 콜백 (라우팅 담당)
  // ---------------------------------------------------------------------------
  const handleLoginSuccess = React.useCallback(() => {
    console.log('[LoginFormNext] 로그인 성공 → (임시) 홈(/)으로 이동합니다.');
    router.replace('/'); // ✅ 추후 '/mypage' 또는 '/dashboard'로 변경 가능
  }, [router]);

  // ---------------------------------------------------------------------------
  // 렌더링: 본체(LoginForm)에 콜백만 주입
  // ---------------------------------------------------------------------------
  return (
    <div className="flex w-full justify-center py-10">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}
