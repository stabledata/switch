import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertDialogDemo } from "../examples/destructive-alert";
import { Button } from "switch/index";

export const Route = createFileRoute("/components")({
  component: GhettoStorybook,
});

export function GhettoStorybook() {
  // const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <div className="flex flex-col gap-5 max-w-lg m-auto mt-10">
      <h1>What is this?</h1>
      <p>
        {" "}
        "Switchboards" are a paradigm under development which provides a way to
        declaratively render components on screen.
        <br />
        <span className="block mt-2 text-sm">
          See the <Link to="/input">input</Link> route for a WIP.
        </span>
      </p>
      <h1>Components Preview</h1>
      <p>
        Components rendered for testing while building{" "}
        <a href="https://makeitstable.com">Stable</a>.
      </p>
      <h3>Buttons</h3>
      <Button variant="default">Click Me</Button>
      <hr />
      <h3>(Destructive) Dialog</h3>
      <AlertDialogDemo />
    </div>
  );
}
