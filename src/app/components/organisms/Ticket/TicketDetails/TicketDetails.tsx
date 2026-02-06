"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { JSONContent } from "@tiptap/react";
import { Badge } from "@/app/components/atoms/Badge/Badge";
import { Label } from "@/app/components/atoms/Label/Label";
import { FormField } from "@/app/components/molecules/FormField/FormField";
import TicketEditor from "@/app/components/organisms/Editor/TicketEditor";
import UserSelect from "@/app/components/molecules/Select/UserSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/molecules/Select/Select";
import {
  TicketFormData,
  ticketPriorityOptions,
  ticketTypeOptions,
  ticketPointsOptions,
} from "@/types/Ticket";

type Ticket = {
  id: string;
  projectId: string;
  sprintId: string;
  ticketNumber: number;
  title: string;
  Description: JSONContent;
  type: "task" | "bug" | "story";
  priority: "high" | "medium" | "low";
  assigneeId?: string;
  assigneeName?: string;
  laneId?: string;
  points?: number;
  createdAt: string;
  updatedAt: string;
};

type TicketDetailsProps = {
  ticketId: string;
  isEditMode?: boolean;
  onEditModeChange?: (editMode: boolean) => void;
  onSaveSuccess?: () => void;
  onDeleteSuccess?: () => void;
};

export type TicketDetailsHandle = {
  save: () => Promise<void>;
  delete: () => Promise<void>;
  switchToEditMode: () => void;
  cancelEdit: () => void;
  isLoading: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  ticket: Ticket | null;
};

