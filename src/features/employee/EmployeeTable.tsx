export default function EmployeeTable({ employee }) {
  return (
    <table>
      <thead>
        <th>
          <tr>Employee</tr>
        </th>
        <th>
          <tr>Employee ID</tr>
        </th>
        <th>
          <tr>Department</tr>
        </th>
        <th>
          <tr>Job title</tr>
        </th>
        <th>
          <tr>Team Leader</tr>
        </th>
        <th>
          <tr>Hire Date</tr>
        </th>
        <th>
          <tr>Status</tr>
        </th>
        <th>
          <tr>Action</tr>
        </th>
      </thead>
      <tbody>
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
              <button>VIEW</button>
              <button>Edit</button>
              <button>...</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
