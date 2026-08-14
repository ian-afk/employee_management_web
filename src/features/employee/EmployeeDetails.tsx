import { useQuery } from "@tanstack/react-query";
import { getEmployeeId } from "../../services/employeeService";
import { isUnAuthorizedError } from "../../services/authHelper";
import { Navigate } from "react-router-dom";

import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import { dateformatter } from "../../utils/dateformatter";
import { statusStyles } from "../../utils/color-palette";

type EmployeeDetailsProps = {
  empId: string;
};

export default function EmployeeDetails({ empId }: EmployeeDetailsProps) {
  const {
    data: emp,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employees", empId],
    queryFn: async ({ signal }) =>
      getEmployeeId(`employee/${empId}`, { signal: signal }),
  });

  if (isError) {
    if (isUnAuthorizedError(isError)) {
      return <Navigate to="/login" replace />;
    }
    return <div>Something went wrong</div>;
  }

  return (
    <>
      {isLoading ? (
        <div> Loading...</div>
      ) : (
        <>
          {emp ? (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <section className="flex items-center gap-5 rounded-2xl bg-[#f7f9fc] p-6">
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#3562d4] text-white">
                    <PersonOutlineIcon className="!h-9 !w-9" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-2xl font-bold text-[#172033]">
                      {emp.employee.firstName} {emp.employee.lastName}
                    </h3>
                    <p className="mt-1 flex gap-2 truncate text-sm text-[#65718b]">
                      <span>{emp.employee.job_title}</span>
                      <span>{emp.employee.department}</span>
                    </p>
                    <span
                      className={`mt-4 inline-flex w-24 items-center justify-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
                        statusStyles[emp.employee.status] ??
                        "bg-[#eef3fb] text-[#43506a] ring-[#d8e1ee]"
                      }`}
                    >
                      <span className="h-2 w-2 rounded-full bg-current" />
                      {emp.employee.status}
                    </span>
                  </div>
                </section>

                <section className="mt-8">
                  <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.08em] text-[#172033]">
                    Employment information
                  </h3>
                  <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <div className="min-w-0">
                      <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#71809d]">
                        emp.employee ID
                      </dt>
                      <dd className="mt-1 break-words text-sm font-semibold text-[#172033]">
                        {emp.employee.empId}
                      </dd>
                    </div>
                    <div className="min-w-0">
                      <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#71809d]">
                        Hire date
                      </dt>
                      <dd className="mt-1 break-words text-sm font-semibold text-[#172033]">
                        {dateformatter(emp.employee.createdAt)}
                      </dd>
                    </div>
                    <div className="min-w-0">
                      <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#71809d]">
                        Department
                      </dt>
                      <dd className="mt-1 break-words text-sm font-semibold text-[#172033]">
                        {emp.employee.department}
                      </dd>
                    </div>
                    <div className="min-w-0">
                      <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#71809d]">
                        Position
                      </dt>
                      <dd className="mt-1 break-words text-sm font-semibold text-[#172033]">
                        {emp.employee.job_title}
                      </dd>
                    </div>
                  </dl>
                </section>
              </div>
            </>
          ) : (
            <div>No record found</div>
          )}
        </>
      )}
    </>
  );
}
