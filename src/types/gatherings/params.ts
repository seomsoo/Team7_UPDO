// src/types/gatherings/params.ts

// 공통 Path/Query Params 정의

// GET /{teamId}/gatherings/{id}
export interface GetGatheringDetailParams {
  teamId: string;
  id: number;
}

// GET /{teamId}/gatherings/{id}/participants
export interface GetParticipantsParams {
  teamId: string;
  id: number;
  limit?: number;
  offset?: number;
  sortBy?: 'joinedAt';
  sortOrder?: 'asc' | 'desc';
}

// PUT /{teamId}/gatherings/{id}/cancel
export interface CancelGatheringParams {
  teamId: string;
  id: number;
}

// POST /{teamId}/gatherings/{id}/join
export interface JoinGatheringParams {
  teamId: string;
  id: number;
}

// DELETE /{teamId}/gatherings/{id}/leave
export interface LeaveGatheringParams {
  teamId: string;
  id: number;
}

// GET /{teamId}/gatherings (list)
export interface GetGatheringsParams {
  id?: string;
  type?: import('@/types/common').GatheringType;
  location?: import('@/types/common').GatheringLocation;
  date?: string;
  createdBy?: number;
  sortBy?: 'dateTime' | 'registrationEnd' | 'participantCount';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// GET /{teamId}/gatherings/joined
export interface GetJoinedGatheringsParams {
  completed?: boolean;
  reviewed?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'dateTime' | 'registrationEnd' | 'joinedAt';
  sortOrder?: 'asc' | 'desc';
}
