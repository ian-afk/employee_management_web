import { useState } from "react";
import AttendanceDrawer from "./AttendanceDrawer";
import AttendanceTable from "./table/AttendanceTable";
import AttendanceHeader from "./AttendanceHeader";

function Attendance() {
  const [attendanceId, setAttendanceId] = useState("");
  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8">
      <AttendanceHeader />
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
