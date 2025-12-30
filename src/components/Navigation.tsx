"use client";

import Link from "next/link";
import { Flame } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Flame className="w-8 h-8 text-cyan-400" />
          <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Rate My Build
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/" className="text-zinc-300 hover:text-cyan-400 transition font-medium">
            Home
          </Link>
          <Link href="/submit" className="text-zinc-300 hover:text-cyan-400 transition font-medium">
            Submit
          </Link>
          <Link href="/community" className="text-zinc-300 hover:text-cyan-400 transition font-medium">
            Community
          </Link>
          <Link href="/lfg" className="text-zinc-300 hover:text-cyan-400 transition font-medium">
            LFG
          </Link>
          <Link href="/leaderboards" className="text-zinc-300 hover:text-cyan-400 transition font-medium">
            Leaderboards
          </Link>
          <Link href="/profile/ShadowGod42" className="text-zinc-300 hover:text-cyan-400 transition font-medium">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
