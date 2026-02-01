import type { Meta, StoryObj } from "@storybook/react";
import TicketForm from "@/app/components/organisms/Forms/Ticket/TicketForm";

const mockTicketResponse = {
  id: "mock-ticket-id",
  projectId: "d2c9534f-0d98-4f3d-afcc-946a2d7e3553",
  sprintId: "f10ca966-651a-48ba-bc4a-cecb4771e9e6",
  sprintHistory: ["f10ca966-651a-48ba-bc4a-cecb4771e9e6"],
  ticketNumber: 5,
  title: "TASKFORGE-5",
  Description: "Test ticket",
  type: "task",
  priority: "medium",
  action: { onClick: () => {}, name: "Settings" },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const meta = {
  title: "Organisms/Forms/TicketForm",
  component: TicketForm,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => {
      // Mock fetch for Storybook
      const originalFetch = global.fetch;
      global.fetch = async (url: string | URL | Request) => {
        const urlString = url.toString();
        if (urlString.includes('/api/tickets')) {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          return Promise.resolve({
            ok: true,
            json: async () => mockTicketResponse,
          } as Response);
        }
        return originalFetch(url);
      };

      return (
        <div className="w-full max-w-md">
          <Story />
        </div>
      );
    },
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof TicketForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    projectId: "d2c9534f-0d98-4f3d-afcc-946a2d7e3553",
    sprintId: "f10ca966-651a-48ba-bc4a-cecb4771e9e6",
    onSuccess: () => console.log("Ticket created successfully!"),
  },
};

export const WithCallback: Story = {
  args: {
    projectId: "d2c9534f-0d98-4f3d-afcc-946a2d7e3553",
    sprintId: "f10ca966-651a-48ba-bc4a-cecb4771e9e6",
    onSuccess: () => alert("Ticket created! This is the onSuccess callback."),
  },
};
