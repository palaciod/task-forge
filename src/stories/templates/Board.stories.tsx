import type { Meta } from "@storybook/react";
import Board from "@/app/components/templates/Board/Board";

const meta = {
  title: "Templates/Board",
  component: Board,
} satisfies Meta<typeof Board>;

export default meta;

export const BoardStory = () => {
  return <Board />;
}
