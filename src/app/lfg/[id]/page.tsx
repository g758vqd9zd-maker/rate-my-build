"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  MapPin,
  Clock,
  Trophy,
  Send,
  MessageCircle,
  Flag,
} from "lucide-react";
import { useState } from "react";

// Mock data
const mockLFG: Record<string, any> = {
  lfg_001: {
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
    description:
      "Pushing keys tonight, need DPS and healer. 3K+ IO required. Discord mandatory. Chill group but we're here to time keys. Looking for people who know mechanics and can adapt. We run Tuesday/Thursday nights usually.",
    createdAt: "2024-12-27T18:30:00",
    requirements: ["3000+ Mythic+ Rating", "Discord with mic", "Meta build preferred", "Know dungeon mechanics"],
    groupMembers: [
      { name: "RaidLeader420", role: "Tank", buildRating: 9, buildId: "build_005" },
      { name: "HealBot3000", role: "Healer", buildRating: 8, buildId: "build_006" },
      { name: "DPSMachine", role: "DPS", buildRating: 9, buildId: "build_002" },
    ],
  },
};

export default function LFGDetailPage() {
  const params = useParams();
  const router = useRouter();
  const lfgId = params?.id as string;
  const [joinMessage, setJoinMessage] = useState("");
  const [hasRequested, setHasRequested] = useState(false);

  const lfg = mockLFG[lfgId] || mockLFG["lfg_001"];

  const handleJoinRequest = () => {
    if (joinMessage.trim()) {
      setHasRequested(true);
      // TODO: Send API request to join with joinMessage
    }
  };

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
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/lfg"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-green-400 transition mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to LFG Board
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-2 text-green-400 font-bold">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              LIVE
            </span>
            <span className="text-zinc-500">Posted {getTimeAgo(lfg.createdAt)}</span>
          </div>

          <h1 className="text-5xl font-black mb-4">{lfg.title}</h1>

          <div className="flex items-center gap-4 flex-wrap text-zinc-400">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {lfg.region}
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {lfg.content}
            </span>
            <span>•</span>
            <span>{lfg.game}</span>
            <span>•</span>
            <span>{lfg.platform}</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold mb-4">About This Group</h2>
              <p className="text-zinc-300 leading-relaxed">{lfg.description}</p>
            </motion.div>
            {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="space-y-3">
            {lfg.requirements.map((req: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-zinc-300">{req}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Current Members */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4">
            Current Members ({lfg.groupMembers.length}/{lfg.maxPlayers})
          </h2>
          <div className="space-y-4">
            {lfg.groupMembers.map((member: any, i: number) => (
              <Link key={i} href={`/build/${member.buildId}`}>
                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-cyan-600 flex items-center justify-center font-bold text-lg">
                      {member.name[0]}
                    </div>
                    <div>
                      <div className="font-bold group-hover:text-green-400 transition">
                        {member.name}
                      </div>
                      <div className="text-sm text-zinc-400">{member.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-400 font-bold">{member.buildRating}/10</span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Empty Slots */}
            {Array.from({ length: lfg.maxPlayers - lfg.groupMembers.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="flex items-center gap-4 p-4 bg-zinc-800/30 rounded-xl border-2 border-dashed border-zinc-700"
              >
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                  <Users className="w-6 h-6 text-zinc-600" />
                </div>
                <div className="text-zinc-500">Open Slot</div>
              </div>
            ))}
          </div>
      </motion.div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Host Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 sticky top-6"
        >
          <h3 className="text-sm text-zinc-400 mb-2">Group Host</h3>
          <Link href={`/build/${lfg.hostBuildId}`}>
            <div className="flex items-center gap-4 mb-4 hover:text-green-400 transition group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-cyan-600 flex items-center justify-center font-bold text-2xl">
                {lfg.hostName[0]}
              </div>
              <div>
                <div className="font-bold text-lg group-hover:text-green-400 transition">
                  {lfg.hostName}
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 font-semibold">{lfg.hostRating}/10</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Group Status */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">Group Status</span>
              <span className="text-2xl font-bold">
                {lfg.currentPlayers}/{lfg.maxPlayers}
              </span>
            </div>
            <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-cyan-500"
                style={{ width: `${(lfg.currentPlayers / lfg.maxPlayers) * 100}%` }}
              />
            </div>
          </div>

          {/* Build Requirement Badge */}
          <div className="mb-6">
            <div className="text-sm text-zinc-400 mb-2">Build Requirement</div>
            <span
              className={`inline-block px-4 py-2 rounded-lg font-bold ${
                lfg.metaRequired === "S-Tier"
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                  : lfg.metaRequired === "Meta"
                  ? "bg-green-500/20 text-green-400 border border-green-500/50"
                  : "bg-zinc-500/20 text-zinc-400 border border-zinc-500/50"
              }`}
            >
              {lfg.metaRequired}
            </span>
          </div>

          {/* Join Section */}
          {!hasRequested ? (
            <>
              <textarea
                value={joinMessage}
                onChange={(e) => setJoinMessage(e.target.value)}
                placeholder="Introduce yourself and your build..."
                rows={4}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 mb-4 text-white placeholder-zinc-500 focus:outline-none focus:border-green-500 transition resize-none"
              />
              <button
                onClick={handleJoinRequest}
                disabled={!joinMessage.trim()}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 rounded-xl font-bold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                Request to Join
              </button>
            </>
          ) : (
            <div className="bg-green-900/20 border border-green-700 rounded-xl p-4 text-center">
              <div className="text-green-400 font-bold mb-1">Request Sent!</div>
              <div className="text-sm text-zinc-400">
                The host will review your request
              </div>
            </div>
          )}

        {/* Report Button */}
        <button className="w-full mt-4 px-4 py-2 text-sm text-zinc-500 hover:text-red-400 transition flex items-center justify-center gap-2">
          <Flag className="w-4 h-4" />
          Report Post
        </button>
      </motion.div>
      </div>
    </div>
    </div>
  </main>
    </>
  );
}