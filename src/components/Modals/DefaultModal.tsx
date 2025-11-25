import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { useModal } from "~/store/modalStore";

interface ModalActionProps {
  label: string;
  onClick: () => void;
}

interface ModalDetailProps {
  title: string;
  content: React.ReactNode;
  actions?: ModalActionProps[];
}

interface DefaultModalProps {
  id: string;
  modalDetail: ModalDetailProps;
}

export default function DefaultModal({ id, modalDetail }: DefaultModalProps) {
  const { isOpen } = useModal<{ name: string }>(id);
  const { title, content, actions } = modalDetail ?? {};
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
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
