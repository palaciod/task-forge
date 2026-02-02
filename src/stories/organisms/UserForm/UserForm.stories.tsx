import type { Meta, StoryObj } from "@storybook/react";

import UserForm from "@/app/components/organisms/Forms/User/UserForm";
import { ThemeProvider } from "@/app/context/ThemeProvider/ThemeProvider";

const mockProjectsResponse = [
  {
    id: "d2c9534f-0d98-4f3d-afcc-946a2d7e3553",
    name: "TaskForge",
    sprints: [],
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    name: "Project Alpha",
    sprints: [],
  },
  {
    id: "f9e8d7c6-b5a4-3210-9876-543210fedcba",
    name: "Project Beta",
    sprints: [],
  },
];

const mockUserResponse = {
  id: "mock-user-id",
  name: "John Doe",
  email: "john.doe@example.com",
  avatarUrl: "https://example.com/avatar.jpg",
  projects: ["d2c9534f-0d98-4f3d-afcc-946a2d7e3553"],
  ticketsCompleted: 0,
};

const meta: Meta<typeof UserForm> = {
  title: "Organisms/Forms/UserForm",
  component: UserForm,
  decorators: [
    (Story) => {
      // Mock fetch for Storybook
      const originalFetch = global.fetch;
      global.fetch = async (url: string | URL | Request) => {
        const urlString = url.toString();
        
        if (urlString.includes('/api/projects')) {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          return Promise.resolve({
            ok: true,
            json: async () => mockProjectsResponse,
          } as Response);
        }
        
        if (urlString.includes('/api/Users')) {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          return Promise.resolve({
            ok: true,
            json: async () => mockUserResponse,
          } as Response);
        }
        
        return originalFetch(url);
      };

      return (
        <ThemeProvider>
          <div className="max-w-2xl mx-auto p-6">
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UserForm>;

export const Default: Story = {
  args: {
    onSuccess: () => {
      console.log("User created successfully!");
    },
  },
};

export const WithCallback: Story = {
  args: {
    onSuccess: () => {
      alert("User created successfully!");
    },
  },
};
