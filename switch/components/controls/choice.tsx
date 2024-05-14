import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ControlledInput } from "switch/types";
import { cn } from "switch/lib/utils";
import { Help } from "../help";

export const SwitchChoice = ({
  name,
  type,
  label,
  help,
  control,
  options,
  errors,
  disabled,
  choices,
  hidden,
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
                {choices.map(({ value, label: choiceLabel, disabled }) => (
                  <div className="flex items-center space-x-2 w-full">
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
            ) : null}
          </div>
        );
      }}
    />
  );
};
