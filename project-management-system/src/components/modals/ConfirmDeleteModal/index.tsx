import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmDeleteModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  member: {
    name: string;
  } | null;
}

const ConfirmDeleteModal = ({
  open,
  onCancel,
  onConfirm,
  member,
}: ConfirmDeleteModalProps) => {
  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="xs">
      <DialogTitle>Remove Member</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to remove <strong>{member?.name}</strong> from the project?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
