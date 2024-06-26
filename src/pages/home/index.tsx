import { useEffect, useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { supabaseClient } from "@/lib/supabase";
import { cn } from "@/lib/utils";

type Member = {
  created_at: string;
  description: string;
  id: number;
  name: string;
  picture_url: string;
  rank: number;
  update_at: string;
};

type RankItem = [number, string];

const rankMap: RankItem[] = [
  [1, "/assets/bushi.svg"],
  [2, "/assets/tozama.svg"],
  [3, "/assets/jozai.svg"],
  [4, "/assets/shinpan.svg"],
  [5, "/assets/dai_shinpan_1.svg"],
  [6, "/assets/dai_shinpan_2.svg"],
  [7, "/assets/dai_shinpan_3.svg"],
  [8, "/assets/dai_shinpan_4.svg"],
];

export const HomePage = () => {
  const [members, setMembers] = useState<Member[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("tb_members")
        .select("*");
      if (error) throw error;
      setMembers(data);
    };
    fetchData();
  }, [setMembers]);

  return (
    <div className="container mb-10">
      <h1 className="mb-6 mt-4 text-center font-halibut text-6xl font-bold text-yellow-950">
        Mural da Glória
      </h1>
      <main className={cn("grid grid-cols-1 gap-4")}>
        {members?.map((member) => {
          return (
            <div
              className="flex scale-100 flex-row gap-4 rounded-xl bg-cover bg-center p-2 duration-500 ease-in hover:scale-105"
              style={{
                backgroundImage: "url('/assets/wood-wall-texture.svg')",
              }}
            >
              <Avatar className={cn("relative size-28 md:size-60")}>
                <AvatarImage
                  src={member.picture_url}
                  className={cn(
                    "absolute left-4 top-[10px] size-20 rounded-full object-cover shadow-lg shadow-black ring-2 ring-yellow-950 md:left-8 md:top-4 md:size-44 md:ring-4"
                  )}
                />
                <AvatarImage
                  src={`${rankMap[member.rank - 1][1]}`}
                  className="absolute inset-0 z-10 size-28 md:size-60"
                />
              </Avatar>
              <div className="px-2 py-2">
                <h1 className="font-halibut text-xl font-bold uppercase text-yellow-950">
                  {member.name}
                </h1>
                <span
                  className={cn(
                    "line-clamp-3 font-halibut text-sm text-yellow-950"
                  )}
                >
                  {member.description}
                </span>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};
