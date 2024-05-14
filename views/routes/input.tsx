import { createFileRoute } from "@tanstack/react-router";
import { formConfig } from "../demo-form-config";
import { SwitchForm } from "switch/components/form";
import { useForm } from "switch/hooks/use-form";
import React from "react";

export const Route = createFileRoute("/input")({
  component: FormDemo,
});

function FormDemo() {
  const [result, setResult] = React.useState<object | null>(null);
  // tip- you can type the form results useForm takes a generic.
  const onSubmit = (_fd: FormData, s: object) => {
    setResult(s);
  };

  const form = useForm(formConfig, onSubmit);

  return (
    <div className="flex flex-col m-auto mt-10 gap-5 max-w-md ">
      <h3>Inputs Field "Switchboard"</h3>
      <h4>(a.k.a Form)</h4>
      <p className="text-md leading-8">
        Forms are configured using serializable values. A library of simple
        validations is usually sufficient for most tasks. When validation
        extends beyond that point, it effectively becomes a workflow for which a
        future stable-like paradigm will be created.
      </p>

      <div className="flex flex-col items-start w-full gap-5">
        <SwitchForm form={form} />
        {result ? (
          <pre className="text-wrap text-sm w-full text-pretty whitespace-break-spaces">
            {JSON.stringify(result, null, 2)}
          </pre>
        ) : (
          <p>Submit the form to see the serialized data.</p>
        )}
      </div>
    </div>
  );
}
