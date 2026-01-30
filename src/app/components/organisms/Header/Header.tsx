"use client";
import React, { FC } from "react";
import Search from "@/app/components/molecules/Search/Search";
import { Icon } from "@/app/components/atoms/Icon/Icon";
import { Button } from "@/app/components/shadcn/button";
import { useTheme } from "@/app/context/ThemeProvider/ThemeProvider";
import { THEMES } from "@/types/theme";
import { useRouter, useParams } from "next/navigation";
import UserDropdown from "@/app/components/molecules/DropdownMenu/UserDropdown";


const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const params = useParams();
  const projectId = params?.projectId as string | undefined;

  const handleBoardSettings = () => {
    if (projectId) {
      router.push(`/project/${projectId}/boardsettings`);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 h-16 border-b">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => router.push("/")}>
          Task Forge
        </Button>
      </div>
      <div className="flex flex-1 justify-center">
        <Search onClick={(value) => console.log(value)} />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleTheme()}
        >
          <Icon name={theme === THEMES.dark ? "Sun" : "Moon"} />
        </Button>
        <UserDropdown
          onUserSettings={() => console.log("User Settings")}
          onBoardSettings={handleBoardSettings}
          onTeamSettings={() => console.log("Team Settings")}
          onProjectSettings={() => console.log("Project Settings")}
        />
      </div>
    </header>
  );
};

export default Header;
