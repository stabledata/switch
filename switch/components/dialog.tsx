import { cn } from "switch/lib/utils.js";
import type { SwitchDialog } from "../types.js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button.js";

export type DialogProps = {
  dialog: SwitchDialog;
  open: boolean;
  onAction: (id: string | null) => void; // TODO: resolve something more bad ass?
};

export const Dialog: React.FC<DialogProps> = ({ dialog, onAction }) => {
  const { title, message, actions, trigger } = dialog;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {typeof trigger === "string" ? <Button>{trigger}</Button> : trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          {title ? <AlertDialogTitle>{title}</AlertDialogTitle> : null}
          {message ? (
            <AlertDialogDescription>{message}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {actions.map((action) => {
            switch (action.id) {
              case "cancel":
                return (
                  <AlertDialogCancel onClick={() => onAction(null)}>
                    {action.label}
                  </AlertDialogCancel>
                );
              default:
                return (
                  <AlertDialogAction
                    disabled={action.disabled}
                    onClick={() => onAction(action.id)}
                    className={cn(
                      action.destructive &&
                        "text-neutral-50 dark:text-neutral-100 bg-destructive dark:bg-destructive hover:bg-red-500 dark:hover:bg-red-500"
                    )}
                  >
                    {action.label}
                  </AlertDialogAction>
                );
            }
          })}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
