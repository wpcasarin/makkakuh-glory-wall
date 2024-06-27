import { Link } from "react-router-dom";

import { useAuth } from "@hooks";
import { cn } from "@lib/utils";

const MainNav = () => {
  const { user } = useAuth();

  return (
    <div className="container hidden gap-2 md:flex">
      <Link
        to={"/"}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          "text-primary underline-offset-4 hover:underline",
          "h-9 px-4 py-2"
        )}
      >
        Home
      </Link>

      <Link
        to={"/login"}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          "text-primary underline-offset-4 hover:underline",
          "h-9 px-4 py-2"
        )}
      >
        Login
      </Link>

      {user && (
        <Link
          to={"/admin"}
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            "text-primary underline-offset-4 hover:underline",
            "h-9 px-4 py-2"
          )}
        >
          Admin
        </Link>
      )}
    </div>
  );
};

export { MainNav };
