import { Label } from "@/app/components/atoms/Label/Label";
import { Input } from "@/app/components/atoms/Input/Input";
import { forwardRef } from "react";

type ColorPickerProps = {
  id: string;
  label: string;
  value: string;
  onColorChange: (color: string) => void;
  className?: string;
} & Omit<React.ComponentProps<typeof Input>, "type" | "value" | "onChange">;

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ id, label, value, onColorChange, className, ...inputProps }, ref) => {
    return (
      <div className={`space-y-2 ${className ?? ""}`}>
        <Label htmlFor={id}>{label}</Label>
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-2xl border"
            style={{ background: value }}
            aria-hidden
          />
          <Input
            id={id}
            ref={ref}
            className="font-mono"
            value={value}
            onChange={(e) => onColorChange(e.target.value)}
            {...inputProps}
          />
          <input
            type="color"
            value={value}
            onChange={(e) => onColorChange(e.target.value)}
            className="h-10 w-12 cursor-pointer rounded-2xl border bg-transparent p-1"
            aria-label={`Pick ${label.toLowerCase()}`}
          />
        </div>
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";
