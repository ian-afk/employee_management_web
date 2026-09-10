import { useState } from "react";
import type { GroupedModule } from "../../../types/rbac-type";

const ACTIONS = ["view", "create", "edit", "delete"] as const;

type PermissionMatrixTabProps = {
  roleName: string;
  permissions: GroupedModule;
};

function PermissionMatrixTab({
  roleName,
  permissions,
}: PermissionMatrixTabProps) {
  const [empPer, setEmpPer] = useState(() =>
    ACTIONS.map((action) => ({
      action,
      enabled: permissions.employee.some(
        (permission) => permission.action === action,
      ),
    })),
  );

  const [attendancePer, setAttendancePer] = useState(() =>
    ACTIONS.map((action) => ({
      action,
      enabled: permissions.attendance.some(
        (permission) => permission.action === action,
      ),
    })),
  );

  const [taskPer, setTaskPer] = useState(
    ACTIONS.map((action) => ({
      action,
      enabled: permissions.task.some(
        (permission) => permission.action === action,
      ),
    })),
  );

  const [userPer, setUserPer] = useState(() =>
    ACTIONS.map((action) => ({
      action,
      enabled: permissions.user.some(
        (permission) => permission.action === action,
      ),
    })),
  );

  const [rolePer, setRolePer] = useState(() =>
    ACTIONS.map((action) => ({
      action,
      enabled: permissions.role.some(
        (permission) => permission.action === action,
      ),
    })),
  );

  const handleChangeEmployeePer = (action: string, enabled: boolean) => {
    setEmpPer((prev) =>
      prev.map((permission) =>
        permission.action === action
          ? {
              ...permission,
              enabled,
            }
          : permission,
      ),
    );
  };

  const handleChangeAttendancePer = (action: string, enabled: boolean) => {
    setAttendancePer((prev) =>
      prev.map((permission) =>
        permission.action === action
          ? {
              ...permission,
              enabled,
            }
          : permission,
      ),
    );
  };

  const handleChangeTaskPer = (action: string, enabled: boolean) => {
    setTaskPer((prev) =>
      prev.map((permission) =>
        permission.action === action
          ? {
              ...permission,
              enabled,
            }
          : permission,
      ),
    );
  };

  const handleChangeUserPer = (action: string, enabled: boolean) => {
    setUserPer((prev) =>
      prev.map((permission) =>
        permission.action === action
          ? {
              ...permission,
              enabled,
            }
          : permission,
      ),
    );
  };

  const handleChangeRolePer = (action: string, enabled: boolean) => {
    setRolePer((prev) =>
      prev.map((permission) =>
        permission.action === action
          ? {
              ...permission,
              enabled,
            }
          : permission,
      ),
    );
  };
  return (
    <div>
      <div>
        <span>{roleName}</span>
        <p>
          Select allowed actions, then choose whose records this role can
          access.
        </p>
      </div>
      <table>
        <thead>
          <tr>
            <th>AREA</th>
            <th>VIEW</th>
            <th>CREATE</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EMPLOYEE PROFILES</td>
            {empPer.map((state) => (
              <td key={state.action}>
                <input
                  type="checkbox"
                  id={`employee-${state.action}`}
                  checked={state.enabled}
                  onChange={(e) =>
                    handleChangeEmployeePer(state.action, e.target.checked)
                  }
                />
              </td>
            ))}
          </tr>
          <tr>
            <td>USER ACCOUNTS</td>
            {userPer.map((state) => (
              <td key={state.action}>
                <input
                  type="checkbox"
                  id={`user-${state.action}`}
                  checked={state.enabled}
                  onChange={(e) =>
                    handleChangeUserPer(state.action, e.target.checked)
                  }
                />
              </td>
            ))}
          </tr>
          <tr>
            <td>ATTENDANCE RECORDS</td>
            {attendancePer.map((state) => (
              <td key={state.action}>
                <input
                  type="checkbox"
                  id={`${state.action}`}
                  checked={state.enabled}
                  onChange={(e) =>
                    handleChangeAttendancePer(state.action, e.target.checked)
                  }
                />
              </td>
            ))}
          </tr>
          <tr>
            <td>TASKS</td>
            {taskPer.map((state) => (
              <td key={state.action}>
                <input
                  type="checkbox"
                  id={`${state.action}`}
                  checked={state.enabled}
                  onChange={(e) =>
                    handleChangeTaskPer(state.action, e.target.checked)
                  }
                />
              </td>
            ))}
          </tr>
          <tr>
            <td>ROLE & ACCESS</td>
            {rolePer.map((state) => (
              <td key={state.action}>
                <input
                  type="checkbox"
                  id={`${state.action}`}
                  checked={state.enabled}
                  onChange={(e) =>
                    handleChangeRolePer(state.action, e.target.checked)
                  }
                />
              </td>
            ))}
          </tr>
          {/* <tr>
            <td>SYSTEM SETTINGS</td>
            <td>
              <input type="checkbox" />
            </td>{" "}
            <td>
              <input type="checkbox" />
            </td>{" "}
            <td>
              <input type="checkbox" />
            </td>{" "}
            <td>
              <input type="checkbox" />
            </td>
          </tr>
          <tr>
            <td>Home messages</td>
            <td>
              <input type="checkbox" />
            </td>{" "}
            <td>
              <input type="checkbox" />
            </td>{" "}
            <td>
              <input type="checkbox" />
            </td>{" "}
            <td>
              <input type="checkbox" />
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default PermissionMatrixTab;
