import type { ApiErrorResponse, LoginResponse } from "../types/auth-type";
import { apiClient } from "./apiClient";

export async function login(body: { email: string; password: string }) {
  return await apiClient.post<LoginResponse | ApiErrorResponse>(
    "auth/login",
    body,
  );
}

export async function logout() {
  const res = await apiClient.post("auth/logout");
  return res;
}
