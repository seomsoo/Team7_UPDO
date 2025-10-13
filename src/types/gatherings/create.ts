// src/types/gatherings/create.ts

import { GatheringType, GatheringLocation } from '@/types/common';
import { IGathering } from './models';

export interface CreateGatheringType {
  location: GatheringLocation;
  type: GatheringType;
  name: string;
  dateTime: string;
  capacity: number;
  image?: File;
  registrationEnd?: string;
}

export type CreateGatheringResponse = IGathering;

// location 모임 장소

// type 모임 서비스 종류

// name 모임 이름

// dateTime 모임 날짜 및 시간 (YYYY-MM-DDTHH:MM:SS)

// capacity 모집 정원 (최소 5인 이상)

// image 모임 이미지

// registrationEnd 모임 모집 마감 날짜 및 시간 (선택 사항, YYYY-MM-DDTHH:MM:SS)
