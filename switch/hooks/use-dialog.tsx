import React from "react";
import { Dialog, DialogProps } from "../components/dialog.js";
import { SwitchDialog } from "../types.js";

type UseDialogResult<DP> = {
  DialogComponent: React.FC<DP>;
};

export type UseDialogOptions<DP> = {
  onAction: DialogProps<DP>["onAction"];
  options?: Partial<SwitchDialog>;
  CustomDialog?: React.FC<DP>;
};

export function useDialog<DP>({
  CustomDialog,
  options,
  onAction,
}: UseDialogOptions<DP>): UseDialogResult<DP> {
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
    DialogComponent: (props?: DP) => (
      <Component
        dialog={{ ...defaultDialog, ...options } as SwitchDialog}
        onAction={onAction}
        open={false}
        {...(props as DP)}
      />
    ),
  };
}
