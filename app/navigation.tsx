"use client";

import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Briefcase,
  Code2,
  Dumbbell,
  FileText,
  Gamepad2,
  Home,
  User,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/gaming", label: "Gaming", icon: Gamepad2 },
  { href: "/workout", label: "Workout", icon: Dumbbell },
  { href: "/finance", label: "Finance", icon: Wallet },
  { href: "/components", label: "Components", icon: Code2 },
];

export function Navigation() {
  const pathname = usePathname();
  const isBlogArticle = pathname.startsWith("/blog/") && pathname !== "/blog";

  return (
    <nav className="relative mx-auto flex w-full max-w-2xl gap-4 text-sm text-[#B0B0B0]">
      <AnimatePresence mode="wait" initial={false}>
        {isBlogArticle ? (
          <motion.div
            key="back-button"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="relative"
          >
            <Link
              href="/blog"
              className="flex items-center gap-2 px-1 py-0.5 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
              <motion.div
                layoutId="nav-underline"
                className="absolute right-0 -bottom-1 left-0 h-0.5 rounded-full bg-blue-500"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="nav-links"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="flex gap-4"
          >
            {navigation.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 px-1 py-0.5 transition hover:text-white",
                      isActive && "font-semibold text-white",
                    )}
                  >
                    <link.icon className="h-4 w-4 sm:hidden" />
                    <span className="hidden sm:inline">{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute right-0 -bottom-1 left-0 h-0.5 rounded-full bg-blue-500"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
