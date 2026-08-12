export type TeamLeadUserResponse = {
  message: string;
  status: "success" | string;
  results: TeamLeadUser[];
  total: number;
};

export type TeamLeadUser = {
  id: string;
  email: string;
  employeeId: string;
  employee: Employee;
};

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  empId: string; // "EMP-003"
};
