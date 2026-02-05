import React, { useState } from "react";
import { Button } from "@/app/components/atoms/Button/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/molecules/Select/Select";

const STORY_POINTS = [0, 1, 2, 3, 5, 8, 13];

type TickFooterProps = {
  ticketId: string;
  points?: number;
};

const TickFooter = ({ ticketId, points }: TickFooterProps) => {
  const [currentPoints, setCurrentPoints] = useState<number | undefined>(points);
  const [isUpdating, setIsUpdating] = useState(false);

  const handlePointsChange = async (value: string) => {
    const newPoints = Number(value);
    setCurrentPoints(newPoints);
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/tickets?ticketId=${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points: newPoints }),
      });

      if (!response.ok) {
        setCurrentPoints(points);
        console.error("Failed to update points");
      }
    } catch (error) {
      setCurrentPoints(points);
      console.error("Error updating points:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex gap-2 w-full">
      <Button variant="default" className="flex-1">
        Expand
      </Button>
      <Select
        value={currentPoints?.toString()}
        onValueChange={handlePointsChange}
        disabled={isUpdating}
      >
        <SelectTrigger>
          <SelectValue placeholder="Points" />
        </SelectTrigger>
        <SelectContent>
          {STORY_POINTS.map((point) => (
            <SelectItem key={point} value={point.toString()}>
              {point}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TickFooter;