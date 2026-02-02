"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/app/components/atoms/Button/Button";
import { Input } from "@/app/components/atoms/Input/Input";
import { Label } from "@/app/components/atoms/Label/Label";
import { Checkbox } from "@/app/components/atoms/CheckBox/Checkbox";
import type { Project } from "@/types/Project";

type UserFormData = {
  name: string;
  email: string;
  avatarUrl?: string;
  projects: string[];
  ticketsCompleted: number;
};

type UserFormProps = {
  onSuccess?: () => void;
};

const UserForm = ({ onSuccess }: UserFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<UserFormData>({
    defaultValues: {
      name: "",
      email: "",
      avatarUrl: "",
      projects: [],
      ticketsCompleted: 0,
    },
    mode: "onSubmit",
  });

  const selectedProjects = watch("projects");

  // Fetch available projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectToggle = (projectId: string) => {
    const current = selectedProjects || [];
    const updated = current.includes(projectId)
      ? current.filter((id) => id !== projectId)
      : [...current, projectId];
    setValue("projects", updated);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size should be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarPreview(base64String);
        setValue("avatarUrl", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    setValue("avatarUrl", "");
  };

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    if (data.projects.length === 0) {
      setError("At least one project must be selected");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      name: data.name,
      email: data.email,
      avatarUrl: data.avatarUrl || undefined,
      projects: data.projects,
      ticketsCompleted: data.ticketsCompleted,
    };

    try {
      const response = await fetch("/api/Users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create user");
      }

      setSuccess(true);
      reset();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 text-sm text-green-500 bg-green-50 dark:bg-green-900/20 rounded">
          User created successfully!
        </div>
      )}

      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          {...register("name", { required: "Name is required" })}
          placeholder="Enter user name"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          placeholder="user@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Avatar Upload Field */}
      <div className="space-y-2">
        <Label htmlFor="avatarUrl">Avatar Image</Label>
        {avatarPreview ? (
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="size-20 rounded-full object-cover border-2 border-input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">Avatar uploaded</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={removeAvatar}
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Input
              id="avatarUrl"
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground">
              Upload an image (max 2MB)
            </p>
          </div>
        )}
      </div>

      {/* Projects Field */}
      <div className="space-y-2">
        <Label>
          Projects <span className="text-red-500">*</span>
        </Label>
        {loadingProjects ? (
          <p className="text-sm text-muted-foreground">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-sm text-muted-foreground">No projects available</p>
        ) : (
          <div className="space-y-2 border rounded-md p-3 max-h-48 overflow-y-auto">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`project-${project.id}`}
                  checked={selectedProjects?.includes(project.id) || false}
                  onCheckedChange={() => handleProjectToggle(project.id)}
                />
                <Label
                  htmlFor={`project-${project.id}`}
                  className="text-sm cursor-pointer"
                >
                  {project.name}
                </Label>
              </div>
            ))}
          </div>
        )}
        {errors.projects && (
          <p className="text-sm text-red-500">{errors.projects.message}</p>
        )}
      </div>

      {/* Tickets Completed Field */}
      <div className="space-y-2">
        <Label htmlFor="ticketsCompleted">Tickets Completed</Label>
        <Input
          id="ticketsCompleted"
          type="number"
          min="0"
          {...register("ticketsCompleted", {
            valueAsNumber: true,
            min: { value: 0, message: "Must be 0 or greater" },
          })}
        />
        {errors.ticketsCompleted && (
          <p className="text-sm text-red-500">{errors.ticketsCompleted.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting || loadingProjects}>
          {isSubmitting ? "Creating..." : "Create User"}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
