import EmployeeDetail from "./employee/EmployeeDetail";
import EmployeeHeader from "./employee/EmployeeHeader";

function RbacEmployee() {
  return (
    <div>
      <div>
        <EmployeeHeader />
      </div>
      <div></div>
      <div>
        <EmployeeDetail />
      </div>
    </div>
  );
}

export default RbacEmployee;
