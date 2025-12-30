"use client";

import { motion } from "framer-motion";
import { User, Heart, Trophy, Flame, Activity, Settings } from "lucide-react";

// Mock user data
const mockUser = {
  username: "RoastSurvivor42",
  avatar: null,
  joined: "October 2025",
  buildsSubmitted: 28,
  averageRating: 8.2,
  totalHearts: 15420,
  badges: ["Roast Survivor", "Meta Breaker", "Theorycrafter", "Build Doctor"],
  recentBuilds: [
    { title: "Explosive Arrow Ballista", rating: 9.4, date: "2d ago" },
    { title: "Bleed Earthquake Jugg", rating: 8.7, date: "1w ago" },
    { title: "Arc Mines Trickster", rating: 7.1, date: "2w ago" },
  ],
};

export default function Profile() {
  return (
    <main className="min-h-screen text-white pt-12 pb-20 relative">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-purple-950/30 to-black pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-5xl font-black">
            {mockUser.username[0]}
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            {mockUser.username}
          </h1>
          <p className="mt-3 text-xl text-zinc-400">Member since {mockUser.joined}</p>

          <div className="flex justify-center gap-8 mt-8 flex-wrap">
            {mockUser.badges.map((badge) => (
              <div key={badge} className="px-5 py-2 bg-zinc-800/80 border border-purple-500/40 rounded-full text-purple-300 text-sm font-medium">
                {badge}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Builds Submitted", value: mockUser.buildsSubmitted, icon: Flame },
            { label: "Average Rating", value: mockUser.averageRating.toFixed(1), icon: Trophy },
            { label: "Total Hearts", value: mockUser.totalHearts.toLocaleString(), icon: Heart },
            { label: "Activity Score", value: "Top 8%", icon: Activity },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 text-center backdrop-blur-xl"
            >
              <stat.icon className="w-10 h-10 mx-auto mb-4 text-cyan-400" />
              <div className="text-4xl font-black text-cyan-300">{stat.value}</div>
              <div className="text-sm text-zinc-400 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Recent Builds */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-8 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Recent Builds
            </h2>
            <button className="px-6 py-3 bg-zinc-800 border border-zinc-700 rounded-xl hover:bg-zinc-700 transition flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Edit Profile
            </button>
          </div>

          <div className="space-y-4">
            {mockUser.recentBuilds.map((build, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-black/40 border border-zinc-800 rounded-xl p-5 hover:border-cyan-500/50 transition"
              >
                <div>
                  <h3 className="font-bold text-lg">{build.title}</h3>
                  <p className="text-sm text-zinc-500">{build.date}</p>
                </div>
                <div className="text-2xl font-black text-cyan-400">{build.rating}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}