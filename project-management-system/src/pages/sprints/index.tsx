import React, { useState } from "react";
import styles from "./Sprints.module.scss";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import ActiveProjectLayout from "../../app/layouts";
import { TaskCard } from "../../components/sprint/taskCard";
import { mockTasks } from "../../shared/const/fakeData";
import { statuses } from "../../shared/const/task";
import { CreateSprintModal } from "../../components/modals/CreateSprintModal";
import { ConfirmEndModal } from "../../components/modals/ConfirmEndSprintModal";
import { CompleteSprintModal } from "../../components/modals/CompleteSprintModal";
import { CheckCircleOutline } from "@mui/icons-material";

export const SprintBoardPage = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [searchText, setSearchText] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [labelFilter, setLabelFilter] = useState("");

  const [activeSprint, setActiveSprint] = useState<any>({
    name: "Q2 2025 - Sprint 11",
    startDate: "01/04/2025",
    endDate: "14/04/2025",
  });

  const [isCreateSprintModalOpen, setCreateSprintModalOpen] = useState(false);
  const [isConfirmEndModalOpen, setConfirmEndModalOpen] = useState(false);
  const [isCompleteSprintModalOpen, setCompleteSprintModalOpen] =
    useState(false);

  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const updatedTasks = [...tasks];
    const draggedIndex = updatedTasks.findIndex(
      (task) => task.id === draggableId
    );
    const draggedTask = {
      ...updatedTasks[draggedIndex],
      status: destination.droppableId,
    };
    updatedTasks.splice(draggedIndex, 1);

    const targetTasks = updatedTasks.filter(
      (t) => t.status === destination.droppableId
    );
    const otherTasks = updatedTasks.filter(
      (t) => t.status !== destination.droppableId
    );
    targetTasks.splice(destination.index, 0, draggedTask);
    setTasks([...otherTasks, ...targetTasks]);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchText.toLowerCase()) &&
      (!assigneeFilter || task.assignee === assigneeFilter) &&
      (!typeFilter || task.type === typeFilter) &&
      (!priorityFilter || task.priority === priorityFilter) &&
      (!labelFilter || task.labels?.includes(labelFilter))
  );

  const handleCreateSprintClick = () => {
    if (activeSprint) {
      setConfirmEndModalOpen(true);
    } else {
      setCreateSprintModalOpen(true);
    }
  };

  const handleSprintCreated = (sprintInfo: {
    name: string;
    startDate: string;
    endDate: string;
    taskIds: string[];
  }) => {
    setActiveSprint(sprintInfo);
    setSelectedTasks(sprintInfo.taskIds);
    setCreateSprintModalOpen(false);
  };

  const handleCompleteSprint = () => {
    setConfirmEndModalOpen(false);
    setCompleteSprintModalOpen(true);
  };

  const handleCompleteAction = () => {
    setActiveSprint(null);
    setCompleteSprintModalOpen(false);
    setCreateSprintModalOpen(true);
  };

  return (
    <ActiveProjectLayout>
      <div className={styles.wrapper}>
        <div className={styles.sprintHeader}>
          <div className={styles.sprintInfo}>
            <h1>{activeSprint?.name || "No Active Sprint"}</h1>
            {activeSprint && (
              <div className={styles.sprintMeta}>
                <span>2 days remaining</span>
                <span>
                  • Start: {activeSprint.startDate} – End:{" "}
                  {activeSprint.endDate}
                </span>
              </div>
            )}
          </div>

          <div className={styles.filtersWrapper}>
            <div className={styles.actionsRow}>
              <div />
              <div className={styles.actions}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleCreateSprintClick}
                >
                  + Create Sprint
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "#555",
                    borderColor: "#ccc",
                    fontWeight: 500,
                    "&:hover": { backgroundColor: "#f3f3f3" },
                  }}
                  onClick={() => setCompleteSprintModalOpen(true)}
                >
                  Finish Sprint
                </Button>
              </div>
            </div>

            <div className={styles.filters}>
              <TextField
                size="small"
                variant="outlined"
                placeholder="Search tasks..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={styles.searchInput}
              />

              <FormControl size="small" className={styles.filterSelect}>
                <InputLabel>Assignee</InputLabel>
                <Select
                  value={assigneeFilter}
                  label="Assignee"
                  onChange={(e) => setAssigneeFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {
                    //@ts-ignore
                    [...new Set(tasks.map((t) => t.assignee))].map((a) => (
                      <MenuItem key={a} value={a}>
                        {a}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

              <FormControl size="small" className={styles.filterSelect}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={typeFilter}
                  label="Type"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="bug">🐞 Bug</MenuItem>
                  <MenuItem value="story">📘 Story</MenuItem>
                  <MenuItem value="epic">🧩 Epic</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" className={styles.filterSelect}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priorityFilter}
                  label="Priority"
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" className={styles.filterSelect}>
                <InputLabel>Label</InputLabel>
                <Select
                  value={labelFilter}
                  label="Label"
                  onChange={(e) => setLabelFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {
                    //@ts-ignore
                    [...new Set(tasks.flatMap((t) => t.labels || []))].map(
                      (label) => (
                        <MenuItem key={label} value={label}>
                          {label}
                        </MenuItem>
                      )
                    )
                  }
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.board}>
            {statuses.map((status) => (
              <Droppable droppableId={status.value} key={status.value}>
                {(provided) => (
                  <div
                    className={styles.column}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className={styles.columnHeader}>{status.label}</div>
                    <div className={styles.tasksArea}>
                      {filteredTasks
                        .filter((task) => task.status === status.value)
                        .map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className={styles.taskCardWrapper}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TaskCard task={task} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      <CreateSprintModal
        open={isCreateSprintModalOpen}
        onClose={() => setCreateSprintModalOpen(false)}
        onCreate={handleSprintCreated}
        tasks={tasks}
      />

      <ConfirmEndModal
        open={isConfirmEndModalOpen}
        onCancel={() => setConfirmEndModalOpen(false)}
        onConfirm={handleCompleteSprint}
      />

      <CompleteSprintModal
        open={isCompleteSprintModalOpen}
        onClose={() => setCompleteSprintModalOpen(false)}
        onMoveToBacklog={handleCompleteAction}
        onMoveToNextSprint={handleCompleteAction}
      />
    </ActiveProjectLayout>
  );
};
