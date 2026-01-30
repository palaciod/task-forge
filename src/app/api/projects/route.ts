import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Project, Sprint } from "@/types/Project";
import type { Board } from "@/types/Board";

const projectsFilePath = path.join(process.cwd(), "src/storage/project.json");
const boardsFilePath = path.join(process.cwd(), "src/storage/Boards.json");

const readProjects = async (): Promise<Project[]> => {
  try {
    const data = await fs.readFile(projectsFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeProjects = async (projects: Project[]): Promise<void> => {
  await fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2));
};

const readBoards = async (): Promise<Board[]> => {
  try {
    const data = await fs.readFile(boardsFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeBoards = async (boards: Board[]): Promise<void> => {
  await fs.writeFile(boardsFilePath, JSON.stringify(boards, null, 2));
};

export const GET = async () => {
  const projects = await readProjects();
  return NextResponse.json(projects);
};

export const POST = async (request: Request) => {
  const body = await request.json();

  if (!body.name) {
    return NextResponse.json({ error: "Project name is required" }, { status: 400 });
  }

  if (!body.lanes || !Array.isArray(body.lanes) || body.lanes.length === 0) {
    return NextResponse.json({ error: "At least one lane is required" }, { status: 400 });
  }

  const projects = await readProjects();
  const boards = await readBoards();
  
  let projectId = crypto.randomUUID();
  while (projects.some((p) => p.id === projectId)) {
    projectId = crypto.randomUUID();
  }

  let boardId = crypto.randomUUID();
  while (boards.some((b) => b.id === boardId)) {
    boardId = crypto.randomUUID();
  }

  const now = new Date().toISOString();
  
  // Generate sprint with ID
  const sprint: Sprint = {
    id: crypto.randomUUID(),
    name: body.sprintName || "Sprint 1",
    iteration: 1,
  };
  
  const newProject: Project = {
    id: projectId,
    name: body.name,
    description: body.description || "",
    epics: body.epics || [],
    sprints: [sprint],
  };

  const defaultSettings = {
    showDoneColumn: true,
    wipLimitEnabled: false,
    wipLimitPerUser: 3,
    autoArchiveDone: true,
    autoArchiveAfterDays: 14,
  };

  const newBoard: Board = {
    id: boardId,
    projectId: projectId,
    name: body.boardName || `${body.name} Board`,
    key: body.boardKey || body.name.toLowerCase().replace(/\s+/g, "-"),
    lanes: body.lanes,
    cards: body.cards || [],
    settings: { ...defaultSettings, ...body.settings },
    createdAt: now,
    updatedAt: now,
  };

  projects.push(newProject);
  boards.push(newBoard);
  
  await writeProjects(projects);
  await writeBoards(boards);

  return NextResponse.json({ project: newProject, board: newBoard }, { status: 201 });
};
