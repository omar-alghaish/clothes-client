import { ReactNode } from "react";

const layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <div className="mt-[100px]">{children}</div>;
};

export default layout;
