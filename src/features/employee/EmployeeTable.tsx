import { memo, useEffect, useState } from "react";
import EmployeeTableRow from "./EmployeeTableRow";
import { useDebouncedCallback } from "use-debounce";

type EmployeeTableProp = {
  setEmpId: React.Dispatch<React.SetStateAction<string>>;
  token: string;
};
type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  empId?: string;
  department: string;
  job_title: string;
  teamLeadId: string | null;
  createdAt: string;
  status: string;
};

type EmployeeResponse = {
  results: Employee[];
  pagination: {
    totalPages: number;
  };
};
function EmployeeTable({ setEmpId, token }: EmployeeTableProp) {
  const [employees, setEmployees] = useState<EmployeeResponse>({
    results: [],
    pagination: {
      totalPages: 1,
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState<number>(10);
  const [limitInput, setLimitInput] = useState("10");
  const [page, setPage] = useState<number>(1);

  const employeeResult = employees.results.length > 0;
  const initialState = isLoading && !employeeResult;

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
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://localhost:3001/api/employee?page=${page}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          },
        );

        if (!res.ok) {
          console.log(res.status);
          setIsLoading(false);
          return <div>No record found</div>;
        }

        const data = await res.json();
        setEmployees(data);
      } catch (error) {
        console.log(error);
        return <div>error</div>;
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [page, limit, token]);

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
