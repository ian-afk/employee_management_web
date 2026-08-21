import type React from "react";
import AttendanceRow from "./AttendanceTableRow";
import { useState, type SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAttendance } from "../../../services/attendanceService";
import { useDebouncedCallback } from "use-debounce";
import { isUnAuthorizedError } from "../../../services/authHelper";
import { Navigate } from "react-router-dom";
import TableHead from "../../../components/table/TableHead";
import TableFooter from "../../../components/table/TableFooter";
import { usePage } from "../../../hooks/usePage";

import AttendanceTableEmpty from "./AttendanceTableEmpty";
import AttendanceTableSkeleton from "./AttendanceTableSkeleton";

type AttendanceTableProps = {
  onSetAttendanceId: React.Dispatch<SetStateAction<string>>;
};

const tableHead = [
  "Employee",
  "Schedule",
  "Clock IN",
  "Clock OUT",
  "HOURS",
  "STATUS",
  "Actions",
];
function AttendanceTable({ onSetAttendanceId }: AttendanceTableProps) {
  const [limit, setLimit] = useState(10);
  const [limitInput, setLimitInput] = useState("10");
  const [{ page }, dispatch] = usePage();

  const debouncedSetLimit = useDebouncedCallback((value: string) => {
    const newLimit = Number(value);

    if (Number.isFinite(newLimit) && newLimit > 0) {
      setLimit(newLimit);
      dispatch({
        type: "initialize",
      });
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
        totalItems: 0,
        itemsPerPage: limit,
        totalPages: 1,
        currentPage: 1,
        previousPage: null,
        nextPage: null,
      },
    },
    isLoading,
    isError,
    isPreviousData,
    isFetching,
  } = useQuery({
    queryKey: ["attendance", page, limit],
    queryFn: async ({ signal }) =>
      getAttendance("attendance/my-attendance", { page, limit, signal }),
    keepPreviousData: true,
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
    dispatch({
      type: "setPage",
      payload: pg,
    });
    onSetAttendanceId("");
  };
  const loadSkeleton = isLoading || (isFetching && isPreviousData);
  const totalPages = attendance.pagination.totalPages;
  const totalAttendance = attendance.pagination.totalItems;
  const firstAttendance = (page - 1) * limit + 1;
  const lastAttendance = Math.min(
    firstAttendance + attendance.results.length - 1,
    totalAttendance,
  );
  return (
    <div className="overflow-hidden rounded-2xl border border-[#dfe6f0] bg-white shadow-[0_10px_30px_rgba(23,32,51,0.06)]">
      {initialState ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {attendanceResult ? (
            <div className="overflow-hidden rounded-2xl border border-[#dfe6f0] bg-white shadow-[0_10px_30px_rgba(23,32,51,0.06)]">
              <div
                className="h-[431px] w-full overflow-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9bb7ff]"
                role="region"
                aria-label="Attendance directory table"
                tabIndex={0}
              >
                <table className="w-full min-w-[1120px] table-fixed border-collapse text-left">
                  <caption className="sr-only">
                    Attendance directory with , role, hiring, status, and action
                    information
                  </caption>
                  <colgroup>
                    <col className="w-[16%]" />
                    <col className="w-[13%]" />
                    <col className="w-[12%]" />
                    <col className="w-[14%]" />
                    <col className="w-[13%]" />
                    <col className="w-[11%]" />
                    <col className="w-[11%]" />
                  </colgroup>
                  <TableHead tableHead={tableHead} />
                  <tbody>
                    {loadSkeleton ? (
                      <AttendanceTableSkeleton />
                    ) : attendanceResult ? (
                      <AttendanceRow
                        attendance={attendance.results}
                        onSetAttendanceId={onSetAttendanceId}
                      />
                    ) : (
                      <AttendanceTableEmpty />
                    )}
                  </tbody>
                </table>
              </div>
              <TableFooter
                showDetails={`Showing ${firstAttendance}-${lastAttendance} of ${totalAttendance} attendance`}
                limitInput={limitInput}
                onHandleChangeLimit={handleChangeLimit}
                onHandleChangePage={handleChangePage}
                dispatch={dispatch}
                totalPages={totalPages}
                page={page}
              />
            </div>
          ) : (
            <>No record found</>
          )}
        </>
      )}
    </div>
  );
}

export default AttendanceTable;
