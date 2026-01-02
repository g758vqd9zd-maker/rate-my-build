"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  Trophy,
  Users,
  FileText,
  LayoutDashboard,
  Flame,
  Music,
} from "lucide-react";
import ReputationDisplay from "./ReputationDisplay";

// Mock user data - will come from auth later
const mockUser = {
  isLoggedIn: true, // Change to true to see logged-in state
  userId: "mock-user-id-123", // Mock user ID for reputation system
  username: "ShadowGod42",
  avatar: null,
  notifications: 3,
};

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Flame className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition" />
            <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent hidden sm:block">
              Rate My Build
            </span>
            <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent sm:hidden">
              RMB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/community"
              className="text-zinc-300 hover:text-cyan-400 transition font-medium flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Community
            </Link>
            <Link
              href="/lfg"
              className="text-zinc-300 hover:text-cyan-400 transition font-medium flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              LFG
            </Link>
            <Link
              href="/teams"
              className="text-zinc-300 hover:text-cyan-400 transition font-medium flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Teams
            </Link>
            <Link
              href="/leaderboard"
              className="text-zinc-300 hover:text-cyan-400 transition font-medium flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition text-zinc-400">
              <Search className="w-4 h-4" />
              <span className="text-sm">Search</span>
            </button>

            {mockUser.isLoggedIn ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2 hover:bg-zinc-800 rounded-lg transition"
                  >
                    <Bell className="w-5 h-5 text-zinc-300" />
                    {mockUser.notifications > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                        {mockUser.notifications}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  <AnimatePresence>
                    {notificationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
                      >
                        <div className="p-4 border-b border-zinc-800">
                          <h3 className="font-bold text-white">Notifications</h3>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {/* Mock notifications */}
                          <div className="p-4 hover:bg-zinc-800 cursor-pointer border-b border-zinc-800">
                            <p className="text-sm text-white mb-1">
                              <strong>RaidLeader420</strong> accepted your join request
                            </p>
                            <p className="text-xs text-zinc-500">2 minutes ago</p>
                          </div>
                          <div className="p-4 hover:bg-zinc-800 cursor-pointer border-b border-zinc-800">
                            <p className="text-sm text-white mb-1">
                              Your build <strong>"Shadow Assassin"</strong> got 47 new hearts
                            </p>
                            <p className="text-xs text-zinc-500">1 hour ago</p>
                          </div>
                          <div className="p-4 hover:bg-zinc-800 cursor-pointer">
                            <p className="text-sm text-white mb-1">
                              New badge earned: <strong>Team Player</strong> 🤝
                            </p>
                            <p className="text-xs text-zinc-500">3 hours ago</p>
                          </div>
                        </div>
                        <div className="p-3 border-t border-zinc-800 text-center">
                          <Link
                            href="/notifications"
                            className="text-sm text-cyan-400 hover:text-cyan-300"
                          >
                            View All
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit Build Button */}
                <Link
                  href="/submit"
                  className="hidden md:block px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition text-sm"
                >
                  Submit Build
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-2 hover:bg-zinc-800 rounded-lg transition"
                  >
                    {mockUser.avatar ? (
                      <img
                        src={mockUser.avatar}
                        alt={mockUser.username}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-bold">
                        {mockUser.username[0]}
                      </div>
                    )}
                    <span className="hidden lg:block text-sm font-semibold text-white">
                      {mockUser.username}
                    </span>
                  </button>

                  {/* Profile Dropdown Menu */}
                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
                      >
                        <div className="p-3 border-b border-zinc-800">
                          <p className="font-bold text-white">{mockUser.username}</p>
                          <ReputationDisplay userId={mockUser.userId} variant="compact" />
                        </div>

                        <div className="py-2">
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 text-zinc-300 hover:text-white transition"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                          <Link
                            href={`/profile/${mockUser.username}`}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 text-zinc-300 hover:text-white transition"
                          >
                            <User className="w-4 h-4" />
                            My Profile
                          </Link>
                          <Link
                            href="/profile/edit"
                            className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 text-zinc-300 hover:text-white transition"
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </Link>
                        </div>

                        <div className="border-t border-zinc-800 py-2">
                          <button className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 text-red-400 hover:text-red-300 transition w-full">
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                {/* Login Button */}
                
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-zinc-800 rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 space-y-3 border-t border-zinc-800 pt-4"
            >
              <Link
                href="/community"
                className="block text-zinc-300 hover:text-cyan-400 transition py-2"
              >
                Community
              </Link>
              <Link
                href="/lfg"
                className="block text-zinc-300 hover:text-cyan-400 transition py-2"
              >
                LFG Board
              </Link>
              <Link
                href="/teams"
                className="block text-zinc-300 hover:text-cyan-400 transition py-2"
              >
                Teams
              </Link>
              <Link
                href="/leaderboards"
                className="block text-zinc-300 hover:text-cyan-400 transition py-2"
              >
                Leaderboards
              </Link>

              {mockUser.isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block text-zinc-300 hover:text-cyan-400 transition py-2"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={`/profile/${mockUser.username}`}
                    className="block text-zinc-300 hover:text-cyan-400 transition py-2"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/submit"
                    className="block text-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-bold"
                  >
                    Submit Build
                  </Link>
                </>
              ) : (
                <button className="w-full text-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-bold flex items-center justify-center gap-2">
  <Music className="w-5 h-5" />
  Login with Discord
</button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}