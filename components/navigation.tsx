"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Briefcase,
  FileText,
  Gamepad2,
  Dumbbell,
  Wallet,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/gaming", label: "Gaming", icon: Gamepad2 },
  { href: "/workout", label: "Workout", icon: Dumbbell },
  { href: "/finance", label: "Finance", icon: Wallet },
];

export function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="relative mx-auto flex max-w-2xl gap-4 text-sm text-[#B0B0B0]">
      {navLinks.map((link) => {
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
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
