import type { UserByRoleResponse } from "../types/rbac-type";
import type { TeamLeadUserResponse } from "../types/user-type";
import { apiClient } from "./apiClient";

export const getTeamLead = async (query: {
  role: string;
}): Promise<TeamLeadUserResponse> => {
  const res: TeamLeadUserResponse = await apiClient.get("user/role", {
    params: {
      role: query.role,
    },
  });
  return res;
};

export const getUserByRole = async (
  url: string,
  query: {
    roleId: string;
    signal?: AbortSignal;
  },
): Promise<UserByRoleResponse> => {
  const res: UserByRoleResponse = await apiClient.get(`${url}`, {
    signal: query.signal,
  });
  return res;
};
