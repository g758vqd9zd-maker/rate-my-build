"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/app/components/Navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Trophy,
  Flame,
  TrendingUp,
  Crown,
  Medal,
  Award,
  Star,
  Heart,
  Eye,
} from "lucide-react";

// Mock leaderboard data
const topBuilds = [
  { id: "build_005", rank: 1, title: "S-Tier Mythic+ Warlock", game: "World of Warcraft", author: "RaidLeader420", rating: 10, hearts: 1534, views: 12453, trend: "up" },
  { id: "build_011", rank: 2, title: "Lightning Sorceress Endgame", game: "Path of Exile 2", author: "MapRunner", rating: 9, hearts: 1876, views: 15432, trend: "up" },
  { id: "build_006", rank: 3, title: "Perfect Raid Tank Paladin", game: "World of Warcraft", author: "TankMaster", rating: 10, hearts: 1321, views: 9876, trend: "same" },
  { id: "build_001", rank: 4, title: "Shadow Assassin God Roll", game: "Destiny 2", author: "ShadowGod42", rating: 9, hearts: 1247, views: 8932, trend: "down" },
  { id: "build_012", rank: 5, title: "Tanky Juggernaut", game: "Path of Exile 2", author: "BuildCrafter", rating: 8, hearts: 1234, views: 9876, trend: "up" },
  { id: "build_007", rank: 6, title: "Diamond Controller Legend", game: "Apex Legends", author: "ApexGod", rating: 9, hearts: 1098, views: 7654, trend: "same" },
  { id: "build_002", rank: 7, title: "Aggressive Demon Hunter Meta", game: "World of Warcraft", author: "DemonSlayer", rating: 8, hearts: 982, views: 6543, trend: "up" },
  { id: "build_003", rank: 8, title: "Laser Sniper Controller Setup", game: "Apex Legends", author: "SniperElite", rating: 9, hearts: 876, views: 5234, trend: "down" },
  { id: "build_004", rank: 9, title: "One-Shot Arc Build", game: "Path of Exile", author: "ArcMage", rating: 8, hearts: 743, views: 4321, trend: "same" },
  { id: "build_009", rank: 10, title: "Pre-Nerf Hunter", game: "Destiny 2", author: "HunterMain", rating: 7, hearts: 456, views: 2341, trend: "down" },
];

const topPlayers = [
  { rank: 1, username: "RaidLeader420", builds: 12, avgRating: 9.2, totalHearts: 8432, totalViews: 45231, badge: "Legend" },
  { rank: 2, username: "MapRunner", builds: 8, avgRating: 9.0, totalHearts: 7234, totalViews: 38765, badge: "Master" },
  { rank: 3, username: "ShadowGod42", builds: 15, avgRating: 8.5, totalHearts: 6543, totalViews: 32456, badge: "Master" },
  { rank: 4, username: "BuildCrafter", builds: 20, avgRating: 8.3, totalHearts: 5876, totalViews: 28934, badge: "Expert" },
  { rank: 5, username: "ApexGod", builds: 6, avgRating: 8.8, totalHearts: 4567, totalViews: 25123, badge: "Expert" },
  { rank: 6, username: "DemonSlayer", builds: 10, avgRating: 8.1, totalHearts: 4123, totalViews: 21456, badge: "Expert" },
  { rank: 7, username: "TankMaster", builds: 7, avgRating: 8.6, totalHearts: 3876, totalViews: 19234, badge: "Pro" },
  { rank: 8, username: "SniperElite", builds: 9, avgRating: 7.9, totalHearts: 3234, totalViews: 17654, badge: "Pro" },
  { rank: 9, username: "ArcMage", builds: 11, avgRating: 7.8, totalHearts: 2987, totalViews: 15432, badge: "Pro" },
  { rank: 10, username: "HunterMain", builds: 14, avgRating: 7.5, totalHearts: 2654, totalViews: 13876, badge: "Rising" },
];

const trendingThisWeek = [
  { id: "build_011", title: "Lightning Sorceress Endgame", game: "Path of Exile 2", author: "MapRunner", rating: 9, hearts: 876, change: "+245%" },
  { id: "build_012", title: "Tanky Juggernaut", game: "Path of Exile 2", author: "BuildCrafter", rating: 8, hearts: 654, change: "+189%" },
  { id: "build_007", title: "Diamond Controller Legend", game: "Apex Legends", author: "ApexGod", rating: 9, hearts: 543, change: "+156%" },
  { id: "build_002", title: "Aggressive Demon Hunter Meta", game: "World of Warcraft", author: "DemonSlayer", rating: 8, hearts: 432, change: "+134%" },
  { id: "build_005", title: "S-Tier Mythic+ Warlock", game: "World of Warcraft", author: "RaidLeader420", rating: 10, hearts: 389, change: "+112%" },
];

