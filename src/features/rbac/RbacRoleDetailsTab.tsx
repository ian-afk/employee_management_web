import { useState } from "react";
import RbacRoleDetailsMenu from "./RbacRoleDetailsMenu";
import OverviewTabDetails from "./overview/OverviewTabDetails";
import PermissionMatrixTab from "./permissionmatrix/PermissionMatrixTab";
import MembersTab from "./members/MembersTab";
import type { PermissionMatrixResponse, Role } from "../../types/rbac-type";

type RbacRoleDetailsTabProps = {
  role: Role;
  roleId: string;
  permission: PermissionMatrixResponse;
};
function RbacRoleDetailsTab({
  roleId,
  role,
  permission,
}: RbacRoleDetailsTabProps) {
  const [tab, setTab] = useState<string>("overview");
  return (
    <div className="space-y-5">
      <RbacRoleDetailsMenu onSetTab={setTab} selectedTab={tab} />
      <div>
        {tab === "overview" && <OverviewTabDetails />}
        {tab === "matrix" && (
          <PermissionMatrixTab
            roleName={role.roleName}
            permissions={permission.groupedModule}
          />
        )}
        {tab === "members" && <MembersTab roleId={roleId} />}
      </div>
    </div>
  );
}

export default RbacRoleDetailsTab;
