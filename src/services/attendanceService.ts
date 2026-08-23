import type {
  AttendanceResponse,
  AttendanceRetrieveResponse,
} from "../types/attendance-type";
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

export const getAttendanceById = async (
  url: string,
  query: {
    signal?: AbortSignal;
  },
): Promise<AttendanceRetrieveResponse> => {
  const res: AttendanceRetrieveResponse = await apiClient.get(`${url}`, {
    signal: query.signal,
  });
  return res;
};

export const clockInOutAttendance = async (
  url: string,
  empCode: string,
  id?: string | null,
): Promise<AttendanceRetrieveResponse> => {
  const res: AttendanceRetrieveResponse = await apiClient.post(`${url}`, {
    id,
    empCode,
  });
  return res;
};
