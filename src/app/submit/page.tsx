"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { Save, Flame, AlertCircle, Loader2, Trophy, Target, Zap, Sparkles, TrendingUp, Copy, Check, Eye, EyeOff } from "lucide-react";

const games = [
  "Path of Exile 2",
  "Path of Exile",
  "Last Epoch",
  "Diablo IV",
  "Grim Dawn",
  "World of Warcraft",
  "Destiny 2",
];

const classes = {
  "Path of Exile 2": ["Champion", "Juggernaut", "Deadeye", "Elementalist", "Warden", "Monk", "Ranger", "Sorceress", "Mercenary"],
  "Path of Exile": ["Champion", "Trickster", "Necromancer", "Elementalist", "Slayer", "Chieftain", "Occultist"],
  "Last Epoch": ["Sentinel", "Acolyte", "Mage", "Primalist", "Rogue", "Falconer", "Runemaster"],
  "Diablo IV": ["Barbarian", "Druid", "Necromancer", "Rogue", "Sorcerer", "Spiritborn"],
  "Grim Dawn": ["Soldier", "Demolitionist", "Occultist", "Nightblade", "Arcanist", "Shaman"],
  "World of Warcraft": ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Death Knight", "Shaman", "Mage", "Warlock", "Monk", "Druid", "Demon Hunter", "Evoker"],
  "Destiny 2": ["Titan", "Hunter", "Warlock"],
};

const buildTypes = ["PvE", "PvP", "Endgame", "Casual", "Speedrun"];
const roastModes = ["Friendly", "Savage", "Drill Sergeant", "Meme Lord"];

// NEW: Intent Tags
const intentTags = [
  "Casual",
  "Competitive",
  "Tryhard",
  "Learning",
  "Speedrun",
  "Chill",
  "Hardcore",
  "Helpful",
];

interface AIResponse {
  rating: number;
  meta: string;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  roast: string;
  metaBuild: {
    title: string;
    summary: string;
    keyItems: string[];
    whyItWorks: string;
  };
}

const metaBuilds: Record<string, any> = {
  "Path of Exile 2": {
    title: "Lightning Arrow Deadeye",
    summary: "Current S-tier build dominating endgame with insane clear speed and single-target damage",
    keyItems: ["Hyrri's Ire", "Lightning Coil", "Call of the Brotherhood", "Dying Sun Flask"],
    whyItWorks: "Chain mechanics + projectile speed = screen-wide coverage. Scales infinitely with gear.",
  },
  "Destiny 2": {
    title: "Strand Hunter (Threaded Specter)",
    summary: "Meta PvP build with unmatched neutral game and survivability",
    keyItems: ["Gyrfalcon's Hauberk", "Conditional Finality", "100 Mobility / 70 Resilience"],
    whyItWorks: "Invisibility on demand, one-shot potential, and insane movement. Dominates Trials.",
  },
  "World of Warcraft": {
    title: "Augmentation Evoker (Raid Meta)",
    summary: "Most sought-after spec for Mythic raiding and high keys",
    keyItems: ["4pc Tier Set", "Neltharion's Call to Chaos", "High Mastery/Haste"],
    whyItWorks: "Massive raid-wide DPS increase. Every group wants one. Best support spec in the game.",
  },
  "Diablo IV": {
    title: "Minion Necromancer (Season 7)",
    summary: "Unkillable army build clearing T100 Nightmare Dungeons",
    keyItems: ["Blood Moon Breeches", "Ring of Mendeln", "Harlequin Crest"],
    whyItWorks: "Minions scale with gear + passive damage. You just walk around while they destroy everything.",
  },
};

