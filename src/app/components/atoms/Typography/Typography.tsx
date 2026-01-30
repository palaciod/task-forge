// components/atoms/Typography.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "lead"
  | "small"
  | "muted"
  | "label"
  | "code";

type TypographyAs =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "span"
  | "label"
  | "div"
  | "code";

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: TypographyAs;
}

const variantClasses: Record<TypographyVariant, string> = {
  h1: "scroll-m-20 text-4xl font-bold tracking-tight",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "text-sm text-foreground leading-6",
  lead: "text-base text-foreground leading-7",
  small: "text-xs text-foreground",
  muted: "text-sm text-muted-foreground",
  label: "text-xs font-medium text-foreground",
  code: "font-mono text-xs bg-muted px-1.5 py-0.5 rounded",
};

const defaultAs: Record<TypographyVariant, TypographyAs> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  lead: "p",
  small: "span",
  muted: "p",
  label: "label",
  code: "code",
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = "p", as, className, ...props }, ref) => {
    const Component = (as ?? defaultAs[variant]) as any;

    return (
      <Component
        ref={ref}
        className={cn(variantClasses[variant], className)}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";
