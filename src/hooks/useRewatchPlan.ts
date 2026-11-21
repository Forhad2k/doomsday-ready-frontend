"use client";

import { useState, useEffect, useCallback } from "react";
import { RewatchPlanData } from "../types";
import { movieService } from "../services/movie.service";

export function useRewatchPlan(targetMovieId?: string) {
  const [plan, setPlan] = useState<RewatchPlanData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlan = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await movieService.getRewatchOrder(id);
      setPlan(data);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || "Failed to load rewatch plan");
      setPlan(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (targetMovieId) {
      fetchPlan(targetMovieId);
    } else {
      setPlan(null);
    }
  }, [targetMovieId, fetchPlan]);

  const toggleWatchedInPlan = async (movieId: string, currentWatched: boolean) => {
    await movieService.updateMovie(movieId, { watched: !currentWatched });
    if (targetMovieId) {
      await fetchPlan(targetMovieId);
    }
  };

  return {
    plan,
    loading,
    error,
    refreshPlan: () => (targetMovieId ? fetchPlan(targetMovieId) : Promise.resolve()),
    toggleWatchedInPlan,
  };
}
