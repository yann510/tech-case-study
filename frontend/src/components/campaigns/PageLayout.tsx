import { ReactNode } from "react";

interface PageLayoutProps {
  header: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

export function PageLayout({ header, actions, children }: PageLayoutProps) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>{header}</div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
