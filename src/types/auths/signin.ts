// src/types/auths/signin.ts

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SigninResponse {
  token: string;
}
