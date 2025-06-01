import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as { auth?: { accessToken?: string } };
    let token = state.auth?.accessToken;

    if (!token) {
      token = localStorage.getItem("accessToken") || "";
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
