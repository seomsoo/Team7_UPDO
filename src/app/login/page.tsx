'use client';

export const dynamic = 'force-dynamic'; // ✅ 빌드 시 SSR 프리렌더링 비활성화

import React from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/feature/auth/LoginForm';

export default function LoginPage() {
  const router = useRouter();

  // ✅ 로그인 성공 시 실행되는 콜백
  const handleLoginSuccess = () => {
    // 로그인 성공 시 홈으로 이동하거나 대시보드 등으로 리디렉션 가능
    alert('로그인 성공!');
    router.push('/');
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="flex w-full max-w-[420px] flex-col items-center rounded-xl bg-white p-8 shadow-md">
        {/* 페이지 제목 */}
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">로그인</h1>

        {/* 로그인 폼 */}
        <LoginForm onLoginSuccess={handleLoginSuccess} />

        {/* 회원가입 안내 문구 */}
        <p className="mt-6 text-sm text-gray-600">
          아직 계정이 없으신가요?{' '}
          <button
            type="button"
            onClick={() => router.push('/signup')}
            className="text-primary-600 hover:underline">
            회원가입
          </button>
        </p>
      </section>
    </main>
  );
}
