"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navigation from "@/app/components/Navigation";
import { motion } from "framer-motion";
import {
  Trophy,
  Heart,
  Eye,
  Calendar,
  Shield,
  Star,
  Users,
  Gamepad2,
  Clock,
  MessageCircle,
  Settings,
  Flag,
  Mic,
  MicOff,
  Zap,
  Award,
} from "lucide-react";

// Mock user data - will come from database later
const mockUserData: Record<string, any> = {
  ShadowGod42: {
    username: "ShadowGod42",
    discordId: "123456789",
    discordTag: "ShadowGod#4242",
    avatar: null,
    joinedAt: "2024-11-15",
    reputation: 4.8,
    totalGamesPlayed: 234,
    completionRate: 94,

    // Profile fields
    mainGames: ["Destiny 2", "Apex Legends", "Call of Duty"],
    playSchedule: {
      timezone: "EST",
      days: ["Monday", "Tuesday", "Thursday", "Friday"],
      hours: "7pm - 11pm",
    },
    preferredRoles: ["DPS", "Support"],
    intentTags: ["Competitive", "Tryhard", "Mic Required"],
    micPreference: "required",
    bio: "Competitive FPS player looking for serious squads. I main Hunter in D2 and Wraith in Apex. Let's get some Ws.",

    // Badges
    badges: [
      { id: "verified", name: "Verified Gamer", icon: "🛡️", rarity: "common" },
      { id: "s-tier", name: "S-Tier Builder", icon: "🏆", rarity: "uncommon" },
      { id: "team-player", name: "Team Player", icon: "🤝", rarity: "common" },
      { id: "reliable", name: "Reliable", icon: "⭐", rarity: "uncommon" },
      { id: "veteran", name: "Veteran", icon: "🎖️", rarity: "rare" },
    ],

    // Featured badges (user selected)
    featuredBadges: ["s-tier", "reliable", "veteran", "verified", "team-player"],

    // Submitted builds
    builds: [
      { id: "build_001", title: "Shadow Assassin God Roll", game: "Destiny 2", rating: 9, meta: "S-Tier", hearts: 1247, views: 8932, isPublic: true, createdAt: "2024-12-20" },
      { id: "build_013", title: "Aggressive Wraith Movement", game: "Apex Legends", rating: 8, meta: "Meta", hearts: 543, views: 3421, isPublic: true, createdAt: "2024-12-18" },
      { id: "build_014", title: "SMG Rush Build", game: "Call of Duty", rating: 7, meta: "Off-Meta", hearts: 234, views: 1543, isPublic: true, createdAt: "2024-12-15" },
    ],

    // Stats
    stats: {
      totalBuilds: 12,
      avgRating: 8.5,
      totalHearts: 3456,
      totalViews: 21543,
      groupsJoined: 47,
      groupsHosted: 12,
      successRate: 94,
    },

    isVerified: true,
  },
};

