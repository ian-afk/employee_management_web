import type { TeamLeadUserResponse } from "../types/user-type";
import { apiClient } from "./apiClient";

export const getTeamLead = async (): Promise<TeamLeadUserResponse> => {
  const res: TeamLeadUserResponse = await apiClient.get("user/team-lead");
  return res;
};
