type EmployeeTableRowProp = {
  employee: Employee[] | [];
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

export default function EmployeeTableRow({ employee }: EmployeeTableRowProp) {
  return (
    <>
      {employee?.length > 0 ? (
        employee.map((emp) => (
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
              <button>VIEW</button>
              <button>Edit</button>
              <button>...</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td>No record found</td>
        </tr>
      )}
    </>
  );
}
