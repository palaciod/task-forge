import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { TicketType } from "@/types/Card";
import type { Project } from "@/types/Project";
import type { Board } from "@/types/Board";

const ticketsFilePath = path.join(process.cwd(), "src/storage/tickets.json");
const projectsFilePath = path.join(process.cwd(), "src/storage/project.json");
const boardsFilePath = path.join(process.cwd(), "src/storage/Boards.json");

const readTickets = async (): Promise<TicketType[]> => {
  try {
    const data = await fs.readFile(ticketsFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeTickets = async (tickets: TicketType[]): Promise<void> => {
  await fs.writeFile(ticketsFilePath, JSON.stringify(tickets, null, 2));
};

const readProjects = async (): Promise<Project[]> => {
  try {
    const data = await fs.readFile(projectsFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const readBoards = async (): Promise<Board[]> => {
  try {
    const data = await fs.readFile(boardsFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get("ticketId");
  const projectId = searchParams.get("projectId");
  const sprintId = searchParams.get("sprintId");

  if (!ticketId && !projectId && !sprintId) {
    return NextResponse.json(
      { error: "At least one query parameter (ticketId, projectId, or sprintId) is required" },
      { status: 400 }
    );
  }

  const tickets = await readTickets();

  // If ticketId is provided, return single ticket
  if (ticketId) {
    const ticket = tickets.find((t) => t.id === ticketId);
    
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }
    
    return NextResponse.json(ticket);
  }

  // Filter by projectId and/or sprintId
  let filteredTickets = tickets;

  if (projectId) {
    filteredTickets = filteredTickets.filter((t) => t.projectId === projectId);
  }

  if (sprintId) {
    filteredTickets = filteredTickets.filter((t) => t.sprintId === sprintId);
  }

  return NextResponse.json(filteredTickets);
};

export const POST = async (request: Request) => {
  const body = await request.json();

  if (!body.projectId) {
    return NextResponse.json({ error: "projectId is required" }, { status: 400 });
  }

  if (!body.sprintId) {
    return NextResponse.json({ error: "sprintId is required" }, { status: 400 });
  }

  if (!body.Description) {
    return NextResponse.json({ error: "Description is required" }, { status: 400 });
  }

  // Validate project exists
  const projects = await readProjects();
  const project = projects.find((p) => p.id === body.projectId);
  
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // Validate sprint exists in project
  const sprint = project.sprints.find((s) => s.id === body.sprintId);
  
  if (!sprint) {
    return NextResponse.json({ error: "Sprint not found in project" }, { status: 404 });
  }

  // Get board to retrieve key
  const boards = await readBoards();
  const board = boards.find((b) => b.projectId === body.projectId);
  
  if (!board) {
    return NextResponse.json({ error: "Board not found for project" }, { status: 404 });
  }

  // Get existing tickets to calculate next ticket number
  const tickets = await readTickets();
  const projectTickets = tickets.filter((t) => t.projectId === body.projectId);
  const nextTicketNumber = projectTickets.length + 1;

  // Generate ticket ID
  let ticketId = crypto.randomUUID();
  while (tickets.some((t) => t.id === ticketId)) {
    ticketId = crypto.randomUUID();
  }

  const now = new Date().toISOString();
  
  const newTicket: TicketType = {
    id: ticketId,
    projectId: body.projectId,
    sprintId: body.sprintId,
    sprintHistory: [body.sprintId],
    ticketNumber: nextTicketNumber,
    title: `${board.key.toUpperCase()}-${nextTicketNumber}`,
    Description: body.Description,
    type: body.type || "task",
    priority: body.priority || "medium",
    assigneePhoto: body.assigneePhoto,
    initials: body.initials,
    action: body.action || { onClick: () => {}, name: "Settings" },
    createdAt: now,
    updatedAt: now,
  };

  tickets.push(newTicket);
  await writeTickets(tickets);

  return NextResponse.json(newTicket, { status: 201 });
};