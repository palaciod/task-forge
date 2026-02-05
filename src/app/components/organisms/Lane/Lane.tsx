import React from "react";
import Card from "@/app/components/organisms/Card/Card";
import Ticket from "@/app/components/organisms/Ticket/Tiket";
import TickFooter from "@/app/components/organisms/Ticket/TickFooter";
import TicketActionItem from "@/app/components/organisms/Ticket/TicketActionItem";
import { TicketType } from "@/types/Card";
import { Typography } from "../../atoms/Typography/Typography";
import { tiptapToPlainText, truncateText } from "@/app/utils/utils";

type LaneProps = {
  Title: string;
  tickets: TicketType[];
};

const Lane = ({ Title, tickets }: LaneProps) => {
  return (
    <div className="flex flex-col gap-4 bg-muted p-4 rounded-md w-100">
      <Typography variant="h4">{Title}</Typography>
      {tickets.map((ticket) => {
        const descriptionText = truncateText(
          tiptapToPlainText(ticket.Description),
          120,
        );

        return (
          <Card
            key={ticket.id}
            title={ticket.title}
            Description={descriptionText}
            action={ticket.action}
            actionContent={
              ticket.assigneeId && ticket.assigneeName ? (
                <TicketActionItem
                  assigneePhoto={ticket.assigneePhoto}
                  assigneeName={ticket.assigneeName}
                />
              ) : undefined
            }
            footer={<TickFooter />}
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
