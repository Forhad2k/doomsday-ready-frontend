import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary:
      "bg-marvel-600 text-white hover:bg-marvel-500 shadow-md shadow-marvel-950/50 border border-marvel-500/30",
    secondary:
      "bg-surface text-gray-100 hover:bg-surface-border border border-surface-border",
    danger:
      "bg-rose-700 text-white hover:bg-rose-600 shadow-sm border border-rose-500/30",
    outline:
      "bg-transparent text-gray-200 hover:bg-surface-card border border-surface-border hover:border-gray-600",
    ghost:
      "bg-transparent text-gray-400 hover:bg-surface-card hover:text-gray-100",
  }[variant];

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-5 py-2.5 text-base rounded-lg",
  }[size];

  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
