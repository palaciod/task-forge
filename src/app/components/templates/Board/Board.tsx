"use client";
import React, { useEffect } from "react";
import { SimpleTickets } from "@/constants/mock/cards";
import Lane from "@/app/components/organisms/Lane/Lane";
import { useBoardContext } from "@/app/context/BoardContext/BoardContext";
import TicketFormModal from "@/app/components/organisms/Modal/TicketFormModal/TicketFormModal";
import MenuDrawer from "@/app/components/molecules/MenuDrawer/MenuDrawer";

type BoardProps = {
  projectId: string;
  sprintId?: string;
};

const Board = ({ projectId, sprintId }: BoardProps) => {
  const { board, project, tickets, loading, error, setProjectId } = useBoardContext();

  useEffect(() => {
    setProjectId(projectId);
  }, [projectId, setProjectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center pt-10">Loading...</div>
    );
  }

  if (error) {
    return (
      <>
        <div className="flex justify-center items-center pt-10 text-red-500">
          Error: {error}
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4 pt-10 flex-1 w-full">
      <div className="flex justify-between px-8 pb-8">
        <MenuDrawer />
        <TicketFormModal projectId={projectId} sprintId={sprintId} />
      </div>
      <div className="flex gap-8 px-8">
        {board?.lanes.map((lane) => (
          <Lane Title={lane.name} key={lane.name} tickets={tickets} />
        ))}
      </div>
    </div>
  );
};

export default Board;
