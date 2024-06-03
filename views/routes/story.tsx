import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "switch/index";
import { useToast } from "switch/components/ui/use-toast";
import { ToastAction } from "switch/components/ui/toast";
import { useDialog } from "switch/hooks/use-dialog";
import { BinaryIconToggle } from "switch/components/ui/binary-icon-toggle";
import { Moon, Power, PowerOff, Sun } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipWrapper,
  TooltipTrigger,
} from "switch/components/ui/tooltip";

export const Route = createFileRoute("/story")({
  component: GhettoStorybook,
});

export function GhettoStorybook() {
  // const [openDialog, setOpenDialog] = React.useState(false);
  const { toast } = useToast();
  const [toggleButton, setToggleButton] = React.useState<"on" | "off">("off");
  const { DialogComponent } = useDialog({
    onAction: async (id: string | null) => {
      console.log("resolved action", id);
    },
  });

  type Dp = {
    foo: string;
    bar: number;
  };
  const { DialogComponent: DialogWithProps } = useDialog<Dp>({
    onAction: async (_: string | null, props) => {
      console.log("resolved action w props:", props.foo, props.bar);
    },
    options: {
      trigger: "Trigger with props",
    },
  });

  const { DialogComponent: DangerousDialogComponent } = useDialog({
    onAction: async (id: string | null) => {
      console.log("danger choice action", id);
    },

    options: {
      trigger: <Button variant="destructive">Blow it up</Button>,
      title: "Oh no!",
      message: "Are you sure you want to blow it up?",
      actions: [
        {
          id: "cancel",
          label: "No. I am a coward",
        },
        {
          id: "blow-it-up",
          label: "Yes. I am Danger",
          destructive: true,
        },
      ],
    },
  });

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
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destroy</Button>

      <p>Binary Icon Switch ({toggleButton})</p>
      <BinaryIconToggle
        onIcon={<Sun />}
        offIcon={<Moon />}
        value={toggleButton}
        onSwitch={(state: "off" | "on") => setToggleButton(state)}
      />

      <p>With Tooltip</p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <BinaryIconToggle
              onIcon={<Power size={20} />}
              offIcon={<PowerOff size={20} />}
              value={toggleButton}
              onSwitch={(state: "off" | "on") => setToggleButton(state)}
              className="w-10"
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>
              {toggleButton === "off" ? "Turn the power on" : "Shut it down "}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p>Wrapper tooltip</p>
      <TooltipWrapper content="This is a tooltip">
        <Button variant="default">Hover me</Button>
      </TooltipWrapper>
      <hr />
      <h3>Dialogs</h3>
      <DialogComponent />
      <DialogWithProps foo="bar" bar={10} />
      <DangerousDialogComponent />
      <h3>Toaster</h3>
      <Button
        variant="default"
        onClick={() => {
          toast({
            title: "Neat!",
            description: "A thing happened",
            // action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }}
      >
        Simple
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }}
      >
        Destructive Elaborate
      </Button>
    </div>
  );
}
