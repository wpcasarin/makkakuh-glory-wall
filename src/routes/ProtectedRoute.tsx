import { Navigate } from "react-router-dom";

import { useAuth } from "@hooks";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();

  return !user ? <Navigate to="/login" /> : <>{children}</>;
};

export { ProtectedRoute };
