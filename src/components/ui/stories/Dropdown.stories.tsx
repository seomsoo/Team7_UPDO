import { Meta, StoryObj } from '@storybook/nextjs-vite';
import Dropdown from '../Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'components/ui/Dropdown',
  component: Dropdown,
  argTypes: {
    size: {
      control: 'radio',
      options: ['large', 'medium', 'small'],
    },
  },
  args: {
    size: 'large',
  },
};

const items = [
  { label: '태그 전체', value: 'all' },
  { label: '배움', value: 'learn' },
  { label: '도전', value: 'challenge' },
];

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Board: Story = {
  render: args => {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <Dropdown {...args} items={items} />
        </div>

        <div>
          <Dropdown {...args} items={[]} />
        </div>
      </div>
    );
  },
};
