import { useState } from "react";

import { Link } from "react-router-dom";

import {
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@components/ui";
import { useAuth } from "@hooks";
import { cn } from "@lib/utils";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Mostra Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-3/4">
        <div className="ml-4 flex h-full flex-col gap-3">
          <h3 className="text-lg font-bold">Makka-kuh</h3>
          <div className="flex flex-grow flex-col gap-3">
            <Link
              to={"/"}
              onClick={() => {
                setOpen(false);
              }}
              className={cn("font-medium")}
            >
              Home
            </Link>

            <Link
              to={"/login"}
              onClick={() => {
                setOpen(false);
              }}
              className={cn("font-medium")}
            >
              Login
            </Link>

            {user && (
              <Link
                to={"/admin"}
                onClick={() => {
                  setOpen(false);
                }}
                className={cn("font-medium")}
              >
                Admin
              </Link>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <Separator />
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="text-destructive"
              onClick={() => {
                setOpen(false);
                signOut();
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 size-4"
              >
                <path
                  d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Sair
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { MobileNav };
