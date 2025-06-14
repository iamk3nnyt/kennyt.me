"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { AppImage } from "../components/app-image";

const header = {
  "/": {
    title: "Kenny Tran",
    subtitle: "Full stack developer, designer, and writer.",
  },
  "/about": {
    title: "About",
    subtitle: "Learn more about Kenny Tran.",
  },
  "/projects": {
    title: "Projects",
    subtitle: "Explore some of the work and side projects.",
  },
  "/blog": {
    title: "Blog",
    subtitle: "Blog posts and writing.",
  },
  "/gaming": {
    title: "Gaming",
    subtitle: "MLBB heroes, stats, and preferences.",
  },
  "/workout": {
    title: "Workout",
    subtitle: "Fitness journey and activity timeline.",
  },
  "/finance": {
    title: "Finance",
    subtitle: "Personal budget tracking and financial insights.",
  },
  "/components": {
    title: "Components",
    subtitle: "Explore and reuse the components used in kennyt.me.",
  },
};

export function Header() {
  const pathname = usePathname();
  const content = (Object.keys(header) as (keyof typeof header)[]).includes(
    pathname as keyof typeof header,
  )
    ? (pathname as keyof typeof header)
    : "/";
  const { title, subtitle } = header[content];
  return (
    <header className="mx-auto w-full max-w-2xl">
      <div className="mb-6">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-blue-500">
          <AppImage
            src="/avatar.png"
            alt="Kenny Tran"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      {pathname === "/" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <a
            href="https://github.com/iamk3nnyt/kennyt.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-x-2 rounded-full border border-[#232326] bg-[#1A1A1D] px-3 py-1 text-sm text-[#B0B0B0] transition-colors hover:border-[#2B2B2F] hover:bg-[#232326]"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>Star on GitHub</span>
          </a>
        </motion.div>
      )}
      <motion.h1
        key={title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="mb-2 text-4xl font-bold tracking-tight"
      >
        {title}
      </motion.h1>
      <motion.p
        key={subtitle}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="text-lg text-[#B0B0B0]"
      >
        {subtitle}
      </motion.p>
    </header>
  );
}
