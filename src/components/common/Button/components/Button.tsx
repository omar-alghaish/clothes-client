"use client";

import React from "react";

interface ButtonProps {
  label: string;
  variant?: "contained" | "outlined" | "text";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, variant = "contained", onClick }) => {
  const baseStyles = "font-bold py-2 px-4 rounded transition-all duration-200";
  const variants = {
    outlined: "rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44",
    contained: "rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5",
    text:""
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;

