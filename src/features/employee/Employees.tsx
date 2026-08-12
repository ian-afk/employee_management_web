import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeDrawer from "./EmployeeDrawer";

export default function Employees() {
  const [empId, setEmpId] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <EmployeeTable setEmpId={setEmpId} />
      {empId && <EmployeeDrawer onShowDetails={setEmpId} empId={empId} />}
    </div>
  );
}
