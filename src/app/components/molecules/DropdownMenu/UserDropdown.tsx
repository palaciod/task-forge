"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/app/components/molecules/DropdownMenu/DropdownMenu";
import { Button } from "@/app/components/atoms/Button/Button";
import { Icon } from "@/app/components/atoms/Icon/Icon";

type UserDropdownProps = {
  onUserSettings?: () => void;
  onBoardSettings?: () => void;
  onTeamSettings?: () => void;
  onProjectSettings?: () => void;
};

const UserDropdown = ({
  onUserSettings,
  onBoardSettings,
  onTeamSettings,
  onProjectSettings,
}: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Icon name="User" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onUserSettings} className="mb-1">
            <Icon name="User" size="sm" />
            User Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onBoardSettings} className="mb-1">
            <Icon name="LayoutDashboard" size="sm" />
            Board Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onTeamSettings} className="mb-1">
            <Icon name="Users" size="sm" />
            Team Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onProjectSettings}>
            <Icon name="FolderOpen" size="sm" />
            Project Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
