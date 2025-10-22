import 'client-only'; // Next.js의 클라이언트 컴포넌트에서만 사용됨을 명시 - SSR import 완전 차단

import Service from '../service';
import { SigninRequest, SignupRequest, SigninResponse, SignupResponse } from '@/types/auths';

class AnonAuthService extends Service {
  login(formData: SigninRequest) {
    return this.http.post<SigninResponse>('/auths/signin', formData);
  }

  join(formData: SignupRequest) {
    return this.http.post<SignupResponse>('/auths/signup', formData);
  }
}

const anonAuthService = new AnonAuthService();
export default anonAuthService;
