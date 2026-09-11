export type RoleResponse = {
  message: string;
  status: "success" | string;
  results: Role[];
};

export type Role = {
  roleId: string;
  rpid: string;
  roleName: string;
  roleCode: string;
  description: string;
  resource: string;
  action: string;
  userCount?: string;
};

export type PermissionAction = "view" | "create" | "edit" | "delete";

export type Permission = {
  roleId: string;
  roleName: string;
  roleCode: string;
  r_isDeleted: boolean;
  r_createdAt: string;
  r_updatedAt: string;
  rpId: string;
  description: string;
  resource: string;
  action: PermissionAction;
};

export type GroupedModule = {
  employee: Permission[];
  user: Permission[];
  attendance: Permission[];
  task: Permission[];
  role: Permission[];
  settings: Permission[];
  home_message: Permission[];
};

export type PermissionMatrixSummary = {
  permissionCount: number;
  areaCount: number;
};

export type PermissionMatrixResponse = {
  groupedModule: GroupedModule;
  summary: PermissionMatrixSummary;
  message: string;
  status: "success";
};

type UserStatus = "ACTIVE";

export interface UserByRole {
  user_id: string;
  user_email: string;
  user_status: UserStatus;
  user_createdByUserId: string | null;
  user_activatedAt: string | null;
  user_passwordChangedAt: string | null;
  user_createdAt: string;
  user_updatedAt: string;
  user_employeeId: string;

  emp_id: string;
  emp_firstName: string;
  emp_lastName: string;

  userrole_id: string;

  role_id: string;
  role_roleCode: string;
  role_roleName: string;
}

export interface UserByRoleResponse {
  message: string;
  status: "success";
  user: UserByRole[];
}
