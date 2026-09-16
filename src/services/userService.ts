import type { UserByRoleResponse } from "../types/rbac-type";
import type {
  TeamLeadUserResponse,
  UserDetailResponse,
  UserListReponse,
} from "../types/user-type";
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

export const getAllUsers = async (
  url: string,
  query: {
    page: number;
    limit: number;
    signal?: AbortSignal;
  },
): Promise<UserListReponse> => {
  const res: UserListReponse = await apiClient.get(url, {
    params: { page: query.page, limit: query.limit },
    signal: query.signal,
  });
  return res;
};

export const getUserById = async (
  url: string,
  query: {
    signal?: AbortSignal;
  },
): Promise<UserDetailResponse> => {
  const res: UserDetailResponse = await apiClient.get(url, {
    signal: query.signal,
  });

  return res;
};
