import { memo, useEffect, useState } from "react";
import EmployeeTableRow from "./EmployeeTableRow";

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
function EmployeeTable({ setEmpId, token }: EmployeeTableProp) {
  const [employees, setEmployees] = useState<Employee[] | []>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3001/employee", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) console.log(res.status);

        const data = await res.json();
        setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
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
        <EmployeeTableRow employee={employees} setEmpId={setEmpId} />
      </tbody>
    </table>
  );
}

export default memo(EmployeeTable);
