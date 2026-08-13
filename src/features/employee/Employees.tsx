import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeDetails from "./EmployeeDetails";
import EmployeeCreateDialog from "./create/EmployeeCreateDialog";
import Drawer from "../../components/drawer/Drawer";

export default function Employees() {
  const [empId, setEmpId] = useState("");
  const [showModal, setShowModal] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <button onClick={() => setShowModal(!showModal)}>Add Employee</button>
      <EmployeeTable setEmpId={setEmpId} />
      {empId && (
        <Drawer
          onShowDetails={setEmpId}
          drawerHeader="Employee Details"
          drawerInformation="Employee Information"
        >
          <EmployeeDetails empId={empId} />
        </Drawer>
      )}
      {showModal && <EmployeeCreateDialog onSetShowModal={setShowModal} />}
    </div>
  );
}
