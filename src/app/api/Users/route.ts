import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { User } from "@/types/User";

const usersFilePath = path.join(process.cwd(), "src/storage/Users.json");

const readUsers = async (): Promise<User[]> => {
  try {
    const data = await fs.readFile(usersFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeUsers = async (users: User[]): Promise<void> => {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");
  const projectId = searchParams.get("projectId");

  const users = await readUsers();

  // Filter by userId
  if (userId) {
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  }

  // Filter by projectId
  if (projectId) {
    const projectUsers = users.filter((u) => u.projects.includes(projectId));
    return NextResponse.json(projectUsers);
  }

  // Return all users if no filters
  return NextResponse.json(users);
};

export const POST = async (request: Request) => {
  const body = await request.json();

  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!body.email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const users = await readUsers();

  // Check if email already exists
  const existingUser = users.find((u) => u.email === body.email);
  if (existingUser) {
    return NextResponse.json(
      { error: "User with this email already exists" },
      { status: 409 }
    );
  }

  // Generate unique user ID
  let userId = crypto.randomUUID();
  while (users.some((u) => u.id === userId)) {
    userId = crypto.randomUUID();
  }

  const newUser: User = {
    id: userId,
    name: body.name,
    email: body.email,
    avatarUrl: body.avatarUrl,
    projects: body.projects || [],
    ticketsCompleted: body.ticketsCompleted || 0,
  };

  users.push(newUser);
  await writeUsers(users);

  return NextResponse.json(newUser, { status: 201 });
};
