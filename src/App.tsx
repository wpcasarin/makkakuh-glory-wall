import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthProvider } from "@/context/authContext";
import { AdminPage, HomePage, LoginPage, NotFoundPage } from "@/pages";

import { ProtectedRoute } from "./components/protectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export { App };
