import { apiClient } from "./apiClient";

type DepartmentResponse = {
  message: string;
  status: "success" | string;
  results: Department[];
};

type Department = {
  id: string;
  departmentCode: string;
  departmentName: string;
  departmentHeadId: string;
};
export async function getDepartment(): Promise<DepartmentResponse> {
  const res: DepartmentResponse = await apiClient.get("department");
  return res;
}
