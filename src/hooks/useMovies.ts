"use client";

import { useState, useEffect, useCallback } from "react";
import { Movie, CreateMoviePayload, UpdateMoviePayload } from "../types";
import { movieService } from "../services/movie.service";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await movieService.getAllMovies();
      setMovies(data);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || "Failed to load movies");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const addMovie = async (payload: CreateMoviePayload) => {
    const newMovie = await movieService.createMovie(payload);
    setMovies((prev) => [...prev, newMovie].sort((a, b) => a.releaseYear - b.releaseYear));
    return newMovie;
  };

  const updateMovie = async (id: string, payload: UpdateMoviePayload) => {
    const updated = await movieService.updateMovie(id, payload);
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? updated : m))
    );
    return updated;
  };

  const toggleWatched = async (id: string, currentWatched: boolean) => {
    return updateMovie(id, { watched: !currentWatched });
  };

  return {
    movies,
    loading,
    error,
    refreshMovies: fetchMovies,
    addMovie,
    updateMovie,
    toggleWatched,
  };
}
