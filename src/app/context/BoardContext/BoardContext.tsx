"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { Board } from "@/types/Board";

type BoardContextType = {
  board: Board | null;
  loading: boolean;
  error: string | null;
  fetchBoard: (projectId: string) => Promise<void>;
};

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBoard = useCallback(async (projectId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/boards?id=${projectId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch board: ${response.statusText}`);
      }
      
      const data = await response.json();
      setBoard(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setBoard(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <BoardContext.Provider value={{ board, loading, error, fetchBoard }}>
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
