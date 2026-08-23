import { useState } from "react";

import AttendanceTable from "./table/AttendanceTable";
import AttendanceHeader from "./AttendanceHeader";
import AttendanceDetails from "./AttendanceDetails";
import Drawer from "../../components/drawer/Drawer";
import AttendanceClockInOut from "./AttendanceClockInOut";
import AttendanceSummary from "./AttendanceSummary";

function Attendance() {
  const [attendanceId, setAttendanceId] = useState("");

  return (
    <div className="flex min-h-full flex-col gap-[18px] p-4 sm:p-6 lg:p-8">
      <AttendanceHeader />
      <section
        className="grid items-stretch gap-[18px] xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.75fr)]"
        aria-label="Today's attendance overview"
      >
        <AttendanceSummary />
        <AttendanceClockInOut />
      </section>
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
