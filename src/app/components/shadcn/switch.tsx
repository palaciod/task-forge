"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent shadow-md transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-secondary data-[state=unchecked]:hover:bg-secondary/80 dark:data-[state=unchecked]:bg-white/10 dark:data-[state=unchecked]:hover:bg-white/20",
  {
    variants: {
      variant: {
        default:
          "data-[state=checked]:bg-cta-primary data-[state=checked]:shadow-cta-primary/30 data-[state=checked]:hover:bg-[var(--cta-primary-hover)] focus-visible:ring-cta-primary/30",
        destructive:
          "data-[state=checked]:bg-cta-destructive data-[state=checked]:shadow-cta-destructive/30 data-[state=checked]:hover:bg-[var(--cta-destructive-hover)] focus-visible:ring-cta-destructive/30",
        outline:
          "data-[state=checked]:bg-foreground data-[state=checked]:shadow-foreground/20 data-[state=checked]:hover:bg-foreground/90 focus-visible:ring-ring/50 dark:data-[state=checked]:bg-white dark:data-[state=checked]:hover:bg-white/90",
        secondary:
          "data-[state=checked]:bg-primary data-[state=checked]:shadow-primary/20 data-[state=checked]:hover:bg-primary/90 focus-visible:ring-primary/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Switch({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> &
  VariantProps<typeof switchVariants>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ variant, className }))}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-5 rounded-full bg-white ring-0 shadow-sm transition-transform",
          "data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0.5"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch, switchVariants }
