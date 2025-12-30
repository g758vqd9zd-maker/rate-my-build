"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import {
  ArrowRight,
  Shield,
  Users,
  Zap,
  Trophy,
  Heart,
  Flame,
  Star,
  TrendingUp,
  CheckCircle,
  MessageCircle,
} from "lucide-react";

// Mock data
const recentBuilds = [
  { id: "build_011", title: "Lightning Sorceress Endgame", game: "Path of Exile 2", author: "MapRunner", rating: 9, hearts: 876, meta: "S-Tier" },
  { id: "build_001", title: "Shadow Assassin God Roll", game: "Destiny 2", author: "ShadowGod42", rating: 9, hearts: 1247, meta: "S-Tier" },
  { id: "build_005", title: "S-Tier Mythic+ Warlock", game: "World of Warcraft", author: "RaidLeader420", rating: 10, hearts: 1534, meta: "S-Tier" },
];

const activeLFG = [
  { id: "lfg_001", title: "LFM Mythic+ Push Tonight", game: "WoW", players: "3/5", tag: "Competitive" },
  { id: "lfg_002", title: "Chill Raid Night", game: "FFXIV", players: "6/8", tag: "Casual" },
  { id: "lfg_003", title: "Ranked Grind to Pred", game: "Apex", players: "2/3", tag: "Tryhard" },
];

