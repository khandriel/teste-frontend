import React from "react";

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="border rounded-lg shadow-md p-4 bg-white">{children}</div>
);

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mt-2">{children}</div>
);