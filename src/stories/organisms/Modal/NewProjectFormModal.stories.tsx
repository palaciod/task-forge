import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ThemeProvider } from "@/app/context/ThemeProvider/ThemeProvider";
import NewProjectFormModal from "@/app/components/organisms/Modal/NewProjectFormModal/NewProjectFormModal";

const meta: Meta<typeof NewProjectFormModal> = {
  title: "Organisms/NewProjectFormModal",
  component: NewProjectFormModal,
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

type Story = StoryObj<typeof NewProjectFormModal>;

export const Open: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    return <NewProjectFormModal open={open} onOpenChange={setOpen} />;
  },
};

export const Closed: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="p-6">
        <button
          className="rounded-md border px-3 py-2"
          onClick={() => setOpen(true)}
        >
          Open modal
        </button>

        <NewProjectFormModal open={open} onOpenChange={setOpen} />
      </div>
    );
  },
};
