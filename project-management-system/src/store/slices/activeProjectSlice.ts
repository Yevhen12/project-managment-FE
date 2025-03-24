// src/shared/store/activeProjectSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  activeProjectId: string | null;
}

const initialState: State = {
  activeProjectId: null,
};

export const activeProjectSlice = createSlice({
  name: 'activeProject',
  initialState,
  reducers: {
    setActiveProject: (state, action: PayloadAction<string>) => {
      state.activeProjectId = action.payload;
    },
    clearActiveProject: (state) => {
      state.activeProjectId = null;
    },
  },
});

export const { setActiveProject, clearActiveProject } = activeProjectSlice.actions;
export default activeProjectSlice.reducer;
