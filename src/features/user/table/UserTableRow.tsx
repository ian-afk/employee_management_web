import type { User } from "../../../types/user-type";
import type { SetStateAction } from "react";
import { statusStyles } from "../../../utils/color-palette";
import TableActionButtons from "../../../components/table/TableActionButtons";

type UserTableRowProps = {
  users: User[];
  onSetUserId: React.Dispatch<SetStateAction<string>>;
};
function UserTableRow({ users, onSetUserId }: UserTableRowProps) {
  return (
    <>
      {users.map((item) => {
        const userrole = item.userRoles
          .map((role) => role.role.roleName)
          .join(", ");
        return (
          <tr
            key={item.id}
            className="h-[69px] border-b border-[#edf1f6] text-[13px] text-[#43506a] transition-colors duration-150 last:border-b-0 hover:bg-[#f9fbfe]"
          >
            <td className="px-4 py-[18px]">
              <span className="block truncate font-mono text-[12px] text-[#35415a]">
                {item.employee.empId}
              </span>
            </td>
            <td className="px-2 py-[18px]">
              <span className="block truncate font-bold text-[#172033]">
                {item.employee.firstName} {item.employee.lastName}
              </span>
            </td>

            <td className="px-2 py-[18px]">
              <span className="block truncate">{item.email}</span>
            </td>
            <td className="px-2 py-[18px]">
              <span className="block truncate text-[#172033]">{userrole}</span>
            </td>
            <td className="px-2 py-[18px]">
              {item?.department?.departmentName ?? "-"}
            </td>
            <td className="px-2 py-[18px]">
              <span
                className={`inline-flex w-24 items-center justify-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold ring-1 ring-inset ${
                  statusStyles[item.status] ??
                  "bg-[#eef3fb] text-[#43506a] ring-[#d8e1ee]"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {item.status}
              </span>
            </td>
            <td className="px-2 py-[18px]">
              <TableActionButtons onSetId={onSetUserId} id={item.id} />
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default UserTableRow;
