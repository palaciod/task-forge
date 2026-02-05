"use client";
import React, { useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Lane from "@/app/components/organisms/Lane/Lane";
import Card from "@/app/components/organisms/Card/Card";
import Ticket from "@/app/components/organisms/Ticket/Tiket";
import TickFooter from "@/app/components/organisms/Ticket/TickFooter";
import TicketActionItem from "@/app/components/organisms/Ticket/TicketActionItem";
import { useBoardContext } from "@/app/context/BoardContext/BoardContext";
import TicketFormModal from "@/app/components/organisms/Modal/TicketFormModal/TicketFormModal";
import MenuDrawer from "@/app/components/molecules/MenuDrawer/MenuDrawer";
import { tiptapToPlainText, truncateText } from "@/app/utils/utils";

type BoardProps = {
  projectId: string;
  sprintId?: string;
};

const Board = ({ projectId, sprintId }: BoardProps) => {
  const { board, project, users, tickets, loading, error, setProjectId } = useBoardContext();
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Small drag distance before activating
      },
    })
  );

  useEffect(() => {
    setProjectId(projectId);
  }, [projectId, setProjectId]);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = () => {
    setActiveId(null);
    // Later: handle drop logic here
  };

  const activeTicket = activeId ? tickets.find((t) => t.id === activeId) : null;

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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-4 pt-10 flex-1 w-full">
        <div className="flex justify-between px-8 pb-8">
          <MenuDrawer />
          <TicketFormModal projectId={projectId} sprintId={sprintId} />
        </div>
        <div className="flex gap-8 px-8">
          {board?.lanes.map((lane) => (
            <Lane Title={lane.name} key={lane.name} tickets={tickets} laneId={lane.id} />
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeTicket ? (
          <div style={{ opacity: 0.5, cursor: "grabbing" }}>
            <Card
              ticketId={activeTicket.id}
              title={activeTicket.title}
              Description={truncateText(
                tiptapToPlainText(activeTicket.Description),
                120
              )}
              action={activeTicket.action}
              actionContent={
                activeTicket.assigneeId
                  ? (() => {
                      const assignedUser = users.find(
                        (user) => user.id === activeTicket.assigneeId
                      );
                      return assignedUser ? (
                        <TicketActionItem
                          assigneePhoto={assignedUser.avatarUrl}
                          assigneeName={assignedUser.name}
                        />
                      ) : undefined;
                    })()
                  : undefined
              }
              footer={
                <TickFooter
                  ticketId={activeTicket.id}
                  points={activeTicket.points}
                />
              }
            >
              {activeTicket.type && activeTicket.priority ? (
                <Ticket
                  id={activeTicket.title}
                  type={activeTicket.type}
                  priority={activeTicket.priority}
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Failed to retrieve ticket data
                </p>
              )}
            </Card>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;
