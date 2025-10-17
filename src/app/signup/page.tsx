// -----------------------------------------------------------------------------
// NOTE: 회원가입 페이지 (자동 로그인 포함 버전)
//       - 회원가입 성공 시: signin()을 자동 호출해 토큰 저장
//       - 로그인 상태는 useAuthStore로 관리
//       - 이후 홈('/')으로 이동
// -----------------------------------------------------------------------------

// 회원가입 → 자동 로그인 → 홈(/) 이동

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from '@/components/feature/auth/SignupForm';
import { authService } from '@/services/auths/AuthService';
import { useAuthStore } from '@/stores/useAuthStore';

export default function SignupPage() {
  const router = useRouter();

  // ✅ 회원가입 성공 시 자동 로그인 처리
  const handleSignupSuccess = async (formData?: { email: string; password: string }) => {
    try {
      // 1️⃣ 회원가입 직후 같은 자격으로 로그인 시도
      if (formData?.email && formData?.password) {
        const res = await authService.signin({
          email: formData.email,
          password: formData.password,
        });

        // 2️⃣ 토큰 저장 (1시간 유효)
        useAuthStore.getState().setToken(res.token, 60 * 60 * 1000);
      }

      // 3️⃣ 홈 화면으로 이동
      alert('🎉 회원가입 및 로그인 완료!');
      router.push('/');
    } catch {
      alert('회원가입은 완료되었으나 자동 로그인에 실패했습니다.');
      router.push('/login');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <section className="flex w-full max-w-[420px] flex-col items-center rounded-xl bg-white p-8 shadow-md">
        {/* 페이지 제목 */}
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">회원가입</h1>

        {/* SignupForm에서 입력값을 받아 자동 로그인 처리 */}
        <SignupForm
          onSignupSuccess={formValues =>
            handleSignupSuccess({
              email: formValues?.email ?? '',
              password: formValues?.password ?? '',
            })
          }
        />

        {/* 로그인 안내 */}
        <p className="mt-6 text-sm text-gray-600">
          이미 계정이 있으신가요?{' '}
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="text-primary-600 hover:underline">
            로그인
          </button>
        </p>
      </section>
    </main>
  );
}
