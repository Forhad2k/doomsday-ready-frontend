"use client";

import React, { useState, useEffect } from "react";
import { Movie, CreateMoviePayload, UpdateMoviePayload } from "../../types";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { AlertCircle } from "lucide-react";

interface MovieFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateMoviePayload | UpdateMoviePayload) => Promise<void>;
  movieToEdit?: Movie | null;
  allMovies: Movie[];
}

export function MovieFormModal({
  isOpen,
  onClose,
  onSubmit,
  movieToEdit,
  allMovies,
}: MovieFormModalProps) {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState<number>(2024);
  const [runtime, setRuntime] = useState<number>(120);
  const [watched, setWatched] = useState<boolean>(false);
  const [selectedPrereqs, setSelectedPrereqs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (movieToEdit) {
      setTitle(movieToEdit.title);
      setReleaseYear(movieToEdit.releaseYear);
      setRuntime(movieToEdit.runtime);
      setWatched(movieToEdit.watched);
      setSelectedPrereqs(movieToEdit.prerequisites || []);
    } else {
      setTitle("");
      setReleaseYear(new Date().getFullYear());
      setRuntime(120);
      setWatched(false);
      setSelectedPrereqs([]);
    }
    setErrorMessage(null);
  }, [movieToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage("Movie title is required.");
      return;
    }
    if (releaseYear <= 1900 || !Number.isInteger(releaseYear)) {
      setErrorMessage("Please enter a valid release year.");
      return;
    }
    if (runtime < 1 || runtime > 300 || !Number.isInteger(runtime)) {
      setErrorMessage("Runtime must be between 1 and 300 minutes.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        title: title.trim(),
        releaseYear: Number(releaseYear),
        runtime: Number(runtime),
        watched,
        prerequisites: selectedPrereqs,
      };
      await onSubmit(payload);
      onClose();
    } catch (err: unknown) {
      const e = err as Error & { code?: string };
      if (e.code === "CIRCULAR_DEPENDENCY") {
        setErrorMessage("Circular dependency detected: a movie cannot depend on a film that already depends on it.");
      } else {
        setErrorMessage(e.message || "Failed to save movie.");
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePrereq = (id: string) => {
    setSelectedPrereqs((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Exclude current movie from prerequisite choices to avoid direct self-dependency in UI
  const availablePrereqs = allMovies.filter(
    (m) => !movieToEdit || m.id !== movieToEdit.id
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={movieToEdit ? "Edit MCU Movie" : "Add New MCU Movie"}
      description="Configure movie details and timeline prerequisite relationships."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="flex items-center space-x-2 rounded-lg border border-rose-800/60 bg-rose-950/60 p-3 text-xs text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
            Movie Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Captain America: Brave New World"
            className="w-full rounded-lg border border-surface-border bg-surface px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-marvel-500 focus:outline-none focus:ring-1 focus:ring-marvel-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
              Release Year *
            </label>
            <input
              type="number"
              value={releaseYear}
              onChange={(e) => setReleaseYear(parseInt(e.target.value, 10) || 0)}
              min={1900}
              max={2100}
              className="w-full rounded-lg border border-surface-border bg-surface px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-marvel-500 focus:outline-none focus:ring-1 focus:ring-marvel-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
              Runtime (Minutes, 1-300) *
            </label>
            <input
              type="number"
              value={runtime}
              onChange={(e) => setRuntime(parseInt(e.target.value, 10) || 0)}
              min={1}
              max={300}
              className="w-full rounded-lg border border-surface-border bg-surface px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-marvel-500 focus:outline-none focus:ring-1 focus:ring-marvel-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 rounded-lg border border-surface-border bg-surface/60 p-3">
          <input
            type="checkbox"
            id="watched"
            checked={watched}
            onChange={(e) => setWatched(e.target.checked)}
            className="h-4 w-4 rounded border-gray-700 bg-surface text-marvel-600 focus:ring-marvel-500 cursor-pointer"
          />
          <label htmlFor="watched" className="text-xs font-medium text-gray-200 cursor-pointer">
            Mark this movie as already watched
          </label>
        </div>

        {/* Prerequisites Multi-select */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
            Prerequisites (Must watch before this movie)
          </label>
          <div className="max-h-48 overflow-y-auto space-y-1 rounded-lg border border-surface-border bg-surface p-2.5">
            {availablePrereqs.length === 0 ? (
              <p className="text-xs text-gray-500 italic p-1">No other movies available.</p>
            ) : (
              availablePrereqs.map((m) => {
                const isSelected = selectedPrereqs.includes(m.id);
                return (
                  <div
                    key={m.id}
                    onClick={() => togglePrereq(m.id)}
                    className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-marvel-950/80 text-marvel-300 border border-marvel-800/60"
                        : "text-gray-300 hover:bg-surface-card"
                    }`}
                  >
                    <span>{m.title} ({m.releaseYear})</span>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="h-3.5 w-3.5 rounded border-gray-700 bg-surface text-marvel-600 pointer-events-none"
                    />
                  </div>
                );
              })
            )}
          </div>
          <p className="mt-1 text-[11px] text-gray-400">
            Selected: {selectedPrereqs.length} prerequisite(s)
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-3 border-t border-surface-border/60">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            {movieToEdit ? "Update Movie" : "Add Movie"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
