import type { AttendanceResponse } from "../types/attendance-type";
import { apiClient } from "./apiClient";

export const getAttendance = async (
  url: string,
  query: {
    page: number;
    limit: number;
    signal?: AbortSignal;
  },
): Promise<AttendanceResponse> => {
  const res: AttendanceResponse = await apiClient.get(url, {
    params: {
      page: query.page,
      limit: query.limit,
    },
    signal: query.signal,
  });
  return res;
};
