import { useQuery } from "@tanstack/react-query";
import { type SetStateAction } from "react";
import { getEmployeeId } from "../../services/employeeService";
import { isUnAuthorizedError } from "../../services/authHelper";
import { Navigate } from "react-router-dom";

type EmployeeDrawerProps = {
  onShowDetails: React.Dispatch<SetStateAction<string>>;
  empId: string;
};

export default function EmployeeDrawer({
  onShowDetails,
  empId,
}: EmployeeDrawerProps) {
  const {
    data: emp,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employees", empId],
    queryFn: async ({ signal }) =>
      getEmployeeId(`employee/${empId}`, { signal: signal }),
  });

  const initialState = isLoading && !emp;
  if (isLoading) return <div>Loading...</div>;
  if (!emp) return <div>No Record found</div>;
  if (isError) {
    if (isUnAuthorizedError(isError)) {
      return <Navigate to="/login" replace />;
    }
    return <div>Something went wrong</div>;
  }

  const employee = emp?.employee;

  return (
    <>
      {initialState ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <div>
            <div>
              <img src="#" alt="PROFILE" />
            </div>
            {/* EMPLOYEE NAME and job */}
            <div>
              <div>
                <span>
                  {employee.firstName} {employee.lastName}
                </span>
                <span>
                  {employee.job_title} {employee.department}
                </span>
              </div>
              <div>
                <span>{employee.status}</span>
              </div>
            </div>
            {/* EMPLOYEE INFORMATION */}
            <div>
              <div>
                <h3>EMPLOYEE INFORMATION</h3>
              </div>
              <div>
                <label htmlFor="">Employee ID</label>
                <span>{employee.id}</span>
              </div>
              <div>
                <label htmlFor="">HIRE DATE</label>
                <span>{employee.createdAt}</span>
              </div>
              <div>
                <label htmlFor="">DEPARTMETN</label>
                <span>{employee.department}</span>
              </div>
              <div>
                <label htmlFor="">POSITION</label>
                <span>{employee.job_title}</span>
              </div>
            </div>
          </div>
          <div>
            <button onClick={() => onShowDetails("")}>CLOSE</button>
          </div>
        </div>
      )}
    </>
  );
}
