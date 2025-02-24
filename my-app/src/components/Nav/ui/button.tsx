import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive";
}

export const Button: React.FC<ButtonProps> = ({ variant = "default", className, children, ...props }) => {
  const baseStyles = "px-4 py-2 rounded text-white font-medium";
  const variantStyles = variant === "destructive" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700";

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};