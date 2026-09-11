import { memo, useState } from "react";
import RbacRoleDetailsMenu from "./RbacRoleDetailsMenu";

import OverviewTabDetails from "./overview/OverviewTabDetails";
import type { Role } from "../../types/rbac-type";
import PermissionMatrixTab from "./permissionmatrix/PermissionMatrixTab";
import { useQuery } from "@tanstack/react-query";
import { getRolesById } from "../../services/rbacService";
import MembersTab from "./members/MembersTab";

type RbacRoleDetailsProps = {
  role: Role;
};

function RbacRoleDetails({ role }: RbacRoleDetailsProps) {
  const [tab, setTab] = useState<string>("overview");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["roles", role.roleId],
    queryFn: ({ signal }) => getRolesById({ id: role.roleId, signal }),
    staleTime: Number(`${import.meta.env.VITE_QUERY_STALE_TIME}`),
    refetchOnWindowFocus: false,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>error</div>;

  const roleId = role.roleId;

  return (
    <div>
      <div>
        <h3>{role.roleName}</h3>
        <p>{role.description}</p>
      </div>
      <RbacRoleDetailsMenu onSetTab={setTab} />
      {tab === "overview" && <OverviewTabDetails />}
      {tab === "matrix" && (
        <PermissionMatrixTab
          roleName={role.roleName}
          permissions={data.groupedModule}
        />
      )}
      {tab === "members" && <MembersTab roleId={roleId} />}
    </div>
  );
}

export default memo(RbacRoleDetails);
