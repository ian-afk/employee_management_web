import { useState } from "react";
import UserHeader from "./UserHeader";
import UserTable from "./table/UserTable";
import Drawer from "../../components/drawer/Drawer";

function User() {
  const [userId, setUserId] = useState<string>("");
  return (
    <div>
      <UserHeader />
      <UserTable onSetUserId={setUserId} />
      {userId && (
        <Drawer
          onShowDetails={setUserId}
          drawerHeader="User Details"
          drawerInformation="User Information"
        >
          <div>{userId}</div>
        </Drawer>
      )}
    </div>
  );
}

export default User;
