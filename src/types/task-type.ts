export type TasksResponse = {
  message: string;
  status: "success" | string;
  results: TaskWithAssignment[] | TaskWithOutAssignment[];
  pagination: Pagination;
};

export type TaskBaseResponse = {
  message: string;
  status: string;
  task: TaskWithAssignment | TaskWithOutAssignment;
};

export type TaskWithAssignment = TaskBase & {
  taskAssignments: TaskAssignment[];
};

export type TaskWithOutAssignment = TaskBase & {
  taskAssignments: [];
};

export type TaskBase = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;

  dueAt: string;
  startedAt: string | null;
  completedAt: string | null;
  cancelledAt: string | null;

  createdByUserId: string;

  assignedDepartment: string | null;

  isDeleted: boolean;
  deletedAt: string | null;

  createdAt: string;
  updatedAt: string;
};

export type TaskAssignment = {
  id: string;
  taskId: string;

  assignedByUser: AssignedByUser;
  assignedByUserId: string;

  assignedToEmployee: AssignedToEmployee;
  assignedToEmployeeId: string;

  assignedAt: string;
  unassignedAt: string | null;

  createdAt: string;
  updatedAt: string;
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

export type TaskFormValues = {
  title: string;
  description: string;
  dueAt: Date;
  priority: PriorityStatus;
};

type PriorityStatus = "SHOWSTOPPER" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
