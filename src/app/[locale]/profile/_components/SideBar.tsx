// "use client";
// import React from "react";
// import { User, PackageCheck, MapPin, CreditCard, LockKeyhole, LogOut } from "lucide-react";
// import Link from "next/link";
// import { useLocale } from "next-intl";
// import { usePathname } from "next/navigation"; // Add this import

// const links = [
//   {
//     title: "Edit Profile",
//     icon: <User className="w-5 h-5" />,
//     link: "/profile"
//   },
//   {
//     title: "My Orders",
//     icon: <PackageCheck className="w-5 h-5" />,
//     link: "/profile/orders"
//   },
//   {
//     title: "Manage Address",
//     icon: <MapPin className="w-5 h-5" />,
//     link: "/profile/address"
//   },
//   {
//     title: "Payment Method",
//     icon: <CreditCard className="w-5 h-5" />,
//     link: "/profile/payment"
//   },
//   {
//     title: "Password Manager",
//     icon: <LockKeyhole className="w-5 h-5" />,
//     link: "/profile/password"
//   },
//   {
//     title: "Logout",
//     icon: <LogOut className="w-5 h-5" />,
//     link: "/profile/logout"
//   },
// ];

// const SideBar = () => {
//   const locale = useLocale();
//   const pathname = usePathname(); // Get current path

//   // Create localized path without locale prefix for comparison
// //   const currentPath = pathname.replace(new RegExp(`^/${locale}`), '');

//   return (
//     <div className="w-64  p-4">
//       <nav>
//         <ul className="space-y-6">
//           {links.map((link, index) => {
//             const fullPath = `/${locale}${link.link}`;
//             const isActive = pathname === fullPath;

//             return (
//               <li key={index}>
//                 <Link
//                   href={fullPath}
//                   className={`flex items-center gap-3 p-4 rounded-full transition-colors ${
//                     isActive 
//                       ? "border"
//                       : "hover:bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   {React.cloneElement(link.icon, {
//                     className: `w-5 h-5 ${isActive ? "primary" : "stroke-gray-500"}`
//                   })}
//                   <span className="text-sm">{link.title}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default SideBar;



"use client";
// SideBar.tsx
import React from "react";
import { User, PackageCheck, MapPin, CreditCard, LockKeyhole, LogOut, X } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility
import { Button } from "@/components/ui/button";

const links = [
  {
    title: "Edit Profile",
    icon: <User className="w-5 h-5" />,
    link: "/profile"
  },
  {
    title: "My Orders",
    icon: <PackageCheck className="w-5 h-5" />,
    link: "/profile/orders"
  },
  {
    title: "Manage Address",
    icon: <MapPin className="w-5 h-5" />,
    link: "/profile/address"
  },
  {
    title: "Payment Method",
    icon: <CreditCard className="w-5 h-5" />,
    link: "/profile/payment"
  },
  {
    title: "Password Manager",
    icon: <LockKeyhole className="w-5 h-5" />,
    link: "/profile/password"
  },
  {
    title: "Logout",
    icon: <LogOut className="w-5 h-5" />,
    link: "/profile/logout"
  },
];




const SideBar = ({ onClose }: { onClose?: () => void }) => {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="w-64 h-full p-4 border-r">
      {/* Close Button for Mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden absolute top-2 right-2"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>

      <nav>
        <ul className="space-y-4">
          {links.map((link, index) => {
            const fullPath = `/${locale}${link.link}`;
            const isActive = pathname === fullPath;

            return (
              <li key={index}>
                <Link
                  href={fullPath}
                  className={cn(
                    "flex items-center rounded-full gap-3 p-3",
                    "transition-colors hover:bg-accent",
                    isActive && "border"
                  )}
                >
                  {React.cloneElement(link.icon, {
                    className: cn(
                      "w-5 h-5",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )
                  })}
                  <span className="text-sm">{link.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;