"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Plus,
  Filter,
  Search,
  Trophy,
  MapPin,
  Clock,
  X,
  Send,
} from "lucide-react";

// Mock LFG posts
const allPosts = [
  {
    id: "lfg_001",
    title: "LFM Mythic+ Push 3K+ IO – Keys Tonight",
    game: "World of Warcraft",
    platform: "PC",
    region: "NA East",
    content: "Mythic+ Dungeons",
    players: "3/5",
    currentPlayers: 3,
    maxPlayers: 5,
    hostName: "RaidLeader420",
    hostBuildId: "build_005",
    hostRating: 9,
    metaRequired: "Meta",
    description: "Pushing keys tonight, need DPS and healer. 3K+ IO required. Discord mandatory. Chill group but we're here to time keys.",
    createdAt: "2024-12-27T18:30:00",
    isActive: true,
  },
  {
    id: "lfg_002",
    title: "Ranked Squad NA East – Pred Grind Mic Req",
    game: "Apex Legends",
    platform: "PC",
    region: "NA East",
    content: "Ranked",
    players: "2/3",
    currentPlayers: 2,
    maxPlayers: 3,
    hostName: "ApexPredator",
    hostBuildId: "build_007",
    hostRating: 9,
    metaRequired: "S-Tier",
    description: "Diamond+ looking to hit Pred this split. Must have mic, good comms, and meta builds. No toxicity.",
    createdAt: "2024-12-27T19:00:00",
    isActive: true,
  },
  {
    id: "lfg_003",
    title: "Chill Raid Night – Learning Party Welcome",
    game: "Final Fantasy XIV",
    platform: "PC",
    region: "NA West",
    content: "Raids",
    players: "6/8",
    currentPlayers: 6,
    maxPlayers: 8,
    hostName: "FFXIVRaider",
    hostBuildId: "build_004",
    hostRating: 7,
    metaRequired: "Off-Meta",
    description: "Casual raid group learning new content. Newcomers welcome! We're patient and just want to have fun.",
    createdAt: "2024-12-27T17:00:00",
    isActive: true,
  },
  {
    id: "lfg_004",
    title: "Trials Flawless Run - Must Be Cracked",
    game: "Destiny 2",
    platform: "PS5",
    region: "NA",
    content: "Trials of Osiris",
    players: "2/3",
    currentPlayers: 2,
    maxPlayers: 3,
    hostName: "TrialsGod",
    hostBuildId: "build_001",
    hostRating: 10,
    metaRequired: "S-Tier",
    description: "Going for flawless. Must have 2.0+ KD and meta build. Checking stats.",
    createdAt: "2024-12-27T20:00:00",
    isActive: true,
  },
  {
    id: "lfg_005",
    title: "T17 Map Carries - Free for New Players",
    game: "Path of Exile 2",
    platform: "PC",
    region: "EU",
    content: "Endgame Maps",
    players: "1/6",
    currentPlayers: 1,
    maxPlayers: 6,
    hostName: "MapRunner",
    hostBuildId: "build_011",
    hostRating: 9,
    metaRequired: "Off-Meta",
    description: "Running T17s and carrying anyone who needs XP or loot. Free carries, just pick up your own drops.",
    createdAt: "2024-12-27T16:00:00",
    isActive: true,
  },
];

const games = ["All Games", "World of Warcraft", "Apex Legends", "Destiny 2", "Path of Exile 2", "Final Fantasy XIV"];
const platforms = ["All Platforms", "PC", "PS5", "Xbox", "Cross-Platform"];
const regions = ["All Regions", "NA East", "NA West", "EU", "Asia", "OCE"];
const metaFilters = ["All", "S-Tier", "Meta", "Off-Meta"];

