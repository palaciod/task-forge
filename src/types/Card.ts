import { IconName } from "./Icon";
import { ReactNode } from "react";
import type { JSONContent } from "@tiptap/react";

export type CardAction = {
  onClick: () => void;
  name?: IconName;
};

export type TicketType = {
  id: string;
  projectId: string;
  sprintId: string;
  sprintHistory: string[];
  ticketNumber: number;
  title: string;
  Description: JSONContent;
  action: CardAction;
  type?: "task" | "bug" | "story";
  priority?: "high" | "medium" | "low";
  assigneePhoto?: string;
  assigneeId: string | null;
  assigneeName: string | null;
  children?: ReactNode;
  actionContent?: ReactNode;
  footer?: ReactNode;
  createdAt: string;
  updatedAt: string;
};
