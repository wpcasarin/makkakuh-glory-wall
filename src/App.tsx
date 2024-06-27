import { MainRouter } from "@routes";

import { AuthProvider } from "@contexts";

const App = () => {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
};

export { App };
