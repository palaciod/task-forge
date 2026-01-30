"use client";

import { icons } from "lucide-react";
import { cn } from "@/lib/utils";
import { type IconProps, sizeMap } from "@/types/Icon";

export const Icon = ({
  name,
  size = "md",
  className,
  ...props
}: IconProps) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) return null;

  return (
    <LucideIcon
      className={cn(sizeMap[size], "shrink-0", className)}
      aria-hidden="true"
      {...props}
    />
  );
};
