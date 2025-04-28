import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { isValidTimeEntry } from "../../../components/task/utils";

type LogWorkModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    days: number;
    hours: number;
    minutes: number;
    date: string;
    comment: string;
  }) => void;
};

export const LogWorkModal = ({ open, onClose, onSave }: LogWorkModalProps) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (open) {
      const today = new Date().toISOString().split("T")[0]; // формат yyyy-mm-dd
      setDate(today);
    }
  }, [open]);

  const handleSave = () => {
    onSave({ days, hours, minutes, date, comment });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Log Work</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "8px",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <TextField
            label="Days"
            type="number"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="Hours"
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="Minutes"
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            fullWidth
          />
        </div>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          minRows={2}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!isValidTimeEntry(days, hours, minutes)}
        >
          Log
        </Button>
      </DialogActions>
    </Dialog>
  );
};
