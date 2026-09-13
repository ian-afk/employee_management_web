import { memo, type SetStateAction } from "react";
import type { Role } from "../../types/rbac-type";

type RbacRoleMenuProps = {
  onSelectRole: React.Dispatch<SetStateAction<Role | null | undefined>>;
  role: Role;
  isSelected: boolean;
};

function RbacRoleMenus({ onSelectRole, role, isSelected }: RbacRoleMenuProps) {
  return (
    <button
      type="button"
      onClick={() => onSelectRole(role)}
      className={[
        "flex min-h-[66px] w-full items-center justify-between gap-3 rounded-[10px] border px-[10px] py-[10px] text-left transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-inset",
        isSelected
          ? "border-[#c7d7ff] bg-[#eaf1ff] text-[#2f66e8]"
          : "border-transparent bg-transparent text-[#172033] hover:bg-[#f8fafd]",
      ].join(" ")}
    >
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs font-bold leading-5">{role.roleName}</span>
        <span
          className="mt-[3px] line-clamp-2 text-[11px] leading-4 text-[#647089]"
          title={role.roleDescription}
        >
          {role.roleDescription ?? "description here"}
        </span>
      </span>

      <span className="shrink-0 text-[11px] font-extrabold tabular-nums text-[#647089]">
        {role.userCount}
      </span>
    </button>
  );
}

export default memo(RbacRoleMenus);