function generateMockResponse(
  title: string,
  game: string,
  characterClass: string,
  buildType: string,
  roastMode: string,
  notes: string,
  intentTags: string[]
): AIResponse {
  const baseRating = 5 + Math.floor(Math.random() * 4);
  const hasNotes = notes.length > 20 ? 1 : 0;
  const rating = Math.min(10, baseRating + hasNotes);
  const meta = rating >= 9 ? "S-Tier" : rating >= 7 ? "Meta" : "Off-Meta";

  const strengthPool = [
    `Strong ${characterClass} synergy with ${buildType} content`,
    `Excellent scaling potential in ${game}`,
    "Good balance between offense and defense",
    "Resource management is well optimized",
    "Smart use of class mechanics",
    "Solid gear choices for the build type",
  ];

  const weaknessPool = [
    "Could use more defensive layers",
    `Somewhat gear-dependent for ${buildType}`,
    "Mobility could be improved",
    "Vulnerable to certain damage types",
    "Single-target damage needs work",
    "May struggle with boss mechanics",
  ];

  const improvementPool = [
    `Consider adding [relevant skill/item] for better ${buildType} performance`,
    "Optimize your passive tree for more efficient pathing",
    "Add more resistance/armor for survivability",
    "Look into better flask setup for sustain",
    "Try incorporating [meta skill] for burst damage",
    "Balance your offensive and defensive stats better",
  ];

  const roasts = {
    Friendly: [
      `Nice effort on the ${characterClass} build! With a few tweaks, you'll be crushing ${buildType} content like a pro.`,
      `Your ${title} shows promise! Just needs a little love to reach its full potential.`,
      `Good foundation here! Once you refine it, this build will really shine in ${game}.`,
    ],
    Savage: [
      `This build is the gaming equivalent of bringing a knife to a raid boss fight. It's trying, but so is my patience.`,
      `Your ${characterClass} build looks like it was designed by someone who read the patch notes upside down.`,
      `I've seen better builds from people who thought ${characterClass} was a diet plan. Step it up.`,
      `This build hits about as hard as a wet noodle. A very confused, very lost wet noodle.`,
    ],
    "Drill Sergeant": [
      `LISTEN UP, SOLDIER! Your ${characterClass} is SOFT! Drop and give me 20 passive points PROPERLY allocated!`,
      `IS THIS A BUILD OR A CRY FOR HELP?! GET YOUR GEAR TOGETHER AND TRY AGAIN!`,
      `UNACCEPTABLE! This ${buildType} build needs DISCIPLINE! Rebuild it and make me PROUD!`,
    ],
    "Meme Lord": [
      `POV: You're trying to explain to your party why you died again. "It's the build I swear!" 💀`,
      `This build hits different... and by different I mean it doesn't hit at all. Skill issue? 🤔`,
      `Bro really said "${title}" and thought we wouldn't notice the copium. Touch grass, fix build, come back. ✌️`,
    ],
  };

  const roastOptions = roasts[roastMode as keyof typeof roasts] || roasts.Savage;
  const roast = roastOptions[Math.floor(Math.random() * roastOptions.length)];

  const strengths = strengthPool.sort(() => 0.5 - Math.random()).slice(0, 3);
  const weaknesses = weaknessPool.sort(() => 0.5 - Math.random()).slice(0, 3);
  const improvements = improvementPool.sort(() => 0.5 - Math.random()).slice(0, 4);

  const metaBuild = metaBuilds[game] || {
    title: "Meta Build Coming Soon",
    summary: "Check back later for the current meta build for this game!",
    keyItems: ["Updated regularly", "Community-driven", "Pro-tested"],
    whyItWorks: "We're tracking the latest patch notes and pro player strategies.",
  };

  return {
    rating,
    meta,
    strengths,
    weaknesses,
    improvements,
    roast,
    metaBuild,
  };
}

