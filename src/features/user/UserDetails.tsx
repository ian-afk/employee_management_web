import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/userService";
import { Navigate } from "react-router-dom";
import { isUnAuthorizedError } from "../../services/authHelper";

import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";

import DrawerInfoHeader from "../../components/drawer/DrawerInfoHeader";
import DetailItem from "../../components/drawer/DetailItem";

type UserDetailsProps = {
  userId: string;
};
function UserDetails({ userId }: UserDetailsProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", userId],
    queryFn: ({ signal }) => getUserById(`user/${userId}`, { signal }),
  });

  if (isError) {
    if (isUnAuthorizedError(isError)) {
      return <Navigate to="/login" replace />;
    }
    return <div>Something went wrong</div>;
  }

  const user = data?.user;
  const employeeDetail = user?.employee;

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="px-6 py-8">
          <DrawerInfoHeader
            name={`${employeeDetail?.firstName} ${employeeDetail?.lastName}`}
            jobTitle={`${employeeDetail?.job_title}`}
            department={`${employeeDetail?.department.departmentName}`}
            status={`${user?.status}`}
            icon={PersonOutlineIcon}
          />
          <section className="mt-8">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.08em] text-[#172033]">
              Identity Summary
            </h3>
            <DetailItem
              item={[
                {
                  label: "Employee ID",
                  value: employeeDetail?.empId,
                },
                {
                  label: "Full name",
                  value: `${employeeDetail?.firstName} ${employeeDetail?.lastName}`,
                },
                {
                  label: "Job Title",
                  value: `${employeeDetail?.job_title}`,
                },
              ]}
            />
          </section>
          <section className="mt-8">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.08em] text-[#172033]">
              Account
            </h3>
            <DetailItem
              item={[
                {
                  label: "Email",
                  value: user?.email,
                },
                {
                  label: "Status",
                  value: user?.status,
                },
                {
                  label: "Created Date",
                  value: user?.createdAt,
                },
              ]}
            />
          </section>
          <section className="mt-8">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.08em] text-[#172033]">
              Access
            </h3>
            <DetailItem
              item={[
                {
                  label: "Assigned Role",
                  value: user?.userRoles.join(", "),
                },
              ]}
            />
          </section>
        </div>
      )}
    </>
  );
}

export default UserDetails;
