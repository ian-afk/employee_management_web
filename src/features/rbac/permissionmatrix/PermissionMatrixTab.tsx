import { useState } from "react";
import type { GroupedModule } from "../../../types/rbac-type";

const EMPLOYEE_PERMISSION_ACTIONS = ["view", "create", "edit", "delete"] as const;
const USER_PERMISSION_ACTIONS = ["view", "create", "edit", "delete"] as const;

type PermissionMatrixTabProps = {
  roleName: string;
  permissions: GroupedModule;
};

function PermissionMatrixTab({
  roleName,
  permissions,
}: PermissionMatrixTabProps) {
  console.log(permissions);

  const [empPer, setEmpPer] = useState(() =>
    EMPLOYEE_PERMISSION_ACTIONS.map((action) => ({
      action,
      enabled: permissions.employee.some(
        (permission) => permission.action === action,
      ),
    })),
  );

  const [attendancePer, setAttendancePer] = useState([
    {
      action: "view",
      enabled: false,
    },
    {
      action: "create",
      enabled: false,
    },
    {
      action: "edit",
      enabled: false,
    },
    {
      action: "delete",
      enabled: false,
    },
  ]);

  const [taskPer, setTaskPer] = useState([
    {
      action: "view",
      enabled: false,
    },
    {
      action: "create",
      enabled: false,
    },
    {
      action: "edit",
      enabled: false,
    },
    {
      action: "delete",
      enabled: false,
    },
  ]);

  const [userPer, setUserPer] = useState(() =>
    USER_PERMISSION_ACTIONS.map((action) => ({
      action,
      enabled: permissions.user.some(
        (permission) => permission.action === action,
      ),
    })),
  );

  const [rolePer, setRolePer] = useState([
    {
      action: "view",
      enabled: false,
    },
    {
      action: "create",
      enabled: false,
    },
    {
      action: "edit",
      enabled: false,
    },
    {
      action: "delete",
      enabled: false,
    },
  ]);
  const attendancePermissions = permissions.attendance.map(
    (action) => action.action,
  );

  const taskPermission = permissions.task.map((action) => action.action);

  const rolePermission = permissions.role.map((action) => action.action);

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

            {empPer.map((state) => {
              return (
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
              );
            })}
          </tr>
          <tr>
            <td>USER ACCOUNTS</td>
            {userPer.map((state) => {
              return (
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
              );
            })}
          </tr>
          <tr>
            <td>ATTENDANCE RECORDS</td>
            {attendancePer.map((state) => {
              const enabled = attendancePermissions.some(
                (action) => action === state.action,
              );
              return (
                <td>
                  <input
                    type="checkbox"
                    id={`${state.action}`}
                    key={state.action}
                    checked={enabled}
                    onChange={(e) =>
                      handleChangeAttendancePer(state.action, e.target.checked)
                    }
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td>TASKS</td>
            {taskPer.map((state) => {
              const enabled = taskPermission.some(
                (action) => action === state.action,
              );
              return (
                <td key={state.action}>
                  <input
                    type="checkbox"
                    id={`${state.action}`}
                    checked={enabled}
                    onChange={(e) =>
                      handleChangeTaskPer(state.action, e.target.checked)
                    }
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td>ROLE & ACCESS</td>
            {rolePer.map((state) => {
              const enabled = rolePermission.some(
                (action) => action === state.action,
              );
              return (
                <td key={state.action}>
                  <input
                    type="checkbox"
                    id={`${state.action}`}
                    checked={enabled}
                    onChange={(e) =>
                      handleChangeRolePer(state.action, e.target.checked)
                    }
                  />
                </td>
              );
            })}
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
