// src/types/gatherings/models.ts

import { GatheringType, GatheringLocation } from '@/types/common';

export interface IGathering {
  teamId: string;
  id: number;
  type: GatheringType;
  name: string;
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
