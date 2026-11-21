"use client";

import { useState, useEffect, useCallback } from "react";
import { Cinema, CreateCinemaPayload } from "../types";
import { cinemaService } from "../services/cinema.service";

export function useCinemas() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCinemas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cinemaService.getAllCinemas();
      setCinemas(data);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || "Failed to load cinemas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCinemas();
  }, [fetchCinemas]);

  const addCinema = async (payload: CreateCinemaPayload) => {
    const newCinema = await cinemaService.createCinema(payload);
    setCinemas((prev) => [...prev, newCinema].sort((a, b) => a.name.localeCompare(b.name)));
    return newCinema;
  };

  return {
    cinemas,
    loading,
    error,
    refreshCinemas: fetchCinemas,
    addCinema,
  };
}
