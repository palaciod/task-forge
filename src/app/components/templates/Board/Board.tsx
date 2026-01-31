import React, { useEffect }  from "react";
import { SimpleTickets } from "@/constants/mock/cards";
import Lane from "@/app/components/organisms/Lane/Lane";
import { useBoardContext } from "@/app/context/BoardContext/BoardContext";

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
    return <div className="flex justify-center items-center pt-10">Loading...</div>;
  }

  if (error) {
    return <>
    
    <div className="flex justify-center items-center pt-10 text-red-500">Error: {error}</div>
    <button onClick={() => {
      fetchBoard(projectId);
    }}>show board val</button>

    </>;
  }
  
  return (
    <div className="flex gap-8 pt-10 flex-1 w-full">
      {board?.lanes.map((lane) => (
        <Lane Title={lane.name} key={lane.name} tickets={SimpleTickets} />
      ))}
    </div>
  );
};

export default Board;
