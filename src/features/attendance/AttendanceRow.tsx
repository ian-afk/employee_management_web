import type React from "react";
import { memo, type SetStateAction } from "react";
import type { AttendanceResult } from "../../types/attendance-type";

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
          <tr key={att.id}>
            <td>
              {att.employee.firstName} {att.employee.firstName}
            </td>
            <td>
              {att.employee.scheduleTimeIn} - {att.employee.scheduleTimeOut}
            </td>
            <td>{formatDateTime(att.timeIn)}</td>
            <td>{att.timeOut ? formatDateTime(att.timeOut) : ""}</td>
            <td>{att.timeOut ? finalHours : ""}</td>
            <td>{att.status}</td>
            <td>
              <button onClick={() => onSetAttendanceId(att.id)}>VIEW</button>
              <button>Edit</button>
              <button>...</button>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default memo(AttendanceRow);
