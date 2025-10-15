import React, { useRef, useState } from 'react';
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Modal, ConfirmModal } from '../Modal';
import CreateGroupModal from '@/components/feature/group/CreateGroupModal';

const meta: Meta<typeof Modal> = {
  title: 'components/ui/Modal',
  component: Modal,
  argTypes: {
    className: {
      control: 'text',
    },
  },
  args: {
    className: 'w-[530px] h-[220px]',
  },
};

export default meta;

type ModalStory = StoryObj<typeof Modal>;

export const ModalPlayground: ModalStory = {
  render: args => {
    const [open, setOpen] = useState(false);
    const okRef = useRef<HTMLButtonElement>(null);

    return (
      <div>
        <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setOpen(true)}>
          모달 열기
        </button>

        <Modal
          open={open}
          onOpenChange={setOpen}
          initialFocusRef={okRef as React.RefObject<HTMLElement>}
          className={args.className}>
          <Modal.Header title="모임 만들기" onClose={() => setOpen(false)} />
          <Modal.Body>
            <div className="space-y-3 text-gray-700">
              <p>Controls에서 className 값 변경 가능</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="rounded-md border px-4 py-2 text-sm" onClick={() => setOpen(false)}>
              취소
            </button>
            <button
              ref={okRef}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white"
              onClick={() => setOpen(false)}>
              확인
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

type ConfirmModalStory = StoryObj<typeof ConfirmModal>;

export const ConfirmModalPlayground: ConfirmModalStory = {
  render: args => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setOpen(true)}>
          로그아웃
        </button>

        <ConfirmModal
          open={open}
          onOpenChange={setOpen}
          content={args.content}
          tone="brand"
          size={args.size}
          onConfirm={() => {}}
        />
      </div>
    );
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'large'],
    },
    content: {
      control: { type: 'text' },
    },
  },
  args: {
    size: 'large',
    content: '로그아웃 하시겠습니까?',
  },
};

type CreateGroupModalStory = StoryObj<typeof CreateGroupModal>;

export const CreateGroupModalPlayground: CreateGroupModalStory = {
  render: args => {
    const [open, setOpen] = useState(false);

    return <CreateGroupModal open={true} onOpenChange={setOpen} />;
  },
  argTypes: {},
  args: {},
};
