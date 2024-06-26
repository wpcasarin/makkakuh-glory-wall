import { cn } from "@lib/utils";

import { LoginForm } from "./components/loginForm";

const LoginPage = () => {
  return (
    <main
      className={cn(
        "container grid h-dvh max-w-screen-xs grid-cols-1 xs:content-center"
      )}
    >
      <LoginForm />
    </main>
  );
};

export default LoginPage;
