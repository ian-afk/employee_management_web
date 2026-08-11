import { Providers } from "./app/providers/Provider";
import Login from "./features/auth/Login";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import PageNoutFound from "./pages/PageNoutFound";
import HomePage from "./pages/HomePage";
import EmployeePage from "./pages/EmployeePage";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskPage from "./pages/TaskPage";
import AttendancePage from "./pages/AttendancePage";

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="employee" element={<EmployeePage />} />
            <Route path="task" element={<TaskPage />} />
            <Route path="attendance" element={<AttendancePage />} />
          </Route>
          <Route path="*" element={<PageNoutFound />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
