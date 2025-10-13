import { IGathering } from './models';
import { IParticipant } from './models';

export type CancelGatheringResponse = IGathering;
export type GetGatheringDetailResponse = IGathering;

export type GetParticipantsResponse = IParticipant[];

export interface MessageResponse {
  message: string;
}

export type JoinGatheringResponse = MessageResponse;
export type LeaveGatheringResponse = MessageResponse;

export interface IJoinedGathering extends IGathering {
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
}

export type GetJoinedGatheringsResponse = IJoinedGathering[];

export type CreateGatheringResponse = IGathering;
export type GetGatheringsResponse = IGathering[];
