import { createFileRoute } from "@tanstack/react-router";
import { Button } from "switch/components/ui/button";

export const Route = createFileRoute("/input")({
  component: FormDemo,
});

function FormDemo() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center max-w-md m-auto mt-10">
      <Button>Submit</Button>
    </div>
  );
}
