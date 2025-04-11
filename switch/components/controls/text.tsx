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
    <div
      className={cn(
        "flex flex-col w-full items-start",
        hidden && "hidden",
        disabled && "opacity-50"
      )}
    >
      <Label htmlFor={name} className="pt-2 pb-1 opacity-70">
        {label}
      </Label>
      <Help help={help} />
      {error && error.message ? (
        <p className="my-1 text-sm text-red-700 dark:text-red-500">
          {error.message as string}
        </p>
      ) : null}
      {type === "multiline" ? (
        <Textarea
          id={name}
          placeholder={placeholder}
          className={cn(
            "my-2",
            widthToClassName(width),
            error && "border-red-700 dark:border-red-500"
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
            "my-2",
            widthToClassName(width),
            error && "border-red-700 dark:border-red-600"
          )}
          disabled={disabled as boolean}
          {...register(name, options)}
        />
      )}
    </div>
  );
};
