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

export class AuthService {
  private http = PolymorphicHttpClient.getInstance();

  signup(data: SignupRequest) {
    return this.http.post<SignupResponse>(`/auths/signup`, data);
  }

  signin(data: SigninRequest) {
    return this.http.post<SigninResponse>(`/auths/signin`, data);
  }

  signout() {
    return this.http.post<SignoutResponse>(`/auths/signout`);
  }

  getUser() {
    return this.http.get<GetUserResponse>(`/auths/user`);
  }

  updateUser(data: UpdateUserRequest) {
    const formData = new FormData();
    if (data.companyName) formData.append('companyName', data.companyName);
    if (data.image) formData.append('image', data.image);
    return this.http.put<UpdateUserResponse>(`/auths/user`, formData);
  }
}

export const authService = new AuthService();
