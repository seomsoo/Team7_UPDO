// -----------------------------------------------------------------------------
// TEST: LoginForm.test.tsx
// TARGET: RHF + Zod 유효성 검증 + 로그인 → JWT 저장 → 토스트 → 라우팅
// -----------------------------------------------------------------------------

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '@/components/feature/auth/LoginForm';
import { authService } from '@/services/auths/authService';

// ✅ Mock 설정
const mockReplace = jest.fn();
const mockShowToast = jest.fn();
const mockSetToken = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
}));
jest.mock('@/components/ui/Toast', () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));
jest.mock('@/stores/useAuthStore', () => ({
  useAuthStore: jest.fn(() => ({ setToken: mockSetToken })),
}));
jest.mock('@/services/auths/authService', () => ({
  authService: {
    signin: jest.fn(),
  },
}));

describe('🧩 LoginForm — 폼 유효성 검증', () => {
  afterEach(() => jest.clearAllMocks());

  test('이메일과 비밀번호가 비어 있으면 에러 메시지가 표시된다', async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() =>
      expect(screen.getAllByText(/입력해주세요|입력 가능합니다|이상 입력/i).length).toBeGreaterThan(
        0,
      ),
    );
  });

  test('잘못된 이메일 형식이면 에러 메시지가 표시된다', async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'abcd1234' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => expect(screen.getByText(/유효한 이메일 주소를 입력/i)).toBeInTheDocument());
  });

  test('비밀번호에 동일 문자가 3번 이상 연속되면 에러 메시지가 표시된다', async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'repeat@test.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'aaabbb1234' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    // 에러 메시지 출력 확인 (Zod 스키마의 메시지와 일치해야 함)
    await waitFor(() => {
      expect(screen.getByText(/같은 문자가 3회 이상 반복될 수 없습니다./i)).toBeInTheDocument();
    });
  });
});

describe('🧩 LoginForm — 서버 상호작용 시나리오', () => {
  afterEach(() => jest.clearAllMocks());

  test('로그인 성공 시 토큰 저장, 토스트 표시, 홈으로 이동한다', async () => {
    (authService.signin as jest.Mock).mockResolvedValueOnce({ token: 'mocked-jwt' });

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'abcd1234' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => {
      expect(authService.signin).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'abcd1234',
      });
      expect(mockSetToken).toHaveBeenCalledWith('mocked-jwt');
      expect(mockShowToast).toHaveBeenCalledWith('로그인에 성공하였습니다. 환영합니다!', 'success');
      expect(mockReplace).toHaveBeenCalledWith('/');
    });
  });

  test('존재하지 않는 이메일이면 해당 필드에 에러 메시지가 표시된다', async () => {
    (authService.signin as jest.Mock).mockRejectedValueOnce({
      parameter: 'email',
      message: '존재하지 않는 이메일입니다.',
    });

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'ghost@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'abcd1234' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() =>
      expect(screen.getByText('존재하지 않는 이메일입니다.')).toBeInTheDocument(),
    );
  });

  test('비밀번호가 틀리면 비밀번호 필드 하단에 에러 메시지가 표시된다', async () => {
    (authService.signin as jest.Mock).mockRejectedValueOnce({
      parameter: 'password',
      message: '비밀번호가 일치하지 않습니다.',
    });

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() =>
      expect(screen.getByText(/비밀번호|입력값이 올바르지 않습니다/i)).toBeInTheDocument(),
    );
  });

  test.skip('서버 오류 발생 시 전역 오류 메시지가 표시된다', async () => {
    (authService.signin as jest.Mock).mockRejectedValueOnce({
      message: '서버 오류가 발생했습니다.',
    });

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'error@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'abcd1234' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => expect(screen.getByText(/서버 오류가 발생했습니다/i)).toBeInTheDocument());
  });
});
