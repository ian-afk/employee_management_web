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
            <div className="flex flex-col gap-4">
              {roleResults.map((role) => (
                <RbacRoleMenus
                  key={role.roleId}
                  onSelectRole={setSelectRole}
                  role={role}
                />
              ))}
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
