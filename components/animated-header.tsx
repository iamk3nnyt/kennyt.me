"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { AppImage } from "./app-image";

const headerContent = {
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
};

export function AnimatedHeader() {
  const pathname = usePathname();
  type HeaderKey = keyof typeof headerContent;
  const validPath = (Object.keys(headerContent) as HeaderKey[]).includes(
    pathname as HeaderKey,
  )
    ? (pathname as HeaderKey)
    : "/";
  const { title, subtitle } = headerContent[validPath];
  return (
    <header className="mx-auto mb-6 min-h-[84px] max-w-2xl pt-12">
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
