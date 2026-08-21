export type AttendanceRetrieveResponse = {
  attendance: AttendanceResult;
  message: string;
  status: "success" | string;
};

export type AttendanceResponse = {
  message: string;
  status: "success" | string;
  results: AttendanceResult[];
  pagination: Pagination;
};

export type AttendanceResult = {
  id: string;
  timeIn: string;
  timeOut: string;

  employee: Employee;
  employeeId: string;

  status: string;
  isLate: boolean;
  lateMinutes: string;

  editedById: string | null;

  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Employee = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  empId: string;
  age: string;
  dob: string;

  job_title: string;
  department: string;

  status: string;

  teamLeadId: string | null;

  scheduleTimeIn: string;
  scheduleTimeOut: string;

  createdByUserId: string;

  createdAt: string;
  updatedAt: string;
};

export type Pagination = {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
};
