import React from "react";
import { Dialog, DialogProps } from "../components/dialog.js";
import { SwitchDialog } from "../types.js";

type UseDialogResult<DialogComponentProps> = {
  DialogComponent: React.FC<DialogComponentProps>;
};

export type UseDialogOptions = {
  onAction: <DialogComponentProps>(
    action: string | null,
    props: DialogComponentProps
  ) => void;
  options?: Partial<SwitchDialog>;
  CustomDialog?: React.FC<DialogProps>;
};

export function useDialog<DialogComponentProps>({
  CustomDialog,
  options,
  onAction,
}: UseDialogOptions): UseDialogResult<DialogComponentProps> {
  const defaultDialog: SwitchDialog = React.useMemo(
    () => ({
      title: "Are you sure?",
      message: "This action cannot be undone.",
      trigger: "Confirm",
      actions: [
        {
          id: "cancel",
          label: "Cancel",
          variant: "secondary",
        },
        {
          id: "continue",
          label: "Continue",
          variant: "destructive",
        },
      ],
    }),
    []
  );

  const Component = CustomDialog || Dialog;

  return {
    DialogComponent: (props?: DialogComponentProps) => (
      <Component
        dialog={{ ...defaultDialog, ...options } as SwitchDialog}
        onAction={onAction}
        open={false}
        {...props}
      />
    ),
  };
}