const topThisWeek = [
  { id: "build_012", title: "Tanky Juggernaut", game: "Path of Exile 2", rating: 8, change: "+245%" },
  { id: "build_007", title: "Diamond Controller Legend", game: "Apex Legends", rating: 9, change: "+189%" },
  { id: "build_002", title: "Aggressive Demon Hunter", game: "WoW", rating: 8, change: "+156%" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("Recent Builds");

  return (
    <>
      <Navigation />

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        
        {/* Animated grid */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Radial glows */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          />
        ))}

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <main className="min-h-screen text-white">
        {/* HERO SECTION */}
        <section className="relative px-6 py-24 md:py-32 lg:py-40 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-6">
                Find Your Squad.
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-green-400 to-purple-500 bg-clip-text text-transparent">
                  Prove Your Build.
                </span>
                <br />
                Dominate Together.
              </h1>

              <p className="mt-8 text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto leading-relaxed">
                The competitive gaming hub where builds get rated, players get verified, and squads get formed.
                <br className="hidden md:block" />
                Discord-native matchmaking for serious gamers.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6"
              >
                <Link
                  href="/submit"
                  className="group relative px-10 py-5 text-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Flame className="w-6 h-6" />
                    Submit & Get Rated
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition duration-500" />
                </Link>

                <Link
                  href="/lfg"
                  className="px-10 py-5 text-xl font-bold border-2 border-zinc-700 rounded-2xl hover:border-green-400 hover:bg-green-400/10 backdrop-blur transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    Find Groups
                  </span>
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
              >
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-cyan-400">2.4K+</div>
                  <div className="text-sm md:text-base text-zinc-400 mt-1">Builds Rated</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-green-400">850+</div>
                  <div className="text-sm md:text-base text-zinc-400 mt-1">Active Players</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-purple-400">15K+</div>
                  <div className="text-sm md:text-base text-zinc-400 mt-1">Discord Members</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* WHY RATE MY BUILD */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Why <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Rate My Build</span>?
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              We're not just another LFG tool. We're a complete gaming ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Flame className="w-8 h-8" />,
                title: "Submit & Get Rated",
                description: "AI-powered build analysis with honest roasts and expert recommendations",
                gradient: "from-orange-500 to-red-600",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Smart Matchmaking",
                description: "Auto-match with compatible players based on playstyle, schedule, and skill",
                gradient: "from-cyan-500 to-blue-600",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Verified Players",
                description: "Discord OAuth + build history = real gamers only. No bots, no spam",
                gradient: "from-purple-500 to-pink-600",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Discord Native",
                description: "Private channels auto-created for every group. Communication made easy",
                gradient: "from-green-500 to-emerald-600",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl blur-xl" />
                
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* LIVE ACTIVITY FEED */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">Live Activity</h2>
            <p className="text-xl text-zinc-400">See what's happening right now</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {["Recent Builds", "Active LFG", "Top This Week"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {activeTab === "Recent Builds" &&
              recentBuilds.map((build, i) => (
                <Link key={build.id} href={`/build/${build.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        build.meta === "S-Tier" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"
                      }`}>
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
                    <p className="text-sm text-zinc-400 mb-3">{build.game}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">by {build.author}</span>
                      <div className="flex items-center gap-1 text-pink-400">
                        <Heart className="w-4 h-4" />
                        <span>{build.hearts}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}

            {activeTab === "Active LFG" &&
              activeLFG.map((lfg, i) => (
                <Link key={lfg.id} href={`/lfg/${lfg.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-green-500 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex items-center gap-1 text-green-400 text-sm font-bold">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        LIVE
                      </span>
                      <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-lg text-xs font-bold">
                        {lfg.tag}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 group-hover:text-green-400 transition">
                      {lfg.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-3">{lfg.game}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-zinc-400" />
                        <span className="font-semibold">{lfg.players}</span>
                      </div>
                      <span className="text-sm text-green-400 font-semibold">Join Now →</span>
                    </div>
                  </motion.div>
                </Link>
              ))}

            {activeTab === "Top This Week" &&
              topThisWeek.map((build, i) => (
                <Link key={build.id} href={`/build/${build.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-orange-500/10 to-transparent" />
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <span className="text-2xl font-black">#{i + 1}</span>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 group-hover:text-orange-400 transition">
                      {build.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-3">{build.game}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-cyan-400" />
                        <span className="font-bold">{build.rating}/10</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-orange-600 rounded-full">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-bold">{build.change}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link
              href="/community"
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-cyan-400 transition font-semibold text-lg"
            >
              Explore All Builds
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">How It Works</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Three simple steps to better gaming
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500 opacity-30" />

            {[
              {
                step: "1",
                icon: <Flame className="w-12 h-12" />,
                title: "Submit Your Build",
                description: "Upload your build and get instant AI-powered analysis with ratings, roasts, and improvement tips",
                color: "from-orange-500 to-red-600",
              },
              {
                step: "2",
                icon: <Trophy className="w-12 h-12" />,
                title: "Build Your Profile",
                description: "Earn reputation through completed sessions. Showcase your builds and badges to prove you're legit",
                color: "from-cyan-500 to-blue-600",
              },
              {
                step: "3",
                icon: <Users className="w-12 h-12" />,
                title: "Find Your Squad",
                description: "Smart matchmaking connects you with compatible players. Private Discord channels auto-created for your group",
                color: "from-green-500 to-emerald-600",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative text-center"
              >
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-r ${item.color} mb-6 relative z-10`}>
                  {item.icon}
                </div>
                
                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-9xl font-black text-zinc-900 -z-0">
                  {item.step}
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* DISCORD CTA */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-700/50 rounded-3xl p-12 md:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 animate-pulse" />
            
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Join the Discord
              </h2>
              <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-10">
                Live roasts, instant LFG pings, meta breakdowns, and nonstop banter with 15,000+ competitive gamers
              </p>

              <a
                href="https://discord.gg/ratemybuild"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 px-12 py-6 text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl shadow-2xl shadow-purple-600/60 hover:shadow-purple-600/90 transition-all duration-500 hover:scale-105"
              >
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Join 15K+ Online
                <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-zinc-800 bg-black/60 backdrop-blur mt-24">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="w-6 h-6 text-cyan-400" />
                  <span className="font-black text-lg">Rate My Build</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  The competitive gaming hub for build ratings, smart matchmaking, and squad finding.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Platform</h4>
                <div className="space-y-2 text-sm text-zinc-400">
                  <Link href="/submit" className="block hover:text-cyan-400 transition">Submit Build</Link>
                  <Link href="/community" className="block hover:text-cyan-400 transition">Community</Link>
                  <Link href="/lfg" className="block hover:text-cyan-400 transition">LFG Board</Link>
                  <Link href="/teams" className="block hover:text-cyan-400 transition">Teams</Link>
                  <Link href="/leaderboard" className="block hover:text-cyan-400 transition">Leaderboard</Link>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Resources</h4>
                <div className="space-y-2 text-sm text-zinc-400">
                  <a href="#" className="block hover:text-cyan-400 transition">Meta Guide</a>
                  <a href="#" className="block hover:text-cyan-400 transition">Build Templates</a>
                  <a href="#" className="block hover:text-cyan-400 transition">FAQ</a>
                  <a href="#" className="block hover:text-cyan-400 transition">Support</a>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-4">Community</h4>
                <div className="space-y-2 text-sm text-zinc-400">
                  <a href="https://discord.gg/ratemybuild" target="_blank" rel="noopener" className="block hover:text-cyan-400 transition">Discord</a>
                  <a href="#" className="block hover:text-cyan-400 transition">Twitter</a>
                  <a href="#" className="block hover:text-cyan-400 transition">YouTube</a>
                  <a href="#" className="block hover:text-cyan-400 transition">Twitch</a>
                </div>
              </div>
        </div>
        
        <div className="border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
          © 2025 Rate My Build. Built for gamers, by gamers. 🔥
        </div>
      </div>
    </footer>
  </main>
</>
);
}