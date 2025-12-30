"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Share2,
  Flag,
  Flame,
  Trophy,
  Target,
  Zap,
  MessageCircle,
  ThumbsUp,
  Copy,
  Check,
} from "lucide-react";

// Mock data - replace with real API call later
const mockBuilds: Record<string, any> = {
  build_001: {
    id: "build_001",
    title: "Shadow Assassin God Roll",
    game: "Destiny 2",
    characterClass: "Hunter",
    buildType: "PvP",
    rating: 9,
    meta: "S-Tier",
    hearts: 1247,
    views: 8932,
    createdAt: "2024-12-20",
    author: "ShadowGod42",
    strengths: [
      "Exceptional neutral game with high mobility",
      "Perfect stat distribution for competitive play",
      "Synergistic exotic armor choice",
      "Strong super usage in clutch situations",
    ],
    weaknesses: [
      "Somewhat vulnerable to aggressive shotgun rushes",
      "Requires precise aim to maximize potential",
      "Limited utility for team support",
    ],
    improvements: [
      "Consider swapping to Strafe Jump for better aerial control",
      "Add more Resilience for 6v6 playlists",
      "Experiment with alternative grenade options for zone control",
      "Fine-tune weapon perks for better handling",
    ],
    roast:
      "This build is so clean it makes other Hunters look like they're still learning to double jump. You're out here deleting Guardians while they're still loading in. Respectfully, you're that guy.",
    notes: "Full 100 mobility, Stompees build optimized for Trials. Works best with hand cannon + sniper.",
    comments: 89,
  },
};

export default function BuildDetailPage() {
  const params = useParams();
  const router = useRouter();
  const buildId = params?.id as string;

  const [hasLiked, setHasLiked] = useState(false);
  const [hearts, setHearts] = useState(0);
  const [copied, setCopied] = useState(false);
  const [comment, setComment] = useState("");

  // Get build data
  const build = mockBuilds[buildId] || mockBuilds["build_001"];
  if (hearts === 0 && build) setHearts(build.hearts);

  const handleLike = () => {
    if (!hasLiked) {
      setHearts(hearts + 1);
      setHasLiked(true);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleComment = () => {
    if (comment.trim()) {
      console.log("Comment:", comment);
      setComment("");
      // Add to DB later
    }
  };

  if (!build) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Build Not Found</h1>
          <Link href="/" className="text-cyan-400 hover:underline">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-5xl font-black mb-3">{build.title}</h1>
              <div className="flex items-center gap-4 text-zinc-400">
                <span>{build.game}</span>
                <span>•</span>
                <span>{build.characterClass}</span>
                <span>•</span>
                <span>{build.buildType}</span>
                <span>•</span>
                <span>by @{build.author}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
                  hasLiked
                    ? "bg-pink-600 text-white"
                    : "bg-zinc-900 hover:bg-zinc-800 border border-zinc-800"
                }`}
              >
                <Heart className={`w-5 h-5 ${hasLiked ? "fill-current" : ""}`} />
                {hearts.toLocaleString()}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl font-semibold transition"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-green-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="w-5 h-5" />
                    Share
                  </>
                )}
              </button>

              <button className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition">
                <Flag className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
          </div>

          <div className="text-sm text-zinc-500">
            {build.views.toLocaleString()} views • Posted {build.createdAt}
          </div>
        </motion.div>

        {/* Rating Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border border-cyan-500/50 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <h2 className="text-3xl font-black mb-2">Build Rating</h2>
              <p className="text-zinc-400">AI-powered analysis</p>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-6xl font-black text-cyan-400">{build.rating}</div>
                <div className="text-zinc-400 text-sm mt-1">/10</div>
              </div>

              <div>
                <span
                  className={`inline-block px-6 py-3 rounded-xl font-bold text-lg ${
                    build.meta === "S-Tier"
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                      : build.meta === "Meta"
                      ? "bg-green-500/20 text-green-400 border border-green-500/50"
                      : "bg-zinc-500/20 text-zinc-400 border border-zinc-500/50"
                  }`}
                >
                  {build.meta}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Roast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-500/50 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Flame className="w-6 h-6 text-orange-400" />
            <h3 className="text-2xl font-bold text-orange-400">The Roast</h3>
          </div>
          <p className="text-xl text-white leading-relaxed italic">"{build.roast}"</p>
        </motion.div>

        {/* Analysis Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900/70 border border-green-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-green-400" />
              <h3 className="text-xl font-bold text-green-400">Strengths</h3>
            </div>
            <ul className="space-y-3">
              {build.strengths.map((s: string, i: number) => (
                <li key={i} className="text-zinc-300 flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Weaknesses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/70 border border-red-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-red-400" />
              <h3 className="text-xl font-bold text-red-400">Weaknesses</h3>
            </div>
            <ul className="space-y-3">
              {build.weaknesses.map((w: string, i: number) => (
                <li key={i} className="text-zinc-300 flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Improvements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-900/70 border border-cyan-500/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-cyan-400">Recommended Improvements</h3>
          </div>
          <ul className="space-y-3">
            {build.improvements.map((imp: string, i: number) => (
              <li key={i} className="text-zinc-300 flex items-start gap-3">
                <span className="text-cyan-400 font-bold mt-0.5">{i + 1}.</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Build Notes */}
        {build.notes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-xl font-bold mb-3">Build Notes</h3>
            <p className="text-zinc-300 leading-relaxed">{build.notes}</p>
          </motion.div>
        )}

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold">
              Comments <span className="text-zinc-500">({build.comments})</span>
            </h3>
          </div>

          {/* Comment Input */}
          <div className="mb-8">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts on this build..."
              rows={4}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition resize-none"
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handleComment}
                disabled={!comment.trim()}
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Comment
              </button>
            </div>
          </div>

          {/* Mock Comments */}
          <div className="space-y-6">
            {[
              { author: "MetaHunter", text: "This is exactly what I was looking for! Thanks for sharing.", likes: 12, time: "2h ago" },
              { author: "BuildCritic", text: "Solid build but I'd swap the exotic for better neutral game.", likes: 8, time: "5h ago" },
              { author: "CasualPlayer", text: "Can this work in PvE too or strictly PvP?", likes: 3, time: "1d ago" },
            ].map((c, i) => (
              <div key={i} className="border-t border-zinc-800 pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-bold">
                    {c.author[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold">{c.author}</span>
                      <span className="text-sm text-zinc-500">{c.time}</span>
                    </div>
                    <p className="text-zinc-300 mb-3">{c.text}</p>
                    <button className="flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 transition">
                      <ThumbsUp className="w-4 h-4" />
                      {c.likes}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Related Builds */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold mb-6">Similar Builds</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {["build_002", "build_003", "build_005"].map((id, i) => {
              const relatedBuild = mockBuilds[id] || mockBuilds["build_001"];
              return (
                <Link key={id} href={`/build/${id}`}>
                  <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-6 hover:border-cyan-400 transition group">
                    <h4 className="font-bold text-lg mb-2 group-hover:text-cyan-400 transition">
                      {relatedBuild.title}
                    </h4>
                    <p className="text-sm text-zinc-400 mb-3">{relatedBuild.game}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 font-semibold">{relatedBuild.rating}/10</span>
                      <span className="text-sm text-zinc-500">{relatedBuild.hearts} ♥</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </main>
    </>
  );
}