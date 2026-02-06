import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Board } from "@/types/Board";

const boardsFilePath = path.join(process.cwd(), "src/storage/Boards.json");

const readBoards = async (): Promise<Board[]> => {
  try {
    const data = await fs.readFile(boardsFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeBoards = async (boards: Board[]): Promise<void> => {
  await fs.writeFile(boardsFilePath, JSON.stringify(boards, null, 2), "utf-8");
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id query parameter is required" }, { status: 400 });
  }

  const boards = await readBoards();
  const board = boards.find((board) => board.projectId === id);

  if (!board) {
    return NextResponse.json({ error: "Board not found" }, { status: 404 });
  }

  return NextResponse.json(board);
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();

    // Validate required field
    if (!body.id) {
      return NextResponse.json({ error: "Board id is required in request body" }, { status: 400 });
    }

    const boards = await readBoards();
    const boardIndex = boards.findIndex((board) => board.projectId === body.id);

    if (boardIndex === -1) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    // Merge the updates with the existing board
    const updatedBoard = {
      ...boards[boardIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    boards[boardIndex] = updatedBoard;
    await writeBoards(boards);

    return NextResponse.json({ success: true, message: "Board updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update board" }, { status: 500 });
  }
};
