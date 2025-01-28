// components/header/header.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './index';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/en.json';

const meta: Meta<typeof Header> = {
  title: 'Components/Common/Header',
  component: Header,
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Responsive: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
  play: async () => {
    // Force mobile viewport detection
    window.innerWidth = 360;
    window.dispatchEvent(new Event('resize'));
  },
};