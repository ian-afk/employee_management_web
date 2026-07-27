import { memo } from "react";

type EmployeeTableRowProp = {
  employee: Employee[] | [];
  setEmpId: React.Dispatch<React.SetStateAction<string>>;
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

function EmployeeTableRow({ employee, setEmpId }: EmployeeTableRowProp) {
  return (
    <>
      {employee.map((emp) => (
        <tr key={emp.id}>
          <td>
            {emp.firstName} {emp.lastName}
          </td>
          <td>{emp.id}</td>
          <td>{emp.department}</td>
          <td>{emp.job_title}</td>
          <td>{emp.teamLeadId}</td>
          <td>{emp.createdAt}</td>
          <td>{emp.status}</td>
          <td>
            <button onClick={() => setEmpId(emp.id)}>VIEW</button>
            <button>Edit</button>
            <button>...</button>
          </td>
        </tr>
      ))}
    </>
  );
}

export default memo(EmployeeTableRow);
