import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const roles = ["Admin", "Developer", "Tester"];

const EditRoleModal = ({ open, onClose, onSave, member }: any) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    if (member) {
      setRole(member.role);
    }
  }, [member]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Role for {member?.name}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select value={role} label="Role" onChange={(e) => setRole(e.target.value)}>
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(role)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRoleModal;
