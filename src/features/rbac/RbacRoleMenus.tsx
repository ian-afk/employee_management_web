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
      className=" px-3 py-2 flex justify-between hover:bg-blue-100 rounded-md"
    >
      <div className="flex flex-col">
        <span>{role.roleName}</span>
        <span className="text-xs text-gray-500">
          {role.roleDescription ?? "description here"}
        </span>
      </div>

      <div className="self-center">
        <span className="text-xs font-semibold text-gray-500">
          {role.userCount}
        </span>
      </div>
    </div>
  );
}

export default memo(RbacRoleMenus);
