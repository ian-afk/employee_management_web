import RbacSuperAdmin from "./overview/RbacSuperAdmin";
import RbacAdmin from "./overview/RbacAdmin";
import RbacHr from "./overview/RbacHr";
import RbacTeamLead from "./overview/RbacTeamLead";
import RbacEmployee from "./overview/RbacEmployee";

type RbacRoleDetailsProps = {
  roleCode: string | null | undefined;
};

function RbacRoleDetails({ roleCode }: RbacRoleDetailsProps) {
  const roleDetails = [
    {
      code: "SUPER_ADMIN",
      details: <RbacSuperAdmin />,
    },
    {
      code: "ADMIN",
      details: <RbacAdmin />,
    },
    {
      code: "HR",
      details: <RbacHr />,
    },
    {
      code: "TEAM_LEAD",
      details: <RbacTeamLead />,
    },
    {
      code: "EMPLOYEE",
      details: <RbacEmployee />,
    },
  ];

  const matchingRole = roleDetails.find((role) => role.code === roleCode);
  return <div>{matchingRole?.details}</div>;
}

export default RbacRoleDetails;
