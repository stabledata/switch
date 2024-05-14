import { Form, useInputSwitches } from "../hooks/use-form";
import { SwitchToggle } from "./controls/toggle";
import { SwitchTextField } from "./controls/text";
import { Button } from "./ui/button";

// import { RDFDatePicker } from "./RDFDatePicker";

// import { RDFSelect } from "./RDFSelect";
// import { RDFRadio } from "./RDFRadios";
// import { RDFMedia } from "./RDFMedia";

// import { RDFList } from "./RDFList";
// import { RDFTable } from "./RDFTable";

export type FormProps<T> = {
  form: Form<T>;
  submitButtonLabel?: string | React.ReactNode;
  submitButtonLabelInFlight?: string | React.ReactNode;
  isInFlight?: boolean;
};

export function SwitchForm<T extends object>({
  form,
  submitButtonLabel = "Send it",
  submitButtonLabelInFlight = "Sending...",
  isInFlight = false,
}: FormProps<T>) {
  const {
    register,
    errors,
    changedState,
    control,
    handleSubmit: rhfSubmitHandler,
    handleSubmitWithFormData,
  } = useInputSwitches<T>(form);

  console.log(changedState);

  return (
    <form
      onSubmit={rhfSubmitHandler(handleSubmitWithFormData)}
      className="w-full flex flex-col gap-4 items-start"
    >
      {form.fields.map((field, index) => {
        switch (field.type) {
          // text field
          case "text":
          case "multiline":
          case "number":
          case "email":
          case "password":
            return (
              <SwitchTextField
                key={`${field.name}-${index}`}
                type={field.type}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                helperText={field.helperText}
                disabled={field.disabled}
                hidden={field.hidden}
                options={field.options}
                register={register}
                errors={errors}
              />
            );
          // text field
          // case "media":
          //   return (
          //     <RDFMedia
          //       key={`${field.name}-${index}`}
          //       name={field.name}
          //       label={field.label}
          //       options={field.options}
          //       helper={field.helpText || field.HelpText}
          //       previewType={field.previewType}
          //       disabled={field.disabled}
          //       hidden={field.hidden}
          //       control={control}
          //       errors={errors}
          //     />
          //   );
          // // checkbox
          case "checkbox":
          case "switch":
            return (
              <SwitchToggle
                type={field.type}
                key={`${field.name}-${index}`}
                name={field.name}
                label={field.label}
                options={field.options}
                disabled={field.disabled}
                hidden={field.hidden}
                helperText={field.helperText}
                control={control}
                register={register}
                errors={errors}
              />
            );

          // // select
          // case "select":
          //   return (
          //     <RDFSelect
          //       key={`${field.name}-${index}`}
          //       name={field.name}
          //       label={field.label}
          //       options={field.options}
          //       choices={field.choices as RDFChoiceOption[]}
          //       placeholder={field.placeholder}
          //       helper={field.helpText || field.HelpText}
          //       disabled={field.disabled}
          //       hidden={field.hidden}
          //       control={control}
          //       register={register}
          //       errors={errors}
          //     />
          //   );
          // // radio
          // case "radio":
          //   return (
          //     <RDFRadio
          //       key={`${field.name}-${index}`}
          //       name={field.name}
          //       label={field.label}
          //       options={field.options}
          //       choices={field.choices as RDFChoiceOption[]}
          //       placeholder={field.placeholder}
          //       helper={field.helpText || field.HelpText}
          //       disabled={field.disabled}
          //       hidden={field.hidden}
          //       control={control}
          //       register={register}
          //       errors={errors}
          //     />
          //   );
          // // list
          // case "list":
          //   return (
          //     <RDFList
          //       key={`${field.name}-${index}`}
          //       name={field.name}
          //       label={field.label}
          //       options={field.options}
          //       placeholder={field.placeholder}
          //       helper={field.helpText || field.HelpText}
          //       disabled={field.disabled}
          //       hidden={field.hidden}
          //       control={control}
          //       register={register}
          //       errors={errors}
          //       addItemText={field.addItemButtonText}
          //     />
          //   );

          // // date picker:
          // case "date":
          // case "datetime":
          //   return (
          //     <RDFDatePicker
          //       key={`${field.name}-${index}`}
          //       name={field.name}
          //       label={field.label}
          //       options={field.options}
          //       helper={field.helpText || field.HelpText}
          //       disabled={field.disabled}
          //       hidden={field.hidden}
          //       control={control}
          //       register={register}
          //       errors={errors}
          //       showTimeSelect={field.type === "datetime"}
          //     />
          //   );
          // // table
          // case "table":
          //   return (
          //     <RDFTable
          //       key={`${field.name}-${index}`}
          //       name={field.name}
          //       label={field.label}
          //       options={field.options}
          //       helper={field.helpText || field.HelpText}
          //       disabled={field.disabled}
          //       hidden={field.hidden}
          //       control={control}
          //       register={register}
          //       errors={errors}
          //       addItemText={field.addItemButtonText}
          //       columns={field.columns}
          //     />
          //   );
        }
      })}
      <Button type="submit" className="submit" disabled={isInFlight}>
        {isInFlight ? submitButtonLabelInFlight : submitButtonLabel}
      </Button>
    </form>
  );
}
