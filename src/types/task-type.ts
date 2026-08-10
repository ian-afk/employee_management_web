export type TasksResponse = {
  message: string;
  status: "success" | string;
  results: TaskResult[];
  pagination: Pagination;
};

export type TaskResult = {
  id: string;

  title: string;
  description: string;
  priority: "HIGH" | string;
  status: "TODO" | string;

  dueAt: string; // ISO date-time
  startedAt: string | null;
  completedAt: string | null;
  cancelledAt: string | null;

  createdByUserId: string;

  assignedDepartment: string | null; // null allowed (seen in sample)
  taskAssignments: TaskAssignment[];

  isDeleted: boolean;
  deletedAt: string | null;

  createdAt: string; // ISO date-time
  updatedAt: string; // ISO date-time
};

export type TaskAssignment = {
  id: string;
  taskId: string;

  assignedByUser: AssignedByUser;
  assignedByUserId: string;

  assignedToEmployee: AssignedToEmployee;
  assignedToEmployeeId: string;

  assignedAt: string; // ISO date-time
  unassignedAt: string | null;

  createdAt: string; // ISO date-time
  updatedAt: string; // ISO date-time
};

export type AssignedByUser = {
  id: string;
  email: string;
  role: string;

  employee: AssignedByEmployee;
};

export type AssignedByEmployee = {
  id: string;
  firstName: string;
  lastName: string;
  job_title: string;
  department: string;
};

export type AssignedToEmployee = {
  id: string;
  firstName: string;
  lastName: string;
  job_title: string;
  department: string;
};

export type Pagination = {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
};
