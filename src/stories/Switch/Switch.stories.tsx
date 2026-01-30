import type { Meta } from "@storybook/react";
import { Switch } from "@/app/components/atoms/Switch/Switch";
import { Label } from "@/app/components/atoms/Label/Label";
import { useState } from "react";

const meta = {
  title: "Atoms/Switch",
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;

export const AllStates = () => {
  const [isDark, setIsDark] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  const variants = ["default", "destructive", "outline", "secondary"] as const;

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="p-8 space-y-8 bg-background text-foreground min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Switch Showcase</h1>
          <button
            onClick={() => setIsDark(!isDark)}
            className="px-4 py-2 rounded-full border border-input bg-background hover:bg-accent"
          >
            {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Variants */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Variants</h2>
          <div className="space-y-4">
            {variants.map((variant) => (
              <div key={variant} className="flex items-center gap-4">
                <Switch variant={variant} defaultChecked />
                <Switch variant={variant} />
                <span className="text-sm capitalize">{variant}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Default States */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Interactive States</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Switch checked={checked1} onCheckedChange={setChecked1} />
              <span className="text-sm">{checked1 ? "Checked" : "Unchecked"}</span>
            </div>
            <div className="flex items-center gap-4">
              <Switch checked={checked2} onCheckedChange={setChecked2} />
              <span className="text-sm">{checked2 ? "Checked" : "Unchecked"}</span>
            </div>
          </div>
        </div>

        {/* With Labels */}
        <div>
          <h2 className="text-xl font-semibold mb-4">With Labels</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Switch id="notifications" />
              <Label htmlFor="notifications">Enable notifications</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="marketing" defaultChecked />
              <Label htmlFor="marketing">Marketing emails</Label>
            </div>
          </div>
        </div>

        {/* Disabled States */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Disabled States</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Switch disabled />
              <span className="text-sm text-muted-foreground">Disabled (unchecked)</span>
            </div>
            <div className="flex items-center gap-4">
              <Switch disabled defaultChecked />
              <span className="text-sm text-muted-foreground">Disabled (checked)</span>
            </div>
          </div>
        </div>

        {/* In Card Context */}
        <div>
          <h2 className="text-xl font-semibold mb-4">In Card Context</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl border bg-muted/20 p-4">
              <div>
                <p className="text-sm font-medium">Dark mode</p>
                <p className="text-xs text-muted-foreground">Enable dark theme for the app</p>
              </div>
              <Switch checked={isDark} onCheckedChange={setIsDark} />
            </div>
            <div className="flex items-center justify-between rounded-2xl border bg-muted/20 p-4">
              <div>
                <p className="text-sm font-medium">Auto-save</p>
                <p className="text-xs text-muted-foreground">Automatically save your work</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-2xl border bg-muted/20 p-4">
              <div>
                <p className="text-sm font-medium">Experimental features</p>
                <p className="text-xs text-muted-foreground">Enable beta features (may be unstable)</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Unchecked = () => <Switch />;

export const Checked = () => <Switch defaultChecked />;

export const Destructive = () => <Switch variant="destructive" defaultChecked />;

export const Outline = () => <Switch variant="outline" defaultChecked />;

export const Secondary = () => <Switch variant="secondary" defaultChecked />;

export const DisabledUnchecked = () => <Switch disabled />;

export const DisabledChecked = () => <Switch disabled defaultChecked />;
