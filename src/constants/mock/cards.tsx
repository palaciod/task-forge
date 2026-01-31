import { Button } from "@/app/components/atoms/Button/Button";
import { TicketType } from "@/types/Card";

const MOCK_PROJECT_ID = "d2c9534f-0d98-4f3d-afcc-946a2d7e3553";
const MOCK_SPRINT_ID = "f10ca966-651a-48ba-bc4a-cecb4771e9e6";

export const SimpleTickets: TicketType[] = [
    {
      id: "card-1",
      projectId: MOCK_PROJECT_ID,
      sprintId: MOCK_SPRINT_ID,
      sprintHistory: [MOCK_SPRINT_ID],
      ticketNumber: 1,
      title: "TASK-123",
      Description: "Implement user authentication flow",
      action: {
        onClick: () => console.log("Settings clicked"),
        name: "Settings",
      },
      type: "task",
      priority: "high",
      initials: "JD",
      assigneePhoto: "https://github.com/shadcn.png",
      createdAt: "2026-01-30T03:16:02.768Z",
      updatedAt: "2026-01-30T03:16:02.768Z",
    },
    {
      id: "card-2",
      projectId: MOCK_PROJECT_ID,
      sprintId: MOCK_SPRINT_ID,
      sprintHistory: [MOCK_SPRINT_ID],
      ticketNumber: 2,
      title: "BUG-456",
      Description: "Fix navigation menu not closing on mobile",
      action: {
        onClick: () => console.log("Settings clicked"),
        name: "Settings",
      },
      type: "bug",
      priority: "medium",
      initials: "SM",
      createdAt: "2026-01-30T03:16:02.768Z",
      updatedAt: "2026-01-30T03:16:02.768Z",
    },
    {
      id: "card-3",
      projectId: MOCK_PROJECT_ID,
      sprintId: MOCK_SPRINT_ID,
      sprintHistory: [MOCK_SPRINT_ID],
      ticketNumber: 3,
      title: "STORY-789",
      Description: "Add dark mode support across the application Add dark mode support across the application Add dark mode support across the applicationAdd dark mode support across the applicationAdd dark mode support across the application Add dark mode support across the application Add dark mode support across the applicationAdd dark mode support across the application Add dark mode support across the applicationAdd dark mode support across the applicationAdd dark mode support across the application",
      action: {
        onClick: () => console.log("Settings clicked"),
        name: "Settings",
      },
      type: "story",
      priority: "low",
      initials: "AB",
      assigneePhoto: "https://github.com/vercel.png",
      createdAt: "2026-01-30T03:16:02.768Z",
      updatedAt: "2026-01-30T03:16:02.768Z",
    },
    {
      id: "card-4",
      projectId: MOCK_PROJECT_ID,
      sprintId: MOCK_SPRINT_ID,
      sprintHistory: [MOCK_SPRINT_ID],
      ticketNumber: 4,
      title: "TASK-999",
      Description: "Refactor database connection pooling",
      action: {
        onClick: () => console.log("Settings clicked"),
        name: "Settings",
      },
      type: "task",
      priority: "high",
      initials: "DP",
      createdAt: "2026-01-30T03:16:02.768Z",
      updatedAt: "2026-01-30T03:16:02.768Z",
    },
];