import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import PageNav from "./PageNav";

function ProtectedRoute() {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) return <div>Checking session...</div>;

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <PageNav />
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
