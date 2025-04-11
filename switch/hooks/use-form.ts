import React from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormReturn,
  useForm as useRHF,
} from "react-hook-form";
import { SwitchInputField } from "../types.js";

export type SubmitHandler<T> = (fd: FormData, state: T) => void | Promise<void>;

export type Form<T> = {
  fields: SwitchInputField[];
  onSubmit: SubmitHandler<T>;
  onChange?: (data: Partial<T>) => void;
  realtime?: boolean;
};

export type SwitchBoardForm<T> = UseFormReturn & Form<T>;

export const useForm = <T>(form: Form<T>): SwitchBoardForm<T> => {
  const { fields, onSubmit } = form;
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
  const rhf = useRHF({ defaultValues, reValidateMode: "onBlur" });

  return {
    ...rhf,
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
  form: SwitchBoardForm<T>
): SwitchBoard<T> => {
  const {
    formState: { errors = {} },
    watch,
    onSubmit,
    realtime,
    onChange,
  } = form ?? {};

  // observe changes as they happen for switches that are "realtime" enabled
  const changedState = React.useMemo(
    () =>
      Object.values(form.fields)
        // fields can be realtime, or the whole form can be as well
        .filter((field: SwitchInputField) => field.realtime || realtime)
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
        ),
    [form.fields, realtime, watch]
  );

  // if there is an onChange handler in the hook opts, call it
  // note, you can subscribe in the Form props as well.
  React.useEffect(() => {
    if (changedState && onChange !== undefined) {
      onChange(changedState);
    }
  }, [changedState, onChange]);

  // transform results into FormData
  const handleSubmitWithFormData = React.useCallback(
    (data: FieldValues): FormData => {
      const fd = new FormData();
      const finalState: Record<string, object | string | number | boolean> = {};
      // append each field to form data depending on file type
      Object.entries(data)
        .filter(([, value]) => value !== undefined) // only send defined fields
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
    },
    [onSubmit]
  );

  return {
    ...form,
    changedState,
    errors,
    handleSubmitWithFormData,
  };
};
