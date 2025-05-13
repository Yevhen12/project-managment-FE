import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TasksState {
  tasks: [];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
});

export const {} = tasksSlice.actions;
export default tasksSlice.reducer;
