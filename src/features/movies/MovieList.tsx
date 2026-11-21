"use client";

import React, { useState, useMemo } from "react";
import { Movie } from "../../types";
import { MovieCard } from "./MovieCard";
import { MovieFormModal } from "./MovieFormModal";
import { Button } from "../../components/Button";
import { Plus, Search, Filter, Film, RefreshCw } from "lucide-react";

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  onRefresh: () => Promise<void>;
  onAddMovie: (payload: any) => Promise<any>;
  onUpdateMovie: (id: string, payload: any) => Promise<any>;
  onToggleWatched: (id: string, current: boolean) => Promise<any>;
}

export function MovieList({
  movies,
  loading,
  error,
  onRefresh,
  onAddMovie,
  onUpdateMovie,
  onToggleWatched,
}: MovieListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "watched" | "unwatched">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const filteredMovies = useMemo(() => {
    return movies.filter((m) => {
      const matchesSearch = m.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "watched"
          ? m.watched
          : !m.watched;
      return matchesSearch && matchesStatus;
    });
  }, [movies, searchQuery, statusFilter]);

  const handleOpenAdd = () => {
    setEditingMovie(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (payload: any) => {
    if (editingMovie) {
      await onUpdateMovie(editingMovie.id, payload);
    } else {
      await onAddMovie(payload);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar: Search, Filter, Refresh, Add Movie */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center space-x-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search MCU movies by title..."
              className="w-full rounded-lg border border-surface-border bg-surface-card pl-9 pr-4 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-marvel-500 focus:outline-none focus:ring-1 focus:ring-marvel-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="hidden sm:flex items-center space-x-1 rounded-lg border border-surface-border bg-surface-card p-1">
            {(["all", "unwatched", "watched"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors ${
                  statusFilter === filter
                    ? "bg-marvel-950 text-marvel-400 border border-marvel-800/60"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="md"
            onClick={onRefresh}
            icon={<RefreshCw className="h-4 w-4" />}
          >
            Refresh
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={handleOpenAdd}
            icon={<Plus className="h-4 w-4" />}
          >
            Add Movie
          </Button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && movies.length === 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-xl border border-surface-border/60 bg-surface-card/50 p-5"
            />
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="rounded-xl border border-rose-800/50 bg-rose-950/30 p-6 text-center">
          <p className="text-sm font-semibold text-rose-300">{error}</p>
          <Button variant="outline" size="sm" onClick={onRefresh} className="mt-3">
            Try Again
          </Button>
        </div>
      )}

      {/* Movie Cards Grid */}
      {!loading && filteredMovies.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              allMovies={movies}
              onToggleWatched={onToggleWatched}
              onEdit={handleOpenEdit}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredMovies.length === 0 && (
        <div className="rounded-xl border border-surface-border bg-surface-card/40 p-12 text-center">
          <Film className="mx-auto h-12 w-12 text-gray-600 mb-3" />
          <h4 className="text-base font-bold text-gray-200">No MCU Movies Found</h4>
          <p className="mt-1 text-xs text-gray-400">
            {searchQuery
              ? `No movies match "${searchQuery}". Try a different search term.`
              : "No movies match the selected criteria."}
          </p>
          {searchQuery && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
              }}
              className="mt-4"
            >
              Reset Filters
            </Button>
          )}
        </div>
      )}

      {/* Add / Edit Modal */}
      <MovieFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        movieToEdit={editingMovie}
        allMovies={movies}
      />
    </div>
  );
}
