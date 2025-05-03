import React, { useState } from "react";
import { Button, Avatar, IconButton, Chip, Tooltip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import styles from "./Team.module.scss";
import AddMemberModal from "../../components/modals/AddMemberModal";
import EditRoleModal from "../../components/modals/EditRoleModal";
import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";
import ActiveProjectLayout from "../../app/layouts";

const mockTeamMembers = [
  {
    id: "1",
    name: "Yevhen Lys",
    role: "Admin",
    avatar: "YL",
    email: "yevhen.lys@example.com",
  },
  {
    id: "2",
    name: "Olga T.",
    role: "Developer",
    avatar: "OT",
    email: "olga.t@example.com",
  },
  {
    id: "3",
    name: "Andrii R.",
    role: "Tester",
    avatar: "AR",
    email: "andrii.r@example.com",
  },
];

export const TeamsPage = () => {
  const [team, setTeam] = useState(mockTeamMembers);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const handleEdit = (member: any) => {
    setSelectedMember(member);
    setEditOpen(true);
  };

  const handleDelete = (member: any) => {
    setSelectedMember(member);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    setTeam(team.filter((m) => m.id !== selectedMember?.id));
    setDeleteOpen(false);
  };

  const handleRoleUpdate = (updatedRole: string) => {
    setTeam(
      team.map((m) =>
        m.id === selectedMember?.id ? { ...m, role: updatedRole } : m
      )
    );
    setEditOpen(false);
  };

  const handleAddMember = (newMember: any) => {
    setTeam([...team, newMember]);
    setAddOpen(false);
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

        <div className={styles.memberGrid}>
          {team.map((member) => (
            <div key={member.id} className={styles.card}>
              <Avatar className={styles.avatar}>{member.avatar}</Avatar>
              <div className={styles.name}>{member.name}</div>
              <div className={styles.email}>{member.email}</div>
              <Chip
                label={member.role}
                size="small"
                color={
                  member.role === "Admin"
                    ? "primary"
                    : member.role === "Developer"
                    ? "success"
                    : "default"
                }
                style={{ marginBottom: "10px" }}
              />
              <div className={styles.actions}>
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
              </div>
            </div>
          ))}
        </div>

        <AddMemberModal
          open={addOpen}
          onClose={() => setAddOpen(false)}
          onAdd={handleAddMember}
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
