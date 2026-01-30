'use client';
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
import { CardType } from "@/types/Card";

export type CardProps = Omit<CardType, 'id'>;


const Card = ({ title, Description, action, children, footer }: CardProps) => {
  return (
    <ShadcnCard className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{Description}</CardDescription>
        <CardAction>
          <Button
            variant="outline"
            size="icon"
            onClick={() => action?.onClick()}
          >
            {action?.name && <Icon name={action?.name} />}
          </Button>
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
