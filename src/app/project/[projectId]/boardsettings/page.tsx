"use client";

import BoardSettingsPage from "@/app/components/templates/BoardSettings/BoardSettings";
import { useParams } from "next/navigation";

export default function ProjectSettingsPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  return <BoardSettingsPage projectId={projectId} />;
}
