import { memo } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import type { Employee } from "../../../types/employee-type";
import { dateformatter } from "../../../utils/dateformatter";

type EmployeeTableRowProp = {
  employee: Employee[] | [];
  setEmpId: React.Dispatch<React.SetStateAction<string>>;
};

function EmployeeTableRow({ employee, setEmpId }: EmployeeTableRowProp) {
  return (
    <>
      {employee.map((emp) => (
        <tr
          className="h-[69px] border-b border-[#edf1f6] text-[13px] text-[#43506a] transition-colors duration-150 last:border-b-0 hover:bg-[#f9fbfe]"
          key={emp.id}
        >
          <td className="px-6 py-[18px]">
            <span className="block truncate font-bold text-[#172033]">
              {emp.firstName} {emp.lastName}
            </span>
          </td>
          <td className="px-4 py-[18px]">
            <span className="block truncate font-mono text-[12px] text-[#35415a]">
              {emp.empId}
            </span>
          </td>
          <td className="px-4 py-[18px]">
            <span className="block truncate font-semibold text-[#35415a]">
              {emp.department}
            </span>
          </td>
          <td className="px-4 py-[18px]">
            <span className="block truncate">{emp.job_title}</span>
          </td>
          <td className="px-4 py-[18px]">
            <span className="block truncate font-mono text-[11px] text-[#647089]">
              {emp.teamLead?.firstName} {emp.teamLead?.lastName}
            </span>
          </td>
          <td className="px-4 py-[18px]">
            <span className="block truncate text-[12px]">
              {dateformatter(emp.createdAt)}
            </span>
          </td>
          <td className="px-4 py-[18px]">
            <span className="inline-flex rounded-full bg-[#eef3fb] px-2.5 py-1 text-[10px] font-extrabold text-[#43506a] ring-1 ring-inset ring-[#d8e1ee]">
              {emp.status}
            </span>
          </td>
          <td className="px-2 py-[18px]">
            <div
              className="flex items-center gap-1"
              aria-label="Employee actions"
            >
              <button
                type="button"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#c9d8f7] bg-[#eaf1ff] text-[#2f66e8] transition-[color,background-color,border-color,box-shadow,transform] duration-150 hover:border-[#aac0f2] hover:bg-[#dce8ff] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-1"
                onClick={() => setEmpId(emp.id)}
                aria-label="View employee"
                title="View employee"
              >
                <VisibilityOutlinedIcon className="!h-[17px] !w-[17px]" />
              </button>
              <button
                type="button"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#dfe6f0] bg-white text-[#536078] transition-[color,background-color,border-color,box-shadow,transform] duration-150 hover:border-[#cbd5e3] hover:bg-[#f4f7fb] hover:text-[#2f66e8] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-1"
                aria-label="Edit employee"
                title="Edit employee"
              >
                <EditOutlinedIcon className="!h-[16px] !w-[16px]" />
              </button>
              <button
                type="button"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-transparent bg-transparent text-[#7b869a] transition-[color,background-color,box-shadow,transform] duration-150 hover:bg-[#eef2f7] hover:text-[#35415a] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-1"
                aria-label="More employee actions"
                title="More actions"
              >
                <MoreHorizIcon className="!h-[18px] !w-[18px]" />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default memo(EmployeeTableRow);
