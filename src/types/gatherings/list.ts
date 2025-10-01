// src/types/gatherings/list.ts

import { GatheringType, GatheringLocation } from '@/types/common';
import { IGathering } from './models';

export interface GetGatheringsParams {
  id?: string;
  type?: GatheringType;
  location?: GatheringLocation;
  date?: string;
  createdBy?: number;
  sortBy?: 'dateTime' | 'registrationEnd' | 'participantCount';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export type GetGatheringsResponse = IGathering[];
