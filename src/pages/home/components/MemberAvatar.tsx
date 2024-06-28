import React from "react";

import { Avatar, AvatarImage } from "@components/ui";
import { cn } from "@lib/utils";

const rankMap = new Map();

rankMap.set(1, "/assets/bushi.svg");
rankMap.set(2, "/assets/tozama.svg");
rankMap.set(3, "/assets/jozai.svg");
rankMap.set(4, "/assets/shinpan.svg");
rankMap.set(5, "/assets/dai_shinpan_1.svg");
rankMap.set(6, "/assets/dai_shinpan_2.svg");
rankMap.set(7, "/assets/dai_shinpan_3.svg");
rankMap.set(8, "/assets/dai_shinpan_4.svg");

type MemberAvatarProps = {
  name: string;
  picture_url: string;
  rank: number;
};

const MemberAvatar: React.FC<MemberAvatarProps> = (props) => {
  return (
    <Avatar className={cn("relative size-28 md:size-60")}>
      <AvatarImage
        src={props.picture_url}
        alt={`foto de ${props.name}`}
        className={cn(
          "absolute left-4 top-[10px] size-20 rounded-full object-cover shadow-lg shadow-black ring-2 ring-yellow-950 md:left-8 md:top-4 md:size-44 md:ring-4"
        )}
      />
      <AvatarImage
        src={rankMap.get(props.rank)}
        alt="patente"
        className="absolute inset-0 z-10 size-28 md:size-60"
      />
    </Avatar>
  );
};

export { MemberAvatar };
