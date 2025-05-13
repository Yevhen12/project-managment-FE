import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Avatar,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../../components/header";
import EditAvatarModal from "../../components/modals/EditAvatarModal";
import styles from "./Profile.module.scss";
import { useAppSelector } from "../../shared/hooks/useAppSelector";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { useUpdateProfileMutation } from "../../api/authApi";
import { setUser, updateUser } from "../../store/slices/authSlice";

export const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [avatarUrl, setAvatarUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [isDirty, setIsDirty] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setAvatarUrl(user.avatarUrl || "");
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setBio(user.bio || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const isChanged =
        avatarUrl.trim() !== (user.avatarUrl || "").trim() ||
        firstName.trim() !== user.firstName.trim() ||
        lastName.trim() !== user.lastName.trim() ||
        bio.trim() !== (user.bio || "").trim() ||
        phone.trim() !== (user.phone || "").trim();

      setIsDirty(isChanged);
    }
  }, [avatarUrl, firstName, lastName, bio, phone, user]);

  const handleCancel = () => {
    if (!user) return;
    setAvatarUrl(user.avatarUrl || "");
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setBio(user.bio || "");
    setPhone(user.phone || "");
    setPhoneError("");
    setIsDirty(false);
  };

  const validatePhone = (value: string) => {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!value.trim()) return "Phone number is required";
    if (!phoneRegex.test(value)) return "Invalid phone number format";
    return "";
  };

  const handleSave = async () => {
    const error = validatePhone(phone);
    setPhoneError(error);
    if (error) return;

    try {
      const updated = await updateProfile({
        avatarUrl,
        firstName,
        lastName,
        bio,
        phone,
      }).unwrap();
      dispatch(updateUser(updated.data));
      setIsDirty(false);
    } catch (e) {
      console.error("Update failed", e);
    }
  };

  const handleAvatarClick = () => {
    setIsAvatarModalOpen(true);
  };

  const handleAvatarSave = (url: string) => {
    setAvatarUrl(url);
  };

  if (!user) {
    return (
      <>
        <Header />
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          <IconButton
            className={styles.backButton}
            onClick={() => window.history.back()}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" align="center" gutterBottom>
            Profile
          </Typography>

          <div className={styles.avatarSection} onClick={handleAvatarClick}>
            <Avatar
              src={avatarUrl}
              alt="avatar"
              sx={{ width: 100, height: 100, cursor: "pointer" }}
            />
            <Typography variant="caption">Click to edit avatar</Typography>
          </div>

          <TextField
            label="Avatar URL"
            value={avatarUrl}
            disabled
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={user.email}
            disabled
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setPhoneError("");
            }}
            error={!!phoneError}
            helperText={phoneError}
            fullWidth
            margin="normal"
          />
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />

          <div className={styles.buttonGroup}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              disabled={!isDirty}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!isDirty || isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>

      <EditAvatarModal
        open={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onSave={handleAvatarSave}
        currentUrl={avatarUrl}
      />
    </>
  );
};
