import { SwitchInput } from "switch/types";

export const formConfig: SwitchInput[] = [
  // simple as it gets!
  {
    type: "text",
    name: "simple",
    label: "A simple entry",
    placeholder: "Whatever you can imagine can go here",
  },

  // specify a default
  {
    type: "text",
    name: "input-w-default",
    label: "This entry has a default value",
    defaultValue: "This *is* a default value, neat.",
  },

  // validation testing from rhf
  // https://react-hook-form.com/get-started#Applyvalidation
  {
    type: "text",
    name: "necessary",
    label: "A required field",
    placeholder: "You must enter something here, or else!",
    // options
    // https://react-hook-form.com/api/useform/register
    options: {
      required: "This field is required, fill it out!",
    },
    // observe: true,
  },
  {
    type: "password",
    name: "passphrase",
    label: "A password value",
    options: {
      required: "This field is required, fill it out!",
    },
    // observe: true,
  },

  // max len, code validation
  {
    type: "text",
    name: "code",
    label: "Short code",
    placeholder: "123",
    options: {
      maxLength: {
        value: 3,
        message: "You entered more than 3 characters in this field",
      },
    },
    // observe: true,
  },

  // hidden field
  {
    type: "text",
    name: "hidden",
    label: "Matters not, it's hidden",
    defaultValue: "This is a hidden field",
    hidden: true,
    // hidden: (observableState: Partial<FormState>) => {
    //   return observableState.code !== '123';
    // }
  },

  // disabled
  {
    type: "text",
    name: "disabled",
    label: "You cannot enter anything here",
    disabled: true,
  },

  // number type
  {
    type: "number",
    name: "favorite-number",
    label: "A number between one and five, please",
    options: {
      min: { value: 1, message: "Please enter a number between 1 and 5" },
      max: { value: 5, message: "Please enter a number between 1 and 5" },
    },
  },

  // email type
  {
    type: "email",
    name: "email",
    label: "Enter an email",
  },

  // date (todo)
  // {
  //   type: "datetime",
  //   name: "date",
  //   label: "Select a date",
  // },

  // custom validation (todo: make me serialize!, or just use static lib)
  {
    type: "text",
    name: "customizing",
    label: 'Enter anything that contains "ing"',
    placeholder: "e.g. Running",
    // observe: true,
    options: {
      validate: (value: string | string[]) => {
        if (value.indexOf("ing") < 0) {
          return 'That input does not contain "ing"';
        }
      },
    },
  },
  // multiline input
  {
    type: "multiline",
    name: "story",
    label: "Tell us your story",
    placeholder: 'This is a "multiline" input type',
    helperText: "If you need some inspiration, read this help text",
  },

  {
    type: "switch",
    name: "auto-reply",
    label: "Vacation mode (auto-reply to messages)",
    defaultValue: true,
  },
  {
    type: "switch",
    name: "data-enabled",
    label: "Enable cellular data roaming",
    helperText: "Switches are cool 😎, but data roaming is usually not.",
  },

  {
    type: "checkbox",
    name: "send-spam",
    label: "YES! Send me tons of spam and fomo inducing content",
    defaultValue: true,
  },
  {
    type: "checkbox",
    name: "accept-terms",
    label: "I accept the terms of the agreement",
    helperText: "To continue, you must accept the terms",
    options: {
      required: "You must accept the terms!",
    },
  },
];
