import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeDrawer from "./EmployeeDrawer";

export default function Employees() {
  const [empId, setEmpId] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NjljYjNhNy1kZDQyLTQwMTYtOTNiMS1jNWQ0MDg1MmZhMGQiLCJlbWFpbCI6ImhybWFuYWdlckBlbWFpbC5jb20iLCJyb2xlIjoiSFIiLCJpYXQiOjE3ODUwMzg0NjAsImV4cCI6MTc4NTAzOTQ2MH0.Xd9iDjt_K1yXH8kKGzFtlIavIbgAABg7ws1hevk1P_M";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <EmployeeTable setEmpId={setEmpId} token={token} />
      {empId && (
        <EmployeeDrawer onShowDetails={setEmpId} empId={empId} token={token} />
      )}
    </div>
  );
}
