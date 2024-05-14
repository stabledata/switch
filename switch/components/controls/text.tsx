import { SwitchInputFieldProps } from "switch/types";
import { Label } from "switch/components/ui/label";
import { Input } from "switch/components/ui/input";
import { Textarea } from "switch/components/ui/textarea";
import { cn } from "switch/lib/utils";

export const SwitchTextField = ({
  name,
  type,
  label,
  placeholder,
  helperText,
  errors,
  options,
  register,
  disabled,
  hidden,
}: SwitchInputFieldProps) => {
  const error = errors !== undefined ? errors[name] : undefined;

  return (
    <div className={cn("flex flex-col w-full items-start", hidden && "hidden")}>
      <Label htmlFor={name} className="py-2">
        {label}
      </Label>
      {error && error.message ? (
        <p className="text-red-700 text-sm my-1">{error.message as string}</p>
      ) : null}
      {type === "multiline" ? (
        <Textarea
          id={name}
          placeholder={placeholder}
          className={cn("my-2", error && "border-red-700")}
          disabled={disabled as boolean}
          {...register(name, options)}
        />
      ) : (
        <Input
          type={type}
          id={name}
          placeholder={placeholder}
          className={cn(error && "border-red-700")}
          disabled={disabled as boolean}
          {...register(name, options)}
        />
      )}
      {helperText ? <p className="text-sm mt-0">{helperText}</p> : null}
    </div>
  );
};
