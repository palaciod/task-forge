"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/shadcn/table";
import { Badge } from "@/app/components/atoms/Badge/Badge";
import { Button } from "@/app/components/atoms/Button/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/molecules/Select/Select";
import type { TicketType } from "@/types/Card";
import type { Board } from "@/types/Board";
import type { User } from "@/types/User";
import TicketViewModal from "@/app/components/organisms/Modal/TicketViewModal/TicketVIewModal";
import Search from "@/app/components/molecules/Search/Search";
import { tiptapToPlainText } from "@/app/utils/utils";

type BacklogProps = {
  projectId: string;
};

type SortConfig = {
  column: keyof TicketType | null;
  direction: "asc" | "desc";
};

const Backlog = ({ projectId }: BacklogProps) => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [board, setBoard] = useState<Board | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal state
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter states
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Sort state
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: null,
    direction: "asc",
  });

  useEffect(() => {
    if (projectId) {
      loadData();
    }
  }, [projectId]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch tickets for the project
      const ticketsResponse = await fetch(`/api/tickets?projectId=${projectId}`);
      if (!ticketsResponse.ok) {
        throw new Error("Failed to load tickets");
      }
      const ticketsData = await ticketsResponse.json();
      setTickets(ticketsData);

      // Fetch board for lane information
      const boardResponse = await fetch(`/api/boards?id=${projectId}`);
      if (boardResponse.ok) {
        const boardData = await boardResponse.json();
        setBoard(boardData);
      }

      // Fetch users
      const usersResponse = await fetch("/api/Users");
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setIsModalOpen(true);
  };

  const handleSort = (column: keyof TicketType) => {
    setSortConfig((prev) => ({
      column,
      direction: prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getLaneName = (laneId?: string) => {
    if (!laneId || !board) return "N/A";
    const lane = board.lanes?.find((l) => l.id === laneId);
    return lane?.name || "Unknown";
  };

  const getUserName = (userId?: string | null) => {
    if (!userId) return "Unassigned";
    const user = users.find((u) => u.id === userId);
    return user?.name || "Unknown";
  };

  // Filter and sort tickets
  const filteredAndSortedTickets = useMemo(() => {
    let result = [...tickets];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((ticket) => {
        const titleMatch = ticket.title.toLowerCase().includes(query);
        const descriptionText = tiptapToPlainText(ticket.Description).toLowerCase();
        const descriptionMatch = descriptionText.includes(query);
        return titleMatch || descriptionMatch;
      });
    }

    // Apply filters
    if (typeFilter !== "all") {
      result = result.filter((ticket) => ticket.type === typeFilter);
    }
    if (priorityFilter !== "all") {
      result = result.filter((ticket) => ticket.priority === priorityFilter);
    }
    if (assigneeFilter !== "all") {
      if (assigneeFilter === "unassigned") {
        result = result.filter((ticket) => !ticket.assigneeId);
      } else {
        result = result.filter((ticket) => ticket.assigneeId === assigneeFilter);
      }
    }

    // Apply sorting
    if (sortConfig.column) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.column!];
        const bValue = b[sortConfig.column!];

        if (aValue === undefined || aValue === null) return 1;
        if (bValue === undefined || bValue === null) return -1;

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [tickets, searchQuery, typeFilter, priorityFilter, assigneeFilter, sortConfig]);

  const getPriorityVariant = (priority: string | undefined) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Loading backlog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-destructive">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Filters */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Type:</span>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="task">Task</SelectItem>
              <SelectItem value="bug">Bug</SelectItem>
              <SelectItem value="story">Story</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Priority:</span>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Assignee:</span>
          <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Search 
          onClick={(value) => setSearchQuery(value)}
          onChange={(value) => setSearchQuery(value)}
        />

        {(typeFilter !== "all" || priorityFilter !== "all" || assigneeFilter !== "all" || searchQuery) && (
          <Button
            variant="ghost"
            onClick={() => {
              setTypeFilter("all");
              setPriorityFilter("all");
              setAssigneeFilter("all");
              setSearchQuery("");
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredAndSortedTickets.length} of {tickets.length} tickets
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("title")}
              >
                Title {sortConfig.column === "title" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("type")}
              >
                Type {sortConfig.column === "type" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("priority")}
              >
                Priority {sortConfig.column === "priority" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("points")}
              >
                Points {sortConfig.column === "points" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No tickets found
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedTickets.map((ticket) => (
                <TableRow
                  key={ticket.id}
                  className="cursor-pointer"
                  onClick={() => handleRowClick(ticket.id)}
                >
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{ticket.title}</span>
                      <span className="text-xs text-muted-foreground">
                        #{ticket.ticketNumber}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{ticket.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityVariant(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{getUserName(ticket.assigneeId)}</TableCell>
                  <TableCell>{ticket.points ?? "-"}</TableCell>
                  <TableCell>{getLaneName(ticket.laneId)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Ticket View Modal */}
      {selectedTicketId && (
        <TicketViewModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          ticketId={selectedTicketId}
          onTicketUpdated={loadData}
        />
      )}
    </div>
  );
};

export default Backlog;
