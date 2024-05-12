import type {
  UseFormRegister,
  FieldValues,
  RegisterOptions,
  FieldErrors,
  Control,
} from "react-hook-form";

export type SwitchInputType =
  | "text"
  | "password"
  | "multiline"
  | "number"
  | "email"
  | "checkbox"
  | "select"
  | "radio"
  | "switch"
  | "media"
  | "list"
  | "table"
  | "date"
  | "date-time";

// this part should stay serializable, thus this options thing
type SerializableOptions = Partial<RegisterOptions>;
export type SwitchInputField = {
  type: SwitchInputType;
  name: string;
  // at least, from a primitive standpoint. we may want to add a "value
  // type" here... possibly.
  defaultValue?: string | number | boolean;
  label?: string;
  watch?: boolean;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  hidden?: boolean;
  // for media upload
  previewType?: "hero" | "thumb" | "attachment";
  options?: SerializableOptions;
};
export type SwitchInput = SwitchInputField;

export type SwitchInputFieldProps = SwitchInputField & {
  // react hook form inheritance FieldValues is generic Record<string,
  // any> so maybe we could do better, but maybe who cares
  register: UseFormRegister<FieldValues>;
  // options: RegisterOptions; // TODO: reconcile this, maybe we can
  // have some type of serialization that derives into something useful
  // here.
  errors?: FieldErrors;
};

export type ControlledInput = SwitchInputFieldProps & {
  control: Control<FieldValues, unknown>;
};
