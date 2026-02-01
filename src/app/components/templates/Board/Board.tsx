"use client";
import React, { useEffect } from "react";
import { SimpleTickets } from "@/constants/mock/cards";
import Lane from "@/app/components/organisms/Lane/Lane";
import { useBoardContext } from "@/app/context/BoardContext/BoardContext";
import TicketFormModal from "@/app/components/organisms/Modal/TicketFormModal/TicketFormModal";

type BoardProps = {
  projectId: string;
  sprintId?: string;
};

const Board = ({ projectId, sprintId }: BoardProps) => {
  const { board, loading, error, fetchBoard } = useBoardContext();

  useEffect(() => {
    if (projectId) {
      fetchBoard(projectId);
    }
  }, [projectId, fetchBoard]);

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
      <div className="flex justify-end">
        <TicketFormModal projectId={projectId} sprintId={sprintId} />
      </div>
      <div className="flex gap-8">
        {board?.lanes.map((lane) => (
          <Lane Title={lane.name} key={lane.name} tickets={SimpleTickets} />
        ))}
      </div>
    </div>
  );
};

export default Board;
