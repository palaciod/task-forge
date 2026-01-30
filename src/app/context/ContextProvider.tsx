"use client";

import { ThemeProvider } from "@/app/context/ThemeProvider/ThemeProvider";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider>
      {/* Add other providers here */}
      {children}
    </ThemeProvider>
  );
}
