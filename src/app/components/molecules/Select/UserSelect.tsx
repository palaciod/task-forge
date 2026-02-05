"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/app/components/atoms/Label/Label";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/atoms/Avatar/Avatar";
import { User as UserIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/molecules/Select/Select";
import type { User } from "@/types/User";

type UserSelectProps = {
  projectId: string;
  value: string | null;
  onValueChange: (userId: string | null, userName: string | null) => void;
  disabled?: boolean;
  label?: string;
  required?: boolean;
};

const UserSelect = ({
  projectId,
  value,
  onValueChange,
  disabled = false,
  label = "Assignee",
  required = false,
}: UserSelectProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Fetch users belonging to the project
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/Users?projectId=${projectId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [projectId]);

  const handleValueChange = (selectedValue: string) => {
    if (selectedValue === "unassigned") {
      onValueChange(null, "Unassigned");
    } else {
      const user = users.find((u) => u.id === selectedValue);
      if (user) {
        onValueChange(user.id, user.name);
      }
    }
  };

  // Find the selected user for display
  const selectedUser = value ? users.find((u) => u.id === value) : null;

  return (
    <div className="space-y-2">
      <Label htmlFor="assignee">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Select
        value={value || "unassigned"}
        onValueChange={handleValueChange}
        disabled={disabled || loadingUsers}
      >
        <SelectTrigger id="assignee">
          <SelectValue>
            {loadingUsers ? (
              <span className="text-muted-foreground">Loading...</span>
            ) : selectedUser ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={selectedUser.avatarUrl} />
                  <AvatarFallback className="text-[10px]">
                    {getInitials(selectedUser.name)}
                  </AvatarFallback>
                </Avatar>
                <span>{selectedUser.name}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                  <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <span>Unassigned</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="unassigned" className="py-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <span>Unassigned</span>
            </div>
          </SelectItem>
          {users.map((user) => (
            <SelectItem value={user.id} key={user.id} className="py-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback className="text-[10px]">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default UserSelect;