export default function ProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const [activeTab, setActiveTab] = useState("Builds");

  // Get user data
  const user = mockUserData[username] || mockUserData["ShadowGod42"];

  // Check if viewing own profile (mock - will use auth later)
  const isOwnProfile = false; // Change to true to see edit buttons

  const getBadgeColor = (rarity: string) => {
    const colors: Record<string, string> = {
      common: "text-zinc-400",
      uncommon: "text-blue-400",
      rare: "text-purple-400",
      legendary: "text-yellow-400",
    };
    return colors[rarity] || colors.common;
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-8 mb-8 backdrop-blur"
          >
            <div className="flex items-start justify-between flex-wrap gap-6">
              {/* Left: Avatar + Info */}
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="relative">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-24 h-24 rounded-2xl"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-4xl font-black">
                      {user.username[0]}
                    </div>
                  )}
                  {user.isVerified && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center border-2 border-zinc-900">
                      <Shield className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-black">{user.username}</h1>
                    {user.isVerified && (
                      <span className="px-3 py-1 bg-cyan-600/20 text-cyan-400 rounded-lg text-sm font-bold border border-cyan-600/50 flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-zinc-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <span>•</span>
                    <span className="text-zinc-500">{user.discordTag}</span>
                  </div>

                  {/* Reputation */}
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-2xl font-bold text-yellow-400">{user.reputation}</span>
                      <span className="text-zinc-500">Reputation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-400" />
                      <span className="text-xl font-bold">{user.totalGamesPlayed}</span>
                      <span className="text-zinc-500">Games</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-cyan-400" />
                      <span className="text-xl font-bold">{user.completionRate}%</span>
                      <span className="text-zinc-500">Success</span>
                    </div>
                  </div>

                  {/* Bio */}
                  {user.bio && (
                    <p className="text-zinc-300 max-w-2xl leading-relaxed">{user.bio}</p>
                  )}
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex flex-col gap-3">
                {isOwnProfile ? (
                  <Link
                    href="/profile/edit"
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-semibold transition"
                  >
                    <Settings className="w-5 h-5" />
                    Edit Profile
                  </Link>
                ) : (
                  <>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition">
                      <MessageCircle className="w-5 h-5" />
                      Message on Discord
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl font-bold transition">
                      <Users className="w-5 h-5" />
                      Invite to Group
                    </button>
                    <button className="px-4 py-3 text-zinc-400 hover:text-red-400 transition text-sm flex items-center gap-2">
                      <Flag className="w-4 h-4" />
                      Report
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Profile Details Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-zinc-800">
              {/* Main Games */}
              <div>
                <h3 className="text-sm font-bold text-zinc-400 mb-3 flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4" />
                  MAIN GAMES
                </h3>
                <div className="space-y-2">
                  {user.mainGames.map((game: string, i: number) => (
                    <div key={i} className="px-3 py-2 bg-zinc-800 rounded-lg text-sm font-semibold">
                      {game}
                    </div>
                  ))}
                </div>
              </div>

              {/* Play Schedule */}
              <div>
                <h3 className="text-sm font-bold text-zinc-400 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  PLAY SCHEDULE
                </h3>
                <div className="text-sm">
                  <p className="mb-2 font-semibold">{user.playSchedule.hours}</p>
                  <p className="text-zinc-500">{user.playSchedule.timezone}</p>
                  <p className="text-zinc-500 mt-1">{user.playSchedule.days.join(", ")}</p>
                </div>
              </div>

              {/* Preferred Roles */}
              <div>
                <h3 className="text-sm font-bold text-zinc-400 mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  PREFERRED ROLES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.preferredRoles.map((role: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-cyan-600/20 text-cyan-400 rounded-lg text-sm font-bold border border-cyan-600/50"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Intent Tags */}
              <div>
                <h3 className="text-sm font-bold text-zinc-400 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  PLAYSTYLE
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.intentTags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-lg text-sm font-bold border border-purple-600/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  {user.micPreference === "required" ? (
                    <>
                      <Mic className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Mic Required</span>
                    </>
                  ) : (
                    <>
                      <MicOff className="w-4 h-4 text-zinc-500" />
                      <span className="text-zinc-500">Mic Optional</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Badges Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-8 mb-8 backdrop-blur"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-400" />
              Badges & Achievements
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {user.badges.map((badge: any) => {
                const isFeatured = user.featuredBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`text-center p-4 rounded-xl border transition ${
                      isFeatured
                        ? "bg-zinc-800 border-yellow-600/50"
                        : "bg-zinc-900 border-zinc-800"
                    }`}
                  >
                    <div className={`text-4xl mb-2 ${getBadgeColor(badge.rarity)}`}>
                      {badge.icon}
                    </div>
                    <h3 className="text-sm font-bold mb-1">{badge.name}</h3>
                    <p className={`text-xs ${getBadgeColor(badge.rarity)} capitalize`}>
                      {badge.rarity}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-zinc-800">
            {["Builds", "Stats", "Activity"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-bold transition relative ${
                  activeTab === tab
                    ? "text-cyan-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "Builds" && (
            <motion.div
              key="builds"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {user.builds.map((build: any, i: number) => (
                <Link key={build.id} href={`/build/${build.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-400 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          build.meta === "S-Tier"
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                            : build.meta === "Meta"
                            ? "bg-green-500/20 text-green-400 border border-green-500/50"
                            : "bg-zinc-500/20 text-zinc-400 border border-zinc-500/50"
                        }`}
                      >
                        {build.meta}
                      </span>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-cyan-400" />
                        <span className="font-bold text-cyan-400">{build.rating}/10</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg mb-2 group-hover:text-cyan-400 transition">
                      {build.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-4">{build.game}</p>

                    <div className="flex items-center justify-between text-sm pt-4 border-t border-zinc-800">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-pink-400">
                          <Heart className="w-4 h-4" />
                          {build.hearts}
                        </span>
                        <span className="flex items-center gap-1 text-zinc-500">
                          <Eye className="w-4 h-4" />
                          {build.views}
                        </span>
                      </div>
                      <span className="text-zinc-500">
                        {new Date(build.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          )}

          {activeTab === "Stats" && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { label: "Total Builds", value: user.stats.totalBuilds, icon: <Gamepad2 className="w-6 h-6" />, color: "text-cyan-400" },
                { label: "Avg Rating", value: `${user.stats.avgRating}/10`, icon: <Trophy className="w-6 h-6" />, color: "text-yellow-400" },
                { label: "Total Hearts", value: user.stats.totalHearts.toLocaleString(), icon: <Heart className="w-6 h-6" />, color: "text-pink-400" },
                { label: "Total Views", value: user.stats.totalViews.toLocaleString(), icon: <Eye className="w-6 h-6" />, color: "text-purple-400" },
                { label: "Groups Joined", value: user.stats.groupsJoined, icon: <Users className="w-6 h-6" />, color: "text-green-400" },
                { label: "Groups Hosted", value: user.stats.groupsHosted, icon: <Shield className="w-6 h-6" />, color: "text-blue-400" },
                { label: "Success Rate", value: `${user.stats.successRate}%`, icon: <Zap className="w-6 h-6" />, color: "text-orange-400" },
                { label: "Reputation", value: user.reputation, icon: <Star className="w-6 h-6" />, color: "text-yellow-400" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-zinc-800 ${stat.color} mb-4`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black mb-1">{stat.value}</div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "Activity" && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6"
            >
              <div className="space-y-6">
                {[
                  { action: "Joined group", detail: '"Mythic+ Push Tonight"', time: "2 hours ago", icon: <Users className="w-5 h-5 text-green-400" /> },
                  { action: "Build rated", detail: '"Shadow Assassin" got 9/10', time: "5 hours ago", icon: <Trophy className="w-5 h-5 text-cyan-400" /> },
                  { action: "Earned badge", detail: "Team Player 🤝", time: "1 day ago", icon: <Award className="w-5 h-5 text-yellow-400" /> },
                  { action: "Completed session", detail: "Trials of Osiris", time: "2 days ago", icon: <Zap className="w-5 h-5 text-orange-400" /> },
                  { action: "Submitted build", detail: '"Aggressive Wraith Movement"', time: "3 days ago", icon: <Gamepad2 className="w-5 h-5 text-purple-400" /> },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-4 pb-6 border-b border-zinc-800 last:border-b-0 last:pb-0">
                    <div className="p-2 bg-zinc-800 rounded-lg">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-white mb-1">
                        <span className="font-semibold">{activity.action}</span> {activity.detail}
                      </p>
                      <p className="text-sm text-zinc-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
