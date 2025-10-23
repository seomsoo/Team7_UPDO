// 공통 Path/Query Params 정의
import { Type, Location } from '@/utils/mapping';

// GET /gatherings/{id}
export interface GetGatheringDetailParams {
  id: number;
}

// GET /gatherings/{id}/participants
export interface GetParticipantsParams {
  id: number;
  limit?: number;
  offset?: number;
  sortBy?: 'joinedAt';
  sortOrder?: 'asc' | 'desc';
}

// PUT /gatherings/{id}/cancel
export interface CancelGatheringParams {
  id: number;
}

// POST /gatherings/{id}/join
export interface JoinGatheringParams {
  id: number;
}

// DELETE /gatherings/{id}/leave
export interface LeaveGatheringParams {
  id: number;
}

// GET /gatherings (list)
export interface GetGatheringsParams {
  id?: string;
  type?: Type;
  location?: Location;
  date?: string;
  createdBy?: number;
  sortBy?: 'dateTime' | 'registrationEnd' | 'participantCount';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// GET /gatherings/joined
export interface GetJoinedGatheringsParams {
  completed?: boolean;
  reviewed?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'dateTime' | 'registrationEnd' | 'joinedAt';
  sortOrder?: 'asc' | 'desc';
}
