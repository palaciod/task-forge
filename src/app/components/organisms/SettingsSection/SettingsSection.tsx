import React from "react";

type SettingsSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export const SettingsSection = ({
  title,
  description,
  children,
}: SettingsSectionProps) => {
  return (
    <>
      <div className="pb-2">
        <h2 className="text-sm font-semibold">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="border-t border-border/60" />
      {children}
    </>
  );
};
