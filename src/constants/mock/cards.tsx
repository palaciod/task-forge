import { Button } from "@/app/components/atoms/Button/Button";
import { CardType } from "@/types/Card";

export const SimpleTickets: CardType[] = [
    {
      id: "card-1",
      title: "Settings",
      Description: "Manage your account settings and preferences",
      action: {
        onClick: () => console.log("Settings clicked"),
        name: "Settings",
      },
      children: (
        <span>
          This is an example of a card component used to display information and
        </span>
      ),
      footer: (
        <div className="flex gap-2">
          <Button>Click me!</Button>
          <Button variant="secondary">Click me!</Button>
        </div>
      ),
    },
    {
      id: "card-2",
      title: "Settings",
      Description: "Manage your account settings and preferences",
      action: {
        onClick: () => console.log("Settings clicked"),
        name: "Settings",
      },
      children: (
        <span>
          This is an example of a card component used to display information and
        </span>
      ),
      footer: (
        <div className="flex gap-2">
          <Button>Click me!</Button>
          <Button variant="secondary">Click me!</Button>
        </div>
      ),
    },
    {
      id: "card-3",
      title: "Settings",
      Description: "Manage your account settings and preferences",
      action: {
        onClick: () => console.log("Settings clicked"),
        name: "Settings",
      },
      children: (
        <span>
          This is an example of a card component used to display information and
        </span>
      ),
      footer: (
        <div className="flex gap-2">
          <Button>Click me!</Button>
          <Button variant="secondary">Click me!</Button>
        </div>
      ),
    },
    {
      id: "card-4",
      title: "Settings",
      Description: "Manage your account settings and preferences",
      action: {
        onClick: () => console.log("Settings clicked"),
        name: "Settings",
      },
      children: (
        <span>
          This is an example of a card component used to display information and
        </span>
      ),
      footer: (
        <div className="flex gap-2">
          <Button>Click me!</Button>
          <Button variant="secondary">Click me!</Button>
        </div>
      ),
    },
];