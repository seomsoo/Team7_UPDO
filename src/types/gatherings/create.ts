// src/types/gatherings/create.ts

import { GatheringType, GatheringLocation } from '@/types/common';
import { IGathering } from './models';

export interface CreateGatheringRequest {
  location: GatheringLocation;
  type: GatheringType;
  name: string;
  dateTime: string;
  capacity: number;
  image?: File;
  registrationEnd?: string;
}

export type CreateGatheringResponse = IGathering;
