// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import bootIcon from "@/assets/images/boot.png";

// const BootIcon = () => {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [dragging, setDragging] = useState(false);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [isOpen, setIsOpen] = useState(false);

//   // Set initial position to bottom right
//   useEffect(() => {
//     const updatePosition = () => {
//       setPosition({
//         x: window.innerWidth - 80,  // 80px is the element's width
//         y: window.innerHeight - 80  // 80px is the element's height
//       });
//     };
    
//     updatePosition();
    
//     // Optional: Update position on window resize
//     window.addEventListener('resize', updatePosition);
//     return () => window.removeEventListener('resize', updatePosition);
//   }, []);

//   const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
//     setDragging(true);
//     setOffset({
//       x: e.clientX - position.x,
//       y: e.clientY - position.y,
//     });
//   };

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (dragging) {
//         setPosition({
//           x: e.clientX - offset.x,
//           y: e.clientY - offset.y,
//         });
//       }
//     };

//     const handleMouseUp = () => setDragging(false);

//     if (dragging) {
//       window.addEventListener("mousemove", handleMouseMove);
//       window.addEventListener("mouseup", handleMouseUp);
//     }

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [dragging, offset]);

//   return (
//     <div
//       className="fixed cursor-grab active:cursor-grabbing w-[80px] h-[80px] flex items-center justify-center rounded-full bg-black/35 border z-50"
//       style={{
//         left: position.x,
//         top: position.y,
//         userSelect: "none",
//       }}
//       onMouseDown={handleMouseDown}
//     >
//       <Image src={bootIcon} alt="boot" width={50} height={50} />
//     </div>
//   );
// };

// export default BootIcon;



"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import bootIcon from "@/assets/images/boot.png";
import ChatBoot from "./ChatBoot";
import { useViewport } from "@/hooks/use-viewposrt";

const BootIcon = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useViewport();

  // Set initial position to bottom-right
  useEffect(() => {
    const updatePosition = () => {
      setPosition({
        x: window.innerWidth - 80,
        y: window.innerHeight - 80,
      });
    };
    
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    setDragging(true);
    setOffset({ x: touch.clientX - position.x, y: touch.clientY - position.y });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragging) {
      // Boundary checking to keep icon within viewport
      const newX = Math.min(Math.max(0, e.clientX - offset.x), window.innerWidth - 80);
      const newY = Math.min(Math.max(0, e.clientY - offset.y), window.innerHeight - 80);
      
      setPosition({ x: newX, y: newY });
    }
  }, [dragging, offset]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (dragging) {
      const touch = e.touches[0];
      
      // Boundary checking to keep icon within viewport
      const newX = Math.min(Math.max(0, touch.clientX - offset.x), window.innerWidth - 80);
      const newY = Math.min(Math.max(0, touch.clientY - offset.y), window.innerHeight - 80);
      
      setPosition({ x: newX, y: newY });
    }
  }, [dragging, offset]);

  const handleDragEnd = useCallback(() => {
    setDragging(false);
  }, []);

  const handleIconClick = () => {
    if (!dragging) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleDragEnd);
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [dragging, handleMouseMove, handleTouchMove, handleDragEnd]);

  return (
    <>
      {/* Boot Icon */}
      <div
        className="fixed cursor-pointer w-[80px] h-[80px] flex items-center justify-center rounded-full bg-black/35 border z-50"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`, 
          userSelect: "none",
          touchAction: "none"
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleIconClick}
      >
        <Image src={bootIcon} alt="boot" width={50} height={50} />
      </div>
      
      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className="[&>button]:hidden"
          style={{
            width: isMobile ? "100%" : "80%",
            maxWidth: isMobile ? "100%" : "50vw",
          }}
        >
          <ChatBoot />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BootIcon;
