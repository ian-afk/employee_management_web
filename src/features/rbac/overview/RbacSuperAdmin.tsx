import SuperAdminDetail from "./superadmin/SuperAdminDetail";
import SuperAdminHeader from "./superadmin/SuperAdminHeader";

function RbacSuperAdmin() {
  return (
    <div>
      <div>
        <SuperAdminHeader />
      </div>
      <div></div>
      <div>
        <SuperAdminDetail />
      </div>
    </div>
  );
}

export default RbacSuperAdmin;
