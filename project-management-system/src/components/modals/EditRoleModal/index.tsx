import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { ProjectRole } from "../../../shared/types/project";

const roles = [ProjectRole.ADMIN, ProjectRole.DEVELOPER];

interface EditRoleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (newRole: ProjectRole) => void;
  member: {
    id: string;
    name: string;
    role: ProjectRole;
  } | null;
}

const EditRoleModal = ({ open, onClose, onSave, member }: EditRoleModalProps) => {
  const [role, setRole] = useState<ProjectRole | "">("");

  useEffect(() => {
    if (member) {
      setRole(member.role);
    } else {
      setRole("");
    }
  }, [member]);

  const handleClose = () => {
    setRole("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Role for {member?.name}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            label="Role"
            onChange={(e) => setRole(e.target.value as ProjectRole)}
          >
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={() => role && onSave(role)} disabled={!role}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRoleModal;
