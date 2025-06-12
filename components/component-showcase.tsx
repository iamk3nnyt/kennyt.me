"use client";

import { useState } from "react";

interface Props {
  title: string;
  description: string;
  demo: React.ReactNode;
  code: string;
}

export function ComponentShowcase({ title, description, demo, code }: Props) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[#232326] bg-[#18181B] p-6">
      <h3 className="mb-2 text-lg font-medium text-white">{title}</h3>
      <p className="mb-4 text-sm text-[#B0B0B0]">{description}</p>

      <div className="mb-4 rounded-lg border border-[#232326] bg-[#111113] p-4">
        {demo}
      </div>

      <div className="relative">
        <pre className="overflow-x-auto rounded-lg bg-[#111113] p-4 text-sm text-[#B0B0B0]">
          <code>{code}</code>
        </pre>
        <button
          onClick={copyCode}
          className="absolute top-2 right-2 rounded-md bg-[#232326] px-2 py-1 text-xs text-[#B0B0B0] hover:bg-[#2A2A2D]"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
