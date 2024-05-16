import { Label } from "../ui/label.js";
import { Input } from "../ui/input.js";
import { Textarea } from "../ui/textarea.js";
import { cn, widthToClassName } from "../../lib/utils.js";
import type { SwitchInputFieldProps } from "../../types.js";
import { Help } from "../help.js";

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
