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
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>error</div>;

  const roleId = role.roleId;

  return (
    <div className="border-2 border-solid border-gray-400 rounded-lg px-3 py-5">
      <div>
        <h3>{role.roleName}</h3>
        <p className="">{role.roleDescription}</p>
      </div>
      <RbacRoleDetailsTab permission={permission} role={role} roleId={roleId} />
    </div>
  );
}

export default RbacRoleDetails;
