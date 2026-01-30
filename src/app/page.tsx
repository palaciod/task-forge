"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/app/components/atoms/Button/Button";
import { Icon } from "@/app/components/atoms/Icon/Icon";
import NewProjectFormModal from "@/app/components/organisms/Modal/NewProjectFormModal/NewProjectFormModal";
import type { Project } from "@/types/Project";

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProjects = async () => {
    const response = await fetch("/api/projects");
    const data = await response.json();
    setProjects(data);
  };

  const handleOnClose = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      fetchProjects();
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Select a project and sprint to view its board
            </p>
          </div>
          <Button
            data-testid="new-project-button"
            onClick={() => setIsModalOpen(true)}
          >
            <Icon name="Plus" size="sm" className="mr-2" />
            New Project
          </Button>
        </div>

        <div className="space-y-6">
          {projects.length === 0 ? (
            <div className="rounded-2xl border bg-card p-8 shadow-sm">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/50">
                    <Icon
                      name="FolderPlus"
                      size="md"
                      className="text-muted-foreground"
                    />
                  </div>

                  <div>
                    <p className="text-base font-medium">No projects yet</p>
                    <p className="mt-1 max-w-md text-sm text-muted-foreground">
                      Create your first project to start organizing sprints,
                      epics, and work items.
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <Button onClick={() => setIsModalOpen(true)}>
                        <Icon name="Plus" size="sm" className="mr-2" />
                        Create project
                      </Button>

                      <Button variant="secondary" asChild>
                        <Link href="/project/new">
                          <Icon
                            name="ExternalLink"
                            size="sm"
                            className="mr-2"
                          />
                          Use full page
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Optional: small “tips” column */}
                <div className="w-full rounded-2xl bg-muted/30 p-4 sm:w-[260px]">
                  <p className="text-xs font-medium text-muted-foreground">
                    Quick tips
                  </p>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                      Start with a single sprint (e.g. Sprint 1)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                      Add epics later — projects can begin empty
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <>
              {projects?.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl border bg-card p-4 shadow-sm"
                >
                  <div className="mb-3">
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {project.sprints.map((sprint) => (
                      <Link
                        key={sprint.id}
                        href={`/project/${project.id}/${sprint.id}`}
                        className="flex items-center justify-between rounded-xl bg-muted/30 p-3 transition-colors hover:bg-accent"
                      >
                        <span className="text-sm">
                          Sprint {sprint.iteration}
                        </span>
                        <Icon
                          name="ChevronRight"
                          size="sm"
                          className="text-muted-foreground"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <NewProjectFormModal open={isModalOpen} onOpenChange={handleOnClose} />
    </div>
  );
};

export default Home;
