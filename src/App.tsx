import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { HomePage, LoginPage, NotFoundPage } from "@/pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export { App };
