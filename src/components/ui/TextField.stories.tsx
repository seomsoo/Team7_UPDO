import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TextField from './TextField';

const meta = {
  title: 'samples/TextField',
  component: TextField,
  parameters: { layout: 'centered' },
  argTypes: {
    placeholder: { control: 'text' },
    type: {
      control: { type: 'radio' },
      options: ['text', 'password', 'email'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: args => <TextField {...args} />,
  args: {
    placeholder: 'Type here...',
    type: 'text',
    disabled: false,
  },
};
