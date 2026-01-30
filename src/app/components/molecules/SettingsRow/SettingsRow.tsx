import React from "react";

type SettingsRowProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export const SettingsRow = ({ title, description, children }: SettingsRowProps) => {
  return (
    <div className="flex flex-col gap-3 py-5 md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-6">
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>

      <div className="min-w-0 w-full md:w-[420px] md:max-w-full">
        {children}
      </div>
    </div>
  );
};
