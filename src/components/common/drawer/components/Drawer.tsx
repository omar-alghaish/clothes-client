import React, { useEffect, ReactNode } from "react";
import { gsap } from "gsap";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  position?: "left" | "right" | "top" | "bottom"; // Determines the drawer's slide-in direction
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
  position = "left", // Default position is 'left'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when drawer is open
      gsap.to(`.drawer-content`, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      document.body.style.overflow = "unset"; // Allow scrolling when closed
    }

    return () => {
      document.body.style.overflow = "unset"; // Cleanup
    };
  }, [isOpen]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.overlay} ${
        isOpen ? styles.overlayVisible : styles.overlayHidden
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`${styles.content} ${
          positionClasses[position]
        } drawer-content ${isOpen ? positionVisibleClasses[position] : ""}`}
        style={{
          maxHeight:
            position === "top" || position === "bottom" ? "50%" : "100%",
          width: position === "top" || position === "bottom" ? "100%" : "auto", // Ensure full width for top/bottom
        }}
      >
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default Drawer;

const styles = {
  overlay: `fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity`,
  overlayVisible: `opacity-100 pointer-events-auto`,
  overlayHidden: `opacity-0 pointer-events-none`,
  content: `fixed bg-white shadow-lg transition-transform`, // Base drawer styles
  header: `p-4 flex justify-between items-center border-b`,
  title: `text-lg font-semibold`,
  closeButton: `text-gray-500 hover:text-gray-800`,
  body: `p-4 overflow-y-auto`,
};

// Classes for drawer position
const positionClasses = {
  left: `top-0 left-0 h-full transform -translate-x-full w-full max-w-md`, // Max width for left/right
  right: `top-0 right-0 h-full transform translate-x-full w-full max-w-md`,
  top: `top-0 left-0 w-full transform -translate-y-full h-auto`, // Full width for top/bottom
  bottom: `bottom-0 left-0 w-full transform translate-y-full h-auto`,
};

const positionVisibleClasses = {
  left: `translate-x-0`,
  right: `translate-x-0`,
  top: `translate-y-0`,
  bottom: `translate-y-0`,
};
