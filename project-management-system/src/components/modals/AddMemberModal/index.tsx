import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Autocomplete,
  Popper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const roles = ["Admin", "Developer", "Tester"];

const availableUsers = [
  { email: "yevhen@example.com", name: "Yevhen Lys" },
  { email: "olga@example.com", name: "Olga T." },
  { email: "andrii@example.com", name: "Andrii R." },
];

const CustomPopper = (props: any) => (
  <Popper
    {...props}
    style={{
      width: props.anchorEl ? props.anchorEl.clientWidth : undefined,
      maxHeight: 240,
      overflowY: "auto",
      zIndex: 1300,
    }}
  />
);

const AddMemberModal = ({ open, onClose, onAdd }: any) => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [inputEmail, setInputEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleAdd = () => {
    const member = {
      avatar: selectedUser
        ? selectedUser.name
            .split(" ")
            .map((p: string) => p[0])
            .join("")
            .toUpperCase()
        : inputEmail[0].toUpperCase(),
      name: selectedUser?.name || inputEmail,
      email: inputEmail,
      role: selectedRole,
      id: Date.now().toString(),
    };
    onAdd(member);
    setInputEmail("");
    setSelectedUser(null);
    setSelectedRole("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Member</DialogTitle>
      <DialogContent>
        <Autocomplete
          freeSolo
          options={availableUsers}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : `${option.email} — ${option.name}`
          }
          PopperComponent={CustomPopper}
          onChange={(e, value) => {
            if (typeof value === "string") {
              setInputEmail(value);
              setSelectedUser(null);
            } else if (value) {
              setInputEmail(value.email);
              setSelectedUser(value);
            }
          }}
          onInputChange={(e, value2) => {
            setInputEmail(value2);
            setSelectedUser(null);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Email"
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: <ExpandMoreIcon />,
              }}
            />
          )}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            label="Role"
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          disabled={!inputEmail || !selectedRole}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberModal;
