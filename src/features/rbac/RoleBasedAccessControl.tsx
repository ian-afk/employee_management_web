import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../../services/rbacService";
import { useState } from "react";
import RbacRoleDetails from "./RbacRoleDetails";
import type { Role } from "../../types/rbac-type";
import RbacRoleMenus from "./RbacRoleMenus";
import RbacHeader from "./RbacHeader";
import RbacRoleMenusSkeleton from "./RbacRoleMenusSkeleton";

function RoleBasedAccessControl() {
  const [selectRole, setSelectRole] = useState<Role | null>();
  const {
    data: role,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["role"],
    queryFn: ({ signal }) => getRoles({ signal }),
    staleTime: Number(`${import.meta.env.VITE_QUERY_STALE_TIME}`),
    refetchOnWindowFocus: false,
  });

  const roleResults = role?.results ?? [];
  const selectedRole =
    selectRole ??
    roleResults.find((role) => role.roleCode === "SUPER_ADMIN") ??
    roleResults[0] ??
    null;

  return (
    <div className="flex min-h-full flex-col gap-[18px] p-4 sm:p-6 lg:p-4">
      <RbacHeader />
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex w-[270px] max-w-full shrink-0 flex-col self-start rounded-[14px] border border-[#dfe6f0] bg-white shadow-[0_8px_28px_rgba(23,32,51,0.04)]">
          <header className="cursor-default rounded-t-[14px] border-b border-[#14213d] bg-[#14213d] px-[17px] py-[10px]">
            <h2 className="text-[10px] font-extrabold uppercase leading-4 tracking-[0.11em] text-white">
              Roles
            </h2>
            <p className="mt-[3px] text-[10px] leading-4 text-[#c7d2e5]">
              Core templates + custom roles
            </p>
          </header>
          <div className="space-y-1 p-[7px]">
            {isLoading ? (
              <RbacRoleMenusSkeleton />
            ) : isError && !role ? (
              <div
                role="alert"
                className="px-[10px] py-3 text-xs leading-5 text-[#c64242]"
              >
                Something went wrong
              </div>
            ) : (
              roleResults.map((role) => (
                  <RbacRoleMenus
                    key={role.roleId}
                    onSelectRole={setSelectRole}
                    role={role}
                    isSelected={selectedRole?.roleId === role.roleId}
                  />
              ))
            )}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          {selectedRole ? (
            <RbacRoleDetails key={selectedRole.roleId} role={selectedRole} />
          ) : !isLoading && !isError ? (
            <div>No selected Role </div>
          ) : null}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default RoleBasedAccessControl;
