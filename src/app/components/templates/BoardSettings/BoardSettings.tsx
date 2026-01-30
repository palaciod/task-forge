// app/(dashboard)/boards/[boardId]/settings/page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";

import { Button } from "@/app/components/atoms/Button/Button";
import { Icon } from "@/app/components/atoms/Icon/Icon";
import { Input } from "@/app/components/atoms/Input/Input";
import { FormField } from "@/app/components/molecules/FormField/FormField";
import { SwitchField } from "@/app/components/molecules/SwitchField/SwitchField";
import { SettingsRow } from "@/app/components/molecules/SettingsRow/SettingsRow";
import { SettingsSection } from "@/app/components/organisms/SettingsSection/SettingsSection";
import { SettingsCard } from "@/app/components/organisms/SettingsCard/SettingsCard";

type Lane = {
  id: string;
  name: string;
  order: number;
};

type BoardSettingsForm = {
  boardName: string;
  boardKey: string;
  lanes: Lane[];
  showDoneColumn: boolean;
  wipLimitEnabled: boolean;
  wipLimitPerUser: number;
  autoArchiveDone: boolean;
  autoArchiveAfterDays: number;
};

const BoardSettingsPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { isDirty, isSubmitting },
  } = useForm<BoardSettingsForm>({
    defaultValues: {
      boardName: "Personal Board",
      boardKey: "personal-jira",
      lanes: [
        { id: "1", name: "To Do", order: 0 },
        { id: "2", name: "In Progress", order: 1 },
        { id: "3", name: "Done", order: 2 },
      ],
      showDoneColumn: true,
      wipLimitEnabled: false,
      wipLimitPerUser: 3,
      autoArchiveDone: true,
      autoArchiveAfterDays: 14,
    },
    mode: "onChange",
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "lanes",
  });

  const v = watch();

  const onSubmit = async (data: BoardSettingsForm) => {
    // Replace with your API call
    console.log("save board settings", data);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Board settings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Configure this board’s basics, workflow, and automation.
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
            <Button type="submit" form="board-settings" disabled={!isDirty || isSubmitting}>
              Save changes
            </Button>
          </div>
        </div>

        {/* Panel */}
        <SettingsCard>
          <form id="board-settings" onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* General */}
            <SettingsSection
              title="General"
              description="Name, key, and styling for this board."
            >
              <SettingsRow title="Board name" description="Shown in the sidebar and board header.">
                <FormField
                  id="boardName"
                  label="Name"
                  {...register("boardName", { required: true })}
                />
              </SettingsRow>

              <div className="border-t border-border/60" />

              <SettingsRow title="Board key" description="Short identifier used in URLs and exports.">
                <FormField
                  id="boardKey"
                  label="Key"
                  helperText="Use letters, numbers, and hyphens (e.g. personal-jira)"
                  {...register("boardKey", {
                    required: true,
                    pattern: /^[a-z0-9-]+$/i,
                  })}
                />
              </SettingsRow>
            </SettingsSection>

            {/* Workflow */}
            <div className="mt-2 border-t border-border/60 pt-6">
              <SettingsSection
                title="Workflow"
                description="Control how the board behaves day-to-day."
              >
                <SettingsRow title="Board lanes" description="Add, remove, or reorder your workflow stages.">
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

                <div className="border-t border-border/60" />

                <div className="border-t border-border/60" />

                <SettingsRow title="WIP limits" description="Limit how many items each user can have in progress.">
                  <div className="space-y-4">
                    <SwitchField
                      label="Enable WIP limits"
                      description="Limits apply per user across all lanes."
                      variant="card"
                      checked={v.wipLimitEnabled}
                      onCheckedChange={(checked) =>
                        setValue("wipLimitEnabled", checked, { shouldDirty: true })
                      }
                    />
                    <FormField
                      id="wipLimitPerUser"
                      label="Max items per user"
                      type="number"
                      min={1}
                      disabled={!v.wipLimitEnabled}
                      {...register("wipLimitPerUser", { valueAsNumber: true, min: 1 })}
                    />
                  </div>
                </SettingsRow>
              </SettingsSection>
            </div>

            {/* Automation */}
            <div className="mt-2 border-t border-border/60 pt-6">
              <SettingsSection
                title="Automation"
                description="Small rules that keep the board tidy."
              >
                <SettingsRow title="Auto-archive Done" description="Archive completed items after a delay.">
                  <div className="space-y-4">
                    <SwitchField
                      label="Enable auto-archive"
                      description="Keeps the Done column clean over time."
                      variant="card"
                      checked={v.autoArchiveDone}
                      onCheckedChange={(checked) =>
                        setValue("autoArchiveDone", checked, { shouldDirty: true })
                      }
                    />
                    <FormField
                      id="autoArchiveAfterDays"
                      label="Days after Done"
                      type="number"
                      min={1}
                      disabled={!v.autoArchiveDone}
                      {...register("autoArchiveAfterDays", { valueAsNumber: true, min: 1 })}
                    />
                  </div>
                </SettingsRow>
              </SettingsSection>
            </div>

            {/* Footer */}
            <div className="pt-2">
              <div className="border-t border-border/60" />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {isDirty ? "You have unsaved changes." : "All changes saved."}
                </p>
                <Button type="submit" disabled={!isDirty || isSubmitting}>
                  Save changes
                </Button>
              </div>
            </div>
          </form>
        </SettingsCard>
      </div>
    </div>
  );
};

export default BoardSettingsPage;
