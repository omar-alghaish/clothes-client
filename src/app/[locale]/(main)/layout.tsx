import { Footer, Header } from "@/components/common";
import BootIcon from "@/components/common/bootIcon";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <BootIcon />
      <Footer />
    </div>
  );
}
