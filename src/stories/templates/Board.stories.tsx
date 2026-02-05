import type { Meta } from "@storybook/react";
import Board from "@/app/components/templates/Board/Board";
import { BoardProvider } from "@/app/context/BoardContext/BoardContext";

const mockBoardData = {
  id: "95234c8f-5f73-482c-8a01-9782ce2e77aa",
  projectId: "f713df67-9ffe-4fe2-882c-282a31dcd523",
  name: "SummerTime Saga Board",
  key: "summertime-saga",
  lanes: [
    {
      id: "61148544-2032-4659-90d5-245c5b90f976",
      name: "To Do",
      order: 0
    },
    {
      id: "2ad6950c-cf67-4aea-be31-5c7c3fd1e488",
      name: "In Progress",
      order: 1
    },
    {
      id: "37d17c97-e986-43f3-a336-5398431f0744",
      name: "Done",
      order: 2
    }
  ],
  cards: [],
  settings: {
    showDoneColumn: true,
    wipLimitEnabled: false,
    wipLimitPerUser: 3,
    autoArchiveDone: true,
    autoArchiveAfterDays: 14
  },
  createdAt: "2026-01-30T03:36:54.206Z",
  updatedAt: "2026-01-30T03:36:54.206Z"
};

const mockProjectData = {
  id: "f713df67-9ffe-4fe2-882c-282a31dcd523",
  name: "SummerTime Saga",
  description: "A project management system",
  sprints: [
    {
      id: "sprint-1",
      name: "Sprint 1",
      iteration: 1
    }
  ],
  epics: []
};

const mockTicketsData = [
  {
    id: "ticket-1",
    projectId: "f713df67-9ffe-4fe2-882c-282a31dcd523",
    sprintId: "sprint-1",
    sprintHistory: ["sprint-1"],
    ticketNumber: 1,
    title: "SAGA-1",
    Description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Sample ticket description" }]
        }
      ]
    },
    action: {
      onClick: () => console.log("Settings clicked"),
      name: "Settings",
    },
    type: "task",
    priority: "high",
    assigneeId: "user-1",
    assigneeName: "John Doe",
    createdAt: "2026-01-30T03:36:54.206Z",
    updatedAt: "2026-01-30T03:36:54.206Z"
  }
];

const meta = {
  title: "Templates/Board",
  component: Board,
  decorators: [
    (Story) => {
      // Mock fetch for Storybook
      const originalFetch = global.fetch;
      global.fetch = async (url: string | URL | Request) => {
        const urlString = url.toString();
        
        if (urlString.includes('/api/boards')) {
          return Promise.resolve({
            ok: true,
            json: async () => mockBoardData,
          } as Response);
        }
        
        if (urlString.includes('/api/projects')) {
          return Promise.resolve({
            ok: true,
            json: async () => mockProjectData,
          } as Response);
        }
        
        if (urlString.includes('/api/tickets')) {
          return Promise.resolve({
            ok: true,
            json: async () => mockTicketsData,
          } as Response);
        }
        
        return originalFetch(url);
      };

      return (
        <BoardProvider>
          <Story />
        </BoardProvider>
      );
    },
  ],
} satisfies Meta<typeof Board>;

export default meta;

export const BoardStory = () => {
  return <Board projectId="f713df67-9ffe-4fe2-882c-282a31dcd523" />;
}
