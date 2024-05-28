import React from "react";
import { Dialog, DialogProps } from "../components/dialog.js";
import { SwitchDialog } from "../types.js";

type UseDialogResult = {
  DialogComponent: React.FC;
};

type UseDialogOptions = {
  onAction: (id: string | null) => void;
  options?: Partial<SwitchDialog>;
  CustomDialog?: React.FC<DialogProps>;
};

export function useDialog({
  CustomDialog,
  options,
  onAction,
}: UseDialogOptions): UseDialogResult {
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
    DialogComponent: () => (
      <Component
        dialog={{ ...defaultDialog, ...options } as SwitchDialog}
        onAction={onAction}
        open={false}
      />
    ),
  };
}
