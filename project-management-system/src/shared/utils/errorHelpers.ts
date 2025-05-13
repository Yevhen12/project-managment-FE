// src/shared/utils/errorHelpers.ts

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const extractErrorMessage = (
  error: unknown,
  fallbackMessage: string = "Something went wrong"
): string => {
  if (
    error &&
    typeof error === "object" &&
    "data" in error &&
    typeof (error as FetchBaseQueryError).data === "object"
  ) {
    const data = (error as FetchBaseQueryError).data as { message?: string };
    return data?.message || fallbackMessage;
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    return (error as { message?: string }).message || fallbackMessage;
  }

  return fallbackMessage;
};
