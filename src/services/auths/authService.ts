import 'client-only'; // Next.js의 클라이언트 컴포넌트에서만 사용됨을 명시 - SSR import 완전 차단

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
import HttpClient from '../httpClient';

class AuthService {
  private http = HttpClient.getInstance();

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
