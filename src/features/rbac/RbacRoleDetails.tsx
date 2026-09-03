type RbacRoleDetailsProps = {
  roleCode: string | null | undefined;
};

function RbacRoleDetails({ roleCode }: RbacRoleDetailsProps) {
  const roleDetails = [
    {
      code: "SUPER_ADMIN",
      details: <div>SUPERADMIN</div>,
    },
    {
      code: "ADMIN",
      details: <div>ADMIN</div>,
    },
    {
      code: "HR",
      details: <div>HR</div>,
    },
    {
      code: "TEAM_LEAD",
      details: <div>TEAM LEAD</div>,
    },
    {
      code: "EMPLOYEE",
      details: <div>employee</div>,
    },
  ];

  const matchingRole = roleDetails.find((role) => role.code === roleCode);
  return <div>{matchingRole?.details}</div>;
}

export default RbacRoleDetails;
