import { cn } from "@/lib/utils";

import { AddMemberForm } from "./components/addMemberForm";

export const AdminPage = () => {
  return (
    <main
      className={cn(
        "container grid h-dvh max-w-screen-xs grid-cols-1 xs:content-center"
      )}
    >
      <AddMemberForm />
    </main>
  );
};
