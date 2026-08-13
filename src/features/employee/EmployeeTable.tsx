import { memo, useState } from "react";
import EmployeeTableRow from "./EmployeeTableRow";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { getEmployee } from "../../services/employeeService";
import { Navigate } from "react-router-dom";
import { isUnAuthorizedError } from "../../services/authHelper";

type EmployeeTableProp = {
  setEmpId: React.Dispatch<React.SetStateAction<string>>;
};

function EmployeeTable({ setEmpId }: EmployeeTableProp) {
  const [limit, setLimit] = useState<number>(10);
  const [limitInput, setLimitInput] = useState("10");
  const [page, setPage] = useState<number>(1);

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
  const debouncedSetLimit = useDebouncedCallback((value: string) => {
    const newLimit = Number(value);

    if (Number.isFinite(newLimit) && newLimit > 0) {
      setLimit(newLimit);
      setPage(1);
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
      pagination: { totalPages: 1 },
    },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employees", page, limit],
    queryFn: ({ signal }) => getEmployee("employee", { page, limit, signal }),
  });

  const employeeResult = employees.results.length > 0;
  const initialState = isLoading && !employeeResult;

  if (isLoading) return <div>Loading...</div>;
  if (!employees || employees.results.length === 0)
    return <div>No Record found</div>;
  if (isError) {
    if (isUnAuthorizedError(isError)) {
      return <Navigate to="/login" replace />;
    }
    return <div>Failed to load employee</div>;
  }

  const handleChangePage = (pg: number) => {
    setPage(pg + 1);
    setEmpId("");
  };

  return (
    <>
      {initialState ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {employeeResult ? (
            <>
              <div
                className="w-full overflow-x-auto rounded-2xl border border-[#dfe6f0] bg-white shadow-[0_10px_30px_rgba(23,32,51,0.06)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff]"
                role="region"
                aria-label="Employee directory table"
                tabIndex={0}
              >
                <table className="w-full min-w-[1120px] table-fixed border-collapse text-left">
                  <caption className="sr-only">
                    Employee directory with department, role, hiring, status,
                    and action information
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
                  <thead className="border-b border-[#dfe6f0] bg-[#f8fafd]">
                    <tr>
                      {tableHead.map((item) => (
                        <th
                          key={item}
                          className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#647089]"
                          scope="col"
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <EmployeeTableRow
                      employee={employees.results}
                      setEmpId={setEmpId}
                    />
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex flex-col gap-3 rounded-xl border border-[#dfe6f0] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <label
                    className="text-xs font-semibold text-[#647089]"
                    htmlFor="employee-limit"
                  >
                    Limit
                  </label>
                  <input
                    id="employee-limit"
                    className="h-9 w-20 rounded-lg border border-[#d3dce9] bg-white px-3 text-sm text-[#172033] outline-none transition-colors hover:border-[#aebbd0] focus:border-[#2f66e8] focus:ring-2 focus:ring-[#dce7ff]"
                    min={1}
                    type="number"
                    value={limitInput}
                    name="limit"
                    onChange={handleChangeLimit}
                  />
                </div>
                {employees?.pagination?.totalPages && (
                  <div
                    className="flex flex-wrap items-center gap-2"
                    aria-label="Employee table pagination"
                  >
                    <span className="mr-1 text-xs font-semibold text-[#647089]">
                      Page
                    </span>
                    {Array.from(
                      { length: employees?.pagination?.totalPages ?? 0 },
                      (_, index) => (
                        <button
                          type="button"
                          key={index}
                          className={`h-9 min-w-9 rounded-lg border px-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] ${
                            page === index + 1
                              ? "border-[#2f66e8] bg-[#2f66e8] text-white"
                              : "border-[#d3dce9] bg-white text-[#536078] hover:border-[#aebbd0] hover:bg-[#f4f7fb]"
                          }`}
                          onClick={() => handleChangePage(index)}
                          aria-current={page === index + 1 ? "page" : undefined}
                          aria-label={`Go to page ${index + 1}`}
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

export default memo(EmployeeTable);
