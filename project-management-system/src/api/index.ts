import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  prepareHeaders: (headers, { getState }) => {
    // Спочатку беремо з Redux, якщо є
    const state = getState() as { auth?: { accessToken?: string } };
    let token = state.auth?.accessToken;

    // Якщо в Redux нема — пробуємо взяти з localStorage
    if (!token) {
      token = localStorage.getItem("accessToken") || "";
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
