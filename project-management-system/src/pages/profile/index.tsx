import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../../components/header";
import EditAvatarModal from "../../components/modals/EditAvatarModal";
import styles from "./Profile.module.scss";

export const ProfilePage = () => {
  const initialData = {
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    email: "yevhen@example.com",
    phone: "+380991112233",
    firstName: "Yevhen",
    lastName: "Lys",
    bio: "I love building apps!",
  };

  const [avatarUrl, setAvatarUrl] = useState(initialData.avatarUrl);
  const [firstName, setFirstName] = useState(initialData.firstName);
  const [lastName, setLastName] = useState(initialData.lastName);
  const [bio, setBio] = useState(initialData.bio);

  const [isDirty, setIsDirty] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  useEffect(() => {
    const isChanged =
      avatarUrl.trim() !== initialData.avatarUrl.trim() ||
      firstName.trim() !== initialData.firstName.trim() ||
      lastName.trim() !== initialData.lastName.trim() ||
      bio.trim() !== initialData.bio.trim();

    setIsDirty(isChanged);
  }, [avatarUrl, firstName, lastName, bio]);

  const handleCancel = () => {
    setAvatarUrl(initialData.avatarUrl);
    setFirstName(initialData.firstName);
    setLastName(initialData.lastName);
    setBio(initialData.bio);
    setIsDirty(false);
  };

  const handleSave = () => {
    console.log("Saving changes:", { avatarUrl, firstName, lastName, bio });
    setIsDirty(false);
  };

  const handleAvatarClick = () => {
    setIsAvatarModalOpen(true);
  };

  const handleAvatarSave = (url: string) => {
    setAvatarUrl(url);
  };

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
            value={initialData.email}
            disabled
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            value={initialData.phone}
            disabled
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
              disabled={!isDirty}
            >
              Save Changes
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
