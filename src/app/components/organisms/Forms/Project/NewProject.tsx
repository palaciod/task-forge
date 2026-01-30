"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";

import { Button } from "@/app/components/atoms/Button/Button";
import { Icon } from "@/app/components/atoms/Icon/Icon";
import { Input } from "@/app/components/atoms/Input/Input";
import { FormField } from "@/app/components/molecules/FormField/FormField";
import { SettingsRow } from "@/app/components/molecules/SettingsRow/SettingsRow";
import { SettingsSection } from "@/app/components/organisms/SettingsSection/SettingsSection";
import { SettingsCard } from "@/app/components/organisms/SettingsCard/SettingsCard";

type Lane = {
  id: string;
  name: string;
  order: number;
};

type NewProjectForm = {
  projectName: string;
  projectDescription: string;
  sprintName: string;
  lanes: Lane[];
};

type NewProjectProps = {
  isModal?: boolean;
  onSuccess?: (data: NewProjectForm) => void;
};

const NewProject = ({ isModal = false, onSuccess }: NewProjectProps = {}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<NewProjectForm>({
    defaultValues: {
      projectName: "",
      projectDescription: "",
      sprintName: "Sprint 1",
      lanes: [
        { id: crypto.randomUUID(), name: "To Do", order: 0 },
        { id: crypto.randomUUID(), name: "In Progress", order: 1 },
        { id: crypto.randomUUID(), name: "Done", order: 2 },
      ],
    },
    mode: "onChange",
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "lanes",
  });

  const onSubmit = async (data: NewProjectForm) => {
    try {
      const payload = {
        name: data.projectName,
        description: data.projectDescription,
        sprintName: data.sprintName,
        lanes: data.lanes,
      };

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Failed to create project:", error);
        return;
      }

      const result = await response.json();
      console.log("Project created successfully:", result);
      onSuccess?.(data);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className={isModal ? "" : "min-h-screen bg-background"}>
      <div className={isModal ? "" : "mx-auto w-full max-w-4xl px-4 py-8"}>
        {/* Header */}
        {!isModal && (
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Create new project</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Set up a new project with its first sprint.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                disabled={isSubmitting}
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" form="new-project-form" disabled={!isDirty || isSubmitting}>
                Create project
              </Button>
            </div>
          </div>
        )}

        {/* Panel */}
        <SettingsCard>
          <form id="new-project-form" onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Project Details */}
            <SettingsSection
              title="Project details"
              description="Basic information about your project."
            >
              <SettingsRow
                title="Project name"
                description="The name of your project."
              >
                <FormField
                  id="projectName"
                  label="Name"
                  {...register("projectName", { required: "Project name is required" })}
                />
              </SettingsRow>

              <div className="border-t border-border/60" />

              <SettingsRow
                title="Description"
                description="A brief description of what this project is about."
              >
                <FormField
                  id="projectDescription"
                  label="Description"
                  helperText="Optional - add more context about the project"
                  {...register("projectDescription")}
                />
              </SettingsRow>
            </SettingsSection>

            {/* Sprint */}
            <div className="mt-2 border-t border-border/60 pt-6">
              <SettingsSection
                title="Initial sprint"
                description="Create your first sprint to get started."
              >
                <SettingsRow
                  title="Sprint name"
                  description="Name for your first sprint."
                >
                  <FormField
                    id="sprintName"
                    label="Sprint name"
                    helperText="e.g. Sprint 1, Week 1, Phase 1"
                    {...register("sprintName", { required: "Sprint name is required" })}
                  />
                </SettingsRow>
              </SettingsSection>
            </div>

            {/* Lanes */}
            <div className="mt-2 border-t border-border/60 pt-6">
              <SettingsSection
                title="Board lanes"
                description="Define the workflow stages for your board."
              >
                <SettingsRow
                  title="Lanes"
                  description="Add, remove, or reorder your workflow stages."
                >
                  <div className="space-y-3">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <div className="flex flex-col gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            disabled={index === 0}
                            onClick={() => move(index, index - 1)}
                          >
                            <Icon name="ChevronUp" size="sm" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            disabled={index === fields.length - 1}
                            onClick={() => move(index, index + 1)}
                          >
                            <Icon name="ChevronDown" size="sm" />
                          </Button>
                        </div>
                        <Input
                          {...register(`lanes.${index}.name`, { required: true })}
                          placeholder="Lane name"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={fields.length <= 1}
                          onClick={() => remove(index)}
                        >
                          <Icon name="Trash2" size="sm" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => append({ id: crypto.randomUUID(), name: "", order: fields.length })}
                    >
                      <Icon name="Plus" size="sm" className="mr-2" />
                      Add lane
                    </Button>
                  </div>
                </SettingsRow>
              </SettingsSection>
            </div>

            {/* Footer */}
            {!isModal && (
              <div className="pt-2">
                <div className="border-t border-border/60" />
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {isDirty ? "Fill in the form to create your project." : ""}
                  </p>
                  <Button type="submit" disabled={!isDirty || isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create project"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </SettingsCard>
      </div>
    </div>
  );
};

export default NewProject;