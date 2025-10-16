import type { Meta, StoryObj } from '@storybook/react';
import GroupCard from '../GroupCard';
import { IGathering } from '@/types/gatherings/models';

const mockData: IGathering = {
  teamId: 't001',
  id: 1,
  type: 'DALLAEMFIT',
  name: '개발자 성장 네트워킹',
  dateTime: '2026-10-14T05:32:27.088Z',
  registrationEnd: '2026-10-14T05:32:27.088Z',
  location: '건대입구',
  participantCount: 8,
  capacity: 12,
  image: '/images/auth_logo.png',
  createdBy: 101,
};

const meta: Meta<typeof GroupCard> = {
  title: 'Components/Feature/GroupCard',
  component: GroupCard,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    data: { control: 'object' },
  },
  args: {
    data: mockData,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Growth: Story = {
  args: {
    data: { ...mockData, location: '건대입구', name: '성장 스터디' },
  },
};
export const Learn: Story = {
  args: {
    data: { ...mockData, location: '을지로3가', name: '학습 스터디' },
  },
};
export const Challenge: Story = {
  args: {
    data: { ...mockData, location: '신림', name: '도전 스터디' },
  },
};
export const Connect: Story = {
  args: {
    data: { ...mockData, location: '홍대입구', name: '연결 모임' },
  },
};

export const Closed: Story = {
  args: {
    data: {
      ...mockData,
      registrationEnd: '2024-10-01T00:00:00Z',
    },
  },
};
