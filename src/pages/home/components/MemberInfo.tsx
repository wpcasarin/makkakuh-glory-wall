import React from "react";

type MemberInfoProps = {
  name: string;
  description: string;
};

const MemberInfo: React.FC<MemberInfoProps> = (props) => {
  return (
    <section className="flex h-full flex-col px-2 md:flex-col">
      <h2 className="font-halibut text-xl font-bold uppercase text-yellow-950 md:text-3xl">
        {props.name}
      </h2>
      <p
        className={
          "line-clamp-3 flex-grow font-halibut text-sm text-yellow-950 md:line-clamp-6 md:text-lg"
        }
      >
        {props.description}
      </p>
    </section>
  );
};

export { MemberInfo };