const tabs = ["Top Builds", "Top Players", "Trending This Week"];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("Top Builds");

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-400" />;
    return <span className="text-xl font-bold text-zinc-500">#{rank}</span>;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-5 h-5 text-green-400" />;
    if (trend === "down") return <TrendingUp className="w-5 h-5 text-red-400 rotate-180" />;
    return <span className="text-zinc-600">—</span>;
  };

  const getBadgeColor = (badge: string) => {
    const colors: Record<string, string> = {
      Legend: "bg-gradient-to-r from-yellow-500 to-orange-500 text-black",
      Master: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
      Expert: "bg-gradient-to-r from-cyan-600 to-blue-600 text-white",
      Pro: "bg-gradient-to-r from-green-600 to-emerald-600 text-white",
      Rising: "bg-gradient-to-r from-zinc-600 to-zinc-500 text-white",
    };
    return colors[badge] || colors.Rising;
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Trophy className="w-12 h-12 text-yellow-400" />
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Leaderboard
              </h1>
            </div>
            <p className="text-xl text-zinc-400">
              The best builds and players in the community
            </p>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden ${
                activeTab === tab
                  ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-black shadow-2xl shadow-yellow-500/60"
                  : "bg-zinc-900/80 border border-zinc-800 hover:border-yellow-400 backdrop-blur"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeLeaderboardTab"
                  className="absolute inset-0 bg-white/20"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* TOP BUILDS */}
          {activeTab === "Top Builds" && (
            <motion.div
              key="top-builds"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Top 3 Podium */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {topBuilds.slice(0, 3).map((build, index) => (
                  <Link key={build.id} href={`/build/${build.id}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative group ${
                        index === 0 ? "md:order-2" : index === 1 ? "md:order-1" : "md:order-3"
                      }`}
                    >
                      <div
                        className={`bg-gradient-to-br rounded-2xl p-6 border-2 transition-all hover:scale-105 ${
                          index === 0
                            ? "from-yellow-900/40 to-orange-900/40 border-yellow-500/50 shadow-2xl shadow-yellow-500/20"
                            : index === 1
                            ? "from-gray-800/40 to-gray-900/40 border-gray-400/50 mt-8"
                            : "from-orange-900/40 to-red-900/40 border-orange-500/50 mt-8"
                        }`}
                      >
                        {/* Rank Badge */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl ${
                              index === 0
                                ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                                : index === 1
                                ? "bg-gradient-to-br from-gray-300 to-gray-500"
                                : "bg-gradient-to-br from-orange-400 to-orange-600"
                            }`}
                          >
                            {getRankIcon(build.rank)}
                          </div>
                        </div>

                        <div className="mt-8 text-center">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition">
                            {build.title}
                          </h3>
                          <p className="text-sm text-zinc-400 mb-4">{build.game}</p>
                          <div className="flex items-center justify-center gap-4 mb-3">
                            <div className="flex items-center gap-1">
                              <Trophy className="w-5 h-5 text-cyan-400" />
                              <span className="text-cyan-400 font-bold text-lg">{build.rating}/10</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-5 h-5 text-pink-400" />
                              <span className="font-semibold">{build.hearts}</span>
                            </div>
                          </div>
                          <div className="text-sm text-zinc-500">by {build.author}</div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Rest of Top Builds */}
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden">
                {topBuilds.slice(3).map((build, index) => (
                  <Link key={build.id} href={`/build/${build.id}`}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-6 p-6 border-b border-zinc-800 last:border-b-0 hover:bg-zinc-800/50 transition group"
                    >
                      {/* Rank */}
                      <div className="w-16 flex items-center justify-center">
                        {getRankIcon(build.rank)}
                      </div>

                      {/* Build Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold mb-1 group-hover:text-yellow-400 transition truncate">
                          {build.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-zinc-400">
                          <span>{build.game}</span>
                          <span>•</span>
                          <span>by {build.author}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-cyan-400" />
                          <span className="font-bold text-cyan-400">{build.rating}/10</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-pink-400" />
                          <span className="font-semibold">{build.hearts}</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500">
                          <Eye className="w-5 h-5" />
                          <span>{build.views.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Trend */}
                      <div className="w-12 flex justify-center">
                        {getTrendIcon(build.trend)}
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* TOP PLAYERS */}
          {activeTab === "Top Players" && (
            <motion.div
              key="top-players"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Top 3 Players Podium */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {topPlayers.slice(0, 3).map((player, index) => (
                  <motion.div
                    key={player.username}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative ${
                      index === 0 ? "md:order-2" : index === 1 ? "md:order-1" : "md:order-3"
                    }`}
                  >
                    <div
                      className={`bg-gradient-to-br rounded-2xl p-6 border-2 transition-all hover:scale-105 ${
                        index === 0
                          ? "from-yellow-900/40 to-orange-900/40 border-yellow-500/50 shadow-2xl shadow-yellow-500/20"
                          : index === 1
                          ? "from-gray-800/40 to-gray-900/40 border-gray-400/50 mt-8"
                          : "from-orange-900/40 to-red-900/40 border-orange-500/50 mt-8"
                      }`}
                    >
                      {/* Rank Badge */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl ${
                            index === 0
                              ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                              : index === 1
                              ? "bg-gradient-to-br from-gray-300 to-gray-500"
                              : "bg-gradient-to-br from-orange-400 to-orange-600"
                          }`}
                        >
                          {getRankIcon(player.rank)}
                        </div>
                      </div>

                      <div className="mt-8 text-center">
                        {/* Avatar */}
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-3xl font-black">
                          {player.username[0]}
                        </div>

                        <h3 className="text-2xl font-bold mb-2">{player.username}</h3>
                        
                        {/* Badge */}
                        <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-4 ${getBadgeColor(player.badge)}`}>
                          {player.badge}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-black/30 rounded-lg p-3">
                            <div className="text-cyan-400 font-bold text-xl">{player.avgRating}</div>
                            <div className="text-zinc-400">Avg Rating</div>
                          </div>
                          <div className="bg-black/30 rounded-lg p-3">
                            <div className="text-pink-400 font-bold text-xl">{player.builds}</div>
                            <div className="text-zinc-400">Builds</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Rest of Top Players */}
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden">
                {topPlayers.slice(3).map((player, index) => (
                  <motion.div
                    key={player.username}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-6 p-6 border-b border-zinc-800 last:border-b-0 hover:bg-zinc-800/50 transition"
                  >
                    {/* Rank */}
                    <div className="w-16 flex items-center justify-center">
                      {getRankIcon(player.rank)}
                    </div>

                    {/* Player Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-lg">
                        {player.username[0]}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{player.username}</h3>
                        <div className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold ${getBadgeColor(player.badge)}`}>
                          {player.badge}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-8 text-sm">
                      <div className="text-center">
                        <div className="text-cyan-400 font-bold text-lg">{player.avgRating}</div>
                        <div className="text-zinc-500 text-xs">Avg</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg">{player.builds}</div>
                        <div className="text-zinc-500 text-xs">Builds</div>
                      </div>
                      <div className="text-center">
                        <div className="text-pink-400 font-bold text-lg">{player.totalHearts}</div>
                        <div className="text-zinc-500 text-xs">Hearts</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TRENDING THIS WEEK */}
          {activeTab === "Trending This Week" && (
            <motion.div
              key="trending"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden">
                {trendingThisWeek.map((build, index) => (
                  <Link key={build.id} href={`/build/${build.id}`}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-6 p-6 border-b border-zinc-800 last:border-b-0 hover:bg-zinc-800/50 transition group relative overflow-hidden"
                    >
                      {/* Trending Flames Background */}
                      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none" />
                      
                      {/* Rank with Flame */}
                      <div className="w-20 flex items-center justify-center relative z-10">
                        <div className="relative">
                          <Flame className="w-8 h-8 text-orange-500 absolute -top-1 -left-1 animate-pulse" />
                          <span className="text-2xl font-black relative z-10">#{index + 1}</span>
                        </div>
                      </div>

                      {/* Build Info */}
                      <div className="flex-1 min-w-0 relative z-10">
                        <h3 className="text-xl font-bold mb-1 group-hover:text-orange-400 transition truncate">
                          {build.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-zinc-400">
                          <span>{build.game}</span>
                          <span>•</span>
                          <span>by {build.author}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 relative z-10">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-cyan-400" />
                          <span className="font-bold text-cyan-400">{build.rating}/10</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-pink-400" />
                          <span className="font-semibold">{build.hearts}</span>
                        </div>
                      </div>

                      {/* Growth Badge */}
                      <div className="relative z-10">
                        <div className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-full font-bold text-sm flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          {build.change}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Trending Info Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-700/50 rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <Flame className="w-8 h-8 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-orange-400">What's Trending?</h3>
                    <p className="text-zinc-300 leading-relaxed">
                      These builds have seen the biggest growth in hearts and views over the past 7 days.
                      New patches, meta shifts, and community discoveries drive these trends. Jump in before everyone else does!
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
    </>
  );
}