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
    <AuthLayout
      title="회원가입"
      bottomText="이미 계정이 있으신가요?"
      bottomLinkText="로그인"
      bottomLinkHref="/login">
      <SignupFormNext />
    </AuthLayout>
  );
}
