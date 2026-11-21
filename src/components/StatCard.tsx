import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "marvel" | "gold" | "green" | "cyan" | "default";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "default",
}: StatCardProps) {
  const variantStyles = {
    marvel: {
      border: "border-marvel-800/40 hover:border-marvel-600/60",
      bg: "bg-surface-card",
      iconBg: "bg-marvel-950 text-marvel-400 border border-marvel-800/50",
      text: "text-marvel-400",
    },
    gold: {
      border: "border-amber-900/40 hover:border-amber-600/60",
      bg: "bg-surface-card",
      iconBg: "bg-amber-950 text-amber-400 border border-amber-800/50",
      text: "text-amber-400",
    },
    green: {
      border: "border-emerald-900/40 hover:border-emerald-600/60",
      bg: "bg-surface-card",
      iconBg: "bg-emerald-950 text-emerald-400 border border-emerald-800/50",
      text: "text-emerald-400",
    },
    cyan: {
      border: "border-cyan-900/40 hover:border-cyan-600/60",
      bg: "bg-surface-card",
      iconBg: "bg-cyan-950 text-cyan-400 border border-cyan-800/50",
      text: "text-cyan-400",
    },
    default: {
      border: "border-surface-border hover:border-gray-700",
      bg: "bg-surface-card",
      iconBg: "bg-surface text-gray-300 border border-surface-border",
      text: "text-gray-100",
    },
  }[variant];

  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-5 transition-all duration-300 ${variantStyles.bg} ${variantStyles.border}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {title}
        </p>
        <div className={`rounded-lg p-2.5 ${variantStyles.iconBg}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3">
        <h3 className={`text-2xl font-bold tracking-tight sm:text-3xl ${variantStyles.text}`}>
          {value}
        </h3>
        {subtitle && (
          <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
