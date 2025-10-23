// -----------------------------------------------------------------------------
// TEST: SignupForm.test.tsx
// TARGET: RHF + Zod 폼 검증 + 회원가입 → 로그인 → 토큰저장 → 리다이렉트
// -----------------------------------------------------------------------------

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from '@/components/feature/auth/SignupForm';
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
    signup: jest.fn(),
    signin: jest.fn(),
  },
}));

describe('🧩 SignupForm — 기본 폼 검증 (유효성 검사)', () => {
  afterEach(() => jest.clearAllMocks());

  test('필수 입력 누락 시 에러 메시지가 표시된다', async () => {
    render(<SignupForm />);
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    await waitFor(() => {
      expect(screen.getAllByText(/입력해주세요|입력 가능합니다|이상 입력/i).length).toBeGreaterThan(
        0,
      );
    });
  });

  test('비밀번호가 일치하지 않으면 에러 메시지가 표시된다', async () => {
    render(<SignupForm />);
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'abcd1234' } });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), { target: { value: 'abcd9999' } });
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    await waitFor(() =>
      expect(screen.getByText(/비밀번호가 일치하지 않습니다/i)).toBeInTheDocument(),
    );
  });

  test('이메일 형식이 잘못되면 에러 메시지가 표시된다', async () => {
    render(<SignupForm />);
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'wrong-email' } });
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    await waitFor(() => expect(screen.getByText(/유효한 이메일 주소를 입력/i)).toBeInTheDocument());
  });

  test('비밀번호에 동일 문자가 3번 이상 연속되면 에러 메시지가 표시된다', async () => {
    render(<SignupForm />);

    // 동일 문자가 3번 이상 포함된 비밀번호 입력
    fireEvent.change(screen.getByLabelText('이름'), { target: { value: '홍길동' } });
    fireEvent.change(screen.getByLabelText('직업'), { target: { value: '테스트회사' } });
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'repeat@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'aaabbb1234' } });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), { target: { value: 'aaabbb1234' } });
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    // Zod 스키마의 오류 메시지 문구에 맞게 검증
    await waitFor(() => {
      expect(screen.getByText(/같은 문자가 3회 이상 반복될 수 없습니다./i)).toBeInTheDocument();
    });
  });
});

describe('🧩 SignupForm — 서버 통합 시나리오', () => {
  afterEach(() => jest.clearAllMocks());

  test('회원가입 성공 시 자동 로그인, 토큰 저장, 홈 이동', async () => {
    (authService.signup as jest.Mock).mockResolvedValueOnce({ message: 'ok' });
    (authService.signin as jest.Mock).mockResolvedValueOnce({ token: 'mocked-jwt' });

    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText('이름'), { target: { value: '홍길동' } });
    fireEvent.change(screen.getByLabelText('직업'), { target: { value: '달램컴퍼니' } });
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'abcd1234' } });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), { target: { value: 'abcd1234' } });
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    await waitFor(() => {
      expect(authService.signup).toHaveBeenCalledTimes(1);
      expect(authService.signin).toHaveBeenCalledTimes(1);
      expect(mockSetToken).toHaveBeenCalledWith('mocked-jwt');
      expect(mockShowToast).toHaveBeenCalledWith(
        'UPDO의 회원이 되신 것을 환영합니다! 자동으로 로그인 되었습니다.',
        'success',
      );
      expect(mockReplace).toHaveBeenCalledWith('/');
    });
  });

  test('이메일이 중복되면 해당 필드에 에러 메시지가 표시된다', async () => {
    (authService.signup as jest.Mock).mockRejectedValueOnce({
      parameter: 'email',
      message: '이미 사용 중인 이메일입니다.',
    });

    render(<SignupForm />);
    fireEvent.change(screen.getByLabelText('이름'), { target: { value: '홍길동' } });
    fireEvent.change(screen.getByLabelText('직업'), { target: { value: '테스트회사' } });
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'dup@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'abcd1234' } });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), { target: { value: 'abcd1234' } });
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    await waitFor(() =>
      expect(screen.getByText('이미 사용 중인 이메일입니다.')).toBeInTheDocument(),
    );
  });

  test('서버 오류 발생 시 일반 에러 메시지가 필드 하단에 표시된다', async () => {
    (authService.signup as jest.Mock).mockRejectedValueOnce({
      message: '서버 오류가 발생했습니다.',
    });

    render(<SignupForm />);
    fireEvent.change(screen.getByLabelText('이름'), { target: { value: '홍길동' } });
    fireEvent.change(screen.getByLabelText('직업'), { target: { value: '달램' } });
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'error@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'abcd1234' } });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), { target: { value: 'abcd1234' } });
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    await waitFor(() =>
      expect(
        screen.getByText(/회원가입에 실패했습니다|서버 오류가 발생했습니다/i),
      ).toBeInTheDocument(),
    );
  });
});
