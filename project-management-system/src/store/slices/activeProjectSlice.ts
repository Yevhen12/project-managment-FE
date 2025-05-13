import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../shared/types/project";

interface ActiveProjectState {
  activeProject: Project | null;
}

const initialState: ActiveProjectState = {
  activeProject: null,
};

const activeProjectSlice = createSlice({
  name: "activeProject",
  initialState,
  reducers: {
    setActiveProject(state, action: PayloadAction<Project>) {
      state.activeProject = action.payload;
    },
    clearActiveProject(state) {
      state.activeProject = null;
    },
  },
});

export const { setActiveProject, clearActiveProject } = activeProjectSlice.actions;
export default activeProjectSlice.reducer;
