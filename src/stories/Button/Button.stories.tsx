import type { Meta } from "@storybook/react";
import { Button } from "@/app/components/atoms/Button/Button";
import { useState } from "react";

const meta = {
  title: "Atoms/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

export const SimpleStory = () => {
  const [isDark, setIsDark] = useState(false);
  const variants = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const;
  const sizes = ["sm", "default", "lg"] as const;
  const iconSizes = ["icon-sm", "icon", "icon-lg"] as const;

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="p-8 space-y-8 bg-background text-foreground min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Button Showcase</h1>
          <button
            onClick={() => setIsDark(!isDark)}
            className="px-4 py-2 rounded-full border border-input bg-background hover:bg-accent"
          >
            {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Button Variants & Sizes</h2>
        <div className="space-y-6">
          {variants.map((variant) => (
            <div key={variant} className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground capitalize">{variant}</h3>
              <div className="flex items-center gap-4 flex-wrap">
                {sizes.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    {size} button
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Icon Buttons</h2>
        <div className="space-y-6">
          {variants.map((variant) => (
            <div key={variant} className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground capitalize">{variant}</h3>
              <div className="flex items-center gap-4">
                {iconSizes.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
