export type Employee = {
  id: string;
  employeeGenId: number;

  firstName: string;
  middleName: string;
  lastName: string;

  age: string;
  dob: string; // "1990-01-01"

  job_title: string;
  department: string;
  status: string;

  teamLeadId: string | null;

  scheduleTimeIn: string; // "9:00:00"
  scheduleTimeOut: string; // "18:00:00"

  createdByUserId: string | null;

  createdAt: string; // ISO
  updatedAt: string; // ISO
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
