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
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="flex flex-col gap-4 py-6">
          <h3>Inputs Field "Switchboard"</h3>
          <h4>(a.k.a Form)</h4>
          <p className="text-md leading-8">
            Forms are configured using serializable values. A library of simple
            validations is usually sufficient for most tasks. When validation
            extends beyond that point, it effectively becomes a workflow for
            which a future stable-like paradigm will be created.
          </p>
        </div>
        <div className="p-6">
          <h3>Inputs Preview</h3>
          <p className="mb-5">Please fill me out!</p>
          <SwitchForm form={form} className="mb-5" />
        </div>
        {result ? (
          <pre className="text-sm w-full">
            {JSON.stringify(result, null, 2)}
          </pre>
        ) : (
          <p>Submit the form to see submitted data here.</p>
        )}
      </div>
    </div>
  );
}
