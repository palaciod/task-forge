import { Label } from "@/app/components/atoms/Label/Label";
import { Input } from "@/app/components/atoms/Input/Input";
import { forwardRef } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  helperText?: string;
  className?: string;
} & React.ComponentProps<typeof Input>;

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ id, label, helperText, className, ...inputProps }, ref) => {
    return (
      <div className={`space-y-2 ${className ?? ""}`}>
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} ref={ref} {...inputProps} />
        {helperText && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
