import React from "react";
import Card from "@/app/components/organisms/Card/Card";
import { CardType } from "@/types/Card";
import { Typography } from "../../atoms/Typography/Typography";

type LaneProps = {
  Title: string;
  tickets: CardType[];
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
          footer={ticket.footer}
        >
          {ticket.children}
        </Card>
      ))}
    </div>
  );
};

export default Lane;
