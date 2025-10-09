// src/types/auths/signup.ts

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  companyName: string;
}

export interface SignupResponse {
  message: string;
}
