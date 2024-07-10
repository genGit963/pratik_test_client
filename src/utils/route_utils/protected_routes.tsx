import { Navigate, Outlet } from "react-router-dom";
import { UserAuthResponseInterface } from "../../models/user";

interface ProtectedRouteProps {
  user: UserAuthResponseInterface | undefined;
  redirectPath?: string;
}
function ProtectedRoute({
  user,
  redirectPath = "/login",
}: ProtectedRouteProps) {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
