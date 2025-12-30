"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Flame,
  Trophy,
  Heart,
  ArrowLeft,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react";

// Mock builds data
const allBuilds = [
  { id: "build_001", title: "Shadow Assassin God Roll", game: "Destiny 2", characterClass: "Hunter", rating: 9, meta: "S-Tier", hearts: 1247, views: 8932, createdAt: "2024-12-20", author: "ShadowGod42" },
  { id: "build_002", title: "Aggressive Demon Hunter Meta", game: "World of Warcraft", characterClass: "Demon Hunter", rating: 8, meta: "Meta", hearts: 982, views: 6543, createdAt: "2024-12-21", author: "DemonSlayer" },
  { id: "build_003", title: "Laser Sniper Controller Setup", game: "Apex Legends", characterClass: "Pathfinder", rating: 9, meta: "S-Tier", hearts: 876, views: 5234, createdAt: "2024-12-22", author: "SniperElite" },
  { id: "build_004", title: "One-Shot Arc Build", game: "Path of Exile", characterClass: "Elementalist", rating: 8, meta: "Meta", hearts: 743, views: 4321, createdAt: "2024-12-19", author: "ArcMage" },
  { id: "build_005", title: "S-Tier Mythic+ Warlock", game: "WoW Dragonflight", characterClass: "Warlock", rating: 10, meta: "S-Tier", hearts: 1534, views: 12453, createdAt: "2024-12-23", author: "RaidLeader420" },
  { id: "build_006", title: "Perfect Raid Tank Paladin", game: "World of Warcraft", characterClass: "Paladin", rating: 10, meta: "S-Tier", hearts: 1321, views: 9876, createdAt: "2024-12-18", author: "TankMaster" },
  { id: "build_007", title: "Diamond Controller Legend", game: "Apex Legends", characterClass: "Wraith", rating: 9, meta: "S-Tier", hearts: 1098, views: 7654, createdAt: "2024-12-24", author: "ApexGod" },
  { id: "build_008", title: "Budget Necro Build", game: "Path of Exile", characterClass: "Necromancer", rating: 6, meta: "Off-Meta", hearts: 234, views: 1432, createdAt: "2024-12-17", author: "BudgetGamer" },
  { id: "build_009", title: "Pre-Nerf Hunter", game: "Destiny 2", characterClass: "Hunter", rating: 7, meta: "Off-Meta", hearts: 456, views: 2341, createdAt: "2024-12-16", author: "HunterMain" },
  { id: "build_010", title: "Tank DPS Hybrid", game: "WoW", characterClass: "Death Knight", rating: 5, meta: "Off-Meta", hearts: 123, views: 876, createdAt: "2024-12-15", author: "ExperimentalPlayer" },
  { id: "build_011", title: "Lightning Sorceress Endgame", game: "Path of Exile 2", characterClass: "Sorceress", rating: 9, meta: "S-Tier", hearts: 1876, views: 15432, createdAt: "2024-12-25", author: "MapRunner" },
  { id: "build_012", title: "Tanky Juggernaut", game: "Path of Exile 2", characterClass: "Juggernaut", rating: 8, meta: "Meta", hearts: 1234, views: 9876, createdAt: "2024-12-26", author: "BuildCrafter" },
];

const games = [
  "All Games",
  "Path of Exile 2",
  "Path of Exile",
  "Destiny 2",
  "World of Warcraft",
  "Apex Legends",
  "Diablo IV",
  "Last Epoch",
];

const metaTiers = ["All Tiers", "S-Tier", "Meta", "Off-Meta"];

