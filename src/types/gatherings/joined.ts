// src/types/gatherings/joined.ts

import { IGathering } from './models';

export interface GetJoinedGatheringsParams {
  completed?: boolean;
  reviewed?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'dateTime' | 'registrationEnd' | 'joinedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface IJoinedGathering extends IGathering {
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
}

export type GetJoinedGatheringsResponse = IJoinedGathering[];
