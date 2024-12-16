import { FC } from "react";
import Link from "next/link";

interface NavigationProps {
  links: { path: string; title: string }[];
  linksContainerRef: React.RefObject<HTMLDivElement>;
}

const styles = {
    linksContainer: `hidden sm:flex gap-[10px] items-center justify-center`,
    link: `opacity-0 transform translate-x-[100px] sm:opacity-100 sm:transform-none`,
}

const Navigation: FC<NavigationProps> = ({ links, linksContainerRef }) => (
  <div ref={linksContainerRef} className={styles.linksContainer}>
    {links.map((link, index) => (
      <Link className={styles.link} key={index} href={link.path}>
        {link.title}
      </Link>
    ))}
  </div>
);

export default Navigation;
