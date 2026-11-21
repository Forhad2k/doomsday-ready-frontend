"use client";

import Link from "next/link";
import { useMovies } from "../hooks/useMovies";
import { useCinemas } from "../hooks/useCinemas";
import { StatCard } from "../components/StatCard";
import { Button } from "../components/Button";
import {
  Film,
  CheckCircle2,
  Clock,
  Building2,
  CalendarCheck2,
  Ticket,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export default function HomePage() {
  const { movies, loading: moviesLoading } = useMovies();
  const { cinemas, loading: cinemasLoading } = useCinemas();

  // Calculate live dynamic metrics from API data
  const totalMovies = movies.length;
  const watchedMovies = movies.filter((m) => m.watched).length;
  const unwatchedMovies = totalMovies - watchedMovies;
  const remainingRuntimeMins = movies
    .filter((m) => !m.watched)
    .reduce((sum, m) => sum + m.runtime, 0);

  const formatHoursMins = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}h ${minutes}m`;
  };

  const doomsdayMovie = movies.find((m) => m.title.includes("Doomsday"));

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-marvel-800/50 bg-gradient-to-br from-surface-card via-surface-card to-marvel-950/60 p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 rounded-full border border-marvel-700/60 bg-marvel-950/90 px-3.5 py-1 text-xs font-bold text-marvel-400 mb-4 shadow-sm">
            <ShieldAlert className="h-4 w-4 text-marvel-500" />
            <span>MCU MISSION BRIEFING • 2026</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl uppercase">
            DOOMSDAY <span className="text-marvel-500">READY</span>
          </h1>

          <p className="mt-3 text-lg font-medium text-gray-300 sm:text-xl">
            Your ultimate MCU countdown starts here.
          </p>

          <p className="mt-2 text-sm text-gray-400 max-w-xl">
            Prepare for the arrival of Victor Von Doom with custom graph topological sorting for prerequisite rewatching and dynamic programming seat bundle optimization for opening-night watch parties.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/rewatch">
              <Button size="lg" variant="primary" icon={<CalendarCheck2 className="h-5 w-5" />}>
                Build Rewatch Plan
              </Button>
            </Link>

            <Link href="/booking">
              <Button size="lg" variant="secondary" icon={<Ticket className="h-5 w-5" />}>
                Cinema Bundle Calculator
              </Button>
            </Link>

            <Link href="/movies">
              <Button size="lg" variant="outline" icon={<Film className="h-5 w-5" />}>
                Explore MCU Movies
              </Button>
            </Link>
          </div>
        </div>

        {/* Subtle decorative background element */}
        <div className="absolute -right-16 -top-16 h-96 w-96 rounded-full bg-marvel-600/10 blur-3xl pointer-events-none" />
      </div>

      {/* Live Statistics Section */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
          Live Operational Intelligence
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total MCU Movies"
            value={moviesLoading ? "..." : totalMovies}
            subtitle="Cataloged in timeline"
            icon={Film}
            variant="default"
          />
          <StatCard
            title="Watched Movies"
            value={moviesLoading ? "..." : watchedMovies}
            subtitle={`${unwatchedMovies} remaining to complete`}
            icon={CheckCircle2}
            variant="green"
          />
          <StatCard
            title="Watch Time Remaining"
            value={moviesLoading ? "..." : formatHoursMins(remainingRuntimeMins)}
            subtitle="Across incomplete titles"
            icon={Clock}
            variant="gold"
          />
          <StatCard
            title="Cinema Venues"
            value={cinemasLoading ? "..." : cinemas.length}
            subtitle="Configured bundle packages"
            icon={Building2}
            variant="cyan"
          />
        </div>
      </div>

      {/* Featured Avengers: Doomsday Countdown / Preparation Section */}
      <div className="rounded-xl border border-surface-border bg-surface-card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-doom-gold" />
              <h3 className="text-xl font-black text-white sm:text-2xl">
                Target Operation: Avengers: Doomsday
              </h3>
            </div>
            <p className="text-xs text-gray-400 max-w-2xl">
              Directed by Anthony and Joe Russo, starring Robert Downey Jr. as Victor Von Doom. Make sure your timeline knowledge is complete before opening night.
            </p>
          </div>

          <div className="shrink-0">
            {doomsdayMovie ? (
              <Link href={`/rewatch`}>
                <Button variant="primary" size="md" icon={<ArrowRight className="h-4 w-4" />}>
                  Inspect Doomsday Plan
                </Button>
              </Link>
            ) : (
              <Link href="/movies">
                <Button variant="secondary" size="md">
                  View Catalog
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/movies"
          className="group rounded-xl border border-surface-border bg-surface-card p-6 transition-all duration-300 hover:border-marvel-800/60 hover:shadow-lg hover:shadow-marvel-950/20"
        >
          <div className="rounded-lg bg-surface border border-surface-border w-10 h-10 flex items-center justify-center text-marvel-400 mb-4 group-hover:bg-marvel-950 transition-colors">
            <Film className="h-5 w-5" />
          </div>
          <h4 className="text-lg font-bold text-white group-hover:text-marvel-400 transition-colors">
            MCU Movie Library
          </h4>
          <p className="text-xs text-gray-400 mt-2">
            Browse, search, edit, and manage all MCU movies and prerequisite dependencies with real-time cycle validation.
          </p>
          <div className="mt-4 flex items-center text-xs font-semibold text-marvel-400">
            <span>Open Library</span>
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        <Link
          href="/rewatch"
          className="group rounded-xl border border-surface-border bg-surface-card p-6 transition-all duration-300 hover:border-marvel-800/60 hover:shadow-lg hover:shadow-marvel-950/20"
        >
          <div className="rounded-lg bg-surface border border-surface-border w-10 h-10 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-950 transition-colors">
            <CalendarCheck2 className="h-5 w-5" />
          </div>
          <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
            Topological Rewatch
          </h4>
          <p className="text-xs text-gray-400 mt-2">
            Select any target MCU film to generate a verified DAG topological rewatch order with runtime calculations.
          </p>
          <div className="mt-4 flex items-center text-xs font-semibold text-amber-400">
            <span>Plan Rewatch</span>
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        <Link
          href="/booking"
          className="group rounded-xl border border-surface-border bg-surface-card p-6 transition-all duration-300 hover:border-marvel-800/60 hover:shadow-lg hover:shadow-marvel-950/20"
        >
          <div className="rounded-lg bg-surface border border-surface-border w-10 h-10 flex items-center justify-center text-cyan-400 mb-4 group-hover:bg-cyan-950 transition-colors">
            <Ticket className="h-5 w-5" />
          </div>
          <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
            Cinema Seat Optimizer
          </h4>
          <p className="text-xs text-gray-400 mt-2">
            Unbounded coin-change dynamic programming to calculate exact minimum ticket bundles with zero wasted seats.
          </p>
          <div className="mt-4 flex items-center text-xs font-semibold text-cyan-400">
            <span>Calculate Bundles</span>
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}
