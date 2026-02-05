"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { JSONContent } from "@tiptap/react";

import { Button } from "@/app/components/atoms/Button/Button";
import { Input } from "@/app/components/atoms/Input/Input";
import { Label } from "@/app/components/atoms/Label/Label";
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
} from "@/types/Ticket";
import { useBoardContext } from "@/app/context/BoardContext/BoardContext";

type TicketFormProps = {
  projectId: string;
  sprintId: string;
  onSuccess?: () => void;
};

const EMPTY_DOC: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

function isEmptyTiptapDoc(doc: JSONContent | null | undefined) {
  if (!doc || !doc.content || doc.content.length === 0) return true;

  // Treat single empty paragraph as empty
  if (doc.content.length === 1 && doc.content[0]?.type === "paragraph") {
    const p = doc.content[0] as any;
    return !p.content || p.content.length === 0;
  }

  return false;
}

const TicketForm = ({ projectId, sprintId, onSuccess }: TicketFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { board } = useBoardContext();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TicketFormData>({
    defaultValues: {
      description: EMPTY_DOC,
      type: "task",
      priority: "medium",
      assigneeId: null,
      assigneeName: "Unassigned",
      laneId: undefined,
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (board?.lanes?.[0]?.id) {
      setValue("laneId", board.lanes[0].id);
    }
  }, [board, setValue]);

  const onSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const payload = {
      projectId,
      sprintId,
      laneId: data.laneId,
      description: data.description ?? EMPTY_DOC,
      type: data.type,
      priority: data.priority,
      assigneeId: data.assigneeId,
      assigneeName: data.assigneeName,
    };

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let message = "Failed to create ticket";
        try {
          const errorData = await response.json();
          message = errorData?.error || message;
        } catch (error) {
          console.log(error);
        }
        throw new Error(message);
      }

      setSuccess(true);
      reset({
        description: EMPTY_DOC,
        type: "task",
        priority: "medium",
        assigneeId: null,
        assigneeName: "Unassigned",
      });
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Description (TipTap) */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-destructive">*</span>
        </Label>

        <Controller
          name="description"
          control={control}
          rules={{
            validate: (v) =>
              !isEmptyTiptapDoc(v) ? true : "Description is required",
          }}
          render={({ field }) => (
            <div>
              <TicketEditor
                value={field.value ?? EMPTY_DOC}
                onChange={field.onChange}
                disabled={isSubmitting}
              />
            </div>
          )}
        />

        {errors.description && (
          <p className="text-sm text-destructive">
            {String(errors.description.message)}
          </p>
        )}
      </div>

      {/* Type */}
      <div className="space-y-2">
        <Label htmlFor="type">
          Type <span className="text-destructive">*</span>
        </Label>
        <Controller
          control={control}
          name="type"
          rules={{ required: "Type is required" }}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={isSubmitting}
            >
              <SelectTrigger id="type" aria-invalid={!!errors.type}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {ticketTypeOptions?.map((type) => (
                  <SelectItem value={type} key={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && (
          <p className="text-sm text-destructive">{errors.type.message}</p>
        )}
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
              disabled={isSubmitting}
            >
              <SelectTrigger id="priority" aria-invalid={!!errors.priority}>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {ticketPriorityOptions?.map((priority) => (
                  <SelectItem value={priority} key={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lane">Lane</Label>
        <Controller
          control={control}
          name="laneId"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={isSubmitting}
            >
              <SelectTrigger id="lane">
                <SelectValue placeholder="Select lane" />
              </SelectTrigger>
              <SelectContent>
                {board?.lanes?.map((lane) => (
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
            projectId={projectId}
            value={field.value}
            onValueChange={(userId, userName) => {
              field.onChange(userId);
              setValue("assigneeName", userName);
            }}
            disabled={isSubmitting}
          />
        )}
      />

      {/* Success Message */}
      {success && (
        <div className="p-3 rounded-md bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-600 dark:text-green-400">
            Ticket created successfully!
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Submit */}
      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Creating..." : "Create Ticket"}
        </Button>
      </div>
    </form>
  );
};

export default TicketForm;
