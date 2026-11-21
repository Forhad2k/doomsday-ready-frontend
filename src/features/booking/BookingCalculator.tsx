"use client";

import React, { useState } from "react";
import { Cinema } from "../../types";
import { useBookingQuote } from "../../hooks/useBookingQuote";
import { Button } from "../../components/Button";
import {
  Ticket,
  Users,
  Building,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Calculator,
} from "lucide-react";

interface BookingCalculatorProps {
  cinemas: Cinema[];
}

export function BookingCalculator({ cinemas }: BookingCalculatorProps) {
  const [selectedCinemaId, setSelectedCinemaId] = useState<string>(
    cinemas[0]?.id || ""
  );
  const [groupSizeInput, setGroupSizeInput] = useState<string>("11");
  const [validationError, setValidationError] = useState<string | null>(null);

  const { quote, loading, error, calculateQuote, resetQuote } = useBookingQuote();

  const selectedCinema = cinemas.find((c) => c.id === selectedCinemaId);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const groupSize = parseInt(groupSizeInput.trim(), 10);
    if (isNaN(groupSize) || groupSize < 1 || groupSize > 10000) {
      setValidationError("Group size must be an integer between 1 and 10,000.");
      return;
    }

    if (!selectedCinemaId) {
      setValidationError("Please select a cinema venue.");
      return;
    }

    try {
      await calculateQuote(selectedCinemaId, groupSize);
    } catch {
      // Error is stored in hook's error state
    }
  };

  // Calculate total seats in quote result
  const totalSeatsCalculated = quote?.bundles.reduce(
    (sum, b) => sum + b.size * b.quantity,
    0
  ) ?? 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Configuration Form Card (Left Column) */}
      <div className="lg:col-span-5 rounded-xl border border-surface-border bg-surface-card p-6">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-marvel-400 mb-2">
          <Calculator className="h-4 w-4 text-marvel-500" />
          <span>Opening Night Watch Party</span>
        </div>
        <h3 className="text-xl font-bold text-gray-100 mb-1">
          Cinema Seat Bundle Optimizer
        </h3>
        <p className="text-xs text-gray-400 mb-6">
          Calculates the absolute minimum number of seat bundles needed using an unbounded coin-change DP algorithm. Every purchased bundle must be completely occupied.
        </p>

        <form onSubmit={handleCalculate} className="space-y-5">
          {/* Cinema Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              Select Cinema Venue *
            </label>
            <div className="relative">
              <select
                value={selectedCinemaId}
                onChange={(e) => {
                  setSelectedCinemaId(e.target.value);
                  resetQuote();
                }}
                className="w-full rounded-lg border border-surface-border bg-surface px-3 py-2 text-sm text-gray-100 focus:border-marvel-500 focus:outline-none focus:ring-1 focus:ring-marvel-500 cursor-pointer"
              >
                {cinemas.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Available Bundle Sizes Preview */}
          {selectedCinema && (
            <div className="rounded-lg border border-surface-border/60 bg-surface/60 p-3.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-1.5">
                Available Bundle Sizes at {selectedCinema.name}
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedCinema.bundleSizes.map((size) => (
                  <span
                    key={size}
                    className="inline-flex items-center space-x-1 rounded-md border border-surface-border bg-surface px-2.5 py-1 text-xs font-bold text-marvel-400"
                  >
                    <Ticket className="h-3 w-3 text-marvel-500" />
                    <span>{size} Seats</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Group Size Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              Party Group Size (1 - 10,000) *
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={groupSizeInput}
                onChange={(e) => {
                  setGroupSizeInput(e.target.value);
                  resetQuote();
                }}
                min={1}
                max={10000}
                placeholder="e.g. 11"
                className="w-full rounded-lg border border-surface-border bg-surface pl-9 pr-4 py-2 text-sm font-semibold text-gray-100 placeholder-gray-500 focus:border-marvel-500 focus:outline-none focus:ring-1 focus:ring-marvel-500"
              />
            </div>
          </div>

          {/* Error Message */}
          {(validationError || error) && (
            <div className="rounded-lg border border-rose-800/60 bg-rose-950/40 p-3 text-xs text-rose-300 flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{validationError || error}</span>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full"
            icon={<Sparkles className="h-4 w-4" />}
          >
            Calculate Optimal Bundles
          </Button>
        </form>
      </div>

      {/* Results Card (Right Column) */}
      <div className="lg:col-span-7 flex flex-col">
        {quote ? (
          <div className="h-full rounded-xl border border-surface-border bg-surface-card p-6 flex flex-col justify-between">
            <div>
              {/* Header Status */}
              <div className="flex items-center justify-between border-b border-surface-border/60 pb-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Quote Result for {selectedCinema?.name}
                  </span>
                  <h4 className="text-xl font-bold text-white mt-0.5">
                    Target: {quote.groupSize} Guests
                  </h4>
                </div>

                {quote.possible ? (
                  <span className="inline-flex items-center space-x-1.5 rounded-full border border-emerald-800/60 bg-emerald-950 px-3 py-1 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Exact Fit Possible</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1.5 rounded-full border border-rose-800/60 bg-rose-950 px-3 py-1 text-xs font-semibold text-rose-400">
                    <AlertTriangle className="h-4 w-4 text-rose-400" />
                    <span>No Exact Fit</span>
                  </span>
                )}
              </div>

              {/* Possible State */}
              {quote.possible ? (
                <div className="mt-6 space-y-6">
                  {/* Summary Metric Callout */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-surface-border bg-surface p-4 text-center">
                      <p className="text-xs uppercase font-semibold text-gray-400">
                        Minimum Bundles Needed
                      </p>
                      <p className="text-3xl font-extrabold text-marvel-400 mt-1">
                        {quote.totalBundles}
                      </p>
                    </div>

                    <div className="rounded-xl border border-surface-border bg-surface p-4 text-center">
                      <p className="text-xs uppercase font-semibold text-gray-400">
                        Total Seats Purchased
                      </p>
                      <p className="text-3xl font-extrabold text-emerald-400 mt-1">
                        {totalSeatsCalculated}
                      </p>
                    </div>
                  </div>

                  {/* Bundle Breakdown */}
                  <div>
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                      Selected Bundle Breakdown
                    </h5>
                    <div className="space-y-2">
                      {quote.bundles.map((bundle) => (
                        <div
                          key={bundle.size}
                          className="flex items-center justify-between rounded-lg border border-surface-border bg-surface px-4 py-3"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-marvel-950 border border-marvel-800/60 text-marvel-400">
                              <Ticket className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-100">
                                {bundle.size}-Seat Bundle
                              </p>
                              <p className="text-xs text-gray-400">
                                Total: {bundle.size * bundle.quantity} seats
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-base font-black text-white">
                              × {bundle.quantity}
                            </span>
                            <span className="block text-[11px] text-gray-400">
                              {bundle.quantity === 1 ? "bundle" : "bundles"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Impossible State */
                <div className="mt-8 rounded-xl border border-rose-900/40 bg-surface/80 p-8 text-center">
                  <AlertTriangle className="mx-auto h-12 w-12 text-rose-500 mb-3" />
                  <h5 className="text-base font-bold text-gray-100">
                    No Exact Seat Combination Possible
                  </h5>
                  <p className="mt-2 text-xs text-gray-400 max-w-sm mx-auto">
                    The available bundle sizes ({selectedCinema?.bundleSizes.join(", ")}) cannot be combined to equal exactly {quote.groupSize} seats with zero empty seats remaining.
                  </p>
                  <p className="mt-3 text-[11px] text-amber-400 font-medium">
                    Tip: Try adjusting your party size or selecting another cinema venue.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-surface-border/60 pt-4 text-center">
              <p className="text-[11px] text-gray-500">
                Optimization quote calculated locally via Dynamic Programming • Zero wasted seats.
              </p>
            </div>
          </div>
        ) : (
          /* Initial Empty State */
          <div className="h-full rounded-xl border border-dashed border-surface-border bg-surface-card/30 p-12 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-surface border border-surface-border p-4 mb-4 text-gray-500">
              <Ticket className="h-8 w-8" />
            </div>
            <h4 className="text-base font-bold text-gray-300">
              Awaiting Booking Parameters
            </h4>
            <p className="mt-1 text-xs text-gray-500 max-w-xs">
              Select a cinema and enter your party size on the left to calculate the optimal bundle package.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
