import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /* Primary CTA */
        default:
          "rounded-full bg-cta-primary text-white shadow-md shadow-cta-primary/30 hover:bg-[var(--cta-primary-hover)] active:translate-y-px focus-visible:ring-cta-primary/30 dark:shadow-cta-primary/20",

        /* Destructive CTA */
        destructive:
          "rounded-full bg-cta-destructive text-white shadow-md shadow-cta-destructive/30 hover:bg-[var(--cta-destructive-hover)] active:translate-y-px focus-visible:ring-cta-destructive/30 dark:shadow-cta-destructive/20",

        /* White text ONLY in dark mode */
        outline:
          "rounded-full border border-input text-foreground hover:bg-accent hover:text-accent-foreground dark:border-white/40 dark:text-white dark:hover:bg-white/10",

        secondary:
          "rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-white/10 dark:text-white dark:hover:bg-white/20",

        ghost:
          "rounded-full text-foreground hover:bg-accent hover:text-accent-foreground dark:text-white dark:hover:bg-white/10",

        link:
          "rounded-full text-primary underline-offset-4 hover:underline dark:text-white dark:hover:text-white/90",
      },

      size: {
        default: "h-9 px-6 text-sm",
        sm: "h-8 px-4 text-xs",
        lg: "h-10 px-7 text-sm",
        icon: "size-9 p-0",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-10 p-0",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)



function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
