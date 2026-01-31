import React from "react";
import Card from "@/app/components/organisms/Card/Card";
import Ticket from "@/app/components/organisms/Ticket/Tiket";
import TickFooter from "@/app/components/organisms/Ticket/TickFooter";
import TicketActionItem from "@/app/components/organisms/Ticket/TicketActionItem";
import { TicketType } from "@/types/Card";
import { Typography } from "../../atoms/Typography/Typography";

type LaneProps = {
  Title: string;
  tickets: TicketType[];
};

const Lane = ({ Title, tickets }: LaneProps) => {
  return (
    <div className="flex flex-col gap-4 bg-muted p-4 rounded-md w-100">
      <Typography variant="h4">{Title}</Typography>
      {tickets.map((ticket) => (
        <Card
          key={ticket.id}
          title={ticket.title}
          Description={ticket.Description}
          action={ticket.action}
          actionContent={
            ticket.initials ? (
              <TicketActionItem
                assigneePhoto={ticket.assigneePhoto}
                initials={ticket.initials}
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
            <p className="text-sm text-muted-foreground">Failed to retrieve ticket data</p>
          )}
        </Card>
      ))}
    </div>
  );
};

export default Lane;
