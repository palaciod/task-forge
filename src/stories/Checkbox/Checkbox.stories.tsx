import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@/app/components/atoms/CheckBox/Checkbox";
import { Label } from "@/app/components/atoms/Label/Label";
import { useState } from "react";
import { ThemeProvider } from "@/app/context/ThemeProvider/ThemeProvider";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => <Checkbox />,
};

export const Checked: Story = {
  render: () => <Checkbox defaultChecked />,
};

export const Disabled: Story = {
  render: () => <Checkbox disabled />,
};

export const DisabledChecked: Story = {
  render: () => <Checkbox disabled defaultChecked />,
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms" className="cursor-pointer">
        Accept terms and conditions
      </Label>
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveCheckbox() {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="interactive"
            checked={checked}
            onCheckedChange={(checked) => setChecked(checked as boolean)}
          />
          <Label htmlFor="interactive" className="cursor-pointer">
            Click me to toggle
          </Label>
        </div>
        <p className="text-sm text-muted-foreground">
          Status: {checked ? "Checked ✓" : "Unchecked"}
        </p>
      </div>
    );
  },
};

export const MultipleItems: Story = {
  render: function MultipleCheckboxes() {
    const [items, setItems] = useState([
      { id: "1", label: "Task 1", checked: false },
      { id: "2", label: "Task 2", checked: true },
      { id: "3", label: "Task 3", checked: false },
      { id: "4", label: "Task 4", checked: true },
    ]);

    const handleToggle = (id: string) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      );
    };

    return (
      <div className="space-y-3">
        <h3 className="font-semibold mb-2">Task List</h3>
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={item.id}
              checked={item.checked}
              onCheckedChange={() => handleToggle(item.id)}
            />
            <Label
              htmlFor={item.id}
              className={`cursor-pointer ${
                item.checked ? "line-through text-muted-foreground" : ""
              }`}
            >
              {item.label}
            </Label>
          </div>
        ))}
        <p className="text-sm text-muted-foreground mt-4">
          Completed: {items.filter((item) => item.checked).length} of{" "}
          {items.length}
        </p>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: function AllStatesCheckbox() {
    const [isDark, setIsDark] = useState(false);

    const variants = ["default", "destructive", "outline", "secondary"] as const;

    return (
      <div className={isDark ? "dark" : ""}>
        <div className="p-8 space-y-8 bg-background text-foreground min-h-screen">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Checkbox Showcase</h1>
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
                <div key={variant} className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox variant={variant} defaultChecked />
                    <Label>{variant} (checked)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox variant={variant} />
                    <Label>{variant} (unchecked)</Label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Basic States */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Basic States</h2>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox id="unchecked" />
                <Label htmlFor="unchecked">Unchecked</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="checked" defaultChecked />
                <Label htmlFor="checked">Checked</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="disabled" disabled />
                <Label htmlFor="disabled">Disabled</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="disabled-checked" disabled defaultChecked />
                <Label htmlFor="disabled-checked">Disabled Checked</Label>
              </div>
            </div>
          </div>

          {/* Form Example */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Form Example</h2>
            <div className="space-y-4 max-w-md border rounded-lg p-4">
              <h3 className="font-semibold">Notification Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="email-notif" defaultChecked />
                  <Label htmlFor="email-notif" className="cursor-pointer">
                    Email notifications
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="push-notif" defaultChecked />
                  <Label htmlFor="push-notif" className="cursor-pointer">
                    Push notifications
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sms-notif" />
                  <Label htmlFor="sms-notif" className="cursor-pointer">
                    SMS notifications
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="marketing" variant="destructive" />
                  <Label htmlFor="marketing" className="cursor-pointer">
                    Marketing emails (opt-in)
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
