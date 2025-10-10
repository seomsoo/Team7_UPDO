import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/ui/Button/IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['desktop', 'mobile'] },
    label: { control: 'text' },
  },
  args: {
    size: 'desktop',
    label: '모임 만들기',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: { size: 'desktop' },
};

export const Mobile: Story = {
  args: { size: 'mobile' },
};
