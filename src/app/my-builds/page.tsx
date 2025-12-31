'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Eye, Edit, Trash2, Plus } from 'lucide-react';

export default function MyBuildsPage() {
  // Mock user builds - replace with real data
  const [builds, setBuilds] = useState([
    { id: "build_001", title: "Shadow Assassin God Roll", game: "Destiny 2", rating: 9, hearts: 1247, views: 8932, createdAt: "2024-12-20" },
    { id: "build_015", title: "Arc 3.0 Storm Build", game: "Destiny 2", rating: 8, hearts: 543, views: 3421, createdAt: "2024-12-18" },
    { id: "build_023", title: "Solo Flawless Loadout", game: "Destiny 2", rating: 9, hearts: 892, views: 5234, createdAt: "2024-12-15" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/profile/ShadowGod42"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Profile
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Builds</h1>
              <p className="text-gray-400">Manage and edit your submitted builds</p>
            </div>
            <Link
              href="/submit"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              New Build
            </Link>
          </div>
        </motion.div>

        {/* Builds Grid */}
        <div className="grid gap-6">
          {builds.map((build, index) => (
            <motion.div
              key={build.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />

              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-start justify-between gap-6">
                  {/* Build Info */}
                  <div className="flex-1">
                    <Link href={`/build/${build.id}`}>
                      <h3 className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors mb-2">
                        {build.title}
                      </h3>
                    </Link>
                    <p className="text-gray-400 mb-4">{build.game}</p>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-pink-400" />
                        <span className="font-semibold">{build.hearts.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span>{build.views.toLocaleString()}</span>
                      </div>
                      <div className="text-gray-500">
                        Rating: <span className="text-cyan-400 font-bold">{build.rating}/10</span>
                      </div>
                      <div className="text-gray-500">
                        Created: {new Date(build.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/build/${build.id}/edit`}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this build?')) {
                          setBuilds(builds.filter(b => b.id !== build.id));
                        }
                      }}
                      className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {builds.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
              <Plus className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No builds yet</h3>
            <p className="text-gray-400 mb-6">Start sharing your builds with the community!</p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Submit Your First Build
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
