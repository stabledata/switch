import { SwitchInput } from "switch/types";

export const formConfig: SwitchInput[] = [
  {
    type: "switch",
    name: "realtime",
    label: "Realtime Form",
    help: {
      text: "Makes the entire form reactive to changes in the fields. When this is turned off, only realtime:true fields will be watched for in the onChange callback.",
    },
    defaultValue: false,
    realtime: true,
  },
  // simple as it gets!
  {
    type: "text",
    name: "simple",
    label: "Simple text input",
    placeholder: "Whatever you can imagine can go here",
  },

  // specify a default
  {
    type: "text",
    name: "input-w-default",
    label: "Text with default value",
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
      // validate:  // DO NOT DO THIS! Functions are not serializable.
    },
    help: {
      text: "Note, this is a 'realtime' field, so it will log to the console on change",
    },
    realtime: true,
  },
  {
    type: "password",
    name: "passphrase",
    label: "A password value",
    width: "half",
    options: {
      required: "This field is required, fill it out!",
    },
  },

  // max len, code validation
  {
    type: "text",
    name: "code",
    label: "Short code (max len validation)",
    placeholder: "123",
    width: "short",
    options: {
      maxLength: {
        value: 3,
        message: "You entered more than 3 characters in this field",
      },
    },
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

  // number type
  {
    type: "number",
    name: "favorite-number",
    label: "A number between one and five, please",
    width: "short",
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
    width: "three-quarters",
  },

  // date (todo)
  // {
  //   type: "datetime",
  //   name: "date",
  //   label: "Select a date",
  // },

  // disabled
  {
    type: "text",
    name: "disabled",
    label: "You cannot enter anything here",
    disabled: true,
  },

  // choice - radio
  {
    type: "radio",
    name: "radio",
    label: "Choose one of these options",
    help: {
      text: "You can only choose one, so choose wisely",
    },
    defaultValue: "two",
    choices: [
      { value: "one", label: "Option one" },
      { value: "two", label: "Option two" },
      { value: "three", label: "Option three", disabled: true },
    ],
  },

  // choice - select
  {
    type: "select",
    name: "selection",
    label: "Select one of these fine options",
    help: {
      text: "Note, you can scroll through this dropdown",
    },
    defaultValue: "two",
    choices: Array.from({ length: 25 }, (_, i) => ({
      value: i.toString(),
      label: `Option ${i + 1}`,
    })),
  },

  // custom validation (todo: make me serialize!, or just use static lib)
  {
    type: "text",
    name: "pattern1",
    label: 'Pattern validation (contains "ing", optional)',
    placeholder: "e.g. Running",
    width: "two-thirds",

    options: {
      pattern: {
        value: /ing/i,
        message: "Must contain the letters 'ing'",
      },
    },
  },
  {
    type: "text",
    name: "pattern2",
    label: "Pattern validation (match ABC123)",
    placeholder: "e.g. XYZ098",
    width: "third",

    options: {
      required: true,
      pattern: {
        value: /^[A-Za-z]{3}\d{3}$/i,
        message: "Doesn't match the pattern AAA222",
      },
    },
  },
  // multiline input
  {
    type: "multiline",
    name: "story",
    label: "Tell us your story",
    placeholder: 'This is a "multiline" input type',
    help: { text: "If you need some inspiration, read this help text" },
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
    help: { text: "Switches are cool 😎, but data roaming is usually not." },
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
    help: {
      text: "To continue, you must accept",
      linkText: "the terms.",
      linkUrl:
        "https://termly.io/resources/templates/terms-and-conditions-template/",
    },
    options: {
      required: "You must accept the terms!",
    },
  },
];
