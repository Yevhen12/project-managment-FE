import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

type EditAvatarModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (url: string) => void;
  currentUrl: string;
};

const EditAvatarModal: React.FC<EditAvatarModalProps> = ({
  open,
  onClose,
  onSave,
  currentUrl,
}) => {
  const [url, setUrl] = useState(currentUrl);

  const handleSave = () => {
    onSave(url.trim());
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Edit Avatar</DialogTitle>
      <DialogContent>
        <TextField
          label="Avatar URL"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAvatarModal;
