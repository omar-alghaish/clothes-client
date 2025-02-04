// import { ReactNode } from "react";
// import SideBar from "./_components/SideBar";
// import { Separator } from "@/components/ui/separator";

// const layout = ({
//   children,
// }: Readonly<{
//   children: ReactNode;
// }>) => {
//   return (
//     <div className="flex flex-col lg:flex-row mt-[70px]">
//       <div className="sticky h-max top-0">
//         <SideBar />
//       </div>
//       <div>
//         <Separator orientation="vertical" />
//       </div>

//       <div className="px-2 lg:px-16 flex-1">{children}</div>
//     </div>
//   );
// };

// export default layout;



"use client";
import { ReactNode, useState, useEffect } from "react";
import SideBar from "./_components/SideBar";
// import { Separator } from "@/components/ui/separator";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="flex flex-col lg:flex-row mt-[70px]">
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-20 right-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 lg:sticky lg:top-[70px] h-[calc(100vh)]",
          "left-0 z-50 bg-background transition-transform duration-300",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SideBar onClose={() => setIsOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-4">
        <div className="px-4 lg:px-8 xl:px-16 py-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;