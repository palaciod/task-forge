import type { Meta, StoryObj } from "@storybook/react";
import BoardSettingsPage from "@/app/components/templates/BoardSettings/BoardSettings";
import { ThemeProvider } from "@/app/context/ThemeProvider/ThemeProvider";

const meta = {
  title: "Templates/BoardSettings",
  component: BoardSettingsPage,
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
        pathname: "/project/1/boardsettings",
      },
    },
  },
} satisfies Meta<typeof BoardSettingsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
