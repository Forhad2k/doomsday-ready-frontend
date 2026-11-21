"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, CalendarCheck2, Ticket, Shield, Sparkles } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/", icon: Shield },
    { label: "MCU Movies", href: "/movies", icon: Film },
    { label: "Rewatch Plan", href: "/rewatch", icon: CalendarCheck2 },
    { label: "Cinema Booking", href: "/booking", icon: Ticket },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center space-x-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-marvel-600 font-black tracking-tighter text-white shadow-lg shadow-marvel-900/50 transition-transform duration-300 group-hover:scale-105">
            <span className="text-xl">DR</span>
            <div className="absolute -inset-0.5 rounded-lg bg-marvel-500 opacity-20 blur transition group-hover:opacity-40" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold tracking-wider text-white">DOOMSDAY</span>
              <span className="font-extrabold text-marvel-500">READY</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400">MCU Protocol 2026</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-marvel-950/80 text-marvel-400 border border-marvel-800/60 shadow-sm shadow-marvel-900/30"
                    : "text-gray-400 hover:bg-surface-card hover:text-gray-100"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-marvel-500" : "text-gray-400"}`} />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Status Pill */}
        <div className="hidden lg:flex items-center space-x-2 rounded-full border border-surface-border bg-surface-card/60 px-3 py-1 text-xs text-gray-300">
          <Sparkles className="h-3.5 w-3.5 text-doom-gold animate-pulse" />
          <span>Avengers: Doomsday 2026</span>
        </div>
      </div>
    </header>
  );
}
