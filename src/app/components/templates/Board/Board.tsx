"use client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
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
import { TicketType } from "@/types/Card";

type BoardProps = {
  projectId: string;
  sprintId?: string;
};

const Board = ({ projectId, sprintId }: BoardProps) => {
  const { board, project, users, tickets: contextTickets, loading, error, setProjectId } = useBoardContext();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [localTickets, setLocalTickets] = useState<TicketType[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Small drag distance before activating
      },
    })
  );

  // Sync local tickets with context
  useEffect(() => {
    setLocalTickets(contextTickets);
  }, [contextTickets]);

  useEffect(() => {
    setProjectId(projectId);
  }, [projectId, setProjectId]);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    // If not dropped over anything or dropped on same lane, do nothing
    if (!over) return;

    const ticketId = active.id as string;
    const newLaneId = over.id as string;

    const ticket = localTickets.find((t) => t.id === ticketId);
    if (!ticket) return;

    // If dropped in same lane, do nothing
    if (ticket.laneId === newLaneId) return;

    // Optimistic update: Update local state immediately
    const previousTickets = [...localTickets];
    setLocalTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, laneId: newLaneId } : t))
    );

    // Call API to update ticket
    try {
      const response = await fetch(`/api/tickets?ticketId=${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ laneId: newLaneId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update ticket lane");
      }
    } catch (error) {
      console.error("Error updating ticket lane:", error);
      // Revert on error
      setLocalTickets(previousTickets);
    }
  };

  const activeTicket = activeId ? localTickets.find((t) => t.id === activeId) : null;

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
            <Lane Title={lane.name} key={lane.name} tickets={localTickets} laneId={lane.id} />
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeTicket ? (
          <div className="opacity-50 cursor-grabbing">
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
