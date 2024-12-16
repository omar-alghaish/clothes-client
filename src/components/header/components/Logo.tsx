import { FC } from "react";

const Logo: FC<{ logoRef: React.RefObject<HTMLDivElement> }> = ({ logoRef }) => (
  <div ref={logoRef} className="logo">
    logo
  </div>
);

export default Logo;
