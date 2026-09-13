import { useState } from "react";
import type { GroupedModule } from "../../../types/rbac-type";
import PermissionMatrixTabHeader from "./PermissionMatrixTabHeader";

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
    <div className="min-w-0 space-y-3 px-[5px]">
      <PermissionMatrixTabHeader roleName={roleName} />
      <div
        className="overflow-x-auto rounded-[10px] border border-[#dfe6f0] bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb7ff] [scrollbar-width:thin]"
        role="region"
        tabIndex={0}
      >
        <table
          className={[
            "w-full min-w-[560px] border-collapse text-xs text-[#43506a]",
            "[&_th]:px-[14px] [&_th]:py-3 [&_th]:text-center [&_th]:text-[10px] [&_th]:font-extrabold [&_th]:tracking-[0.06em] [&_th:first-child]:w-[40%] [&_th:first-child]:text-left",
            "[&_thead]:border-b [&_thead]:border-[#dfe6f0] [&_thead]:bg-[#f8fafd] [&_thead]:text-[#647089]",
            "[&_tbody_tr]:border-b [&_tbody_tr]:border-[#edf1f6] [&_tbody_tr]:transition-colors [&_tbody_tr:last-child]:border-b-0 [&_tbody_tr:hover]:bg-[#f8fafd]",
            "[&_td]:px-[14px] [&_td]:py-[14px] [&_td]:text-center [&_td:first-child]:text-left [&_td:first-child]:text-[11px] [&_td:first-child]:font-bold [&_td:first-child]:text-[#172033]",
            "[&_input]:block [&_input]:mx-auto [&_input]:h-[17px] [&_input]:w-[17px] [&_input]:cursor-pointer [&_input]:accent-[#2f66e8] [&_input:focus-visible]:outline [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-offset-2 [&_input:focus-visible]:outline-[#9bb7ff]",
          ].join(" ")}
        >
          <thead>
            <tr>
              <th scope="col">AREA</th>
              <th scope="col">VIEW</th>
              <th scope="col">CREATE</th>
              <th scope="col">EDIT</th>
              <th scope="col">DELETE</th>
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
                    id={`attendance-${state.action}`}
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
                    id={`task-${state.action}`}
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
                    id={`role-${state.action}`}
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
    </div>
  );
}

export default PermissionMatrixTab;
