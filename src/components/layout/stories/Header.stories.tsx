import type { Meta, StoryObj } from '@storybook/react';
import Header from '../Header';

const meta = {
  title: 'components/layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/gathering',
      },
    },
  },
  argTypes: {
    favoriteCount: {
      control: { type: 'number', min: 0, max: 99 },
      description: '찜한 모임 개수',
    },
    user: {
      control: 'object',
      description: '현재 로그인한 사용자 정보',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// 로그인 상태
export const LoggedIn: Story = {
  args: {
    user: {
      id: 1,
      name: '김코딩',
      image: '/images/profile.png',
    },
    favoriteCount: 5,
  },
};

// 로그아웃 상태
export const LoggedOut: Story = {
  args: {
    user: undefined,
    favoriteCount: 0,
  },
};

// Badge 없음
export const NoBadge: Story = {
  args: {
    user: {
      id: 1,
      name: '김코딩',
      image: '/images/profile.png',
    },
    favoriteCount: 0,
  },
};

// Badge 최대치
export const MaxBadge: Story = {
  args: {
    user: {
      id: 1,
      name: '김코딩',
      image: '/images/profile.png',
    },
    favoriteCount: 100,
  },
};
