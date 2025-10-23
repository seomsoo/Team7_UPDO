'use client';
export const dynamic = 'force-dynamic';

import AuthLayout from '@/components/layout/auth/AuthLayout';
import LoginForm from '@/components/feature/auth/LoginForm';

export default function LoginPage() {
  return (
<<<<<<< HEAD
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
=======
    <AuthLayout
      title="로그인"
      bottomText="계정이 없으신가요?"
      bottomLinkText="회원가입"
      bottomLinkHref="/signup">
      <LoginForm />
    </AuthLayout>
>>>>>>> fba4ffb ([FEAT] #124 complete signin and signup page UI work)
  );
}
