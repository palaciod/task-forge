import React from "react";
import { Button } from "@/app/components/atoms/Button/Button";
import { BUTTON_VARIANTS } from "@/types/theme";
import { useRouter, useParams } from "next/navigation";
import { useBoardContext } from "@/app/context/BoardContext/BoardContext";
import type { Sprint } from "@/types/Project";

type ButtonMenuProps = {
  buttons: {
    label: string;
    variant: BUTTON_VARIANTS;
    action: (router?: any, projectId?: string, currentSprint?: Sprint | null) => void;
  }[];
};

const ButtonMenu = ({ buttons }: ButtonMenuProps) => {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.projectId as string | undefined;
  const { currentSprint } = useBoardContext();

  return (
    <div className="flex gap-2">
      {buttons?.map((button) => (
        <Button onClick={() => button?.action(router, projectId, currentSprint)} variant={button.variant}>
          {button.label}
        </Button>
      ))}
    </div>
  );
};

export default ButtonMenu;
