export type Employee = {
  id: string;
  employeeGenId: number;

  empId: string;
  firstName: string;
  middleName: string;
  lastName: string;

  age: string;
  dob: string; // "1990-01-01"

  job_title: string;
  department: string;
  status: string;

  teamLead: TeamLead;
  teamLeadId: string | null;

  scheduleTimeIn: string; // "9:00:00"
  scheduleTimeOut: string; // "18:00:00"

  createdByUserId: string | null;

  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export type TeamLead = {
  id: string;
  employeeGenId: number;
  empId: string;
  firstName: string;
  lastName: string;
};

export type Pagination = {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
};

export type EmployeeSingleResponse = {
  message: string;
  status: "success" | string;
  employee: Employee;
};

export type EmployeeListResponse = {
  message: string;
  status: "success" | string;
  results: Employee[];
  pagination: Pagination;
};

export type EmployeeFormValues = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
  jobTitle: string;
  departmentId: string;
  teamLeadId: string;
  scheduleTimeIn: string;
  scheduleTimeOut: string;
};

export type EmployeeSummaryResponse = {
  message: string;
  status: "success" | string;
  summary: EmployeeSummary;
};

export type EmployeeSummary = {
  total: number;
  total_current_emp: number;
  pending: number;
  active: number;
  hold: number;
  suspended: number;
  deleted: number;
  terminated: number;
  resigned: number;
  new_hire: number;
};
