import React, { useEffect, useMemo, useState } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useSendInviteMutation } from "../../../api/project";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { useGetUsersQuery } from "../../../api/authApi";
import { ProjectMember } from "../../../shared/types/project";

const roles = ["admin", "developer"];

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

interface AddMemberModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  existingMembers: ProjectMember[]; // used to filter out already added
}

const AddMemberModal = ({ open, onClose, onAdd, existingMembers }: AddMemberModalProps) => {
  const projectId = useAppSelector((state) => state.activeProject.activeProject?.id);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [inputEmail, setInputEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [sendInvite, { isLoading: isSending, error }] = useSendInviteMutation();

  const {
    data: users = [],
    isLoading: isLoadingUsers,
    error: usersError,
    refetch,
  } = useGetUsersQuery(undefined, { skip: !open });

  useEffect(() => {
    if (open) {
      refetch();
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setInputEmail("");
    setSelectedUser(null);
    setSelectedRole("");
  };

  const alreadyMemberEmails = useMemo(
    () => new Set(existingMembers.map((m) => m.user.email)),
    [existingMembers]
  );

  const availableUsers = useMemo(
    () => users.filter((u: any) => !alreadyMemberEmails.has(u.email)),
    [users, alreadyMemberEmails]
  );

  const handleAdd = async () => {
    if (!projectId || !inputEmail || !selectedRole) return;

    try {
      await sendInvite({
        email: inputEmail,
        role: selectedRole.toLowerCase(),
        projectId,
      }).unwrap();

      onAdd();
      resetForm();
    } catch (_) {
      // handled via error
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Member</DialogTitle>
      <DialogContent>
        {isLoadingUsers ? (
          <CircularProgress />
        ) : usersError ? (
          <Alert severity="error">Failed to load users</Alert>
        ) : (
          <>
            <Autocomplete
              freeSolo
              options={availableUsers}
              getOptionLabel={(option) =>
                typeof option === "string"
                  ? option
                  : `${option.email} — ${option.firstName} ${option.lastName}`
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
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {(error as any)?.data?.message || "Failed to send invite"}
              </Alert>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          disabled={!inputEmail || !selectedRole || isSending}
        >
          {isSending ? "Sending..." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberModal;
