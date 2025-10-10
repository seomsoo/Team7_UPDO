import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from '../Input';
import Icon from '../Icon';

const meta: Meta<typeof Input> = {
  title: 'components/ui/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    inputSize: {
      control: 'radio',
      options: ['lg', 'sm'],
    },
    errorMessage: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
  },
  args: {
    inputSize: 'lg',
    placeholder: '내용을 입력하세요',
    errorMessage: '',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {
  render: args => {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <Input {...args} />
        </div>
        <div>
          <Input type="password" {...args} />
        </div>
        <div>
          <Input
            {...args}
            placeholder="캘린더 슬롯 예시"
            rightSlot={
              <button
                type="button"
                aria-label="달력 열기"
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => {}}>
                <Icon name="calendar" />
              </button>
            }
            readOnly
          />
        </div>
      </div>
    );
  },
};
