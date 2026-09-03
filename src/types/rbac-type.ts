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
