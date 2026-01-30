"use client";

import BoardSettingsPage from "@/app/components/templates/BoardSettings/BoardSettings";
import { useParams } from "next/navigation";

export default function ProjectSettingsPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  // TODO: Pass projectId to BoardSettingsPage to load project-specific settings
  console.log("Loading settings for project:", projectId);

  return <BoardSettingsPage />;
}
