import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeDrawer from "./EmployeeDrawer";
import EmployeeCreateDialog from "./create/EmployeeCreateDialog";

export default function Employees() {
  const [empId, setEmpId] = useState("");
  const [showModal, setShowModal] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <button onClick={() => setShowModal(!showModal)}>Add Employee</button>
      <EmployeeTable setEmpId={setEmpId} />
      {empId && <EmployeeDrawer onShowDetails={setEmpId} empId={empId} />}
      {showModal && <EmployeeCreateDialog onSetShowModal={setShowModal} />}
    </div>
  );
}
