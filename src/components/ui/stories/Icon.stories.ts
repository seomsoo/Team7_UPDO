import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Icon from '../Icon/Icon';

const meta = {
  title: 'components/ui/Icon',
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
