import { SwitchInputFieldProps } from "switch/types";
import { Label } from "switch/components/ui/label";
import { Input } from "switch/components/ui/input";
/**
 *
 * @props see {@link RDFTextFieldProps}
 * @returns field with given options
 */
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
  // hidden,
}: SwitchInputFieldProps) => {
  const labelClasses = ["label", `label-${name}`];
  const inputClasses = ["input", `input-${name}`];
  const error = errors !== undefined ? errors[name] : undefined;
  if (error) {
    inputClasses.push("input-has-error");
    labelClasses.push("label-has-error");
  }

  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor={name}>{label}</Label>
        <Input
          type={type}
          id={name}
          placeholder={placeholder}
          {...register(name, options)}
          disabled={disabled as boolean}
        />
      </div>
      {/* <RDFErrorMessage error={error} /> */}
      {JSON.stringify(error)}
      {helperText}
      {/* <RDFHelpText helper={helper} /> */}
    </div>
  );
};
