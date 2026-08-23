import type React from "react";
import { memo, type SetStateAction } from "react";
import type { AttendanceResult } from "../../../types/attendance-type";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { attendanceStatusStyles } from "../../../utils/color-palette";

type AttendanceRowProp = {
  onSetAttendanceId: React.Dispatch<SetStateAction<string>>;
  attendance: AttendanceResult[];
};

function AttendanceRow({ onSetAttendanceId, attendance }: AttendanceRowProp) {
  const formatDateTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  return (
    <>
      {attendance.map((att) => {
        const milliseconds =
          new Date(att.timeOut).getTime() - new Date(att.timeIn).getTime();

        const totalMinutes = Math.floor(milliseconds / (1000 * 60));
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const finalHours = `${hours ? hours : 0}H ${minutes}min`;

        return (
          <tr
            key={att.id}
            className="h-[69px] border-b border-[#edf1f6] text-[13px] text-[#43506a] transition-colors duration-150 last:border-b-0 hover:bg-[#f9fbfe]"
          >
            <td className="px-6 py-[18px]">
              <span className="block truncate font-bold text-[#172033]">
                {att.employee.firstName} {att.employee.lastName}
              </span>
            </td>
            <td className="px-6 py-[18px]">
              <span className="block truncate whitespace-nowrap text-[12px] text-[#536078]">
                {att.employee.scheduleTimeIn} - {att.employee.scheduleTimeOut}
              </span>
            </td>
            <td className="px-6 py-[18px]">
              <span className="block truncate whitespace-nowrap">
                {formatDateTime(att.timeIn)}
              </span>
            </td>
            <td className="px-6 py-[18px]">
              <span className="block truncate whitespace-nowrap">
                {att.timeOut ? formatDateTime(att.timeOut) : ""}
              </span>
            </td>
            <td className="px-6 py-[18px]">
              <span className="block truncate whitespace-nowrap">
                {att.timeOut ? finalHours : ""}
              </span>
            </td>
            <td className="px-2 py-[18px]">
              <span
                className={`inline-flex w-24 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-extrabold ring-1 ring-inset ${
                  attendanceStatusStyles[att.status] ??
                  "bg-[#eef3fb] text-[#43506a] ring-[#d8e1ee]"
                }`}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                {att.status}
              </span>
            </td>
            <td className="px-4 py-[18px]">
              <div
                className="flex items-center gap-1"
                aria-label="Attendance actions"
              >
                <button
                  type="button"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#c9d8f7] bg-[#eaf1ff] text-[#2f66e8] transition-[color,background-color,border-color,box-shadow,transform] duration-150 hover:border-[#aac0f2] hover:bg-[#dce8ff] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-1"
                  onClick={() => onSetAttendanceId(att.id)}
                  aria-label="View attendance"
                  title="View attendance"
                >
                  <VisibilityOutlinedIcon className="!h-[17px] !w-[17px]" />
                </button>
                <button
                  type="button"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#dfe6f0] bg-white text-[#536078] transition-[color,background-color,border-color,box-shadow,transform] duration-150 hover:border-[#cbd5e3] hover:bg-[#f4f7fb] hover:text-[#2f66e8] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-1"
                  aria-label="Edit attendance"
                  title="Edit attendance"
                >
                  <EditOutlinedIcon className="!h-[16px] !w-[16px]" />
                </button>
                <button
                  type="button"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-transparent bg-transparent text-[#7b869a] transition-[color,background-color,box-shadow,transform] duration-150 hover:bg-[#eef2f7] hover:text-[#35415a] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] focus-visible:ring-offset-1"
                  aria-label="More attendance actions"
                  title="More actions"
                >
                  <MoreHorizIcon className="!h-[18px] !w-[18px]" />
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default memo(AttendanceRow);
