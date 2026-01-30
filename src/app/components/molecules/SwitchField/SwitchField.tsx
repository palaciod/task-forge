import { Switch } from "@/app/components/atoms/Switch/Switch";

type SwitchFieldProps = {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  variant?: "default" | "card";
  className?: string;
};

export const SwitchField = ({
  label,
  description,
  checked,
  onCheckedChange,
  variant = "default",
  className,
}: SwitchFieldProps) => {
  if (variant === "card") {
    return (
      <div
        className={`flex items-center justify-between rounded-2xl border bg-muted/20 p-3 ${className ?? ""}`}
      >
        <div>
          <p className="text-sm font-medium">{label}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-end ${className ?? ""}`}>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
};
