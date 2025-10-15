import { useRef, useState } from 'react';

import { Modal } from '@/components/ui/Modal';
import { ModalProps } from '@/components/ui/Modal/Modal';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Selectbox from '@/components/ui/Selectbox';
import SelectInput from '@/components/ui/SelectInput';
import DatetimeInput from '@/components/ui/DatetimeInput';

import { TAG_OPTIONS, Option } from '@/constants/tags';
import { TAB_OPTIONS, TabOption } from '@/constants/tabs';

import type { GatheringType, GatheringLocation } from '@/types/common/constants';

type CreateGroupForm = {
  name: string;
  tab: TabOption['value']; // 스킬업 챌린지 네트워킹
  type: GatheringType | null; // 없으면 tab에서 mapping
  tag: Option['value'] | null; // default growth Learn challenge connect
  location?: GatheringLocation | null; // 없으면 tag에서 mapping
  date?: string | null;
  registrationEnd?: string | null;
  capacity?: number | null;
  image?: File | null;
};

export default function CreateGroupModal({ open, onOpenChange }: ModalProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);
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
    // const payload = {
    //   name: form.name,
    //   tag: form.tag ?? null,
    //   image: form.image,
    // };
    // console.log('submit payload', payload);
    // onOpenChange(false);
    // createGathering({})
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
      open={open}
      onOpenChange={onOpenChange}
      className="p-4 pb-12 md:rounded-2xl md:p-12"
      ResponsiveClassName="w-full h-[876px] md:w-[570px]">
      <Modal.Header title="모임 만들기" onClose={() => onOpenChange(false)} className="p-0 pb-6" />
      <Modal.Body className="mb-5 flex flex-col gap-6 p-0 md:mb-10">
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
            value={form.tag ?? null}
            onChange={nextValue =>
              setForm(s => ({
                ...s,
                tag: nextValue ?? null,
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
              disableFocusStyle
              onClick={() => fileRef.current?.click()}
              className="cursor-pointer"
              inputClassName="cursor-pointer"
            />

            <Button
              type="button"
              variant="calendarOutline"
              size={'calendar_small'}
              className="cursor-pointer"
              onClick={() => fileRef.current?.click()}>
              파일 찾기
            </Button>
          </div>
        </div>

        <div>
          <label className={labelClassName}>선택 서비스</label>
          <div className="flex gap-3">
            {TAB_OPTIONS.map(({ title, subtitle, value }, idx) => (
              <Selectbox
                key={idx}
                title={title}
                subtitle={subtitle ?? ''}
                isSelected={selectedIdx === idx}
                onSelect={() => {
                  setSelectedIdx(idx);
                  setForm(s => ({
                    ...s,
                    tab: value,
                  }));
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <label className="label mb-2 block text-gray-800">모임 날짜</label>
            <DatetimeInput
              value={form.date ?? ''}
              onChange={nextValue =>
                setForm(s => ({
                  ...s,
                  date: nextValue,
                }))
              }
              blockPast
            />
          </div>
          <div>
            <label className="label mb-2 block text-gray-800">마감 날짜</label>
            <DatetimeInput
              value={form.registrationEnd ?? ''}
              onChange={nextValue =>
                setForm(s => ({
                  ...s,
                  registrationEnd: nextValue,
                }))
              }
              blockPast
            />
          </div>
        </div>

        <div>
          <label className={labelClassName}>모집 인원</label>
          <Input
            type="number"
            placeholder="모집 인원을 입력해주세요"
            value={form.capacity ? String(form.capacity) : ''}
            onChange={e =>
              setForm(s => ({
                ...s,
                capacity: e.target.value === '' ? null : Number(e.target.value),
              }))
            }
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="h-15 p-0">
        <div>
          <Button size={'xlarge'} onClick={handleSubmit} disabled={!isFormComplete}>
            확인
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
