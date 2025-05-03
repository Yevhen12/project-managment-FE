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
  onClose: () => void;
  onMoveToBacklog: () => void;
  onMoveToNextSprint: () => void;
}

export const CompleteSprintModal: React.FC<Props> = ({
  open,
  onClose,
  onMoveToBacklog,
  onMoveToNextSprint,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Complete Sprint</DialogTitle>
      <DialogContent>
        <Typography>
          This sprint is ending. What should be done with incomplete tasks?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onMoveToBacklog}>Move to Backlog</Button>
        <Button onClick={onMoveToNextSprint} variant="contained" color="primary">
          Move to Next Sprint
        </Button>
      </DialogActions>
    </Dialog>
  );
};
