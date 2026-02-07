"use client";

import { BoardProvider } from "@/app/context/BoardContext/BoardContext";
import { useParams } from "next/navigation";
import BackLogTemplate from "@/app/components/templates/Backlog/BackLogPage";

export default function BacklogPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  return (
    <BoardProvider>
      <BackLogTemplate projectId={projectId} />
    </BoardProvider>
  );
}
