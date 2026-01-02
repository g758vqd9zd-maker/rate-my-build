"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ReputationData {
  score: number;
  stars: string;
  totalGames: number;
  display: string;
  stats: {
    completed: number;
    noShows: number;
    lateArrivals: number;
    currentStreak: number;
    longestStreak: number;
  };
}

interface ReputationDisplayProps {
  userId: string;
  variant?: "compact" | "full" | "badge";
  showStats?: boolean;
}

export default function ReputationDisplay({
  userId,
  variant = "compact",
  showStats = false,
}: ReputationDisplayProps) {
  const [reputation, setReputation] = useState<ReputationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReputation() {
      try {
        setLoading(true);
        const response = await fetch(`/api/reputation/${userId}`);
        const data = await response.json();

        if (data.success) {
          setReputation(data.data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Failed to load reputation");
      } finally {
        setLoading(false);
      }
    }

    fetchReputation();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-zinc-500 text-sm">
        <div className="w-4 h-4 border-2 border-zinc-700 border-t-cyan-500 rounded-full animate-spin" />
        Loading...
      </div>
    );
  }

  if (error || !reputation) {
    return (
      <div className="text-zinc-500 text-sm">
        ⭐ {variant === "compact" ? "---" : "No reputation"}
      </div>
    );
  }

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-green-400";
    if (score >= 4.0) return "text-cyan-400";
    if (score >= 3.0) return "text-yellow-400";
    if (score >= 2.0) return "text-orange-400";
    return "text-red-400";
  };

  const scoreColor = getScoreColor(reputation.score);

  // COMPACT: Just score + games (for nav dropdown)
  if (variant === "compact") {
    return (
      <p className={`text-xs ${scoreColor}`}>
        ⭐ {reputation.score.toFixed(1)} ({reputation.totalGames} games)
      </p>
    );
  }

  // BADGE: Star rating + score (for profiles, LFG)
  if (variant === "badge") {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg"
      >
        <span className="text-sm">{reputation.stars}</span>
        <span className={`font-bold ${scoreColor}`}>
          {reputation.score.toFixed(1)}
        </span>
        <span className="text-xs text-zinc-500">
          ({reputation.totalGames})
        </span>
      </motion.div>
    );
  }

  // FULL: Complete stats display
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{reputation.stars}</span>
            <span className={`text-3xl font-black ${scoreColor}`}>
              {reputation.score.toFixed(1)}
            </span>
          </div>
          <p className="text-sm text-zinc-500">
            {reputation.totalGames} total sessions
          </p>
        </div>

        {/* Streak Badge */}
        {reputation.stats.currentStreak > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center gap-1 px-4 py-2 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-lg"
          >
            <span className="text-2xl">🔥</span>
            <span className="text-sm font-bold text-orange-400">
              {reputation.stats.currentStreak} Streak
            </span>
          </motion.div>
        )}
      </div>

      {/* Stats Grid */}
      {showStats && (
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {reputation.stats.completed}
            </p>
            <p className="text-xs text-zinc-500">Completed</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-orange-400">
              {reputation.stats.longestStreak}
            </p>
            <p className="text-xs text-zinc-500">Best Streak</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">
              {reputation.stats.noShows}
            </p>
            <p className="text-xs text-zinc-500">No-Shows</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">
              {reputation.stats.lateArrivals}
            </p>
            <p className="text-xs text-zinc-500">Late</p>
          </div>
        </div>
      )}

      {/* Reliability Indicator */}
      <div className="mt-4 pt-4 border-t border-zinc-800">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-zinc-500">Reliability</span>
          <span className={scoreColor}>
            {reputation.totalGames > 0
              ? Math.round(
                  ((reputation.stats.completed / reputation.totalGames) * 100)
                ).toFixed(0)
              : 0}
            %
          </span>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${
                reputation.totalGames > 0
                  ? (reputation.stats.completed / reputation.totalGames) * 100
                  : 0
              }%`,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-cyan-500 to-green-500"
          />
        </div>
      </div>
    </motion.div>
  );
}
