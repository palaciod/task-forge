import { IconName } from "./Icon";
import { ReactNode } from "react";

export type CardAction = {
  onClick: () => void;
  name?: IconName;
};

export type CardType = {
  id: string;
  title: string;
  Description: string;
  action: CardAction;
  children?: ReactNode;
  footer?: ReactNode;
};
