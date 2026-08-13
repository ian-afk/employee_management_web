import { memo, useState } from "react";
import EmployeeTableRow from "./EmployeeTableRow";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { getEmployee } from "../../../services/employeeService";
import { Navigate } from "react-router-dom";
import { isUnAuthorizedError } from "../../../services/authHelper";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { usePage } from "../../../hooks/usePage";
import EmployeeTableHead from "./EmployeeTableHead";
import EmployeeTableSkeleton from "./EmployeeTableSkeleton";
import EmployeeTableEmpty from "./EmployeeTableEmpty";

type EmployeeTableProp = {
  setEmpId: React.Dispatch<React.SetStateAction<string>>;
};

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
    isError,
    error,
  } = useQuery({
    queryKey: ["employees", page, limit],
    queryFn: ({ signal }) => getEmployee("employee", { page, limit, signal }),
  });

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
            <EmployeeTableHead />
            <tbody aria-busy={isLoading}>
              {isLoading ? (
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
        <div className="flex min-h-[72px] flex-col gap-4 border-t border-[#dfe6f0] bg-white px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
          <span className="text-sm text-[#71809d]">
            Showing {firstEmployee}-{lastEmployee} of {totalEmployees} employees
          </span>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <label
                className="text-xs font-semibold text-[#647089]"
                htmlFor="employee-limit"
              >
                Limit
              </label>
              <input
                id="employee-limit"
                className="h-10 w-16 rounded-lg border border-[#d8e1ee] bg-white px-2 text-center text-sm font-semibold text-[#43506a] outline-none transition-colors hover:border-[#b8c5d8] focus:border-[#2f66e8] focus:ring-2 focus:ring-[#dce7ff]"
                min={1}
                type="number"
                value={limitInput}
                name="limit"
                onChange={handleChangeLimit}
              />
            </div>
            {employees?.pagination?.totalPages && (
              <div
                className="flex flex-wrap items-center gap-2 sm:border-l sm:border-[#dfe6f0] sm:pl-3"
                aria-label="Employee table pagination"
              >
                <span className="mr-1 text-xs font-semibold text-[#647089]">
                  Page
                </span>
                <button
                  type="button"
                  className="grid h-10 min-w-10 place-items-center rounded-full text-[#283f6e] transition-[color,background-color,opacity] hover:bg-[#eef3fb] hover:text-[#2f66e8] disabled:cursor-not-allowed disabled:text-[#aeb8c8] disabled:opacity-35 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff]"
                  onClick={() => dispatch({ type: "prev" })}
                  disabled={page <= 1}
                  aria-label="Previous page"
                >
                  <ChevronLeftIcon className="!h-5 !w-5" />
                </button>
                {Array.from(
                  { length: employees?.pagination?.totalPages ?? 0 },
                  (_, index) => (
                    <button
                      type="button"
                      key={index}
                      className={`h-10 min-w-10 rounded-lg border px-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] ${
                        page === index + 1
                          ? "border-[#2f66e8] bg-[#2f66e8] text-white shadow-sm"
                          : "border-[#d8e1ee] bg-white text-[#71809d] hover:border-[#b8c5d8] hover:bg-[#f7f9fc] hover:text-[#43506a]"
                      }`}
                      onClick={() => handleChangePage(index + 1)}
                      aria-current={page === index + 1 ? "page" : undefined}
                      aria-label={`Go to page ${index + 1}`}
                    >
                      {index + 1}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  className="grid h-10 min-w-10 place-items-center rounded-full text-[#283f6e] transition-[color,background-color,opacity] hover:bg-[#eef3fb] hover:text-[#2f66e8] disabled:cursor-not-allowed disabled:text-[#aeb8c8] disabled:opacity-35 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff]"
                  onClick={() => dispatch({ type: "next" })}
                  disabled={page >= totalPages}
                  aria-label="Next page"
                >
                  <ChevronRightIcon className="!h-5 !w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(EmployeeTable);
