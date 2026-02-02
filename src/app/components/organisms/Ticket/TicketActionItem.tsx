import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/atoms/Avatar/Avatar";

type TicketActionItemProps = {
  assigneePhoto?: string;
  assigneeName: string;
};

const TicketActionItem = ({ assigneePhoto, assigneeName }: TicketActionItemProps) => {
  // Generate initials from assigneeName
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-center justify-end">
      <Avatar className="h-6 w-6 border">
        <AvatarImage src={assigneePhoto} />
        <AvatarFallback className="text-[10px]">
          {getInitials(assigneeName)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default TicketActionItem;