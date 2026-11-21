"use client";

import { useMovies } from "../../hooks/useMovies";
import { RewatchTimeline } from "../../features/rewatch/RewatchTimeline";
import { CalendarCheck2, Loader2 } from "lucide-react";

export default function RewatchPage() {
  const { movies, loading, error } = useMovies();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-surface-border pb-6">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          <CalendarCheck2 className="h-4 w-4 text-amber-500" />
          <span>Timeline Sequencing Protocol</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Topological Rewatch Plan
        </h1>
        <p className="mt-1 text-sm text-gray-400 max-w-2xl">
          Select any destination MCU film to generate its full transitive prerequisite roadmap. Ordered by directed acyclic graph (DAG) topological sorting with total and unwatched runtime metrics.
        </p>
      </div>

      {/* Content */}
      {loading && (
        <div className="flex h-64 items-center justify-center rounded-xl border border-surface-border bg-surface-card">
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin text-marvel-500" />
            <span>Loading Marvel timeline prerequisites...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-rose-800/60 bg-rose-950/40 p-6 text-center text-sm text-rose-300">
          {error}
        </div>
      )}

      {!loading && movies.length > 0 && (
        <RewatchTimeline movies={movies} />
      )}
    </div>
  );
}
