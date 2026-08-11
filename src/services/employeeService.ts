import type {
  EmployeeListResponse,
  EmployeeSingleResponse,
} from "../types/employee-type";
import { apiClient } from "./apiClient";

export const getEmployee = async (
  url: string,
  query: {
    page?: number;
    limit?: number;
    signal?: AbortSignal;
  },
): Promise<EmployeeListResponse> => {
  const res: EmployeeListResponse = await apiClient.get(url, {
    params: { page: query.page, limit: query.limit },
    signal: query.signal,
  });

  return res;
};

export const getEmployeeId = async (
  url: string,
  query: {
    page?: number;
    limit?: number;
    signal?: AbortSignal;
  },
): Promise<EmployeeSingleResponse> => {
  const res: EmployeeSingleResponse = await apiClient.get(url, {
    params: { page: query.page, limit: query.limit },
    signal: query.signal,
  });

  return res;
};
