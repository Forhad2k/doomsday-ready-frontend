"use client";

import React, { useState } from "react";
import { Movie } from "../../types";
import { Badge } from "../../components/Badge";
import { Clock, Calendar, CheckCircle2, Circle, Edit3, Link2 } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  allMovies: Movie[];
  onToggleWatched: (id: string, current: boolean) => Promise<void>;
  onEdit: (movie: Movie) => void;
}

export function MovieCard({
  movie,
  allMovies,
  onToggleWatched,
  onEdit,
}: MovieCardProps) {
  const [updating, setUpdating] = useState(false);

  const formatRuntime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setUpdating(true);
      await onToggleWatched(movie.id, movie.watched);
    } finally {
      setUpdating(false);
    }
  };

  // Find prerequisite titles for displaying badges
  const movieMap = new Map(allMovies.map((m) => [m.id, m.title]));
  const prereqTitles = movie.prerequisites.map((id) => movieMap.get(id) || id);

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-300 ${
        movie.watched
          ? "border-emerald-900/30 bg-surface-card/60 opacity-90 hover:border-emerald-700/50"
          : "border-surface-border bg-surface-card hover:border-marvel-800/60 hover:shadow-lg hover:shadow-marvel-950/20"
      }`}
    >
      <div>
        {/* Top row: Status Badge & Year */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleToggle}
            disabled={updating}
            className={`inline-flex items-center space-x-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
              movie.watched
                ? "border-emerald-800/60 bg-emerald-950/80 text-emerald-300 hover:bg-emerald-900/80"
                : "border-amber-800/60 bg-amber-950/80 text-amber-300 hover:bg-amber-900/80"
            }`}
          >
            {movie.watched ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Circle className="h-3.5 w-3.5 text-amber-400" />
            )}
            <span>{movie.watched ? "Watched" : "Unwatched"}</span>
          </button>

          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>{movie.releaseYear}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-lg font-bold text-gray-100 group-hover:text-marvel-400 transition-colors line-clamp-2">
          {movie.title}
        </h3>

        {/* Runtime */}
        <div className="mt-2 flex items-center space-x-1.5 text-xs text-gray-400">
          <Clock className="h-3.5 w-3.5 text-gray-500" />
          <span>{formatRuntime(movie.runtime)} ({movie.runtime} mins)</span>
        </div>

        {/* Prerequisites Section */}
        {prereqTitles.length > 0 && (
          <div className="mt-4 border-t border-surface-border/50 pt-3">
            <div className="flex items-center space-x-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              <Link2 className="h-3 w-3 text-marvel-500" />
              <span>Prerequisites ({prereqTitles.length})</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {prereqTitles.map((title, idx) => (
                <span
                  key={idx}
                  className="rounded-md border border-surface-border bg-surface px-2 py-0.5 text-[11px] text-gray-300"
                >
                  {title}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div className="mt-5 flex items-center justify-end border-t border-surface-border/60 pt-3">
        <button
          onClick={() => onEdit(movie)}
          className="flex items-center space-x-1.5 text-xs font-semibold text-gray-400 hover:text-marvel-400 transition-colors px-2 py-1 rounded hover:bg-surface"
        >
          <Edit3 className="h-3.5 w-3.5" />
          <span>Edit Details</span>
        </button>
      </div>
    </div>
  );
}
