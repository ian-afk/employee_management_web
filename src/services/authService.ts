import { apiClient } from "./apiClient";

export async function login(body: { email: string; password: string }) {
  const res: { accessToken: string; refreshToken: string } =
    await apiClient.post("auth/login", body);
  return res;
}

export async function logout() {
  const res = await apiClient.post("auth/logout");
  return res;
}
