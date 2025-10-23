'use client';
export const dynamic = 'force-dynamic';

import AuthLayout from '@/components/layout/auth/AuthLayout';
import LoginForm from '@/components/feature/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout
      title="로그인"
      bottomText="계정이 없으신가요?"
      bottomLinkText="회원가입"
      bottomLinkHref="/signup">
      <LoginForm />
    </AuthLayout>
  );
}
