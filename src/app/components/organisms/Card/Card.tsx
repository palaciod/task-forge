'use client';
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  Card as ShadcnCard,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/shadcn/card";
import { Icon } from "@/app/components/atoms/Icon/Icon";
import { Button } from "@/app/components/atoms/Button/Button";
import { ReactNode } from "react";
import { CardAction as CardActionType } from "@/types/Card";

export type CardProps = {
  ticketId: string;
  title: string;
  Description: string;
  action: CardActionType;
  actionContent?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
};


const Card = ({ ticketId, title, Description, action, actionContent, children, footer }: CardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: ticketId,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <ShadcnCard
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="w-full max-w-sm cursor-grab active:cursor-grabbing"
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{Description}</CardDescription>
        <CardAction>
          {actionContent ? (
            actionContent
          ) : (
            <Button
              variant="outline"
              size="icon"
              onClick={() => action?.onClick()}
            >
              {action?.name && <Icon name={action?.name} />}
            </Button>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {footer}
      </CardFooter>
    </ShadcnCard>
  );
};

export default Card;
