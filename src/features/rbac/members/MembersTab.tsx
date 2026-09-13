import { useQuery } from "@tanstack/react-query";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
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

  if (isLoading)
    return (
      <div className="px-[5px] py-3 text-xs leading-5 text-[#647089]">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="px-[5px] py-3 text-xs leading-5 text-[#c64242]">
        something went wrong
      </div>
    );
  console.log(users);

  return (
    <div className="min-w-0 space-y-3 px-[5px]">
      <div>
        <span className="text-[13px] font-bold leading-5 text-[#172033]">
          Members
        </span>
      </div>
      <div className="grid gap-2">
        {users.user.length > 0 ? (
          <>
            {users.user.map((user) => (
              <div
                key={user.emp_id}
                className="flex min-h-[62px] min-w-0 items-center gap-[10px] rounded-[10px] border border-[#dfe6f0] bg-white px-3 py-[11px] transition-colors hover:bg-[#f8fafd]"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-[#eaf1ff] text-[#2f66e8]">
                  <PersonOutlinedIcon className="!h-5 !w-5" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                  <span className="break-words text-xs font-bold leading-5 text-[#172033]">
                    {user.emp_firstName} {user.emp_lastName}
                  </span>
                  <span className="break-all text-[11px] leading-4 text-[#647089]">
                    {user.user_email}
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="rounded-[10px] border border-[#dfe6f0] bg-[#f8fafd] px-3 py-6 text-center text-xs leading-5 text-[#647089]">
            No record found
          </div>
        )}
      </div>
    </div>
  );
}

export default MembersTab;
