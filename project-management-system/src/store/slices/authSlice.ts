import {
  ACCESS_TOKEN,
  ACTIVE_PROJECT_ID,
} from "../../shared/const/localStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  isPremium?: boolean
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        tokens: { accessToken: string; refreshToken: string };
        user: User;
      }>
    ) => {
      state.accessToken = action.payload.tokens.accessToken;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem(ACTIVE_PROJECT_ID);
      localStorage.removeItem(ACCESS_TOKEN);
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    updateUser(state, action: PayloadAction<any>) {
      if (!state.user) return;

      const updatedFields = action.payload;

      state.user = {
        ...state.user,
        firstName: updatedFields.firstName ?? state.user.firstName,
        lastName: updatedFields.lastName ?? state.user.lastName,
        avatarUrl: updatedFields.avatarUrl ?? state.user.avatarUrl,
        bio: updatedFields.bio ?? state.user.bio,
        phone: updatedFields.phone ?? state.user.phone,
      };
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setCredentials, logout, setUser, clearUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
