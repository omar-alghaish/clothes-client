import { ReactNode } from "react";
import SideBar from "./_components/SideBar";
import { Separator } from "@/components/ui/separator";

const layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="flex flex-col lg:flex-row mt-[70px]">
      <div className="sticky h-max top-0">
        <SideBar />
      </div>
      <div>
        <Separator orientation="vertical" />
      </div>

      <div className="px-4 flex-1">{children}</div>
    </div>
  );
};

export default layout;
