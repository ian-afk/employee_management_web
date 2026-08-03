import { apiClient } from "./apiClient";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  empId?: string;
  department: string;
  job_title: string;
  teamLeadId: string | null;
  createdAt: string;
  status: string;
};

type EmployeeResponse = {
  results: Employee[];
  pagination: {
    totalPages: number;
  };
};

export const getEmployee = async (query: {
  page: number;
  limit: number;
  signal?: AbortSignal;
}): Promise<EmployeeResponse> => {
  const res: EmployeeResponse = await apiClient.get(`employee`, {
    params: { page: query.page, limit: query.limit },
    signal: query.signal,
  });

  return res;
};
