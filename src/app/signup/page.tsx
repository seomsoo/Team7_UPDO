'use client';
export const dynamic = 'force-dynamic';

import AuthLayout from '@/components/layout/auth/AuthLayout';
import SignupForm from '@/components/feature/auth/SignupForm';

export default function SignupPage() {
  return (
    <AuthLayout
      title="회원가입"
      bottomText="이미 계정이 있으신가요?"
      bottomLinkText="로그인"
      bottomLinkHref="/login">
      <SignupForm />
    </AuthLayout>
  );
}
