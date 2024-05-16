import { Controller } from "react-hook-form";
import { Label } from "../ui/label.js";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group.js";
import { cn, widthToClassName } from "../../lib/utils.js";
import { Help } from "../help.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../ui/select.js";
import type { ControlledInput } from "../../types.js";

export const SwitchChoice = ({
  name,
  type,
  label,
  placeholder = "Select an option",
  help,
  control,
  options,
  errors,
  disabled,
  choices = [],
  hidden,
  width,
}: ControlledInput) => {
  const error = errors !== undefined ? errors[name] : undefined;

  if (choices === undefined) {
    return null;
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={options}
      render={({ field }) => {
        return (
          <div className={cn("flex flex-col gap-3 w-full", hidden && "hidden")}>
            <Label
              htmlFor={name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </Label>
            <Help help={help} />
            {error && error.message ? (
              <p className="text-red-700 text-sm">{error.message as string}</p>
            ) : null}

            {type === "radio" ? (
              <RadioGroup
                id={name}
                disabled={disabled}
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                {choices.map(({ value, label: choiceLabel, disabled }, i) => (
                  <div
                    className="flex items-center space-x-2 w-full"
                    key={`choice-${name}-${i}`}
                  >
                    <RadioGroupItem
                      id={choiceLabel}
                      value={value as string}
                      disabled={disabled}
                      className="border-2 peer"
                    />
                    <Label
                      htmlFor={choiceLabel}
                      className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-30"
                    >
                      {choiceLabel}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className={cn(widthToClassName(width))}>
                  {choices.find((c) => c.value === field.value)?.label ??
                    placeholder}
                </SelectTrigger>
                <SelectContent>
                  {choices.map(({ value, label: choiceLabel, disabled }, i) => (
                    <SelectItem
                      key={`choice-${name}-${i}`}
                      value={value as string}
                      disabled={disabled}
                    >
                      {choiceLabel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        );
      }}
    />
  );
};
