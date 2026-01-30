import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/app/components/atoms/Input/Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "The type of input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email...",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter a number...",
  },
};

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
    value: "Cannot edit this",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Pre-filled value",
  },
};

export const Invalid: Story = {
  args: {
    placeholder: "Invalid input",
    "aria-invalid": true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="space-y-2 w-80">
      <label htmlFor="input-1" className="text-sm font-medium">
        Email Address
      </label>
      <Input id="input-1" type="email" placeholder="you@example.com" {...args} />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 w-80">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input id="name" placeholder="John Doe" />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input id="password" type="password" placeholder="••••••••" />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone
        </label>
        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
      </div>
    </form>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input placeholder="Default height (h-9)" />
      <Input placeholder="Custom height" className="h-8 text-xs" />
      <Input placeholder="Larger height" className="h-11 text-base" />
    </div>
  ),
};
