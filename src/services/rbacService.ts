import type {
  PermissionMatrixResponse,
  RoleResponse,
} from "../types/rbac-type";
import { apiClient } from "./apiClient";

export async function getRoles(query: {
  signal?: AbortSignal;
}): Promise<RoleResponse> {
  const res: RoleResponse = await apiClient.get("access-control/roles", {
    signal: query.signal,
  });
  return res;
}

export async function getRolesById(query: {
  id: string | null;
  signal?: AbortSignal;
}): Promise<PermissionMatrixResponse> {
  const res: PermissionMatrixResponse = await apiClient.get(
    `access-control/roles/${query.id}`,
    {
      signal: query.signal,
    },
  );
  return res;
}
