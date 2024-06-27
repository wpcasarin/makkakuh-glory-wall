import { SiteHeader } from "./SiteHeader";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      {props.children}
    </div>
  );
};

export { MainLayout };
