import React from "react";

type SettingsCardProps = {
  children: React.ReactNode;
  className?: string;
};

export const SettingsCard = ({ children, className }: SettingsCardProps) => {
  return (
    <div
      className={`rounded-3xl border bg-card p-6 shadow-sm ${className ?? ""}`}
    >
      {children}
    </div>
  );
};
