import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/userService";
import { Navigate } from "react-router-dom";
import { isUnAuthorizedError } from "../../services/authHelper";

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
        <div>
          <section className="mt-8">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.08em] text-[#172033]">
              Identity Summary
            </h3>
            <div>
              <label htmlFor="">Employee ID</label>
              <p>{employeeDetail?.empId}</p>
            </div>
            <div>
              <label htmlFor="">Full name</label>
              <p>
                {employeeDetail?.firstName} {employeeDetail?.lastName}
              </p>
            </div>
            <div>
              <label htmlFor="">Job Title</label>

              <p>{employeeDetail?.job_title}</p>
            </div>
          </section>
          <section className="mt-8">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.08em] text-[#172033]">
              Account
            </h3>
            <div>
              <label htmlFor="">Email</label>
              <p>{user?.email}</p>
            </div>
            <div>
              <label htmlFor="">Status</label>
              <p>{user?.status}</p>
            </div>
            <div>
              <label htmlFor="">Created Date</label>
              <p>{user?.createdAt}</p>
            </div>
          </section>
          <section className="mt-8">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.08em] text-[#172033]">
              Access
            </h3>
            <div>
              <label htmlFor="">Assigned Role</label>
              <p>{user?.userRoles.join(", ")}</p>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default UserDetails;
