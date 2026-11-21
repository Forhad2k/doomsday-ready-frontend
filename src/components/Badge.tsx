import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "watched" | "unwatched" | "target" | "success" | "danger" | "neutral" | "gold";
  size?: "sm" | "md";
}

export function Badge({ children, variant = "neutral", size = "sm" }: BadgeProps) {
  const variantStyles = {
    watched: "bg-emerald-950/80 text-emerald-400 border-emerald-800/50",
    unwatched: "bg-amber-950/80 text-amber-400 border-amber-800/50",
    target: "bg-marvel-950 text-marvel-400 border-marvel-700/60",
    success: "bg-emerald-950 text-emerald-400 border-emerald-800",
    danger: "bg-rose-950 text-rose-400 border-rose-800",
    gold: "bg-amber-950 text-amber-300 border-amber-700/60",
    neutral: "bg-surface text-gray-300 border-surface-border",
  }[variant];

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
  }[size];

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border tracking-wide uppercase ${variantStyles} ${sizeStyles}`}
    >
      {children}
    </span>
  );
}
