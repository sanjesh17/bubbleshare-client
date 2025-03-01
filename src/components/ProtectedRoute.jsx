import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../utils/authUtils";

const ProtectedRoute = () => {
  return isTokenValid() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
