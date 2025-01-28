import type { Meta, StoryObj } from "@storybook/react";
import { exampleCompont } from ".";

const meta: Meta<typeof exampleCompont> = {
  title: "Components/Common/ExampleComponent",
  component: exampleCompont,
  tags: ["autodocs"],
  argTypes: {

  },
  args: {
    
  },
};

export default meta;

type Story = StoryObj<typeof exampleCompont>;

export const Default: Story = {
  args: {

  },
};



