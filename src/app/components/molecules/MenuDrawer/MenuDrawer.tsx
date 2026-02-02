'use client';
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/shadcn/drawer";
import { Button } from "@/app/components/atoms/Button/Button";
import { Menu } from "lucide-react";

const menuOptions = [
  { label: "Option 1", onClick: () => console.log("Option 1 clicked") },
  { label: "Option 2", onClick: () => console.log("Option 2 clicked") },
  { label: "Add User", onClick: () => console.log("Add User clicked") },
];

const MenuDrawer = () => {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-2 p-4">
            {menuOptions.map((option) => (
                <Button
                  key={option.label}
                  variant="ghost"
                  className="justify-start"
                  onClick={option.onClick}
                >
                  {option.label}
                </Button>
            ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuDrawer;
