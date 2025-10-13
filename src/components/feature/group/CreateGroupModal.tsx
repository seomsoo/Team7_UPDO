import { useRef, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ModalProps } from '@/components/ui/Modal/Modal';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import SelectInput from '@/components/ui/SelectInput';
import Selectbox from '@/components/ui/Selectbox';

import { TAG_OPTIONS, type Option } from '@/constants/tags';
import { TAB_OPTIONS } from '@/constants/tabs';

type CreateGroupForm = {
  name: string;
  tag: Option | null;
  image: File | null;
};

export default function CreateGroupModal({ open, onOpenChange }: ModalProps) {
  const [form, setForm] = useState<CreateGroupForm>({ name: '', tag: null, image: null });

  const labelClassName = 'block typo-body-bold text-gray-800 mb-3';
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있어요.');
      return;
    }

    setForm(s => ({ ...s, image: file }));
  };

  const handleSubmit = () => {
    const payload = {
      name: form.name,
      tag: form.tag?.value ?? null,
      image: form.image,
    };
    console.log('submit payload', payload);
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="h-[866px] w-[570px] p-12">
      <Modal.Header title="모임 만들기" onClose={() => onOpenChange(false)} className="p-0 pb-6" />
      <Modal.Body className="mb-10 flex flex-col gap-6 p-0">
        <div>
          <label className={labelClassName}>모임 이름</label>
          <Input
            placeholder="모임 이름을 작성해주세요"
            value={form.name}
            onChange={e => setForm(s => ({ ...s, name: e.target.value }))}
          />
        </div>

        <div>
          <label className={labelClassName}>태그</label>
          <SelectInput
            items={TAG_OPTIONS}
            value={form.tag?.value ?? null}
            onChange={nextValue =>
              setForm(s => ({
                ...s,
                tag: TAG_OPTIONS.find(option => option.value === nextValue) ?? null,
              }))
            }
            placeholder="태그를 선택해주세요"
          />
        </div>

        <div>
          <label className={labelClassName}>이미지</label>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex items-center gap-3">
            <Input
              placeholder="이미지를 첨부해주세요"
              value={form.image ? form.image.name : ''}
              readOnly
            />

            <Button
              type="button"
              variant="calendarOutline"
              size={'calendar_small'}
              onClick={() => fileRef.current?.click()}>
              파일 찾기
            </Button>
          </div>
        </div>

        <div>
          <label className={labelClassName}>선택 서비스</label>
        </div>
      </Modal.Body>
      <Modal.Footer className="h-15 p-0">
        <div>
          <Button size={'xlarge'} onClick={handleSubmit} disabled={!form.name || !form.tag}>
            확인
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
