import { icons, type LucideProps } from "lucide-react";

export type IconName = keyof typeof icons;

export interface IconProps extends Omit<LucideProps, "size"> {
  name: IconName;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const sizeMap = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;
