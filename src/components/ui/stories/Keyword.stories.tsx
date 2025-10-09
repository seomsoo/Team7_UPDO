import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Keyword } from '../Keyword';

const meta: Meta<typeof Keyword> = {
  title: 'components/ui/Keyword',
  component: Keyword,
  parameters: { layout: 'padded' },
  argTypes: {
    topic: {
      control: 'radio',
      options: ['default', 'growth', 'learn', 'challenge', 'connect'],
      description: '키워드 주제 색상',
    },
    label: {
      control: 'text',
      description: '표시할 키워드 텍스트',
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    topic: 'default',
    label: '기본',
  },
};

export default meta;
type Story = StoryObj<typeof Keyword>;

export const Playground: Story = {};

export const Gallery: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Keyword topic="default" label="기본" />
      <Keyword topic="growth" label="성장" />
      <Keyword topic="learn" label="학습" />
      <Keyword topic="challenge" label="도전" />
      <Keyword topic="connect" label="연결" />
    </div>
  ),
};
