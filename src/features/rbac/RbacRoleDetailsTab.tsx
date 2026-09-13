import { useState } from "react";
import RbacRoleDetailsMenu from "./RbacRoleDetailsMenu";
import OverviewTabDetails from "./overview/OverviewTabDetails";
import PermissionMatrixTab from "./permissionmatrix/PermissionMatrixTab";
import MembersTab from "./members/MembersTab";
import type { PermissionMatrixResponse, Role } from "../../types/rbac-type";
import { RbacRoleDetailsContentSkeleton } from "./RbacRoleDetailsSkeleton";
import PermissionMatrixTabSkeleton from "./permissionmatrix/PermissionMatrixTabSkeleton";

type RbacRoleDetailsTabProps = {
  role: Role;
  roleId: string;
  permission?: PermissionMatrixResponse;
  isLoading: boolean;
  isError: boolean;
};
function RbacRoleDetailsTab({
  roleId,
  role,
  permission,
  isLoading,
  isError,
}: RbacRoleDetailsTabProps) {
  const [tab, setTab] = useState<string>("overview");
  return (
    <div className="space-y-5">
      <RbacRoleDetailsMenu onSetTab={setTab} selectedTab={tab} />
      <div>
        {tab === "members" ? (
          <MembersTab roleId={roleId} />
        ) : isLoading ? (
          tab === "matrix" ? (
            <PermissionMatrixTabSkeleton roleName={role.roleName} />
          ) : (
            <div role="status">
              <span className="sr-only">Loading role details...</span>
              <RbacRoleDetailsContentSkeleton />
            </div>
          )
        ) : isError && !permission ? (
          <div
            role="alert"
            className="px-[5px] py-5 text-xs leading-5 text-[#c64242]"
          >
            error
          </div>
        ) : tab === "overview" ? (
          <OverviewTabDetails />
        ) : permission ? (
          <PermissionMatrixTab
            key={roleId}
            roleName={role.roleName}
            permissions={permission.groupedModule}
          />
        ) : null}
      </div>
    </div>
  );
}

export default RbacRoleDetailsTab;
