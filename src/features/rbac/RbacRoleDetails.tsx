import type { Role } from "../../types/rbac-type";

import { useQuery } from "@tanstack/react-query";
import { getRolesById } from "../../services/rbacService";
import RbacRoleDetailsTab from "./RbacRoleDetailsTab";

type RbacRoleDetailsProps = {
  role: Role;
};

function RbacRoleDetails({ role }: RbacRoleDetailsProps) {
  const {
    data: permission,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["roles", role.roleId],
    queryFn: ({ signal }) => getRolesById({ id: role.roleId, signal }),
    staleTime: Number(`${import.meta.env.VITE_QUERY_STALE_TIME}`),
    refetchOnWindowFocus: false,
  });

  const roleId = role.roleId;

  return (
    <div className="min-w-0 rounded-[14px] border border-[#dfe6f0] bg-white px-3 py-5 shadow-[0_8px_28px_rgba(23,32,51,0.04)]">
      <header className="-mx-3 -mt-5 rounded-t-[14px] border-b border-[#edf1f6] p-[17px]">
        <h3 className="break-words text-lg font-bold leading-6 tracking-[-0.01em] text-[#172033]">
          {role.roleName}
        </h3>
        <p className="mt-[5px] max-w-[42rem] break-words text-xs leading-relaxed text-[#647089]">
          {role.roleDescription}
        </p>
      </header>
      <RbacRoleDetailsTab
        permission={permission}
        isLoading={isLoading}
        isError={isError}
        role={role}
        roleId={roleId}
      />
    </div>
  );
}

export default RbacRoleDetails;
