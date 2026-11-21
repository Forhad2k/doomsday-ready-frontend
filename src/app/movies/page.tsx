"use client";

import { useMovies } from "../../hooks/useMovies";
import { MovieList } from "../../features/movies/MovieList";
import { Film } from "lucide-react";

export default function MoviesPage() {
  const {
    movies,
    loading,
    error,
    refreshMovies,
    addMovie,
    updateMovie,
    toggleWatched,
  } = useMovies();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-surface-border pb-6">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-marvel-400 mb-1">
          <Film className="h-4 w-4 text-marvel-500" />
          <span>Marvel Cinematic Universe</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          MCU Movie Catalog
        </h1>
        <p className="mt-1 text-sm text-gray-400 max-w-2xl">
          Manage the full Marvel timeline. Track watched progress, adjust film runtimes, and maintain prerequisite dependencies. Circular dependency detection is enforced automatically.
        </p>
      </div>

      {/* Main Movie List Component */}
      <MovieList
        movies={movies}
        loading={loading}
        error={error}
        onRefresh={refreshMovies}
        onAddMovie={addMovie}
        onUpdateMovie={updateMovie}
        onToggleWatched={toggleWatched}
      />
    </div>
  );
}
