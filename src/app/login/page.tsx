// -----------------------------------------------------------------------------
// NOTE: 로그인 페이지 (AuthLayout 적용)
//       - LoginForm.tsx 불러와서 AuthLayout 내 children으로 주입
// -----------------------------------------------------------------------------

'use client';
export const dynamic = 'force-dynamic';

import AuthLayout from '@/components/layout/auth/AuthLayout';
import LoginFormNext from '@/components/feature/auth/LoginForm.Next';

export default function LoginPage() {
  return (
    <AuthLayout
      title="로그인"
      bottomText="계정이 없으신가요?"
      bottomLinkText="회원가입"
      bottomLinkHref="/signup">
      <LoginFormNext />
    </AuthLayout>
  );
}
