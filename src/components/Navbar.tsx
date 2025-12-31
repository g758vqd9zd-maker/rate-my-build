'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Upload,
  Users,
  Trophy,
  Search,
  Bell,
  Settings,
  LogOut,
  User,
  Heart,
  TrendingUp,
  Menu,
  X
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Mock notification count

  // Mock user data - replace with real auth
  const user = {
    username: 'ShadowGod42',
    avatar: 'S',
    isLoggedIn: true
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/submit', label: 'Submit Build', icon: Upload },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/lfg', label: 'LFG Board', icon: Search },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  const profileMenuItems = [
    { href: `/profile/${user.username}`, label: 'My Profile', icon: User },
    { href: '/my-builds', label: 'My Builds', icon: Heart },
    { href: '/profile/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300 opacity-50" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              RateMyBuild
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'text-cyan-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-cyan-500/10 rounded-lg border border-cyan-500/30"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center gap-4">

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {notifications}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            {user.isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {user.avatar}
                  </div>
                  <span className="text-white font-semibold">{user.username}</span>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden"
                    >
                      {/* User Info */}
                      <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                            {user.avatar}
                          </div>
                          <div>
                            <div className="font-bold text-white">{user.username}</div>
                            <div className="text-xs text-gray-400">View Profile</div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {profileMenuItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
                            >
                              <Icon className="w-5 h-5" />
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-700">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-700 transition-all duration-300">
                          <LogOut className="w-5 h-5" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white font-semibold transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-800 py-4"
            >
              {/* Mobile Nav Links */}
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Profile Section */}
              {user.isLoggedIn && (
                <>
                  <div className="my-4 border-t border-gray-800 pt-4">
                    <div className="px-4 mb-3 text-xs font-semibold text-gray-500 uppercase">
                      Account
                    </div>
                    {profileMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 rounded-lg"
                        >
                          <Icon className="w-5 h-5" />
                          {item.label}
                        </Link>
                      );
                    })}
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 transition-all duration-300 rounded-lg mt-2">
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}

              {/* Mobile Auth Buttons */}
              {!user.isLoggedIn && (
                <div className="mt-4 pt-4 border-t border-gray-800 space-y-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click Outside to Close Dropdown */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </nav>
  );
}
