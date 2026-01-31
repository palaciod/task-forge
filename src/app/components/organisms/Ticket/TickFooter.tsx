import React from "react";
import { Button } from "@/app/components/atoms/Button/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/molecules/Select/Select";

const STORY_POINTS = [0, 1, 2, 3, 5, 8, 13];

const TickFooter = () => {
  return (
    <div className="flex gap-2 w-full">
      <Button variant="default" className="flex-1">
        Expand
      </Button>
      <Select>
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