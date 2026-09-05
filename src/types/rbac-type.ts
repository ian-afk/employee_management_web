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
