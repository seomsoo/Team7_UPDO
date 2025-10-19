import {
  SignupRequest,
  SignupResponse,
  SigninRequest,
  SigninResponse,
  SignoutResponse,
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@/types/auths';
import PolymorphicHttpClient from '../polymorphicHttpClient';

class AuthService {
  private http;

  constructor() {
    // ✅ SSR(빌드 타임)에서는 HttpClient를 생성하지 않음
    if (typeof window === 'undefined') {
      // 빌드 중이면, 더미 http 객체로 대체 (절대 호출되지 않음)
      this.http = {
        post: () => {
          throw new Error('API_BASE_URL is not configured (SSR build-time)');
        },
        get: () => {
          throw new Error('API_BASE_URL is not configured (SSR build-time)');
        },
        put: () => {
          throw new Error('API_BASE_URL is not configured (SSR build-time)');
        },
      };
    } else {
      // ✅ CSR 환경에서만 실제 HttpClient 생성
      this.http = PolymorphicHttpClient.getInstance();
    }
  }

  signup(data: SignupRequest) {
    return this.http.post<SignupResponse>('/auths/signup', data);
  }

  signin(data: SigninRequest) {
    return this.http.post<SigninResponse>('/auths/signin', data);
  }

  signout() {
    return this.http.post<SignoutResponse>('/auths/signout');
  }

  getUser() {
    return this.http.get<GetUserResponse>('/auths/user');
  }

  updateUser(data: UpdateUserRequest) {
    const formData = new FormData();
    if (data.companyName) formData.append('companyName', data.companyName);
    if (data.image) formData.append('image', data.image);
    return this.http.put<UpdateUserResponse>('/auths/user', formData);
  }
}

// ✅ 그대로 export 유지 (import 수정 불필요)
export const authService = new AuthService();
