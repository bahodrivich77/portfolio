import type { ReactNode } from "react";
export function SectionHeading({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div className="eyebrow">
        <span>{number}</span>
        {label}
      </div>
      <div className="section-heading-row">
        <h2>{title}</h2>
        {children && <p>{children}</p>}
      </div>
    </div>
  );
}
