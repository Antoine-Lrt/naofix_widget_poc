import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { radiusMap } from "~/helpers/radiusMap";
import { useModal } from "~/store/modalStore";
import { useThemeMode } from "~/store/themeStore";

interface ModalActionProps {
  label: string;
  onClick: () => void;
}

interface ModalDetailProps {
  title: string | React.ReactNode;
  content: React.ReactNode;
  actions?: ModalActionProps[];
}

interface DefaultModalProps {
  id: string;
  modalDetail: ModalDetailProps;
  size?: "xs" | "sm" | "md" | "lg";
}

export default function DefaultModal({
  id,
  modalDetail,
  size,
}: DefaultModalProps) {
  const { isOpen, close } = useModal<{ name: string }>(id);
  const { title, content, actions } = modalDetail ?? {};
  const { borderRadius } = useThemeMode();

  const sizeMap = {
    xs: "xs" as const,
    sm: "sm" as const,
    md: "md" as const,
    lg: "lg" as const,
  };
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: radiusMap[borderRadius],
            backgroundColor: "background.paper",
            "& .MuiDialog-container": {
              padding: 2,
            },
          },
        },
      }}
      maxWidth={sizeMap[size ?? "md"]}
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}

      {content && (
        <DialogContent>
          <DialogContentText id="dialog-content">{content}</DialogContentText>
        </DialogContent>
      )}

      {actions && (
        <DialogActions>
          {actions.map((action) => (
            <Button onClick={action.onClick}>{action.label}</Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
}
