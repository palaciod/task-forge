import type { Meta } from "@storybook/react";
import Card from "@/app/components/organisms/Card/Card";
import { Button } from "@/app/components/atoms/Button/Button";
import { ThemeProvider } from "@/app/context/ThemeProvider/ThemeProvider";

const meta = {
  title: "Organisms/Card",
  component: Card,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;

export const CardStory = () => {
  return (
    <Card
      title="Settings"
      Description="Manage your account settings and preferences"
      action={{
        onClick: () => console.log("Settings clicked"),
        name: "Settings",
      }}
      children={
        <span>
          This is an example of a card component used to display information and
        </span>
      }
      footer={
        <div className="flex gap-2">
          <Button>Click me!</Button>
          <Button variant="secondary">Click me!</Button>
        </div>
      }
    />
  );
};
