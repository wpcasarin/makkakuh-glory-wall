import React, { Suspense } from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { MainLayout } from "@components/layout";

import { ProtectedRoute } from "./ProtectedRoute";

const AdminPage = React.lazy(() => import("@pages/admin"));
const HomePage = React.lazy(() => import("@pages/home"));
const LoginPage = React.lazy(() => import("@pages/login"));
const NotFoundPage = React.lazy(() => import("@pages/404"));

const MainRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Suspense>
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
        </Suspense>
      </MainLayout>
    </Router>
  );
};

export { MainRouter };
