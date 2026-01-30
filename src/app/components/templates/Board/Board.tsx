import React from "react";
import { SimpleTickets } from "@/constants/mock/cards";
import Lane from "@/app/components/organisms/Lane/Lane";

const lanes = ["Ready for Development", "Development", "Code Review", "QA", "Stage", "Prod"];

type BoardProps = {
  projectId?: string;
  sprintId?: string;
};

const Board = ({ projectId, sprintId }: BoardProps) => {
  // TODO: Fetch board data based on projectId and sprintId
  console.log("Loading board for project:", projectId, "sprint:", sprintId);
  
  return (
    <div className="flex gap-8 pt-10">
      {lanes.map((lane) => (
        <Lane Title={lane} key={lane} tickets={SimpleTickets} />
      ))}
    </div>
  );
};

export default Board;
