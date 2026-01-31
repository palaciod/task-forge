import type { Meta, StoryObj } from "@storybook/react";
import Ticket from "@/app/components/organisms/Ticket/Tiket";

const meta = {
  title: "Organisms/Ticket",
  component: Ticket,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Ticket>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TaskHighPriority: Story = {
  args: {
    id: "TASK-123",
    type: "task",
    priority: "high",
  },
};

export const BugMediumPriority: Story = {
  args: {
    id: "BUG-456",
    type: "bug",
    priority: "medium",
  },
};

export const StoryLowPriority: Story = {
  args: {
    id: "STORY-789",
    type: "story",
    priority: "low",
  },
};

export const TaskWithoutPhoto: Story = {
  args: {
    id: "TASK-999",
    type: "task",
    priority: "high",
  },
};
