import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmEndModal: React.FC<Props> = ({ open, onCancel, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Active Sprint Detected</DialogTitle>
      <DialogContent>
        <Typography>
          You already have an active sprint. To create a new one, you must complete the current sprint first. Continue?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Complete Current Sprint
        </Button>
      </DialogActions>
    </Dialog>
  );
};
