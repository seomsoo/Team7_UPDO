import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Calendar } from '../Calendar';
import { useState } from 'react';

const meta = {
  title: 'components/ui/Calendar',
  component: Calendar,
  // parameters: { layout: 'centered' },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const date: Story = {
  args: {
    value: undefined,
    onChange: () => {},
  },
  render: args => {
    const [value, setValue] = useState<Date | undefined>(args.value);
    return (
      <div className="inline-block h-[326px] w-[336px]">
        <Calendar {...args} value={value} onChange={(date: Date | undefined) => setValue(date)} />
      </div>
    );
  },
};

export const datetime: Story = {
  args: {
    value: undefined,
    onChange: () => {},
    variant: 'datetime',
    timeStep: 5,
  },
  render: args => {
    const [value, setValue] = useState<Date | undefined>(args.value);
    return (
      <div className="inline-block">
        <Calendar
          {...args}
          variant="datetime"
          value={value}
          onChange={(date: Date | undefined) => setValue(date)}
        />
      </div>
    );
  },
};
