// src/types/gatherings/models.ts

import { GatheringType, GatheringLocation } from '@/types/common';

export interface IGathering {
  teamId: string; // API 요청용
  id: number;
  type: GatheringType; // 달램핏/워케이션
  name: string; // 모임 이름
  dateTime: string;
  registrationEnd?: string;
  location: GatheringLocation;
  participantCount: number;
  capacity: number;
  image?: string;
  createdBy: number;
  canceledAt?: string;
}

export interface IParticipant {
  teamId: string;
  userId: number;
  gatheringId: number;
  joinedAt: string;
  User: {
    id: number;
    email: string;
    name: string;
    companyName: string;
    image?: string;
  };
}
