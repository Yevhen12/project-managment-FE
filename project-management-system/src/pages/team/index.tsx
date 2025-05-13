import React, { useState } from "react";
import {
  Button,
  Avatar,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import styles from "./Team.module.scss";
import AddMemberModal from "../../components/modals/AddMemberModal";
import EditRoleModal from "../../components/modals/EditRoleModal";
import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";
import ActiveProjectLayout from "../../app/layouts";
import { useAppSelector } from "../../shared/hooks/useAppSelector";
import {
  useDeleteTeamMemberMutation,
  useGetTeamForProjectQuery,
  useUpdateTeamMemberRoleMutation,
} from "../../api/project";

export const TeamsPage = () => {
  const projectId = useAppSelector(
    (state) => state.activeProject.activeProject?.id
  );
  const currentUserId = useAppSelector((state) => state.auth.user?.id);
  const {
    data: team = [],
    isLoading,
    error,
    refetch, // ✅ додано
  } = useGetTeamForProjectQuery(projectId!, { skip: !projectId });
  const [updateRole] = useUpdateTeamMemberRoleMutation();
  const [deleteMember] = useDeleteTeamMemberMutation();

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const handleEdit = (member: any) => {
    setSelectedMember(member);
    setEditOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedMember || !projectId) return;
    try {
      await deleteMember({
        userId: selectedMember.user.id,
        projectId,
      }).unwrap();
      setDeleteOpen(false);
      refetch();
    } catch (err) {
      console.error("Failed to delete member", err);
    }
  };

  const handleRoleUpdate = async (updatedRole: string) => {
    if (!selectedMember || !projectId) return;
    try {
      await updateRole({
        userId: selectedMember.user.id,
        projectId,
        newRole: updatedRole.toLowerCase(),
      }).unwrap();
      setEditOpen(false);
      refetch();
    } catch (err) {
      console.error("Failed to update role", err);
    }
  };

  const handleDelete = (member: any) => {
    setSelectedMember(member);
    setDeleteOpen(true);
  };

  return (
    <ActiveProjectLayout>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>Team</h2>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAddOpen(true)}
          >
            + Add Member
          </Button>
        </div>

        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">Failed to load team members</Alert>
        ) : (
          <div className={styles.memberGrid}>
            {team.map((member) => {
              const fullName = `${member.user.firstName} ${member.user.lastName}`;
              const initials = `${member.user.firstName?.[0] || ""}${
                member.user.lastName?.[0] || ""
              }`;

              const isOnlySelf = member.user.id === currentUserId;

              return (
                <div key={member.id} className={styles.card}>
                  <Avatar className={styles.avatar}>{initials}</Avatar>
                  <div className={styles.name}>{fullName}</div>
                  <div className={styles.email}>{member.user.email}</div>
                  <Chip
                    label={member.role}
                    size="small"
                    color={
                      member.role === "admin"
                        ? "primary"
                        : member.role === "developer"
                        ? "success"
                        : "default"
                    }
                    style={{ marginBottom: "10px" }}
                  />
                  <div className={styles.actions}>
                    {!isOnlySelf && (
                      <>
                        <Tooltip title="Edit Role">
                          <IconButton onClick={() => handleEdit(member)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove Member">
                          <IconButton onClick={() => handleDelete(member)}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <AddMemberModal
          open={addOpen}
          onClose={() => setAddOpen(false)}
          onAdd={() => {
            refetch();
            setAddOpen(false);
          }}
          existingMembers={team}
        />
        <EditRoleModal
          open={editOpen}
          member={selectedMember}
          onClose={() => setEditOpen(false)}
          onSave={handleRoleUpdate}
        />
        <ConfirmDeleteModal
          open={deleteOpen}
          member={selectedMember}
          onCancel={() => setDeleteOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>
    </ActiveProjectLayout>
  );
};
