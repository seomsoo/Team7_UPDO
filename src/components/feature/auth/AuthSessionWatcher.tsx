// -----------------------------------------------------------------------------
// NOTE: 전역 세션 워처 컴포넌트
//       - 앱 상단(예: src/app/layout.tsx)에서 한 번만 장착하면
//         토큰 만료 시 자동으로 로그아웃을 트리거한다.
//       - onExpired 콜백에서 /login으로 리다이렉트 등의 후속 처리 가능
// -----------------------------------------------------------------------------

'use client';

// import React from 'react';
import { useRouter } from 'next/navigation';
import { useTokenExpiryEffect } from '@/hooks/useTokenExpiryEffect';

export default function AuthSessionWatcher() {
  const router = useRouter();

  // 만료 시 → 로그인 페이지로 이동
  useTokenExpiryEffect(() => {
    console.log('[AuthSessionWatcher] 토큰 만료됨 → /login 으로 이동');
    router.replace('/login');
  });

  return null; // UI 렌더링은 없음
}

// -----------------------------------------------------------------------------
// 사용법: 전역 세션 워처 컴포넌트
// 장착 위치 예시
// src/app/layout.tsx 내부 최상단 레벨(예: <body> 안)에
// <AuthSessionWatcher />를 한줄 추가하면 끝입니다.
// -----------------------------------------------------------------------------
// src/app/layout.tsx (일부 예시)
// <body>
//   {/*전역 세션 워처: 만료 자동 로그아웃*/}
//   <AuthSessionWatcher />
//   {children}
// </body>
