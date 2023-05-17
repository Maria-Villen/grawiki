import CheckInput from "./checkInput";
import type { Meta, StoryObj } from "@storybook/react";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction

const meta = {
  title: "Inputs/CheckInput",
  component: CheckInput,

  tags: ["autodocs"],
  args: {},
  parameters: {
    backgrounds: { default: "light" },
  },
  argTypes: {},
} satisfies Meta<typeof CheckInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Normal: Story = {};

Normal.parameters = {
  layout: "centered",
  design: {
    type: "figma",
    url: "https://www.figma.com/file/lrjhxEoXZotJLOOwukMgzy/11---Grawiki---Screens?type=design&node-id=609-4908&t=cVYTp6YN9bkAe2Ro-4",
  },
};

export const Fluid: Story = {
  args: {},
};

Fluid.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/lrjhxEoXZotJLOOwukMgzy/11---Grawiki---Screens?type=design&node-id=83-1198&t=cVYTp6YN9bkAe2Ro-4",
  },
};
