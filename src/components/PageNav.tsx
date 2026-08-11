import { Link } from "react-router-dom";

import { useLogout } from "../hooks/useLogout";

function PageNav() {
  const logout = useLogout();

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/employee">Employee</Link>
          </li>
          <li>
            <Link to="/task">Task</Link>
          </li>
          <li>
            <Link to="/attendance">Attendance</Link>
          </li>
          <li>
            <button onClick={() => logout.mutate()} disabled={logout.isPending}>
              {logout.isPending ? "Logging out" : "Logout"}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PageNav;