const sortOptions = [
  { value: "trending", label: "🔥 Trending", icon: TrendingUp },
  { value: "top", label: "⭐ Top Rated", icon: Star },
  { value: "hearts", label: "❤️ Most Loved", icon: Heart },
  { value: "newest", label: "🕐 Newest", icon: Clock },
];

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState("All Games");
  const [selectedMeta, setSelectedMeta] = useState("All Tiers");
  const [sortBy, setSortBy] = useState("trending");
  const [filteredBuilds, setFilteredBuilds] = useState(allBuilds);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filtered = [...allBuilds];

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (build) =>
          build.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          build.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
          build.characterClass.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by game
    if (selectedGame !== "All Games") {
      filtered = filtered.filter((build) => build.game === selectedGame);
    }

    // Filter by meta tier
    if (selectedMeta !== "All Tiers") {
      filtered = filtered.filter((build) => build.meta === selectedMeta);
    }

    // Sort
    if (sortBy === "top") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "hearts") {
      filtered.sort((a, b) => b.hearts - a.hearts);
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "trending") {
      // Trending = combination of hearts, views, and recency
      filtered.sort((a, b) => {
        const scoreA = a.hearts * 2 + a.views * 0.1 + (new Date(a.createdAt).getTime() / 100000);
        const scoreB = b.hearts * 2 + b.views * 0.1 + (new Date(b.createdAt).getTime() / 100000);
        return scoreB - scoreA;
      });
    }

    setFilteredBuilds(filtered);
  }, [searchQuery, selectedGame, selectedMeta, sortBy]);

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
            <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Community Builds
            </h1>
            <p className="text-xl text-zinc-400">
              {filteredBuilds.length} builds from gamers worldwide
            </p>
          </motion.div>
        </div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 mb-8 backdrop-blur"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search builds, games, or classes..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 rounded-xl mb-4"
          >
            <Filter className="w-5 h-5" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Filters */}
          <div className={`${showFilters ? "block" : "hidden md:block"}`}>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Game Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-400">Game</label>
                <select
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                >
                  {games.map((game) => (
                    <option key={game} value={game}>
                      {game}
                    </option>
                  ))}
                </select>
              </div>

              {/* Meta Tier Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-400">Meta Tier</label>
                <select
                  value={selectedMeta}
                  onChange={(e) => setSelectedMeta(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                >
                  {metaTiers.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-400">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedGame !== "All Games" || selectedMeta !== "All Tiers" || searchQuery) && (
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-sm text-zinc-400">Active filters:</span>
                {selectedGame !== "All Games" && (
                  <span className="px-3 py-1 bg-cyan-600/20 text-cyan-400 rounded-full text-sm border border-cyan-600/50">
                    {selectedGame}
                  </span>
                )}
                {selectedMeta !== "All Tiers" && (
                  <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm border border-purple-600/50">
                    {selectedMeta}
                  </span>
                )}
                {searchQuery && (
                  <span className="px-3 py-1 bg-pink-600/20 text-pink-400 rounded-full text-sm border border-pink-600/50">
                    "{searchQuery}"
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedGame("All Games");
                    setSelectedMeta("All Tiers");
                    setSearchQuery("");
                  }}
                  className="px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full text-sm hover:bg-zinc-700 transition"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {filteredBuilds.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">😢</div>
              <h2 className="text-2xl font-bold mb-2">No builds found</h2>
              <p className="text-zinc-400 mb-6">Try adjusting your filters or search query</p>
              <button
                onClick={() => {
                  setSelectedGame("All Games");
                  setSelectedMeta("All Tiers");
                  setSearchQuery("");
                }}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold transition"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredBuilds.map((build, index) => (
                <motion.div
                  key={build.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden hover:border-cyan-400 transition-all duration-300 h-full flex flex-col"
                >
                  {/* Build Content - Clickable */}
                  <Link href={`/build/${build.id}`} className="flex-1 p-6">
                    <div className="h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          build.meta === "S-Tier"
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                            : build.meta === "Meta"
                            ? "bg-green-500/20 text-green-400 border border-green-500/50"
                            : "bg-zinc-500/20 text-zinc-400 border border-zinc-500/50"
                        }`}>
                          {build.meta}
                        </span>

                        {/* Rating Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded-full">
                          <Trophy className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-semibold">{build.rating}/10</span>
                          <span className="text-xs text-cyan-400">{build.meta}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition truncate">
                        {build.title}
                      </h3>

                      {/* Meta Info */}
                      <div className="text-sm text-zinc-400 mb-4 flex-1">
                        <p>{build.game}</p>
                        <p>{build.characterClass}</p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm border-t border-zinc-800 pt-4">
                        <span className="flex items-center gap-1 text-pink-400">
                          <Heart className="w-4 h-4" />
                          {build.hearts}
                        </span>
                        <span className="text-zinc-500">{build.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  </Link>

                  {/* Author Section - Separate clickable area */}
                  <Link
                    href={`/profile/${build.author || 'ShadowGod42'}`}
                    className="px-6 py-3 border-t border-zinc-800 hover:bg-zinc-800/50 transition flex items-center gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Author Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-sm">
                      {(build.author || 'S')[0]}
                    </div>

                    {/* Author Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-zinc-300 truncate">
                        {build.author || 'ShadowGod42'}
                      </p>
                      <p className="text-xs text-zinc-500">View Profile →</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
    </>
  );
}