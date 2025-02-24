import React from "react";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input className="border p-2 rounded w-full mt-2" {...props} />
);
