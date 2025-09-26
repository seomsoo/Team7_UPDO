import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Avatar from '../Avatar';

const meta = {
  title: 'samples/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <table style={{ borderCollapse: 'collapse' }}>
      <tbody>
        <tr>
          <td style={{ padding: '8px' }}>
            <Avatar size="md">MD</Avatar>
          </td>
          <td style={{ padding: '8px' }}>
            <Avatar size="lg">LG</Avatar>
          </td>
        </tr>
      </tbody>
    </table>
  ),
};

export const Empty: Story = {
  render: () => (
    <table style={{ borderCollapse: 'collapse' }}>
      <tbody>
        <tr>
          <td style={{ padding: '8px' }}>
            <Avatar size="md" alt="empty avatar" />
          </td>
          <td style={{ padding: '8px' }}>
            <Avatar size="lg" alt="empty avatar" />
          </td>
        </tr>
      </tbody>
    </table>
  ),
};
