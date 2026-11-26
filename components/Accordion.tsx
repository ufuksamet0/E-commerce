'use client';
import { useState } from 'react';
export default function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b py-2">
      <button className="flex w-full justify-between py-1 font-medium" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && <div className="pb-2 text-sm text-neutral-700">{children}</div>}
    </div>
  );
}
