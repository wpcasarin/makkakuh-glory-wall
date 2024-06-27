import { cn } from "@lib/utils";

import { AddMemberForm } from "./components/addMemberForm";

const AdminPage = () => {
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

export default AdminPage;
