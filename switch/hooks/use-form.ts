import {
  FieldErrors,
  FieldValues,
  UseFormReturn,
  useForm as useRHF,
} from "react-hook-form";
import { SwitchInputField } from "../types.js";

export type SubmitHandler<T> = (fd: FormData, state: T) => void | Promise<void>;

export type Form<T> = UseFormReturn & {
  fields: SwitchInputField[];
  onSubmit: SubmitHandler<T>;
};

export const useForm = <T>(
  fields: SwitchInputField[],
  onSubmit: SubmitHandler<T>
): Form<T> => {
  // collect defined default values
  const defaultValues = Object.values(fields)
    .filter((field) => field.defaultValue !== undefined)
    .map((field) => ({
      name: field.name,
      value: field.defaultValue,
    }))
    .reduce(
      (builder, { name, value }) => ({
        ...builder,
        [name]: value,
      }),
      {}
    );

  // non-string defaults need to be serialized
  const form = useRHF({ defaultValues });

  return {
    ...form,
    fields,
    onSubmit,
  };
};

export type SwitchBoard<T> = UseFormReturn & {
  errors?: FieldErrors;
  handleSubmitWithFormData: (data: FieldValues) => FormData;
  changedState: Partial<T>;
};

// this is an internal hook used by the form component
// as a liaison to the react hook form internals, though for the
// most part they are already exposed and could probably just be used
// directly there - this was legacy from RDF days, just cleaned up a bit
export const useInputSwitches = <T extends object>(
  form: Form<T>
): SwitchBoard<T> => {
  const {
    formState: { errors = {} },
    watch,
    onSubmit,
  } = form ?? {};

  // observe changes as they happen for switches that are "realtime" enabled
  const changedState = Object.values(form.fields)
    .filter((field: SwitchInputField) => field.realtime)
    .map((field: SwitchInputField) => ({
      name: field.name,
      value: watch(field.name),
    }))
    .reduce(
      (builder, { name, value }) => ({
        ...builder,
        [name]: value,
      }),
      {}
    );

  // transform results into FormData
  const handleSubmitWithFormData = (data: FieldValues): FormData => {
    const fd = new FormData();
    const finalState: Record<string, object | string | number | boolean> = {};
    // append each field to form data depending on file type
    Object.entries(data)
      .filter(([, value]) => !!value) // only send defined fields
      .forEach(([key, value]) => {
        if (value instanceof File) {
          fd.append(key, value, value.name);
          // make stateful object friendlier for uploads
          finalState[key] = {
            name: value.name,
            type: value.type,
            size: value.size,
          };
        } else {
          // otherwise, just set the kv pair.
          fd.set(key, value);
          finalState[key] = value;
        }
      });

    void onSubmit(fd, finalState as T);
    return fd;
  };

  return {
    ...form,
    changedState,
    errors,
    handleSubmitWithFormData,
  };
};
