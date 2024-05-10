import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/input")({
  component: FormDemo,
});

function FormDemo() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center max-w-md m-auto mt-10"></div>
  );
}
