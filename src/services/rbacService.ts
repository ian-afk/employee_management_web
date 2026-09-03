import type { RoleResponse } from "../types/rbac-type";
import { apiClient } from "./apiClient";

export async function getRoles(query: {
  signal?: AbortSignal;
}): Promise<RoleResponse> {
  const res: RoleResponse = await apiClient.get("access-control/roles", {
    signal: query.signal,
  });
  return res;
}
