import { useState } from "react";
import UserHeader from "./UserHeader";
import UserTable from "./table/UserTable";

function User() {
  const [userId, setUserId] = useState<string | null>("");
  return (
    <div>
      <UserHeader />
      <UserTable onSetUserId={setUserId} />
      {userId && <div>I GOT CLICKED</div>}
    </div>
  );
}

export default User;
