import { SwitchInputFieldProps } from "switch/types";
import { Label } from "switch/components/ui/label";
import { Input } from "switch/components/ui/input";
import { Textarea } from "switch/components/ui/textarea";
import { cn, widthToClassName } from "switch/lib/utils";
import { Help } from "../help";

export const SwitchTextField = ({
  name,
  type,
  label,
  placeholder,
  help,
  errors,
  width,
  options,
  register,
  disabled,
  hidden,
}: SwitchInputFieldProps) => {
  const error = errors !== undefined ? errors[name] : undefined;

  return (
    <div className={cn("flex flex-col w-full items-start", hidden && "hidden")}>
      <Label htmlFor={name} className="py-2 peer-disabled:opacity-70">
        {label}
      </Label>
      {error && error.message ? (
        <p className="text-red-700 text-sm my-1">{error.message as string}</p>
      ) : null}
      {type === "multiline" ? (
        <Textarea
          id={name}
          placeholder={placeholder}
          className={cn(
            "my-2 peer",
            widthToClassName(width),
            error && "border-red-700"
          )}
          disabled={disabled as boolean}
          {...register(name, options)}
        />
      ) : (
        <Input
          type={type}
          id={name}
          placeholder={placeholder}
          className={cn(
            "my-2 peer",
            widthToClassName(width),
            error && "border-red-700"
          )}
          disabled={disabled as boolean}
          {...register(name, options)}
        />
      )}
      <Help help={help} />
    </div>
  );
};
