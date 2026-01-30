import type { Meta, StoryObj } from "@storybook/react";

import NewProject from "@/app/components/organisms/Forms/Project/NewProject";
import { ThemeProvider } from "@/app/context/ThemeProvider/ThemeProvider";

const meta: Meta<typeof NewProject> = {
  title: "Templates/NewProjectForm",
  component: NewProject,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/project/new",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NewProject>;

export const Default: Story = {
  args: {
    isModal: false,
    onSuccess: (data) => {
      console.log("onSuccess", data);
    },
  },
};

export const Modal: Story = {
  args: {
    isModal: true,
    onSuccess: (data) => {
      console.log("onSuccess", data);
    },
  },
};
