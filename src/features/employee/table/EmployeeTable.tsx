import { memo, useState } from "react";
import EmployeeTableRow from "./EmployeeTableRow";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { getEmployee } from "../../../services/employeeService";
import { Navigate } from "react-router-dom";
import { isUnAuthorizedError } from "../../../services/authHelper";

import { usePage } from "../../../hooks/usePage";
import TableHead from "../../../components/table/TableHead";
import EmployeeTableSkeleton from "./EmployeeTableSkeleton";
import EmployeeTableEmpty from "./EmployeeTableEmpty";
import TableFooter from "../../../components/table/TableFooter";

type EmployeeTableProp = {
  setEmpId: React.Dispatch<React.SetStateAction<string>>;
};

const tableHead = [
  "Employee",
  "Employee ID",
  "Department",
  "Job title",
  "Team Leader",
  "Hire Date",
  "Status",
  "Action",
];

function EmployeeTable({ setEmpId }: EmployeeTableProp) {
  const [limit, setLimit] = useState<number>(10);
  const [limitInput, setLimitInput] = useState("10");
  // const [page, setPage] = useState<number>(1);
  const [{ page }, dispatch] = usePage();

  const debouncedSetLimit = useDebouncedCallback((value: string) => {
    const newLimit = Number(value);

    if (Number.isFinite(newLimit) && newLimit > 0) {
      setLimit(newLimit);
      // setPage(1);
      dispatch({
        type: "initialize",
      });
      setEmpId("");
    }
  }, 500);
  const handleChangeLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setLimitInput(value);
    debouncedSetLimit(value);
  };
  const {
    data: employees = {
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
    isFetching,
    isPreviousData,
    isError,
    error,
  } = useQuery({
    queryKey: ["employees", page, limit],
    queryFn: ({ signal }) => getEmployee("employee", { page, limit, signal }),
    keepPreviousData: true,
  });

  const loadSkeleton = isLoading || (isFetching && isPreviousData);
  const employeeResult = employees.results.length > 0;
  const totalPages = employees.pagination.totalPages;
  const totalEmployees = employees.pagination.totalItems;
  const firstEmployee = (page - 1) * limit + 1;
  const lastEmployee = Math.min(
    firstEmployee + employees.results.length - 1,
    totalEmployees,
  );
  if (isError) {
    if (isUnAuthorizedError(error)) {
      return <Navigate to="/login" replace />;
    }
    return <div>Failed to load employee</div>;
  }

  const handleChangePage = (pg: number) => {
    dispatch({
      type: "setPage",
      payload: pg,
    });
    setEmpId("");
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-[#dfe6f0] bg-white shadow-[0_10px_30px_rgba(23,32,51,0.06)]">
        <div
          className="h-[431px] w-full overflow-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9bb7ff]"
          role="region"
          aria-label="Employee directory table"
          tabIndex={0}
        >
          <table className="w-full min-w-[1120px] table-fixed border-collapse text-left">
            <caption className="sr-only">
              Employee directory with department, role, hiring, status, and
              action information
            </caption>
            <colgroup>
              <col className="w-[17%]" />
              <col className="w-[14%]" />
              <col className="w-[13%]" />
              <col className="w-[14%]" />
              <col className="w-[13%]" />
              <col className="w-[11%]" />
              <col className="w-[8%]" />
              <col className="w-[10%]" />
            </colgroup>
            <TableHead tableHead={tableHead} />
            <tbody aria-busy={loadSkeleton}>
              {loadSkeleton ? (
                <EmployeeTableSkeleton />
              ) : employeeResult ? (
                <EmployeeTableRow
                  employee={employees.results}
                  setEmpId={setEmpId}
                />
              ) : (
                <EmployeeTableEmpty />
              )}
            </tbody>
          </table>
        </div>
        <TableFooter
          showDetails={`Showing ${firstEmployee}-${lastEmployee} of ${totalEmployees} employees`}
          limitInput={limitInput}
          onHandleChangeLimit={handleChangeLimit}
          onHandleChangePage={handleChangePage}
          dispatch={dispatch}
          totalPages={totalPages}
          page={page}
        />
      </div>
    </>
  );
}

export default memo(EmployeeTable);
