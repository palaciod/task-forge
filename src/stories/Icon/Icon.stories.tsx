// Icon.stories.tsx
import type { Meta } from "@storybook/react";
import { Icon } from "@/app/components/atoms/Icon/Icon";
import { Button } from "@/app/components/atoms/Button/Button";
import { useMemo, useState } from "react";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;

const ICONS = [
  "Check",
  "X",
  "Search",
  "ArrowRight",
  "ArrowLeft",
  "Plus",
  "Minus",
  "Trash2",
  "Pencil",
  "Settings",
  "User",
  "Mail",
  "Bell",
  "LayoutDashboard",
] as const;

type IconName = (typeof ICONS)[number];

export const AllIcons = () => {
  const [search, setSearch] = useState("");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");

  const filteredIcons = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ICONS;
    return ICONS.filter((name) => name.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Icon Gallery</h1>
        <p className="text-muted-foreground">{filteredIcons.length} icons</p>

        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <div className="flex gap-2">
            <Button onClick={() => setSize("sm")} variant={size === "sm" ? "default" : "secondary"} size="sm">
              Small
            </Button>
            <Button onClick={() => setSize("md")} variant={size === "md" ? "default" : "secondary"} size="sm">
              Medium
            </Button>
            <Button onClick={() => setSize("lg")} variant={size === "lg" ? "default" : "secondary"} size="sm">
              Large
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
        {filteredIcons.map((iconName) => (
          <div
            key={iconName}
            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors group cursor-pointer"
            title={iconName}
          >
            <Icon name={iconName as IconName} size={size} className="text-foreground" />
            <span className="text-xs text-center text-muted-foreground group-hover:text-foreground break-all line-clamp-2">
              {iconName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
