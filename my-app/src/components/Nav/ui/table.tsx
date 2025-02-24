import React from "react";

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ children, className, ...props }) => (
  <table className={`w-full border-collapse ${className}`} {...props}>
    {children}
  </table>
);
export const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <thead className="bg-gray-100">{children}</thead>
);

export const TableBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <tbody>{children}</tbody>
);

export const TableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <tr className="border-b">{children}</tr>
);

export const TableHead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <th className="p-2 text-left">{children}</th>
);

export const TableCell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <td className="p-2">{children}</td>
);
