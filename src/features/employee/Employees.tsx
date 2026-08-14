import { useState } from "react";
import EmployeeTable from "./table/EmployeeTable";
import EmployeeDetails from "./EmployeeDetails";
import EmployeeCreateDialog from "./create/EmployeeCreateDialog";
import Drawer from "../../components/drawer/Drawer";
import EmployeeHeader from "./EmployeeHeader";
import EmployeeSummary from "./EmployeeSummary";

export default function Employees() {
  const [empId, setEmpId] = useState("");
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8">
      <EmployeeHeader onSetShowModal={setShowModal} showModal={showModal} />
      <EmployeeSummary />
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
