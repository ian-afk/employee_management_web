import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../../services/rbacService";
import { useState } from "react";
import RbacRoleDetails from "./RbacRoleDetails";

function RoleBasedAccessControl() {
  const [roleCode, setRoleCode] = useState<string | null>();
  const {
    data: role,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["role"],
    queryFn: ({ signal }) => getRoles({ signal }),
    onSuccess: () => setRoleCode("SUPER_ADMIN"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div> Something went wrong</div>;

  console.log(role.results);
  return (
    <div>
      <h2>Rbac</h2>
      <>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {role.results.map((role) => (
              <div key={role.roleId} onClick={() => setRoleCode(role.roleCode)}>
                <span>{role.roleCode}</span>
                <br />
                <span>{role.roleName}</span>
                <br />
                <span>{role.userCount}</span>
              </div>
            ))}
          </div>
        )}
      </>
      <div>
        <RbacRoleDetails roleCode={roleCode} />
      </div>
    </div>
  );
}

export default RoleBasedAccessControl;
