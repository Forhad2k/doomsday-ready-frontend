"use client";

import React, { useState, useEffect } from "react";
import { Movie } from "../../types";
import { useRewatchPlan } from "../../hooks/useRewatchPlan";
import { Button } from "../../components/Button";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowRight,
  Flame,
  Film,
  RefreshCw,
} from "lucide-react";

interface RewatchTimelineProps {
  movies: Movie[];
  defaultTargetId?: string;
}

export function RewatchTimeline({ movies, defaultTargetId }: RewatchTimelineProps) {
  // Prefer Avengers: Doomsday or the first available movie as default
  const doomsday = movies.find((m) => m.title.includes("Doomsday"));
  const [selectedTargetId, setSelectedTargetId] = useState<string>(
    defaultTargetId || doomsday?.id || (movies[0]?.id ?? "")
  );

  useEffect(() => {
    if (!selectedTargetId && movies.length > 0) {
      const dd = movies.find((m) => m.title.includes("Doomsday"));
      setSelectedTargetId(dd?.id || movies[0]?.id || "");
    }
  }, [movies, selectedTargetId]);

  const { plan, loading, error, refreshPlan, toggleWatchedInPlan } =
    useRewatchPlan(selectedTargetId);

  const formatRuntime = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    if (hours === 0) return `${minutes}m`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}m`;
  };

  const progressPercentage =
    plan && plan.totalMovies > 0
      ? Math.round((plan.watchedCount / plan.totalMovies) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Target Selector Bar */}
      <div className="rounded-xl border border-surface-border bg-surface-card p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Select Destination Target Film
            </label>
            <div className="relative">
              <select
                value={selectedTargetId}
                onChange={(e) => setSelectedTargetId(e.target.value)}
                className="w-full sm:w-80 rounded-lg border border-surface-border bg-surface px-3 py-2 text-sm font-semibold text-gray-100 focus:border-marvel-500 focus:outline-none focus:ring-1 focus:ring-marvel-500 cursor-pointer"
              >
                {movies.map((m) => (
                  <option key={m.id} value={m.id} className="bg-surface py-1">
                    {m.title} ({m.releaseYear})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={() => refreshPlan()}
            icon={<RefreshCw className="h-4 w-4" />}
          >
            Refresh Plan
          </Button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="h-64 animate-pulse rounded-xl border border-surface-border bg-surface-card/60 p-8" />
      )}

      {/* Error state */}
      {error && (
        <div className="rounded-xl border border-rose-800/60 bg-rose-950/40 p-6 text-center">
          <p className="text-sm font-semibold text-rose-300">{error}</p>
          <Button variant="outline" size="sm" onClick={() => refreshPlan()} className="mt-3">
            Retry
          </Button>
        </div>
      )}

      {/* Rewatch Plan Details & Progress */}
      {!loading && plan && (
        <div className="space-y-6">
          {/* Progress Header Card */}
          <div className="relative overflow-hidden rounded-xl border border-marvel-800/40 bg-gradient-to-br from-surface-card via-surface-card to-marvel-950/40 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="inline-flex items-center space-x-1.5 rounded-full border border-marvel-700/60 bg-marvel-950 px-3 py-1 text-xs font-semibold text-marvel-400 mb-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Rewatch Plan Target</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                  {plan.target.title}
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Chronological prerequisite roadmap calculated via DAG topological sorting.
                </p>
              </div>

              {/* Metrics Badge */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-surface-border bg-surface/80 p-3 text-center">
                  <p className="text-[10px] uppercase font-semibold text-gray-400">Prerequisites</p>
                  <p className="text-xl font-bold text-gray-100">{plan.totalMovies}</p>
                </div>
                <div className="rounded-lg border border-surface-border bg-surface/80 p-3 text-center">
                  <p className="text-[10px] uppercase font-semibold text-gray-400">Completed</p>
                  <p className="text-xl font-bold text-emerald-400">
                    {plan.watchedCount} / {plan.totalMovies}
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1 rounded-lg border border-surface-border bg-surface/80 p-3 text-center">
                  <p className="text-[10px] uppercase font-semibold text-gray-400">Time Remaining</p>
                  <p className="text-xl font-bold text-amber-400">
                    {formatRuntime(plan.unwatchedRuntime)}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Progress Bar */}
            {plan.totalMovies > 0 && (
              <div className="mt-6 border-t border-surface-border/60 pt-4">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5 font-medium">
                  <span>Timeline Preparation Progress</span>
                  <span className="font-bold text-marvel-400">{progressPercentage}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-surface border border-surface-border">
                  <div
                    className="h-full bg-gradient-to-r from-marvel-600 to-amber-500 transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Empty Prerequisite Case */}
          {plan.totalMovies === 0 && (
            <div className="rounded-xl border border-surface-border bg-surface-card/40 p-12 text-center">
              <Film className="mx-auto h-12 w-12 text-gray-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-200">No Prerequisites Required</h3>
              <p className="mt-1 text-xs text-gray-400 max-w-md mx-auto">
                "{plan.target.title}" is a foundational entry with no prerequisite MCU movies. You can watch it directly without prior preparation!
              </p>
            </div>
          )}

          {/* Chronological Rewatch Order Timeline */}
          {plan.totalMovies > 0 && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                <Flame className="h-4 w-4 text-marvel-500" />
                <span>Watch In This Exact Topological Sequence ({plan.totalMovies} Movies)</span>
              </div>

              <div className="space-y-2.5">
                {plan.movies.map((movie, index) => {
                  return (
                    <div
                      key={movie.id}
                      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl border p-4 transition-all duration-200 ${
                        movie.watched
                          ? "border-emerald-950/60 bg-surface-card/50 opacity-80"
                          : "border-surface-border bg-surface-card hover:border-marvel-800/60"
                      }`}
                    >
                      <div className="flex items-start sm:items-center space-x-3">
                        {/* Step number badge */}
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                            movie.watched
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800/60"
                              : "bg-surface border border-surface-border text-gray-200"
                          }`}
                        >
                          {index + 1}
                        </div>

                        <div>
                          <h4
                            className={`text-base font-bold transition-colors ${
                              movie.watched
                                ? "text-gray-300 line-through decoration-emerald-500/50"
                                : "text-white"
                            }`}
                          >
                            {movie.title}
                          </h4>
                          <div className="flex items-center space-x-3 text-xs text-gray-400 mt-0.5">
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3 text-gray-500" />
                              <span>{movie.releaseYear}</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-gray-500" />
                              <span>{formatRuntime(movie.runtime)}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Watched Action Button */}
                      <div className="mt-3 sm:mt-0 flex items-center justify-end">
                        <button
                          onClick={() => toggleWatchedInPlan(movie.id, movie.watched)}
                          className={`flex items-center space-x-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                            movie.watched
                              ? "border-emerald-800/80 bg-emerald-950 text-emerald-300 hover:bg-emerald-900/80"
                              : "border-surface-border bg-surface text-gray-300 hover:border-marvel-700 hover:text-white"
                          }`}
                        >
                          {movie.watched ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                              <span>Marked Watched</span>
                            </>
                          ) : (
                            <>
                              <Circle className="h-4 w-4 text-gray-500" />
                              <span>Mark as Watched</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Final Target Destination Step */}
                <div className="flex items-center justify-between rounded-xl border border-marvel-700/60 bg-marvel-950/40 p-4 shadow-lg shadow-marvel-950/30">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-marvel-600 text-white font-black text-xs">
                      ★
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-marvel-400">
                        FINAL DESTINATION
                      </span>
                      <h4 className="text-base font-extrabold text-white">
                        {plan.target.title}
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-semibold text-marvel-300">
                    <span>Opening Night Ready</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
