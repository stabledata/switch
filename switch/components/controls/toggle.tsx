import { Controller } from "react-hook-form";
import { Label } from "../ui/label.js";
import { Checkbox } from "../ui/checkbox.js";
import { Switch } from "../ui/switch.js";
import type { ControlledInput } from "../../types.js";
import { cn } from "../../lib/utils.js";
import { Help } from "../help.js";

export const SwitchToggle = ({
  name,
  type,
  label,
  help,
  control,
  options,
  errors,
  disabled,
  hidden,
}: ControlledInput) => {
  const error = errors !== undefined ? errors[name] : undefined;

  return (
    <Controller
      name={name}
      control={control}
      rules={options}
      render={({ field }) => {
        return (
          <div
            className={cn(
              "flex flex-col gap-3 w-full",
              hidden && "hidden",
              disabled && "opacity-50"
            )}
          >
            {error && error.message ? (
              <p className="text-red-700 text-sm">{error.message as string}</p>
            ) : null}

            {type === "switch" ? (
              <div className="flex items-start space-x-2 justify-between w-full">
                <div className="grow flex flex-col w-full gap-2 justify-start">
                  <Label
                    htmlFor={name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                  >
                    {label}
                  </Label>
                  <Help help={help} />
                </div>
                <Switch
                  id={name}
                  disabled={disabled}
                  checked={field.value}
                  onCheckedChange={(v) => field.onChange(!!v)}
                />
              </div>
            ) : (
              <div className="flex items-start justify-start space-x-2">
                <Checkbox
                  id={name}
                  disabled={disabled}
                  checked={field.value}
                  onCheckedChange={(v) => field.onChange(!!v)}
                />
                <div className="flex flex-col w-full gap-2 justify-start">
                  <Label
                    htmlFor={name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {label}
                  </Label>
                  <Help help={help} />
                </div>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
