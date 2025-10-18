import { useState } from 'react';

import { Modal } from '@/components/ui/Modal';
import { ModalProps } from '@/components/ui/Modal/Modal';
import { Button } from '@/components/ui/Button';
import { Option } from '@/constants/tags';
import { TabOption } from '@/constants/tabs';

import CreateGroupModalForm from './CreateGroupModalForm';

import { Type, Location, TabtoType, TagtoLocation } from '@/utils/mapping';
import { formatDateToLocalISO } from '@/utils/date';

import { CreateGatheringFormSchema } from '@/schemas/gatheringsSchema';
import { createGathering } from '@/services/gatherings/gatheringService';
import { useGroupStore } from '@/stores/groupStore';

export type CreateGroupForm = {
  name: string;
  tab: TabOption['value']; // 스킬업 챌린지 네트워킹
  type: Type | null; // 없으면 tab에서 mapping
  tag: Option['value'] | null; // default growth Learn challenge connect
  location?: Location | null; // 없으면 tag에서 mapping
  date?: string | null;
  registrationEnd?: string | null;
  capacity?: number | null;
  image?: File | null;
};

export default function CreateGroupModal({ open, onOpenChange }: ModalProps) {
  const [form, setForm] = useState<CreateGroupForm>({
    name: '',
    tag: null,
    tab: '스킬업',
    type: null,
    location: null,
    date: null,
    registrationEnd: null,
    capacity: null,
    image: null,
  });

  const { updateForm } = useGroupStore();

  const handleSubmit = async () => {
    const payload = {
      name: form.name.trim(),
      type: form.tab && TabtoType(form.tab),
      location: form.tag && TagtoLocation(form.tag),
      dateTime: form.date && formatDateToLocalISO(new Date(form.date)),
      registrationEnd: form.registrationEnd && formatDateToLocalISO(new Date(form.registrationEnd)),
      capacity: form.capacity ? Number(form.capacity) : 0,
      image: form.image,
    };

    const validation = CreateGatheringFormSchema.safeParse(payload);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      alert(firstError.message);
      return;
    }
    const validData = validation.data;

    // const res = await createGathering(validData);
  };

  const isFormComplete =
    !!form.name &&
    !!form.tag &&
    !!form.date &&
    !!form.registrationEnd &&
    !!form.capacity &&
    !!form.image;

  return (
    <Modal
      id="create-group-modal"
      open={open}
      onOpenChange={onOpenChange}
      className="p-4 pb-12 md:rounded-2xl md:p-12"
      ResponsiveClassName="w-full h-[876px] md:w-[570px]">
      <Modal.Header title="모임 만들기" onClose={() => onOpenChange(false)} className="p-0 pb-6" />
      <Modal.Body className="mb-5 flex flex-col gap-6 p-0 md:mb-10">
        <CreateGroupModalForm form={form} setForm={setForm} />
      </Modal.Body>
      <Modal.Footer className="h-15 p-0">
        <div>
          <Button size={'xlarge_responsive'} onClick={handleSubmit} disabled={!isFormComplete}>
            확인
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
