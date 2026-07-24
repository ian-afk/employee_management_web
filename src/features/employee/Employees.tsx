import { useEffect, useState } from "react";
import Alert from "./Alert";
import EmployeeTable from "./EmployeeTable";

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

export default function Employees() {
  const [showAlert, setShowAlert] = useState(false);
  const [employees, setEmployees] = useState<Employee[] | []>([]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MmFmMmMxMC01YTUxLTQxZjEtYmRmNy0yNzY4NGEzZTFlZmIiLCJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsInJvbGUiOiJTVVBFUiBBRE1JTiIsImlhdCI6MTc4NDg4MzA4OSwiZXhwIjoxNzg0ODg0MDg5fQ.DiyMalodf2ST6q2MyFF1SqlYXTgvxRvp4wPVrr9T2kQ";
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
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <EmployeeTable employee={employees} />
      <button onClick={() => setShowAlert(!showAlert)}>SHOW ME ALERT</button>
      {showAlert && <Alert />}
    </div>
  );
}
