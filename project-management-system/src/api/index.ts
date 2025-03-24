import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  // Тут у майбутньому можна додати токен/хедери
  prepareHeaders: (headers) => {
    // headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});
