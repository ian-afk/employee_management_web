import { Providers } from "./app/providers/Provider";
import Login from "./features/auth/Login";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import PageNoutFound from "./pages/PageNoutFound";
import HomePage from "./pages/HomePage";
import EmployeePage from "./pages/EmployeePage";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskPage from "./pages/TaskPage";
import AttendancePage from "./pages/AttendancePage";
import RoleBasedAccessControlPage from "./pages/RoleBasedAccessControlPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="employees" element={<EmployeePage />} />
            <Route path="tasks" element={<TaskPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="administration/users" element={<UserPage />} />
            <Route
              path="administration/rbac"
              element={<RoleBasedAccessControlPage />}
            />
          </Route>
          <Route path="*" element={<PageNoutFound />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
