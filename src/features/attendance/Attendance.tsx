import { useState } from "react";

import AttendanceTable from "./table/AttendanceTable";
import AttendanceHeader from "./AttendanceHeader";
import AttendanceDetails from "./AttendanceDetails";
import Drawer from "../../components/drawer/Drawer";
import AttendanceClockInOut from "./AttendanceClockInOut";

function Attendance() {
  const [attendanceId, setAttendanceId] = useState("");

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8">
      <div className="flex justify-between">
        <AttendanceHeader />
        <AttendanceClockInOut />
      </div>
      <AttendanceTable onSetAttendanceId={setAttendanceId} />
      {attendanceId && (
        <Drawer
          onShowDetails={setAttendanceId}
          drawerHeader="Attendance Details"
          drawerInformation="Attendance Information"
        >
          <AttendanceDetails attendanceId={attendanceId} />
        </Drawer>
      )}
    </div>
  );
}

export default Attendance;
