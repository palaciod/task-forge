"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { Board } from "@/types/Board";
import type { Project, Sprint } from "@/types/Project";
import { TicketType } from "@/types/Card";
import type { User } from "@/types/User";

type BoardContextType = {
  board: Board | null;
  project: Project | null;
  currentSprint: Sprint | null;
  tickets: TicketType[];
  users: User[];
  loading: boolean;
  error: string | null;
  setProjectId: (projectId: string | null) => void;
};

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [board, setBoard] = useState<Board | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSprint, setCurrentSprint] = useState<Sprint | null>(null);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const fetchBoard = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/boards?id=${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch board: ${response.statusText}`);
      }

      const data: Board = await response.json();
      setBoard(data);
    } catch (err) {
      throw err;
    }
  }, []);

  const fetchUsers = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/Users?projectId=${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }

      const usersData: User[] = await response.json();
      setUsers(usersData);
    } catch (err) {
      throw err;
    }
  }, []);

  const fetchProject = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/projects?id=${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch project: ${response.statusText}`);
      }

      const projectData: Project = await response.json();
      setProject(projectData);
      
      const lastSprint = projectData?.sprints?.at(-1) || null;
      setCurrentSprint(lastSprint);
      
      // Fetch tickets for current sprint if it exists
      if (lastSprint?.id) {
        const ticketsResponse = await fetch(`/api/tickets?sprintId=${lastSprint?.id}`);
        if (ticketsResponse.ok) {
          const ticketsData = await ticketsResponse.json();
          setTickets(ticketsData);
        }
      } else {
        setTickets([]);
      }
    } catch (err) {
      throw err;
    }
  }, []);

  useEffect(() => {
    if (!projectId) {
      setBoard(null);
      setProject(null);
      setCurrentSprint(null);
      setTickets([]);
      setUsers([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        await fetchBoard(projectId);
        await fetchProject(projectId);
        await fetchUsers(projectId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setBoard(null);
        setProject(null);
        setCurrentSprint(null);
        setTickets([]);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId, fetchBoard, fetchProject, fetchUsers]);

  return (
    <BoardContext.Provider
      value={{ board, project, currentSprint, tickets, users, loading, error, setProjectId }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
};