export default function LFGPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState("All Games");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedMeta, setSelectedMeta] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filter posts
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGame = selectedGame === "All Games" || post.game === selectedGame;
    const matchesPlatform = selectedPlatform === "All Platforms" || post.platform === selectedPlatform;
    const matchesRegion = selectedRegion === "All Regions" || post.region === selectedRegion;
    const matchesMeta = selectedMeta === "All" || post.metaRequired === selectedMeta;

    return matchesSearch && matchesGame && matchesPlatform && matchesRegion && matchesMeta && post.isActive;
  });

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
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

          <div className="flex items-start justify-between flex-wrap gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                LFG Board
              </h1>
              <p className="text-xl text-zinc-400">
                {filteredPosts.length} active groups looking for players
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/50 transition"
            >
              <Plus className="w-5 h-5" />
              Create LFG Post
            </motion.button>
          </div>
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
              placeholder="Search for groups, games, or activities..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-green-500 transition"
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
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-400">Game</label>
                <select
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
                >
                  {games.map((game) => (
                    <option key={game} value={game}>
                      {game}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-400">Platform</label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
                >
                  {platforms.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-400">Region</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-400">Build Req.</label>
                <select
                  value={selectedMeta}
                  onChange={(e) => setSelectedMeta(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
                >
                  {metaFilters.map((meta) => (
                    <option key={meta} value={meta}>
                      {meta}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* LFG Posts */}
        <AnimatePresence mode="wait">
          {filteredPosts.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🎮</div>
              <h2 className="text-2xl font-bold mb-2">No active groups found</h2>
              <p className="text-zinc-400 mb-6">Try adjusting your filters or create your own group!</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl font-semibold transition"
              >
                Create LFG Post
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 hover:border-green-500/50 transition-all group"
                >
                  <div className="flex items-start gap-6 flex-wrap lg:flex-nowrap">
                    {/* Left: Main Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className="flex items-center gap-2 text-green-400 font-bold text-sm">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          LIVE
                        </span>
                        <span className="text-zinc-500 text-sm">{getTimeAgo(post.createdAt)}</span>
                        <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs font-semibold">
                          {post.game}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-green-400 transition">
                        {post.title}
                      </h3>

                      <p className="text-zinc-400 mb-4 line-clamp-2">{post.description}</p>

                      <div className="flex items-center gap-4 flex-wrap text-sm">
                        <span className="flex items-center gap-2 text-zinc-400">
                          <MapPin className="w-4 h-4" />
                          {post.region}
                        </span>
                        <span className="flex items-center gap-2 text-zinc-400">
                          <Clock className="w-4 h-4" />
                          {post.content}
                        </span>
                        <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs">
                          {post.platform}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            post.metaRequired === "S-Tier"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : post.metaRequired === "Meta"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-zinc-500/20 text-zinc-400"
                          }`}
                        >
                          {post.metaRequired} Required
                        </span>
                      </div>
                    </div>

                    {/* Right: Host & Join */}
                    <div className="flex flex-col items-end gap-4">
                      {/* Host Info */}
                      <Link href={`/build/${post.hostBuildId}`}>
                        <div className="text-right hover:text-cyan-400 transition">
                          <div className="text-sm text-zinc-500 mb-1">Host</div>
                          <div className="font-bold">{post.hostName}</div>
                          <div className="flex items-center gap-2 justify-end mt-1">
                            <Trophy className="w-4 h-4 text-cyan-400" />
                            <span className="text-cyan-400 font-semibold">{post.hostRating}/10</span>
                          </div>
                        </div>
                      </Link>

                      {/* Players Count */}
                      <div className="text-center">
                        <div className="flex items-center gap-2 text-zinc-400 mb-2">
                          <Users className="w-5 h-5" />
                          <span className="text-2xl font-bold text-white">
                            {post.currentPlayers}/{post.maxPlayers}
                          </span>
                        </div>
                        <div className="w-24 h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-cyan-500 transition-all"
                            style={{ width: `${(post.currentPlayers / post.maxPlayers) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Join Button */}
                      <Link href={`/lfg/${post.id}`} className="w-full">
                        <button className="w-full px-8 py-3 bg-green-600 hover:bg-green-500 rounded-xl font-bold transition flex items-center justify-center gap-2">
                          <Send className="w-5 h-5" />
                          Join Group
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Create LFG Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black">Create LFG Post</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. LFM Raid Group - Chill Vibes"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Game</label>
                    <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition">
                      <option>Select Game</option>
                      {games.slice(1).map((game) => (
                        <option key={game}>{game}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Platform</label>
                    <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition">
                      {platforms.slice(1).map((platform) => (
                        <option key={platform}>{platform}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Region</label>
                    <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition">
                      {regions.slice(1).map((region) => (
                        <option key={region}>{region}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Group Size</label>
                    <input
                      type="number"
                      min="2"
                      max="40"
                      defaultValue="5"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Build Requirement</label>
                  <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition">
                    <option>Any Build Welcome</option>
                    <option>Meta Builds Preferred</option>
                    <option>S-Tier Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe what you're looking for, expectations, etc..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition resize-none"
                  />
                </div>

                <div className="bg-cyan-900/20 border border-cyan-700/50 rounded-xl p-4">
                  <p className="text-sm text-cyan-300">
                    💡 <strong>Tip:</strong> Your build rating will be shown to potential teammates. Make sure your build is rated first!
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-semibold transition"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 rounded-xl font-bold transition">
                    Create Post
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}