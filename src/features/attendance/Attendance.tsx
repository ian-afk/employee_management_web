import { useState } from "react";
import AttendanceDrawer from "./AttendanceDrawer";
import AttendanceTable from "./AttendanceTable";

function Attendance() {
  const [attendanceId, setAttendanceId] = useState("");
  return (
    <div>
      <AttendanceTable onSetAttendanceId={setAttendanceId} />
      {attendanceId && (
        <AttendanceDrawer
          onSetAttendanceId={setAttendanceId}
          attendanceId={attendanceId}
        />
      )}
    </div>
  );
}

export default Attendance;
