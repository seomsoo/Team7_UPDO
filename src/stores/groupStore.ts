import { Type, Location } from '@/utils/mapping';

import { create } from 'zustand';

export type CreatedGroupForm = {
  teamId: number; // API 요청용
  id: number; // group 고유 id
  type: Type | null; // 없으면 tab에서 mapping
  name: string;
  dateTime?: string | null;
  registrationEnd?: string | null;
  location?: Location | null; // 없으면 tag에서 mapping
  capacity?: number | null;
  image?: File | null;
  createdBy?: number | null; // group 생성자 userId
};

const initialFormState: CreatedGroupForm = {
  teamId: 0,
  id: 0,
  type: null,
  name: '',
  dateTime: null,
  registrationEnd: null,
  location: null,
  capacity: null,
  image: null,
  createdBy: null,
};

type GroupStore = {
  form: CreatedGroupForm;
  updateForm: (form: CreatedGroupForm) => void;
  reupdateForm: () => void;
};

export const useGroupStore = create<GroupStore>(set => ({
  form: initialFormState,
  updateForm: form => set({ form }),
  reupdateForm: () => set({ form: initialFormState }),
}));
