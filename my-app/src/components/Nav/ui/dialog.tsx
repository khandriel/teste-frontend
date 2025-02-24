import React from "react";

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, className, children, ...props }) => {
  if (!open) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${className}`} {...props}>
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3 relative">
        {children}
      </div>
    </div>
  );
};

export const DialogContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="p-4">{children}</div>;

interface DialogHeaderProps {
  children: React.ReactNode;
  onClose?: () => void; // 'onClose' agora é opcional
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children, onClose }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <div className="font-bold text-lg">{children}</div>
  </div>
);

export const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2>{children}</h2>;

export const DialogFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="mt-4">{children}</div>;
