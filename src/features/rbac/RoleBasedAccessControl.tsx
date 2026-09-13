import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../../services/rbacService";
import { useState } from "react";
import RbacRoleDetails from "./RbacRoleDetails";
import type { Role } from "../../types/rbac-type";
import RbacRoleMenus from "./RbacRoleMenus";
import RbacHeader from "./RbacHeader";

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div> Something went wrong</div>;

  const selectedRole =
    selectRole ??
    role.results.find((role) => role.roleCode === "SUPER_ADMIN") ??
    role?.results[0] ??
    null;

  const roleResults = role.results;
  return (
    <div className="flex min-h-full flex-col gap-[18px] p-4 sm:p-6 lg:p-4">
      <RbacHeader />
      <div className="flex gap-4">
        <>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex w-[270px] max-w-full shrink-0 flex-col self-start rounded-[14px] border border-[#dfe6f0] bg-white shadow-[0_8px_28px_rgba(23,32,51,0.04)]">
              <div className="min-h-[65px] border-b border-[#edf1f6] px-[17px] py-[14px]">
                <span className="text-[13px] font-bold text-[#172033]">Roles</span>
                <p className="mt-1 text-[10px] leading-4 text-[#647089]">Core templates + custom roles</p>
              </div>
              <div className="space-y-1 p-[7px]">
                {roleResults.map((role) => (
                  <RbacRoleMenus
                    key={role.roleId}
                    onSelectRole={setSelectRole}
                    role={role}
                    isSelected={selectedRole?.roleId === role.roleId}
                  />
                ))}
              </div>
            </div>
          )}
        </>
        <div>
          {selectedRole ? (
            <RbacRoleDetails key={selectedRole.roleId} role={selectedRole} />
          ) : (
            <div>No selected Role </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default RoleBasedAccessControl;
