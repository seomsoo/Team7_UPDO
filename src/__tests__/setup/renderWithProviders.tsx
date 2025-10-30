// layout.tsx의 QueryProvider, AuthProvider를 테스트코드에서도 사용하기 위한 Provider 제공
//  => 테스트용 QueryClient, Zustand

import { render } from '@testing-library/react';
import AuthProvider from '@/app/AuthProvider';
import QueryProvider from '@/components/providers/QueryProvider';

export function renderWithProviders(ui: React.ReactNode) {
  return render(
    <QueryProvider>
      <AuthProvider>{ui}</AuthProvider>
    </QueryProvider>,
  );
}
