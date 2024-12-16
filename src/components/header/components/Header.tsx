// import { FC, useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import Link from "next/link";

// // Interface for props
// interface HeaderProps {
//   withBackground?: boolean;
// }

// // Links for navigation
// const NAV_LINKS = [
//   { path: "/", title: "Home" },
//   { path: "/shop", title: "Shop" },
//   { path: "/services", title: "Services" },
//   { path: "/about", title: "About" },
//   { path: "/contact", title: "Contact" },
// ];

// // Styles configuration
// const styles = {
//   navContainer: (withBackground: boolean) =>
//     `${withBackground ? "bg-primary" : "bg-transparent"} w-full fixed top-0 left-0 flex justify-between items-center py-[20px] px-[10px] sm:px-[30px] z-50`,
//   linksContainer: `hidden sm:flex gap-[10px] items-center justify-center`,
//   link: `opacity-0 transform translate-x-[100px] sm:opacity-100 sm:transform-none`,
//   searchContainer: `hidden sm:flex`,
//   toggleButton: `block sm:hidden`,
// };

// const Header: FC<HeaderProps> = ({ withBackground = true }) => {
//   const navRef = useRef<HTMLElement | null>(null);
//   const linksContainerRef = useRef<HTMLDivElement | null>(null);
//   const toggleBTNRef = useRef<HTMLButtonElement | null>(null);
//   const logoRef = useRef<HTMLDivElement | null>(null);

//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [prevScrollY, setPrevScrollY] = useState<number>(0);
//   const [isVisible, setIsVisible] = useState<boolean>(true);

//   const timeline = useRef(
//     gsap.timeline({
//       paused: true,
//       defaults: { duration: 0.6 },
//     })
//   );

//   useEffect(() => {
//     const links = linksContainerRef.current?.children;
  
//     timeline.current
//       .to(navRef.current, { opacity: 1, duration: 0.4 })
//       .to(navRef.current, { width: "100%", height: "100vh" }, "<")
//       .to(toggleBTNRef.current, { opacity: 1, position: "absolute", right: "20px", top: "20px" }, "<")
//       .to(logoRef.current, { position: "absolute", top: "20px", left: "20px", opacity: 1 }, "<")
//       .to(linksContainerRef.current, {
//         display: "flex",
//         opacity: 1,
//         flexDirection: "column",
//         ease: "circ",
//         width: "100%",
//       })
//       .to(links ? Array.from(links) : [], {
//         x: 0,
//         opacity: 1,
//         duration: 0.6,
//         stagger: 0.2,
//         ease: "back.out",
//       });
  
//     return () => {
//       timeline.current.kill();
//     };
//   }, []);
  

//   // Handle opening and closing navigation
//   const handleToggleNav = () => {
//     setIsOpen((prevState) => {
//       if (prevState) {
//         timeline.current.timeScale(5).reverse();
//       } else {
//         timeline.current.timeScale(1).play();
//       }
//       return !prevState;
//     });
//   };

//   // Scroll behavior: show/hide header
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > prevScrollY && currentScrollY > 100) {
//         setIsVisible(false); // Hide header
//       } else {
//         setIsVisible(true); // Show header
//       }

//       setPrevScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [prevScrollY]);

//   return (
//     <nav
//       ref={navRef}
//       className={`${styles.navContainer(withBackground)} ${
//         isVisible ? "translate-y-0" : "-translate-y-full"
//       } transition-transform duration-300`}
//     >
//       <Logo logoRef={logoRef} />
//       <Navigation links={NAV_LINKS} linksContainerRef={linksContainerRef} />
//       <SearchAndButtons />
//       <ToggleButton toggleBTNRef={toggleBTNRef} handleToggleNav={handleToggleNav} />
//     </nav>
//   );
// };

// // Logo Component
// const Logo: FC<{ logoRef: React.RefObject<HTMLDivElement> }> = ({ logoRef }) => (
//   <div ref={logoRef} className="logo">
//     logo
//   </div>
// );

// // Navigation Component
// const Navigation: FC<{
//   links: { path: string; title: string }[];
//   linksContainerRef: React.RefObject<HTMLDivElement>;
// }> = ({ links, linksContainerRef }) => (
//   <div ref={linksContainerRef} className={styles.linksContainer}>
//     {links.map((link, index) => (
//       <Link className={styles.link} key={index} href={link.path}>
//         {link.title}
//       </Link>
//     ))}
//   </div>
// );

// // Search and Buttons Component
// const SearchAndButtons: FC = () => (
//   <div className={`search_buttons_container ${styles.searchContainer}`}>
//     <div className="search">search here</div>
//     <div>login or icons here</div>
//   </div>
// );

// // Toggle Button Component
// const ToggleButton: FC<{
//   toggleBTNRef: React.RefObject<HTMLButtonElement>;
//   handleToggleNav: () => void;
// }> = ({ toggleBTNRef, handleToggleNav }) => (
//   <button
//     ref={toggleBTNRef}
//     onClick={handleToggleNav}
//     className={`toggle_button ${styles.toggleButton}`}
//   >
//     =
//   </button>
// );

// export default Header;


import { FC, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchAndButtons from "./SearchAndButtons";
import ToggleButton from "./ToggleButton";

interface HeaderProps {
  withBackground?: boolean;
}

export const styles = {
    navContainer: (withBackground: boolean) =>
      `${withBackground ? "bg-primary" : "bg-transparent"} w-full fixed top-0 left-0 flex justify-between items-center py-[20px] px-[10px] sm:px-[30px] z-50`,
   
  };
  

const NAV_LINKS = [
  { path: "/", title: "Home" },
  { path: "/shop", title: "Shop" },
  { path: "/services", title: "Services" },
  { path: "/about", title: "About" },
  { path: "/contact", title: "Contact" },
];

const Header: FC<HeaderProps> = ({ withBackground = true }) => {
  const navRef = useRef<HTMLElement | null>(null);
  const linksContainerRef = useRef<HTMLDivElement | null>(null);
  const toggleBTNRef = useRef<HTMLButtonElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [prevScrollY, setPrevScrollY] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const timeline = useRef(
    gsap.timeline({
      paused: true,
      defaults: { duration: 0.6 },
    })
  );

  useEffect(() => {
    const links = linksContainerRef.current?.children;

    timeline.current
      .to(navRef.current, { opacity: 1, duration: 0.4 })
      .to(navRef.current, { width: "100%", height: "100vh" }, "<")
      .to(toggleBTNRef.current, { opacity: 1, position: "absolute", right: "20px", top: "20px" }, "<")
      .to(logoRef.current, { position: "absolute", top: "20px", left: "20px", opacity: 1 }, "<")
      .to(linksContainerRef.current, {
        display: "flex",
        opacity: 1,
        flexDirection: "column",
        ease: "circ",
        width: "100%",
      })
      .to(links ? Array.from(links) : [], {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out",
      });

    return () => {
      timeline.current.kill();
    };
  }, []);

  const handleToggleNav = () => {
    setIsOpen((prevState) => {
      if (prevState) {
        timeline.current.timeScale(5).reverse();
      } else {
        timeline.current.timeScale(1).play();
      }
      return !prevState;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  return (
    <nav
      ref={navRef}
      className={`${styles.navContainer(withBackground)} ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } transition-transform duration-300`}
    >
      <Logo logoRef={logoRef} />
      <Navigation links={NAV_LINKS} linksContainerRef={linksContainerRef} />
      <SearchAndButtons />
      <ToggleButton toggleBTNRef={toggleBTNRef} handleToggleNav={handleToggleNav} isOpen={isOpen} />
    </nav>
  );
};

export default Header;
