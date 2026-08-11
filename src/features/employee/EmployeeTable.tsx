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
    queryFn: ({ signal }) => getEmployee({ page, limit, signal }),
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
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Employee ID</th>
                    <th>Department</th>
                    <th>Job title</th>
                    <th>Team Leader</th>
                    <th>Hire Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <EmployeeTableRow
                    employee={employees.results}
                    setEmpId={setEmpId}
                  />
                </tbody>
              </table>
              <div>
                <div>
                  <span>Limit</span>
                  <input
                    min={1}
                    type="number"
                    value={limitInput}
                    name="limit"
                    onChange={handleChangeLimit}
                  />
                </div>
                {employees?.pagination?.totalPages && (
                  <div>
                    <span>Page</span>
                    {Array.from(
                      { length: employees?.pagination?.totalPages ?? 0 },
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

export default memo(EmployeeTable);
