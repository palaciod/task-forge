import type { Meta } from "@storybook/react";
import Header from "@/app/components/organisms/Header/Header";
import { ThemeProvider } from "@/app/context/ThemeProvider/ThemeProvider";

const meta = {
  title: "Organisms/Header",
  component: Header,
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
        pathname: "/project/test-project/sprint-1",
        params: { projectId: "test-project", sprintId: "sprint-1" },
      },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;

export const HeaderStory = () => {
  return <Header />;
};