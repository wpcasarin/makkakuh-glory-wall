import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();

  return !user ? <Navigate to="/login" /> : <>{children}</>;
};
