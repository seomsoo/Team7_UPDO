// src/lib/api/gatherings.ts

import { apiClient } from './client';
import {
  GetGatheringsParams,
  GetGatheringsResponse,
  CreateGatheringRequest,
  CreateGatheringResponse,
  GetJoinedGatheringsParams,
  GetJoinedGatheringsResponse,
  GetGatheringDetailResponse,
  GetParticipantsParams,
  GetParticipantsResponse,
  CancelGatheringResponse,
  JoinGatheringResponse,
  LeaveGatheringResponse,
} from '@/types/gatherings';

// Query 직렬화 유틸
function toQuery<T extends object>(params?: T): string {
  if (!params) return '';
  return (
    '?' + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString()
  );
}

// 모임 목록 조회
export async function getGatherings(teamId: string, params?: GetGatheringsParams) {
  return apiClient<GetGatheringsResponse>(`/${teamId}/gatherings${toQuery(params)}`);
}

// 모임 생성
export async function createGathering(teamId: string, data: CreateGatheringRequest) {
  const formData = new FormData();
  formData.append('location', data.location);
  formData.append('type', data.type);
  formData.append('name', data.name);
  formData.append('dateTime', data.dateTime);
  formData.append('capacity', String(data.capacity));
  if (data.image) formData.append('image', data.image);
  if (data.registrationEnd) formData.append('registrationEnd', data.registrationEnd);

  return apiClient<CreateGatheringResponse>(`/${teamId}/gatherings`, {
    method: 'POST',
    body: formData,
  });
}

// 참석한 모임 목록 조회
export async function getJoinedGatherings(teamId: string, params?: GetJoinedGatheringsParams) {
  return apiClient<GetJoinedGatheringsResponse>(`/${teamId}/gatherings/joined${toQuery(params)}`);
}

// 모임 상세 조회
export async function getGatheringDetail(teamId: string, id: number) {
  return apiClient<GetGatheringDetailResponse>(`/${teamId}/gatherings/${id}`);
}

// 참가자 목록 조회
export async function getParticipants(teamId: string, id: number, params?: GetParticipantsParams) {
  return apiClient<GetParticipantsResponse>(
    `/${teamId}/gatherings/${id}/participants${toQuery(params)}`,
  );
}

// 모임 취소
export async function cancelGathering(teamId: string, id: number) {
  return apiClient<CancelGatheringResponse>(`/${teamId}/gatherings/${id}/cancel`, {
    method: 'PUT',
  });
}

// 모임 참여
export async function joinGathering(teamId: string, id: number) {
  return apiClient<JoinGatheringResponse>(`/${teamId}/gatherings/${id}/join`, { method: 'POST' });
}

// 모임 참여 취소
export async function leaveGathering(teamId: string, id: number) {
  return apiClient<LeaveGatheringResponse>(`/${teamId}/gatherings/${id}/leave`, {
    method: 'DELETE',
  });
}
