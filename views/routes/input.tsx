import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { SwitchInput, SwitchInputType } from "switch/types";
import { SwitchForm } from "switch/components/form";
import { useForm } from "switch/hooks/use-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "switch/components/ui/select";

export const Route = createFileRoute("/input")({
  component: FormDemo,
});

type FieldTypeSelectProps = {
  onValueChange: (value: SwitchInputType) => void;
  value: SwitchInputType;
};

function FieldTypeSelect({ onValueChange, value }: FieldTypeSelectProps) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="text">Text (Single Line)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function FormDemo() {
  const defaultInput: SwitchInput = {
    type: "text",
    name: "name",
    defaultValue: "",
    label: "Name",
    placeholder: "Enter your name",
    helperText:
      "We'll never sell your data, but all your base are belong to us",
  };
  const [input, setInput] = React.useState<SwitchInput>(defaultInput);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (fd: FormData, s: any) => {
    // setInput(s);
    console.log(fd, s);
  };

  const form = useForm([input], onSubmit);

  return (
    <div className="dark flex flex-col m-auto mt-10 gap-5 max-w-3xl ">
      <h3>Input Field Switchboard</h3>
      <p>
        Forms are configured using serializable values. A library of simple
        validations is usually sufficient for most tasks. When validation
        extends beyond that point, it effectively becomes a workflow for which a
        future stable-like paradigm will be created.
      </p>
      <div className="flex m-auto mt-10 gap-5 w-full">
        <div className="flex flex-col items-end w-full border-r-2 pr-5 gap-3">
          <h3>Configure</h3>
          <p>Select a field type</p>
          <FieldTypeSelect onValueChange={() => null} value={input.type} />
        </div>
        <div className="flex flex-col items-start w-full">
          <h3>Preview</h3>
          <p>This is how the input will appear in a form:</p>
          <SwitchForm form={form} />
          <p>Here is the JSON value of the field:</p>
          <pre className="text-xs">{JSON.stringify(input, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
