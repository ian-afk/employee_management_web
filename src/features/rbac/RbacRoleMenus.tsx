import { memo, type SetStateAction } from "react";
import type { Role } from "../../types/rbac-type";

type RbacRoleMenuProps = {
  onSelectRole: React.Dispatch<SetStateAction<Role | null | undefined>>;
  role: Role;
};

function RbacRoleMenus({ onSelectRole, role }: RbacRoleMenuProps) {
  return (
    <div
      onClick={() => onSelectRole(role)}
      className="border-2 border-solid border-violet-600 p-4"
    >
      <span>{role.roleCode}</span>
      <br />
      <span>{role.roleName}</span>
      <br />
      <span>{role.userCount}</span>
    </div>
  );
}

export default memo(RbacRoleMenus);