const TicketDetails = React.forwardRef<TicketDetailsHandle, TicketDetailsProps>(
  ({ ticketId, isEditMode: externalEditMode, onEditModeChange, onSaveSuccess, onDeleteSuccess }, ref) => {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [internalEditMode, setInternalEditMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [laneName, setLaneName] = useState<string>("");
    const [boardLanes, setBoardLanes] = useState<Array<{ id: string; name: string }>>([]);

    const isEditMode = externalEditMode ?? internalEditMode;

    const {
      register,
      control,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
    } = useForm<TicketFormData>({
      defaultValues: {
        title: "",
        description: null,
        type: "task",
        priority: "medium",
        assigneeId: null,
        assigneeName: null,
        laneId: undefined,
        points: undefined,
      },
    });

    useEffect(() => {
      if (ticketId) {
        loadTicket();
      }
    }, [ticketId]);

    const loadTicket = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/tickets?ticketId=${ticketId}`);
        if (!response.ok) {
          throw new Error("Failed to load ticket");
        }
        const data = await response.json();
        setTicket(data);

        // Populate form with ticket data
        reset({
          title: data.title,
          description: data.Description,
          type: data.type,
          priority: data.priority,
          assigneeId: data.assigneeId,
          assigneeName: data.assigneeName,
          laneId: data.laneId,
          points: data.points,
        });

        // Load board data for lanes
        if (data.projectId) {
          const boardResponse = await fetch(`/api/boards?id=${data.projectId}`);
          if (boardResponse.ok) {
            const board = await boardResponse.json();
            if (board.lanes) {
              setBoardLanes(board.lanes);
              const lane = board.lanes.find((l: any) => l.id === data.laneId);
              if (lane) {
                setLaneName(lane.name);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error loading ticket:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleDelete = async () => {
      if (!ticket || !confirm("Are you sure you want to delete this ticket?")) {
        return;
      }

      setIsDeleting(true);
      try {
        const response = await fetch(`/api/tickets?ticketId=${ticket.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete ticket");
        }

        onDeleteSuccess?.();
      } catch (error) {
        console.error("Error deleting ticket:", error);
        alert("Failed to delete ticket");
        throw error;
      } finally {
        setIsDeleting(false);
      }
    };

    const handleSave = async (data: TicketFormData) => {
      if (!ticket) return;

      setIsSaving(true);
      try {
        const payload = {
          title: data.title,
          Description: data.description,
          type: data.type,
          priority: data.priority,
          points: data.points,
          laneId: data.laneId,
          assigneeId: data.assigneeId,
          assigneeName: data.assigneeName,
        };

        const response = await fetch(`/api/tickets?ticketId=${ticket.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to update ticket");
        }

        if (externalEditMode !== undefined) {
          onEditModeChange?.(false);
        } else {
          setInternalEditMode(false);
        }

        await loadTicket();
        onSaveSuccess?.();
      } catch (error) {
        console.error("Error updating ticket:", error);
        alert("Failed to update ticket");
        throw error;
      } finally {
        setIsSaving(false);
      }
    };

    const switchToEditMode = () => {
      if (externalEditMode !== undefined) {
        onEditModeChange?.(true);
      } else {
        setInternalEditMode(true);
      }
    };

    const cancelEdit = () => {
      if (externalEditMode !== undefined) {
        onEditModeChange?.(false);
      } else {
        setInternalEditMode(false);
      }
      // Reset form to original values
      if (ticket) {
        reset({
          title: ticket.title,
          description: ticket.Description,
          type: ticket.type,
          priority: ticket.priority,
          assigneeId: ticket.assigneeId,
          assigneeName: ticket.assigneeName,
          laneId: ticket.laneId,
          points: ticket.points,
        });
      }
    };

    // Expose methods via ref
    React.useImperativeHandle(ref, () => ({
      save: () => handleSubmit(handleSave)(),
      delete: handleDelete,
      switchToEditMode,
      cancelEdit,
      isLoading,
      isSaving,
      isDeleting,
      ticket,
    }));

    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Loading ticket...</p>
        </div>
      );
    }

    if (!ticket) {
      return (
        <div className="flex items-center justify-center py-8">
          <p className="text-destructive">Ticket not found</p>
        </div>
      );
    }

    // Edit mode: show the form
    if (isEditMode) {
      return (
        <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
          {/* Title */}
          <FormField
            id="title"
            label="Title"
            placeholder="Add a title"
            required
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 100,
                message: "Title must be 100 characters or less",
              },
            })}
            disabled={isSaving}
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TicketEditor
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSaving}
                />
              )}
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Type <span className="text-destructive">*</span></Label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSaving}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ticketTypeOptions.map((type) => (
                      <SelectItem value={type} key={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSaving}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {ticketPriorityOptions.map((priority) => (
                      <SelectItem value={priority} key={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Points */}
          <div className="space-y-2">
            <Label htmlFor="points">Points</Label>
            <Controller
              control={control}
              name="points"
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                  disabled={isSaving}
                >
                  <SelectTrigger id="points">
                    <SelectValue placeholder="Select points" />
                  </SelectTrigger>
                  <SelectContent>
                    {ticketPointsOptions.map((point) => (
                      <SelectItem value={point.toString()} key={point}>
                        {point}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Lane */}
          <div className="space-y-2">
            <Label htmlFor="lane">Lane</Label>
            <Controller
              control={control}
              name="laneId"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSaving}
                >
                  <SelectTrigger id="lane">
                    <SelectValue placeholder="Select lane" />
                  </SelectTrigger>
                  <SelectContent>
                    {boardLanes.map((lane) => (
                      <SelectItem value={lane.id} key={lane.id}>
                        {lane.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Assignee */}
          <Controller
            control={control}
            name="assigneeId"
            render={({ field }) => (
              <UserSelect
                projectId={ticket.projectId}
                value={field.value}
                onValueChange={(userId, userName) => {
                  field.onChange(userId);
                  setValue("assigneeName", userName);
                }}
                disabled={isSaving}
              />
            )}
          />
        </form>
      );
    }

    // View mode: display read-only ticket details
    return (
      <div className="space-y-6">
        {/* Header with title and badges */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{ticket.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Ticket #{ticket.ticketNumber} • Created{" "}
              {new Date(ticket.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">{ticket.type}</Badge>
            <Badge
              variant={
                ticket.priority === "high"
                  ? "destructive"
                  : ticket.priority === "medium"
                    ? "default"
                    : "secondary"
              }
            >
              {ticket.priority}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label>Description</Label>
          <div className="border rounded-md p-4 bg-muted/30">
            <TicketEditor
              value={ticket.Description}
              onChange={() => {}}
              disabled={true}
            />
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Assignee */}
          <div className="space-y-2">
            <Label>Assignee</Label>
            <div className="text-sm p-2 border rounded-md bg-background">
              {ticket.assigneeName || "Unassigned"}
            </div>
          </div>

          {/* Points */}
          <div className="space-y-2">
            <Label>Story Points</Label>
            <div className="text-sm p-2 border rounded-md bg-background">
              {ticket.points ?? "Not set"}
            </div>
          </div>

          {/* Lane */}
          <div className="space-y-2">
            <Label>Lane</Label>
            <div className="text-sm p-2 border rounded-md bg-background">
              {laneName || ticket.laneId || "Not set"}
            </div>
          </div>

          {/* Last Updated */}
          <div className="space-y-2">
            <Label>Last Updated</Label>
            <div className="text-sm p-2 border rounded-md bg-background">
              {new Date(ticket.updatedAt).toLocaleDateString()}{" "}
              {new Date(ticket.updatedAt).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TicketDetails.displayName = "TicketDetails";

export default TicketDetails;
