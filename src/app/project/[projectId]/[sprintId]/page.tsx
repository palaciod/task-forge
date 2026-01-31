"use client";

import Board from "@/app/components/templates/Board/Board";
import { BoardProvider } from "@/app/context/BoardContext/BoardContext";
import { useParams } from "next/navigation";

export default function SprintPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const sprintId = params.sprintId as string;

  return (
    <BoardProvider>
      <div className="min-h-screen bg-background">
        <Board projectId={projectId} sprintId={sprintId} />
      </div>
    </BoardProvider>
  );
}
