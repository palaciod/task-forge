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
