"use client";
import React, { useEffect } from "react";
import Backlog from "@/app/components/organisms/Backlog/Backlog";
import ButtonMenu from "@/app/components/molecules/ButtonMenu/ButtonMenu";
import { BOARD_MENU_BUTTONS } from "@/constants/constants";
import { useBoardContext } from "@/app/context/BoardContext/BoardContext";
import TicketFormModal from "@/app/components/organisms/Modal/TicketFormModal/TicketFormModal";

type BackLogTemplateProps = {
  projectId: string;
};

const BackLogTemplate = ({ projectId }: BackLogTemplateProps) => {
  const {  board, currentSprint, setProjectId } = useBoardContext();

  useEffect(() => {
    setProjectId(projectId);
  }, [projectId, setProjectId]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="flex gap=3 justify-between py-8">
        <ButtonMenu buttons={BOARD_MENU_BUTTONS} />
        <TicketFormModal projectId={projectId} sprintId={currentSprint?.id} />
      </div>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Backlog</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all tickets for this project
          </p>
        </div>
        <Backlog projectId={projectId} />
      </div>
    </div>
  );
};

export default BackLogTemplate;
