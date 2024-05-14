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
  | "date"
  | "date-time";

export type Width = "full" | "half" | "third" | "quarter" | "short" | undefined;

// we _want_ to keep this serializable. though most of the time that
// will mean this is data rather than type checked code anyway.
type SerializableOptions = Partial<RegisterOptions>;

export type SwitchInputField = {
  type: SwitchInputType;
  name: string;
  // at least, from a primitive standpoint. we may want to add a "value
  // type" here... possibly.
  defaultValue?: string | number | boolean;
  label?: string;
  realtime?: boolean; // TBD - probably call it "realtime"
  placeholder?: string;
  help?: {
    text?: string;
    linkUrl?: string;
    linkText?: string;
  };
  disabled?: boolean;
  hidden?: boolean;
  width?: Width;
  // for media upload
  previewType?: "hero" | "thumb" | "attachment";
  options?: SerializableOptions;
  choices?: Choice[];
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

type Choice = {
  value: string | number | boolean;
  label: string;
  disabled?: boolean;
};
