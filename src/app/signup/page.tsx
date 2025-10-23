// -----------------------------------------------------------------------------
// NOTE: 회원가입 페이지 (AuthLayout 적용)
//       - SignupForm.tsx 불러와서 AuthLayout 내 children으로 주입
// -----------------------------------------------------------------------------

'use client';
export const dynamic = 'force-dynamic';

import AuthLayout from '@/components/layout/auth/AuthLayout';
import SignupFormNext from '@/components/feature/auth/SignupForm.Next';

export default function SignupPage() {
  return (
<<<<<<< HEAD
    <main className="flex min-h-screen items-center justify-center px-4">
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
=======
    <AuthLayout
      title="회원가입"
      bottomText="이미 계정이 있으신가요?"
      bottomLinkText="로그인"
      bottomLinkHref="/login">
      <SignupFormNext />
    </AuthLayout>
>>>>>>> fba4ffb ([FEAT] #124 complete signin and signup page UI work)
  );
}
