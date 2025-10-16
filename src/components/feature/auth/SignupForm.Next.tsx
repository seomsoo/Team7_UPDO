// -----------------------------------------------------------------------------
// NOTE: Next.js 환경 전용 얇은 래퍼 컴포넌트
//       - 실제 라우팅 로직(useRouter().replace('/login'))은 여기에서만 수행
//       - 본체(SignupForm)는 라우터에 직접 의존하지 않고 onSignupSuccess 콜백을 통해 주입받음
//       - 장점:
//         1) Storybook(Vite)에서 Next Router 없이도 안전하게 동작
//         2) 실제 앱에서는 기존 UX 유지(성공 시 /login으로 이동)
// -----------------------------------------------------------------------------

'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Next.js App Router 훅
import SignupForm from './SignupForm';

export default function SignupFormNext() {
  // Next.js의 App Router 인스턴스
  const router = useRouter();

  // 성공 시 라우팅을 수행하는 콜백
  const handleSignupSuccess = React.useCallback(() => {
    // 기존 요구사항: 회원가입 성공 → 로그인 페이지로 이동
    router.replace('/login');
  }, [router]);

  return (
    // 라우팅 동작을 콜백으로 주입 → 본체는 Router 미의존
    <SignupForm onSignupSuccess={handleSignupSuccess} />
  );
}
