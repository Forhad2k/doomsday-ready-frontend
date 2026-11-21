"use client";

import { useState, useCallback } from "react";
import { BookingQuoteData } from "../types";
import { cinemaService } from "../services/cinema.service";

export function useBookingQuote() {
  const [quote, setQuote] = useState<BookingQuoteData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const calculateQuote = useCallback(async (cinemaId: string, groupSize: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await cinemaService.getBookingQuote(cinemaId, groupSize);
      setQuote(data);
      return data;
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || "Failed to calculate booking quote");
      setQuote(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetQuote = () => {
    setQuote(null);
    setError(null);
  };

  return {
    quote,
    loading,
    error,
    calculateQuote,
    resetQuote,
  };
}
