import { Footer, Header } from "@/components/common";
import BootIcon from "@/components/common/bootIcon";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div>{children}</div>
      <BootIcon />
      <Footer />
      {/* <Toaster /> */}
    </div>
  );
}
