import EmployeeTableRow from "./EmployeeTableRow";

type EmployeeTableProp = {
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
export default function EmployeeTable({ employee }: EmployeeTableProp) {
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
        <EmployeeTableRow employee={employee} />
      </tbody>
    </table>
  );
}
