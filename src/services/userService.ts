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
