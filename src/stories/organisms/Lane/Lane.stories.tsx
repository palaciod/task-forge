import type { Meta } from "@storybook/react";
import Lane from "@/app/components/organisms/Lane/Lane";
import { ThemeProvider } from "@/app/context/ThemeProvider/ThemeProvider";
import { SimpleTickets } from "@/constants/mock/cards";

const meta = {
  title: "Organisms/Lane",
  component: Lane,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Lane>;

export default meta;

export const LaneStory = () => {
    return (
        <Lane Title="Development" tickets={SimpleTickets} />
    )
}