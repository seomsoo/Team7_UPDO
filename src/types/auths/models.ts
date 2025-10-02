// src/types/auths/models.ts

export interface IUser {
  teamId: string;
  id: number;
  email: string;
  name: string;
  companyName: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
