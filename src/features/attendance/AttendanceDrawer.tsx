import type { SetStateAction } from "react";
import type React from "react";

type AttendanceDrawerProp = {
  onSetAttendanceId: React.Dispatch<SetStateAction<string>>;
  attendanceId: string;
};

function AttendanceDrawer({
  onSetAttendanceId,
  attendanceId,
}: AttendanceDrawerProp) {
  return (
    <div>
      <div>
        <div>{attendanceId}</div>
      </div>
      <div>
        <button onClick={() => onSetAttendanceId("")}>Close</button>
      </div>
    </div>
  );
}

export default AttendanceDrawer;