export default function SubmitBuild() {
  const router = useRouter();

  // Mock user - will come from auth later
  const isLoggedIn = true; // Change to false to see login requirement
  const currentUser = "ShadowGod42";

  const [game, setGame] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [buildType, setBuildType] = useState("");
  const [roastMode, setRoastMode] = useState("Savage");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  // NEW: Intent tags and visibility
  const [selectedIntents, setSelectedIntents] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(true);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [revealStage, setRevealStage] = useState(0);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [showShareCard, setShowShareCard] = useState(false);
  const [copied, setCopied] = useState(false);

  const availableClasses = game ? classes[game as keyof typeof classes] || [] : [];

  const handleIntentToggle = (tag: string) => {
    if (selectedIntents.includes(tag)) {
      setSelectedIntents(selectedIntents.filter((t) => t !== tag));
    } else {
      setSelectedIntents([...selectedIntents, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if logged in
    if (!isLoggedIn) {
      alert("Please login with Discord to submit builds!");
      return;
    }

    setIsAnalyzing(true);
    setRevealStage(0);
    setAiResponse(null);

    // Stage 1: Analyzing (3 seconds)
    setTimeout(() => {
      const mockResponse = generateMockResponse(title, game, characterClass, buildType, roastMode, notes, selectedIntents);
      setAiResponse(mockResponse);
      setIsAnalyzing(false);

      // Stage 2: Rating reveal
      setTimeout(() => setRevealStage(1), 500);
      setTimeout(() => setRevealStage(2), 2500);
      setTimeout(() => setRevealStage(3), 4000);
      setTimeout(() => setRevealStage(4), 5500);
      setTimeout(() => setShowShareCard(true), 8000);

    }, 3000);
  };

  const handleShare = () => {
    const shareText = `I just rated my ${title} build and got ${aiResponse?.rating}/10! 🔥`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleViewProfile = () => {
    router.push(`/profile/${currentUser}`);
  };

  const handleCreateLFG = () => {
    router.push("/lfg");
  };

  // If not logged in, show login requirement
  if (!isLoggedIn) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen text-white pt-12 pb-24 relative flex items-center justify-center">
          <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-purple-950/30 to-black" />

          <div className="max-w-md mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-12 backdrop-blur-xl"
            >
              <Flame className="w-20 h-20 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-black mb-4">Login Required</h2>
              <p className="text-zinc-400 mb-8">
                You need to login with Discord to submit builds and join the community
              </p>
              <button className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Login with Discord
              </button>
            </motion.div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen text-white pt-12 pb-24 relative overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-purple-950/30 to-black pointer-events-none" />

        {/* Dynamic particles during reveal */}
        {revealStage > 0 && aiResponse && (
          <div className="fixed inset-0 -z-10 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                  y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  y: -100,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                }}
                className={`absolute w-2 h-2 rounded-full ${
                  aiResponse.rating >= 9 ? 'bg-yellow-400' :
                  aiResponse.rating >= 7 ? 'bg-cyan-400' :
                  'bg-purple-400'
                }`}
              />
            ))}
          </div>
        )}

        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Rate My Build
            </h1>
            <p className="mt-4 text-xl text-zinc-400">Drop your setup. Get roasted. Get better.</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!aiResponse ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-8 md:p-12 backdrop-blur-xl space-y-8"
              >
                <div>
                  <label className="block text-lg font-bold mb-2">Build Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Explosive Arrow God-Roll Ballista"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition"
                    required
                    disabled={isAnalyzing}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-bold mb-2">Game</label>
                    <select
                      value={game}
                      onChange={(e) => {
                        setGame(e.target.value);
                        setCharacterClass("");
                      }}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 transition"
                      required
                      disabled={isAnalyzing}
                    >
                      <option value="">Select Game</option>
                      {games.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-bold mb-2">Class / Ascendancy</label>
                    <select
                      value={characterClass}
                      onChange={(e) => setCharacterClass(e.target.value)}
                      disabled={!game || isAnalyzing}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 transition disabled:opacity-50"
                      required
                    >
                      <option value="">Select Class</option>
                      {availableClasses.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-bold mb-2">Build Type</label>
                    <select
                      value={buildType}
                      onChange={(e) => setBuildType(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 transition"
                      required
                      disabled={isAnalyzing}
                    >
                      <option value="">Select Type</option>
                      {buildTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-bold mb-2">Roast Intensity</label>
                    <select
                      value={roastMode}
                      onChange={(e) => setRoastMode(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 transition"
                      disabled={isAnalyzing}
                    >
                      {roastModes.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* NEW: Intent Tags */}
                <div>
                  <label className="block text-lg font-bold mb-3">Intent / Playstyle Tags (Optional)</label>
                  <div className="flex flex-wrap gap-3">
                    {intentTags.map((tag) => {
                      const isSelected = selectedIntents.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleIntentToggle(tag)}
                          disabled={isAnalyzing}
                          className={`px-4 py-2 rounded-xl font-bold text-sm transition ${
                            isSelected
                              ? "bg-purple-600 text-white border-2 border-purple-400"
                              : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-purple-400 hover:text-white"
                          } disabled:opacity-50`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-sm text-zinc-500 mt-2">
                    Help others know what vibe this build is for
                  </p>
                </div>

                <div>
                  <label className="block text-lg font-bold mb-2">Notes / PoB / Skills / Gear</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Paste your Path of Building link, describe gear, skills, tree, or any relevant info..."
                    rows={6}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition resize-none"
                    disabled={isAnalyzing}
                  />
                </div>

                {/* NEW: Visibility Toggle */}
                <div>
                  <label className="block text-lg font-bold mb-3">Visibility</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setIsPublic(true)}
                      disabled={isAnalyzing}
                      className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold transition ${
                        isPublic
                          ? "bg-green-600 text-white border-2 border-green-400"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-green-400"
                      } disabled:opacity-50`}
                    >
                      <Eye className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-bold">Public</div>
                        <div className="text-xs opacity-80">Visible in community feed</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPublic(false)}
                      disabled={isAnalyzing}
                      className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold transition ${
                        !isPublic
                          ? "bg-zinc-600 text-white border-2 border-zinc-400"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-400"
                      } disabled:opacity-50`}
                    >
                      <EyeOff className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-bold">Private</div>
                        <div className="text-xs opacity-80">Only on your profile</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isAnalyzing}
                    className="w-full py-6 text-xl font-bold bg-gradient-to-r from-cyan-600 to-purple-700 rounded-xl hover:from-cyan-500 hover:to-purple-600 transition-all duration-300 shadow-xl shadow-purple-600/30 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-7 h-7 animate-spin" />
                        Analyzing Your Build...
                      </>
                    ) : (
                      <>
                        <Flame className="w-7 h-7 group-hover:scale-110 transition" />
                        Rate My Build (Get Roasted)
                      </>
                    )}
                  </button>

                  <p className="text-center mt-4 text-sm text-zinc-500 flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Build will be saved to your profile {isPublic ? "and community feed" : "(private)"}
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* STAGE 1: RATING REVEAL */}
                <AnimatePresence>
                  {revealStage >= 1 && (
                    <motion.div
                      initial={{ scale: 0, rotateY: 180 }}
                      animate={{ scale: 1, rotateY: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        duration: 1
                      }}
                      className="relative"
                    >
                      <motion.div
                        animate={{
                          boxShadow: [
                            `0 0 60px ${aiResponse.rating >= 9 ? 'rgba(234, 179, 8, 0.6)' : 'rgba(6, 182, 212, 0.6)'}`,
                            `0 0 100px ${aiResponse.rating >= 9 ? 'rgba(234, 179, 8, 0.8)' : 'rgba(6, 182, 212, 0.8)'}`,
                            `0 0 60px ${aiResponse.rating >= 9 ? 'rgba(234, 179, 8, 0.6)' : 'rgba(6, 182, 212, 0.6)'}`,
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-2xl blur-3xl"
                      />

                      <div className="relative bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500 rounded-2xl p-12 backdrop-blur-xl overflow-hidden">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 opacity-20"
                          style={{
                            background: `conic-gradient(from 0deg, transparent 0%, ${aiResponse.rating >= 9 ? '#fbbf24' : '#06b6d4'} 50%, transparent 100%)`
                          }}
                        />

                        <div className="relative z-10">
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-center mb-8"
                          >
                            <h2 className="text-3xl font-black text-white mb-2">YOUR BUILD RATING</h2>
                            <p className="text-zinc-400">{title}</p>
                          </motion.div>

                          <div className="flex items-center justify-center gap-8 mb-8">
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay: 0.6,
                                type: "spring",
                                stiffness: 300,
                                damping: 10
                              }}
                              className="relative"
                            >
                              <motion.div
                                animate={{
                                  scale: [1, 1.2, 1],
                                  rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                  delay: 1,
                                  duration: 0.5
                                }}
                                className="text-9xl font-black"
                                style={{
                                  background: aiResponse.rating >= 9
                                    ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                                    : 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.8))'
                                }}
                              >
                                {aiResponse.rating}
                              </motion.div>
                              <div className="absolute inset-0 text-9xl font-black blur-2xl opacity-50"
                                style={{
                                  background: aiResponse.rating >= 9
                                    ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                                    : 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                }}
                              >
                                {aiResponse.rating}
                              </div>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1 }}
                              className="text-6xl font-black text-zinc-600"
                            >
                              /10
                            </motion.div>
                          </div>

                          <motion.div
                            initial={{ scale: 0, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ delay: 1.2, type: "spring" }}
                            className="flex justify-center"
                          >
                            <motion.div
                              animate={{
                                boxShadow: [
                                  '0 0 20px rgba(0,0,0,0.5)',
                                  '0 0 40px rgba(6, 182, 212, 0.8)',
                                  '0 0 20px rgba(0,0,0,0.5)',
                                ]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-2xl border-2 ${
                                aiResponse.meta === "S-Tier"
                                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black border-yellow-400"
                                  : aiResponse.meta === "Meta"
                                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400"
                                  : "bg-gradient-to-r from-zinc-600 to-zinc-700 text-white border-zinc-500"
                              }`}
                            >
                              {aiResponse.meta === "S-Tier" && <Trophy className="w-8 h-8" />}
                              {aiResponse.meta}
                            </motion.div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* STAGE 2: THE ROAST */}
                <AnimatePresence>
                  {revealStage >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ type: "spring", stiffness: 100 }}
                      className="bg-gradient-to-br from-red-900/40 to-orange-900/40 border-2 border-red-500 rounded-2xl p-8 backdrop-blur-xl"
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <Flame className="w-12 h-12 text-orange-400 flex-shrink-0" />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-black text-red-400 mb-3">THE ROAST</h3>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-white leading-relaxed"
                          >
                            {aiResponse.roast}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* STAGE 3: ANALYSIS */}
                <AnimatePresence>
                  {revealStage >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 150 }}
                      className="bg-zinc-900/70 border border-zinc-700 rounded-2xl p-8 backdrop-blur-xl space-y-6"
                    >
                      <h3 className="text-2xl font-black text-cyan-400">DETAILED ANALYSIS</h3>

                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h4 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                          <Zap className="w-5 h-5" />
                          Strengths
                        </h4>
                        <ul className="space-y-2">
                          {aiResponse.strengths.map((s, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.3 + idx * 0.1 }}
                              className="flex items-start gap-3 text-zinc-300"
                            >
                              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                              {s}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h4 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          Weaknesses
                        </h4>
                        <ul className="space-y-2">
                          {aiResponse.weaknesses.map((w, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.6 + idx * 0.1 }}
                              className="flex items-start gap-3 text-zinc-300"
                            >
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                              {w}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <h4 className="text-lg font-bold text-purple-400 mb-3 flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Suggested Improvements
                        </h4>
                        <ul className="space-y-2">
                          {aiResponse.improvements.map((i, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.9 + idx * 0.1 }}
                              className="flex items-start gap-3 text-zinc-300"
                            >
                              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                              {i}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* STAGE 4: META BUILD COMPARISON */}
                <AnimatePresence>
                  {revealStage >= 4 && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 120 }}
                      className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-600 rounded-2xl p-8 backdrop-blur-xl"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="w-8 h-8 text-yellow-400" />
                        <h3 className="text-2xl font-black text-yellow-400">CURRENT META BUILD</h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-2">
                            {aiResponse.metaBuild.title}
                          </h4>
                          <p className="text-zinc-300 leading-relaxed">
                            {aiResponse.metaBuild.summary}
                          </p>
                        </div>

                        <div>
                          <h5 className="text-sm font-bold text-yellow-300 mb-2">KEY ITEMS</h5>
                          <div className="flex flex-wrap gap-2">
                            {aiResponse.metaBuild.keyItems.map((item, idx) => (
                              <motion.span
                                key={idx}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                className="px-3 py-1 bg-yellow-900/50 border border-yellow-600 rounded-lg text-sm text-yellow-200 font-semibold"
                              >
                                {item}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-zinc-900/50 rounded-xl p-4 border border-yellow-600/30">
                          <h5 className="text-sm font-bold text-yellow-300 mb-2">WHY IT WORKS</h5>
                          <p className="text-zinc-300 text-sm leading-relaxed">
                            {aiResponse.metaBuild.whyItWorks}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* STAGE 5: SHARE CARD */}
                <AnimatePresence>
                  {showShareCard && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500 rounded-2xl p-8 backdrop-blur-xl"
                    >
                      <div className="text-center space-y-6">
                        <h3 className="text-2xl font-black text-white">SHARE YOUR RATING</h3>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <button
                            onClick={handleShare}
                            className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold transition flex items-center justify-center gap-2"
                          >
                            {copied ? (
                              <>
                                <Check className="w-5 h-5" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-5 h-5" />
                                Copy Share Link
                              </>
                            )}
                          </button>

                          <button
                            onClick={handleViewProfile}
                            className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition flex items-center justify-center gap-2"
                          >
                            <Target className="w-5 h-5" />
                            View Profile
                          </button>

                          <button
                            onClick={handleCreateLFG}
                            className="px-8 py-4 bg-green-600 hover:bg-green-500 rounded-xl font-bold transition flex items-center justify-center gap-2"
                          >
                            <Sparkles className="w-5 h-5" />
                            Create LFG Post
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            setAiResponse(null);
                            setRevealStage(0);
                            setShowShareCard(false);
                            setTitle("");
                            setGame("");
                            setCharacterClass("");
                            setBuildType("");
                            setNotes("");
                            setSelectedIntents([]);
                            setIsPublic(true);
                          }}
                          className="text-zinc-400 hover:text-cyan-400 transition font-semibold"
                        >
                          Submit Another Build
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
