"use client";

import { useCinemas } from "../../hooks/useCinemas";
import { BookingCalculator } from "../../features/booking/BookingCalculator";
import { Ticket, Loader2 } from "lucide-react";

export default function BookingPage() {
  const { cinemas, loading, error } = useCinemas();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-surface-border pb-6">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
          <Ticket className="h-4 w-4 text-cyan-500" />
          <span>Opening Night Watch Party</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Cinema Seat Bundle Calculator
        </h1>
        <p className="mt-1 text-sm text-gray-400 max-w-2xl">
          Find the minimum number of seat bundles required to accommodate your entire watch party without leaving any wasted seats. Solved using unbounded coin-change dynamic programming.
        </p>
      </div>

      {/* Content */}
      {loading && (
        <div className="flex h-64 items-center justify-center rounded-xl border border-surface-border bg-surface-card">
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin text-cyan-500" />
            <span>Loading cinema venues and bundle configurations...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-rose-800/60 bg-rose-950/40 p-6 text-center text-sm text-rose-300">
          {error}
        </div>
      )}

      {!loading && cinemas.length > 0 && (
        <BookingCalculator cinemas={cinemas} />
      )}
    </div>
  );
}
