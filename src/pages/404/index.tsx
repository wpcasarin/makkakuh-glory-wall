import { cn } from "@lib/utils";

const NotFoundPage = () => {
  return (
    <main
      className={cn("container flex min-h-dvh items-center justify-center p-4")}
    >
      <div className="max-h-[49]px">
        <h1
          className={cn(
            "mr-[20px] inline-block border-r border-solid border-black border-opacity-30 pr-[23px] align-top text-2xl font-semibold leading-[49px]"
          )}
        >
          404
        </h1>
        <h2
          className={cn("m-0 inline-block text-base font-light leading-[49px]")}
        >
          Esta página não pôde ser encontrada.
        </h2>
      </div>
    </main>
  );
};

export default NotFoundPage;
