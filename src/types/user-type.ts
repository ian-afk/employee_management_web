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
export type UserStatus = "PENDING" | "ACTIVE" | "SUSPENDED" | "HOLD";

export type ResponseStatus = "success";

export interface UserRoleType {
  id: string;
  role: RoleType;
}

export interface RoleType {
  id: string;
  roleName: string;
  roleCode: string;
}

export interface DepartmentHeadType {
  firstName: string;
  lastName: string;
}

export interface DepartmentType {
  departmentName: string;
  departmentHead: DepartmentHeadType;
}

export interface User {
  id: string;
  email: string;
  status: UserStatus;
  createdByUserId: string | null;
  activatedAt: string | null;
  passwordChangedAt: string | null;
  userRoles: UserRoleType[];
  createdAt: string;
  updatedAt: string;
  employee: Employee;
  employeeId: string;
  department: DepartmentType;
}

export interface PaginationType {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
}

export interface UserListReponse {
  message: string;
  status: ResponseStatus;
  results: User[];
  pagination: PaginationType;
}
