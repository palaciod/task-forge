"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  "peer border-input bg-background dark:bg-input/30 size-4 shrink-0 rounded-[4px] border shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "data-[state=checked]:bg-cta-primary data-[state=checked]:text-white data-[state=checked]:border-cta-primary data-[state=checked]:shadow-cta-primary/20 dark:data-[state=checked]:bg-cta-primary dark:data-[state=checked]:border-cta-primary hover:border-cta-primary/50 dark:hover:border-cta-primary/50 focus-visible:border-ring focus-visible:ring-ring/50",
        destructive:
          "data-[state=checked]:bg-cta-destructive data-[state=checked]:text-white data-[state=checked]:border-cta-destructive data-[state=checked]:shadow-cta-destructive/20 dark:data-[state=checked]:bg-cta-destructive dark:data-[state=checked]:border-cta-destructive hover:border-cta-destructive/50 dark:hover:border-cta-destructive/50 focus-visible:border-cta-destructive focus-visible:ring-cta-destructive/30",
        outline:
          "data-[state=checked]:bg-foreground data-[state=checked]:text-white data-[state=checked]:border-foreground data-[state=checked]:shadow-foreground/20 dark:data-[state=checked]:bg-white dark:data-[state=checked]:text-foreground dark:data-[state=checked]:border-white hover:border-foreground/50 dark:hover:border-white/50 focus-visible:border-ring focus-visible:ring-ring/50",
        secondary:
          "data-[state=checked]:bg-primary data-[state=checked]:text-white data-[state=checked]:border-primary data-[state=checked]:shadow-primary/20 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:border-primary hover:border-primary/50 dark:hover:border-primary/50 focus-visible:border-primary focus-visible:ring-primary/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Checkbox({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        checkboxVariants({ variant }),
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox, checkboxVariants }
