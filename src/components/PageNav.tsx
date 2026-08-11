import { Link } from "react-router-dom";

function PageNav() {
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
            <button onClick={() => {}}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PageNav;
