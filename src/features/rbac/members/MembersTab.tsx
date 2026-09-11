import { useQuery } from "@tanstack/react-query";
import { getUserByRole } from "../../../services/userService";

type MembersTabProps = {
  roleId: string;
};
function MembersTab({ roleId }: MembersTabProps) {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", roleId],
    queryFn: ({ signal }) =>
      getUserByRole(`user/role/${roleId}`, { roleId, signal }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div> something went wrong</div>;
  console.log(users);

  return (
    <div>
      <div>
        <span>MembersTab</span>
      </div>
      <div>
        {users.user.length > 0 ? (
          <>
            {users.user.map((user) => (
              <div
                key={user.emp_id}
                className="border-2 border-solid border-violet-600 rounded-md mb-2 p-4 flex flex-col"
              >
                <span>
                  {user.emp_firstName} {user.emp_lastName}
                </span>
                <span>{user.user_email}</span>
              </div>
            ))}
          </>
        ) : (
          <div>No record found</div>
        )}
      </div>
    </div>
  );
}

export default MembersTab;
