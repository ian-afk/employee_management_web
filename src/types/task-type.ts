export type TasksResponse = {
  message: string;
  status: "success" | string;
  results: TaskResult[];
  pagination: Pagination;
};

export type TaskResult = {
  id: string;

  taskId: string;

  task: Task;

  assignedByUser: AssignedUser;

  assignedByUserId: string;
  assignedToEmployeeId: string;

  assignedAt: string;
  unassignedAt: string | null;

  createdAt: string;
  updatedAt: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: "HIGH" | string;
  status: "TODO" | string;

  dueAt: string;
  startedAt: string | null;
  completedAt: string | null;
  cancelledAt: string | null;

  createdByUserId: string;
  isDeleted: boolean;
  deletedAt: string | null;

  createdAt: string;
  updatedAt: string;
};

export type AssignedUser = {
  id: string;
  email: string;
  createdByUserId: string | null;
  activatedAt: string | null;
  employee: Employee;
  employeeId: string;
};

export type Employee = {
  id: string;
  firstName: string;
  middleName: string;
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
