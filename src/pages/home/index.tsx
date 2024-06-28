import { useEffect, useState } from "react";

import type { Database } from "@lib/types";

import { supabaseClient } from "@lib/supabase";
import { cn } from "@lib/utils";

import { Honor } from "./components/Honor";
import { MemberAvatar } from "./components/MemberAvatar";
import { MemberInfo } from "./components/MemberInfo";

// type Member = {
//   description: string;
//   id: number;
//   name: string;
//   picture_url: string;
//   rank: number;
// };

type Member = Database["public"]["Tables"]["tb_members"]["Row"];
type Honor = Database["public"]["Tables"]["tb_member_honor"]["Row"];

const HomePage = () => {
  const [members, setMembers] = useState<Member[]>();
  const [honors, setHonors] = useState<Honor[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("tb_members")
        .select("*");
      if (error) throw error;
      {
        console.log("FOI");
        const { data, error } = await supabaseClient
          .from("tb_member_honor")
          .select("*");
        console.log(data);
        if (error) console.error(error);
        setHonors(data);
      }
      setMembers(data);
    };

    fetchData();
  }, [setMembers, setHonors]);

  return (
    <>
      <button onClick={() => console.log(JSON.stringify(honors))}>AAAA</button>
      <div className="container mb-10">
        <h1 className="mb-6 mt-4 text-center font-halibut text-6xl font-bold text-yellow-950">
          Mural da Glória
        </h1>
        <main
          className={cn(
            "grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4"
          )}
        >
          {members?.map((member) => {
            return (
              <div
                key={member.id}
                className="grid h-full grid-cols-2 rounded-xl bg-cover bg-no-repeat p-2 lg:flex lg:flex-col lg:items-center lg:text-center"
                style={{
                  backgroundImage: "url('/assets/wood-wall-texture.svg')",
                }}
              >
                <div className="col-span-2 flex flex-grow flex-row lg:flex-col lg:items-center">
                  <MemberAvatar
                    name={member.name}
                    rank={member.rank}
                    picture_url={member.picture_url}
                  />
                  <MemberInfo
                    name={member.name}
                    description={member.description}
                  />
                </div>
                <div className="col-span-2 my-2 flex flex-wrap gap-1 px-4 lg:my-5 lg:justify-center lg:p-0">
                  {honors?.map((honor) => {
                    if (honor.id_member === member.id) {
                      return <Honor key={honor.id} honorId={honor.id} />;
                    }
                  })}
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </>
  );
};

export default HomePage;
