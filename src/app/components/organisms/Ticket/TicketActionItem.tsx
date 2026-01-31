import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/atoms/Avatar/Avatar";

type TicketActionItemProps = {
  assigneePhoto?: string;
  initials: string;
};

const TicketActionItem = ({ assigneePhoto, initials }: TicketActionItemProps) => {
  return (
    <div className="flex items-center justify-end">
      <Avatar className="h-6 w-6 border">
        <AvatarImage src={assigneePhoto} />
        <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default TicketActionItem;