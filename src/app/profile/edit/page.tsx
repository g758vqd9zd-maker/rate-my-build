"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/app/components/Navigation";
import { motion } from "framer-motion";
import {
  Save,
  ArrowLeft,
  Gamepad2,
  Clock,
  Trophy,
  Zap,
  Mic,
  MicOff,
  Shield,
  AlertCircle,
  Check,
} from "lucide-react";

const games = [
  "Path of Exile 2",
  "Path of Exile",
  "Destiny 2",
  "World of Warcraft",
  "Apex Legends",
  "Call of Duty",
  "Valorant",
  "League of Legends",
  "Final Fantasy XIV",
  "Diablo IV",
  "Last Epoch",
];

const roles = ["Tank", "DPS", "Healer", "Support", "Flex"];

const intentTags = [
  "Casual",
  "Chill",
  "Competitive",
  "Tryhard",
  "Learning",
  "Speedrun",
  "Helpful",
  "Hardcore",
];

const timezones = [
  "EST (Eastern)",
  "CST (Central)",
  "MST (Mountain)",
  "PST (Pacific)",
  "GMT (London)",
  "CET (Central Europe)",
  "JST (Japan)",
  "AEST (Australia East)",
];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ProfileEditPage() {
  const router = useRouter();

  // Mock current user data - will come from auth later
  const [formData, setFormData] = useState({
    bio: "Competitive FPS player looking for serious squads. I main Hunter in D2 and Wraith in Apex. Let's get some Ws.",
    mainGames: ["Destiny 2", "Apex Legends", "Call of Duty"],
    preferredRoles: ["DPS", "Support"],
    intentTags: ["Competitive", "Tryhard"],
    micPreference: "required",
    timezone: "EST (Eastern)",
    playDays: ["Monday", "Tuesday", "Thursday", "Friday"],
    playHours: "7pm - 11pm",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleGameToggle = (game: string) => {
    if (formData.mainGames.includes(game)) {
      setFormData({
        ...formData,
        mainGames: formData.mainGames.filter((g) => g !== game),
      });
    } else if (formData.mainGames.length < 3) {
      setFormData({
        ...formData,
        mainGames: [...formData.mainGames, game],
      });
    }
  };

  const handleRoleToggle = (role: string) => {
    if (formData.preferredRoles.includes(role)) {
      setFormData({
        ...formData,
        preferredRoles: formData.preferredRoles.filter((r) => r !== role),
      });
    } else {
      setFormData({
        ...formData,
        preferredRoles: [...formData.preferredRoles, role],
      });
    }
  };

  const handleIntentToggle = (tag: string) => {
    if (formData.intentTags.includes(tag)) {
      setFormData({
        ...formData,
        intentTags: formData.intentTags.filter((t) => t !== tag),
      });
    } else {
      setFormData({
        ...formData,
        intentTags: [...formData.intentTags, tag],
      });
    }
  };

  const handleDayToggle = (day: string) => {
    if (formData.playDays.includes(day)) {
      setFormData({
        ...formData,
        playDays: formData.playDays.filter((d) => d !== day),
      });
    } else {
      setFormData({
        ...formData,
        playDays: [...formData.playDays, day],
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Mock save - will be API call later
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSaving(false);
    setSaveSuccess(true);

    // Redirect after success
    setTimeout(() => {
      router.push("/profile/ShadowGod42");
    }, 2000);
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Profile
            </button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl font-black mb-3">Edit Profile</h1>
              <p className="text-xl text-zinc-400">
                Update your gaming preferences and playstyle
              </p>
            </motion.div>
          </div>

          {/* Success Message */}
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-900/30 border border-green-700 rounded-xl p-4 mb-6 flex items-center gap-3"
            >
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-semibold">
                Profile saved successfully! Redirecting...
              </span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-8 backdrop-blur space-y-8"
          >
            {/* Bio */}
            <div>
              <label className="block text-lg font-bold mb-3">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                maxLength={300}
                placeholder="Tell other players about yourself..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition resize-none"
              />
              <p className="text-sm text-zinc-500 mt-2">
                {formData.bio.length}/300 characters
              </p>
            </div>

            {/* Main Games */}
            <div>
              <label className="block text-lg font-bold mb-3 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
                Main Games (Select up to 3)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {games.map((game) => {
                  const isSelected = formData.mainGames.includes(game);
                  const isDisabled = !isSelected && formData.mainGames.length >= 3;

                  return (
                    <button
                      key={game}
                      onClick={() => handleGameToggle(game)}
                      disabled={isDisabled}
                      className={`px-4 py-3 rounded-xl font-semibold text-sm transition ${
                        isSelected
                          ? "bg-cyan-600 text-white border-2 border-cyan-400"
                          : isDisabled
                          ? "bg-zinc-800 text-zinc-600 border border-zinc-700 cursor-not-allowed"
                          : "bg-zinc-800 text-white border border-zinc-700 hover:border-cyan-400"
                      }`}
                    >
                      {game}
                    </button>
                  );
                })}
              </div>
              <p className="text-sm text-zinc-500 mt-2">
                Selected: {formData.mainGames.length}/3
              </p>
            </div>

            {/* Preferred Roles */}
            <div>
              <label className="block text-lg font-bold mb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Preferred Roles
              </label>
              <div className="flex flex-wrap gap-3">
                {roles.map((role) => {
                  const isSelected = formData.preferredRoles.includes(role);

                  return (
                    <button
                      key={role}
                      onClick={() => handleRoleToggle(role)}
                      className={`px-5 py-2 rounded-xl font-bold text-sm transition ${
                        isSelected
                          ? "bg-cyan-600 text-white border-2 border-cyan-400"
                          : "bg-zinc-800 text-white border border-zinc-700 hover:border-cyan-400"
                      }`}
                    >
                      {role}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Intent Tags / Playstyle */}
            <div>
              <label className="block text-lg font-bold mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                Playstyle / Intent Tags
              </label>
              <div className="flex flex-wrap gap-3">
                {intentTags.map((tag) => {
                  const isSelected = formData.intentTags.includes(tag);

                  return (
                    <button
                      key={tag}
                      onClick={() => handleIntentToggle(tag)}
                      className={`px-5 py-2 rounded-xl font-bold text-sm transition ${
                        isSelected
                          ? "bg-purple-600 text-white border-2 border-purple-400"
                          : "bg-zinc-800 text-white border border-zinc-700 hover:border-purple-400"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mic Preference */}
            <div>
              <label className="block text-lg font-bold mb-3 flex items-center gap-2">
                <Mic className="w-5 h-5 text-green-400" />
                Mic Preference
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setFormData({ ...formData, micPreference: "required" })}
                  className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition ${
                    formData.micPreference === "required"
                      ? "bg-green-600 text-white border-2 border-green-400"
                      : "bg-zinc-800 text-white border border-zinc-700 hover:border-green-400"
                  }`}
                >
                  <Mic className="w-5 h-5" />
                  Required
                </button>
                <button
                  onClick={() => setFormData({ ...formData, micPreference: "optional" })}
                  className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition ${
                    formData.micPreference === "optional"
                      ? "bg-yellow-600 text-white border-2 border-yellow-400"
                      : "bg-zinc-800 text-white border border-zinc-700 hover:border-yellow-400"
                  }`}
                >
                  <Mic className="w-5 h-5" />
                  Optional
                </button>
                <button
                  onClick={() => setFormData({ ...formData, micPreference: "none" })}
                  className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition ${
                    formData.micPreference === "none"
                      ? "bg-zinc-600 text-white border-2 border-zinc-400"
                      : "bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  <MicOff className="w-5 h-5" />
                  No Mic
                </button>
              </div>
            </div>

            {/* Play Schedule */}
            <div>
              <label className="block text-lg font-bold mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-400" />
                Play Schedule
              </label>

              {/* Timezone */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-zinc-400">
                  Timezone
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>

              {/* Days Available */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-zinc-400">
                  Days Available
                </label>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                  {daysOfWeek.map((day) => {
                    const isSelected = formData.playDays.includes(day);

                    return (
                      <button
                        key={day}
                        onClick={() => handleDayToggle(day)}
                        className={`px-3 py-2 rounded-lg font-bold text-sm transition ${
                          isSelected
                            ? "bg-cyan-600 text-white"
                            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Range */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-400">
                  Typical Hours
                </label>
                <input
                  type="text"
                  value={formData.playHours}
                  onChange={(e) => setFormData({ ...formData, playHours: e.target.value })}
                  placeholder="e.g., 7pm - 11pm"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-cyan-900/20 border border-cyan-700/50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-cyan-300">
                  <strong>Profile Visibility:</strong> Your profile information helps with
                  auto-matching. The more complete your profile, the better your matches
                  will be!
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={() => router.back()}
                disabled={isSaving}
                className="flex-1 px-6 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-bold transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-xl font-bold transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
