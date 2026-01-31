import React from "react";
import { Badge } from "@/app/components/atoms/Badge/Badge";
import { Icon } from "@/app/components/atoms/Icon/Icon";

type TicketProps = {
  id: string;
  type: "task" | "bug" | "story";
  priority: "high" | "medium" | "low";
};

const Ticket = ({ id, type, priority }: TicketProps) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Top Row: Type and ID */}
      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
        <div className="flex items-center gap-1">
          {type === "bug" && <Icon name="CircleAlert" className="w-3 h-3 text-destructive" />}
          {type === "task" && <Icon name="CircleCheck" className="w-3 h-3 text-blue-500" />}
          {type === "story" && <Icon name="BookMarked" className="w-3 h-3 text-green-500" />}
          <span>{id}</span>
        </div>
        <Badge variant="outline" className="text-[10px] uppercase px-1 py-0">
          {priority}
        </Badge>
      </div>
    </div>
  );
};

export default Ticket;