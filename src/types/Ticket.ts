import type { JSONContent } from "@tiptap/react";

type TicketType = "task" | "bug" | "story";
type TicketPriority = "high" | "medium" | "low";

const ticketPriorityOptions = ["high", "medium", "low"];

const ticketTypeOptions = ["task", "bug", "story"];

type TicketFormData = {
  description: JSONContent | null;
  type: TicketType;
  priority: TicketPriority;
  assigneeId: string | null;
  assigneeName: string | null;
};

export { ticketPriorityOptions, ticketTypeOptions };
export type { TicketType, TicketPriority, TicketFormData };
