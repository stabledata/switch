import { createFileRoute } from "@tanstack/react-router";
import { formConfig } from "../demo-form-config";
import { SwitchForm } from "switch/components/form";
import { useForm } from "switch/hooks/use-form";
import React from "react";

export const Route = createFileRoute("/input")({
  component: FormDemo,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
RegExp.prototype.toJSON = RegExp.prototype.toString;

function FormDemo() {
  const [result, setResult] = React.useState<object | null>(null);
  // tip- you can type the form results useForm takes a generic.
  const onSubmit = (_fd: FormData, s: object) => {
    setResult(s);
  };

  const form = useForm(formConfig, onSubmit);

  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
        <div className="flex flex-col gap-4 py-6 text-right">
          <h3>Inputs Field "Switchboard"</h3>
          <h4>a.k.a Form</h4>
          <p className="text-md leading-8">
            Forms are configured using serializable data structures.
          </p>
          <p>Consider, a simple text control:</p>
          <pre className="code">
            {JSON.stringify(
              {
                type: "text",
                name: "name",
                label: "Your Name",
              },
              null,
              2
            )}
          </pre>
          <p>
            Now, add some validation (provided by{" "}
            <a href="https://react-hook-form.com/docs/useform/register#options">
              RHF Options
            </a>
            ):
          </p>
          <pre className="code">
            {JSON.stringify(
              {
                type: "text",
                name: "name",
                label: "Your Name",
                options: {
                  required: "Name is required",
                  maxLength: {
                    value: 20,
                    message: "Name is too long",
                  },
                },
              },
              null,
              2
            )}
          </pre>
          <p>Using regex for pattern validation (sill serializable!):</p>
          <pre className="code">
            {JSON.stringify(
              {
                type: "text",
                name: "name",
                label: "Your Name (no numbers!)",
                options: {
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Name must be alphabetic",
                  },
                },
              },
              null,
              2
            )}
          </pre>
          <p>With more available types:</p>
          <pre className="code">
            {`
type SwitchInputType = 
  "text" |
  "password" |
  "multiline" |
  "number" |
  "email" |
  "checkbox" |
  "select" |
  "radio" |
  "switch" |
  "media" |
  "date"
`.toString()}
          </pre>
          <p>And loads of options:</p>
          <pre className="code">
            {`
export type SwitchInputField = {
  type: SwitchInputType;
  name: string;
  defaultValue?: string | number | boolean;
  label?: string;
  realtime?: boolean; 
  placeholder?: string;
  help?: {
    text?: string;
    linkUrl?: string;
    linkText?: string;
  };
  disabled?: boolean;
  hidden?: boolean;
  width?: Width;
  previewType?: "hero" | "thumb" | "attachment";
  options?: SerializableOptions;
  choices?: Choice[];
};
`.toString()}
          </pre>
        </div>

        <div className="flex flex-col py-6 gap-4">
          <h3>Inputs Preview</h3>
          <h4>Try me! Fill out some fields</h4>
          <SwitchForm form={form} className="mb-5" />
          {result ? (
            <pre className="text-sm w-full">
              {JSON.stringify(result, null, 2)}
            </pre>
          ) : (
            <p>Submit the form to see submitted data here.</p>
          )}
        </div>
      </div>
    </div>
  );
}
