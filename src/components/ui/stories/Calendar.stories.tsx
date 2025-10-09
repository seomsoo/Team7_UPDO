import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Calendar } from '../Calendar';
import { useState } from 'react';

const meta = {
  title: 'components/ui/Calendar',
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    value: undefined,
    onChange: () => {},
  },
  render: args => {
    const [value, setValue] = useState<Date | undefined>(args.value);
    return (
      <Calendar {...args} value={value} onChange={(date: Date | undefined) => setValue(date)} />
    );
  },
};
