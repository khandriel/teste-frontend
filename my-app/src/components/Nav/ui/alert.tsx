import React from "react";

export const Alert: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-4 border-l-4 border-red-600 bg-red-100 text-red-800">{children}</div>
);
