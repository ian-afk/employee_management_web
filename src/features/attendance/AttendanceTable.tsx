import type React from "react";
import AttendanceRow from "./AttendanceRow";
import { useState, type SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAttendance } from "../../services/attendanceService";
import { useDebouncedCallback } from "use-debounce";
import { isUnAuthorizedError } from "../../services/authHelper";
import { Navigate } from "react-router-dom";

type AttendanceTableProps = {
  onSetAttendanceId: React.Dispatch<SetStateAction<string>>;
};
function AttendanceTable({ onSetAttendanceId }: AttendanceTableProps) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [limitInput, setLimitInput] = useState("10");

  const debouncedSetLimit = useDebouncedCallback((value: string) => {
    const newLimit = Number(value);

    if (Number.isFinite(newLimit) && newLimit > 0) {
      setLimit(newLimit);
      setPage(1);
      onSetAttendanceId("");
    }
  }, 500);
  const handleChangeLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setLimitInput(value);
    debouncedSetLimit(value);
  };
  const {
    data: attendance = {
      results: [],
      pagination: {
        totalPages: 1,
      },
    },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["attendance", page, limit],
    queryFn: async ({ signal }) =>
      getAttendance("attendance/my-attendance", { page, limit, signal }),
  });

  const attendanceResult = attendance.results.length > 0;
  const initialState = isLoading && !attendanceResult;

  if (isLoading) return <div>Loading..</div>;
  if (!attendance || attendance.results.length === 0)
    return <div>No Record found</div>;

  if (isError) {
    if (isUnAuthorizedError(isError)) {
      return <Navigate to="/login" replace />;
    }
    return <div>Failed to load attendance</div>;
  }

  const handleChangePage = (pg: number) => {
    setPage(pg + 1);
    onSetAttendanceId("");
  };
  return (
    <>
      {initialState ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {attendanceResult ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Schedule</th>
                    <th>Clock IN</th>
                    <th>Clock OUT</th>
                    <th>HOURS</th>
                    <th>STATUS</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AttendanceRow
                    attendance={attendance.results}
                    onSetAttendanceId={onSetAttendanceId}
                  />
                </tbody>
              </table>
              <div>
                <div>
                  <input
                    min={1}
                    type="number"
                    value={limitInput}
                    name="limit"
                    onChange={handleChangeLimit}
                  />
                </div>
                {attendance?.pagination?.totalPages && (
                  <div>
                    <span>Page</span>
                    {Array.from(
                      {
                        length: attendance?.pagination?.totalPages ?? 0,
                      },
                      (_, index) => (
                        <button
                          key={index}
                          onClick={() => handleChangePage(index)}
                        >
                          {index + 1}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>No record found</>
          )}
        </>
      )}
    </>
  );
}

export default AttendanceTable;
