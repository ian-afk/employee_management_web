import { useQuery } from "@tanstack/react-query";

import { getAttendanceById } from "../../services/attendanceService";
import { isUnAuthorizedError } from "../../services/authHelper";
import { Navigate } from "react-router-dom";

type AttendanceDetailsProp = {
  attendanceId: string;
};

function AttendanceDetails({ attendanceId }: AttendanceDetailsProp) {
  const {
    data: attData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["attendance", attendanceId],
    queryFn: ({ signal }) =>
      getAttendanceById(`attendance/${attendanceId}`, { signal }),
  });

  if (isError) {
    if (isUnAuthorizedError(isError)) {
      return <Navigate to="/login" replace />;
    }
    return <div>Something went wrong</div>;
  }

  const attendance = attData?.attendance;
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {attendance ? (
            <div>
              <div>
                <div>
                  {attendance.employee.firstName} {attendance.employee.lastName}
                </div>
                <div>{attendance.employee.empId}</div>
                <div>{attendance.status}</div>
                <div>{attendance.isLate}</div>
              </div>
              <div>
                <div>
                  <label htmlFor="">SCHEDULE</label>
                  {attendance.timeIn}-{attendance.timeOut}
                </div>
                <div>
                  <label htmlFor="">CLOCK IN</label>
                  {attendance.timeIn}
                </div>
                <div>
                  <label htmlFor="">Clock out</label>
                  {attendance.timeOut ? attendance.timeOut : "Not recorded"}
                </div>
                <div>{attendance.isLate ? attendance.lateMinutes : "-"}</div>
              </div>
            </div>
          ) : (
            <div>No record found</div>
          )}
        </>
      )}
    </>
  );
}

export default AttendanceDetails;
