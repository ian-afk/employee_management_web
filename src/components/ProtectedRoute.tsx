import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import PageNav from "./layout/page-nav/PageNav";

function ProtectedRoute() {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) return <div>Checking session...</div>;

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="fixed inset-0 flex overflow-hidden bg-[#f4f7fb]">
      <PageNav />
      <main className="m-4 min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedRoute;
