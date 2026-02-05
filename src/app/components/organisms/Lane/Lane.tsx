import React, { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import Card from "@/app/components/organisms/Card/Card";
import Ticket from "@/app/components/organisms/Ticket/Tiket";
import TickFooter from "@/app/components/organisms/Ticket/TickFooter";
import TicketActionItem from "@/app/components/organisms/Ticket/TicketActionItem";
import { TicketType } from "@/types/Card";
import { Typography } from "../../atoms/Typography/Typography";
import { tiptapToPlainText, truncateText } from "@/app/utils/utils";
import { useBoardContext } from "@/app/context/BoardContext/BoardContext";

type LaneProps = {
  Title: string;
  tickets: TicketType[];
  laneId?: string;
};

const Lane = ({ Title, tickets, laneId }: LaneProps) => {
  const { users } = useBoardContext();
  const { setNodeRef } = useDroppable({
    id: laneId || "default-lane",
  });

  const filteredTickets = useMemo(
    () =>
      laneId ? tickets.filter((ticket) => ticket.laneId === laneId) : tickets,
    [tickets, laneId],
  );

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col gap-4 bg-muted p-4 rounded-md w-100"
    >
      <Typography variant="h4">{Title}</Typography>
      {filteredTickets.map((ticket) => {
        const descriptionText = truncateText(
          tiptapToPlainText(ticket.Description),
          120,
        );

        const assignedUser = ticket.assigneeId
          ? users.find((user) => user.id === ticket.assigneeId)
          : null;

        return (
          <Card
            key={ticket.id}
            ticketId={ticket.id}
            title={ticket.title}
            Description={descriptionText}
            action={ticket.action}
            actionContent={
              assignedUser ? (
                <TicketActionItem
                  assigneePhoto={assignedUser.avatarUrl}
                  assigneeName={assignedUser.name}
                />
              ) : undefined
            }
            footer={<TickFooter ticketId={ticket.id} points={ticket.points} />}
          >
            {ticket.type && ticket.priority ? (
              <Ticket
                id={ticket.title}
                type={ticket.type}
                priority={ticket.priority}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                Failed to retrieve ticket data
              </p>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default Lane;
