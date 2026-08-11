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
    <div className="flex min-h-screen bg-[#f4f7fb]">
      <PageNav />
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedRoute;
