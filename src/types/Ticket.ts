import type { JSONContent } from "@tiptap/react";

type TicketType = "task" | "bug" | "story";
type TicketPriority = "high" | "medium" | "low";

const ticketPriorityOptions = ["high", "medium", "low"];

const ticketTypeOptions = ["task", "bug", "story"];

const ticketPointsOptions = [0, 1, 2, 3, 5, 8, 13];

type TicketFormData = {
  title: string;
  description: JSONContent | null;
  type: TicketType;
  priority: TicketPriority;
  assigneeId: string | null;
  assigneeName: string | null;
  laneId?: string;
  points?: number;
};

export { ticketPriorityOptions, ticketTypeOptions, ticketPointsOptions };
export type { TicketType, TicketPriority, TicketFormData };
