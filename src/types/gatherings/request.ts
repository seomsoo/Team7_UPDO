import { GatheringType, GatheringLocation } from '@/types/common';

// API 요청할 때 사용하는 Type

export interface CreateGatheringRequest {
  location: GatheringLocation;
  type: GatheringType;
  name: string;
  dateTime: string;
  capacity: number;
  image?: File; // client-side only
  registrationEnd?: string;
}
