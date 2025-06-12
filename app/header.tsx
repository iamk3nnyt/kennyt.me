"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { AppImage } from "../components/app-image";

const header = {
  "/": {
    title: "Kenny Tran",
    subtitle: "Full stack developer, founder, and writer.",
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
