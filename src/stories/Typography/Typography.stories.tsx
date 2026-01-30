import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "@/app/components/atoms/Typography/Typography";

const meta = {
  title: "Atoms/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "p", "lead", "small", "muted", "label", "code"],
      description: "The visual style variant to apply",
    },
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "p", "span", "label", "div", "code"],
      description: "The HTML element to render",
    },
    children: {
      control: "text",
      description: "The text content",
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: "h1",
    children: "Heading 1",
  },
};

export const Heading2: Story = {
  args: {
    variant: "h2",
    children: "Heading 2",
  },
};

export const Heading3: Story = {
  args: {
    variant: "h3",
    children: "Heading 3",
  },
};

export const Heading4: Story = {
  args: {
    variant: "h4",
    children: "Heading 4",
  },
};

export const Paragraph: Story = {
  args: {
    variant: "p",
    children: "This is a regular paragraph with default styling.",
  },
};

export const Lead: Story = {
  args: {
    variant: "lead",
    children: "This is a lead paragraph with slightly larger text for introductions.",
  },
};

export const Small: Story = {
  args: {
    variant: "small",
    children: "This is small text for captions or footnotes.",
  },
};

export const Muted: Story = {
  args: {
    variant: "muted",
    children: "This is muted text with lower contrast for secondary information.",
  },
};

export const Label: Story = {
  args: {
    variant: "label",
    children: "Label Text",
  },
};

export const Code: Story = {
  args: {
    variant: "code",
    children: "const example = true;",
  },
};

export const CustomElement: Story = {
  args: {
    variant: "h2",
    as: "div",
    children: "H2 styling but rendered as a div",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="lead">
        Lead paragraph - This is a slightly larger paragraph typically used for introductions or important text.
      </Typography>
      <Typography variant="p">
        Regular paragraph - This is the standard text style used for body content throughout the application.
      </Typography>
      <Typography variant="small">
        Small text - Used for captions, footnotes, or less important information.
      </Typography>
      <Typography variant="muted">
        Muted text - Secondary information with reduced visual prominence.
      </Typography>
      <Typography variant="label">Form Label</Typography>
      <Typography variant="code">npm install @taskforge/ui</Typography>
    </div>
  ),
};
