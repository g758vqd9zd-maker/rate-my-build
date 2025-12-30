"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Flame, AlertCircle, Loader2, Trophy, Target, Zap, Sparkles, TrendingUp, Copy, Check } from "lucide-react";
import { useRouter } from "next/navigation";

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

// Meta build database by game
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
  notes: string
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

  // Get meta build for this game
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
  const [game, setGame] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [buildType, setBuildType] = useState("");
  const [roastMode, setRoastMode] = useState("Savage");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [revealStage, setRevealStage] = useState(0);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [showShareCard, setShowShareCard] = useState(false);
  const [copied, setCopied] = useState(false);

  const availableClasses = game ? classes[game as keyof typeof classes] || [] : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setRevealStage(0);
    setAiResponse(null);

    // Stage 1: Analyzing (3 seconds)
    setTimeout(() => {
      const mockResponse = generateMockResponse(title, game, characterClass, buildType, roastMode, notes);
      setAiResponse(mockResponse);
      setIsAnalyzing(false);
      
      // Stage 2: Rating reveal (1 second delay)
      setTimeout(() => setRevealStage(1), 500);
      
      // Stage 3: Roast reveal (1.5 seconds after rating)
      setTimeout(() => setRevealStage(2), 2500);
      
      // Stage 4: Analysis reveal (1 second after roast)
      setTimeout(() => setRevealStage(3), 4000);
      
      // Stage 5: Meta build reveal (1 second after analysis)
      setTimeout(() => setRevealStage(4), 5500);
      
      // Stage 6: Share card (2 seconds after everything)
      setTimeout(() => setShowShareCard(true), 8000);
      
    }, 3000);
  };

  const handleShare = () => {
    const shareText = `I just rated my ${title} build and got ${aiResponse?.rating}/10! 🔥`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen text-white pt-12 pb-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-purple-950/30 to-black pointer-events-none" />
      
      {/* Dynamic particles during reveal */}
      {revealStage > 0 && aiResponse && (
        <div className="fixed inset-0 -z-10 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 100,
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
                  Your build will be public and shareable
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
              {/* STAGE 1: RATING REVEAL - EPIC ENTRANCE */}
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
                    {/* Glow effect */}
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
                      {/* Animated background rays */}
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
                          {/* Animated rating number */}
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
                        
                        {/* Meta badge with entrance */}
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

              {/* STAGE 2: THE ROAST - DRAMATIC REVEAL */}
              <AnimatePresence>
                {revealStage >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="relative"
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 40px rgba(249, 115, 22, 0.4)',
                          '0 0 80px rgba(249, 115, 22, 0.6)',
                          '0 0 40px rgba(249, 115, 22, 0.4)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl blur-2xl"
                    />
                    
                    <div className="relative bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-orange-500 rounded-2xl p-8 backdrop-blur-xl overflow-hidden">
                      {/* Fire effect background */}
                      <motion.div
                        animate={{ 
                          backgroundPosition: ['0% 0%', '100% 100%']
                        }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
                          backgroundSize: '30px 30px'
                        }}
                      />
                      
                      <div className="relative z-10">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.2, 1] }}
                          transition={{ duration: 0.5 }}
                          className="flex items-center justify-center gap-3 mb-6"
                        >
                          <Flame className="w-8 h-8 text-orange-400" />
                          <h3 className="text-3xl font-black text-orange-400">THE ROAST</h3>
                          <Flame className="w-8 h-8 text-orange-400" />
                        </motion.div>
                        
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-2xl text-white leading-relaxed italic text-center font-semibold"
                        >
                          "{aiResponse.roast}"
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* STAGE 3: ANALYSIS - SEQUENTIAL REVEALS */}
              <AnimatePresence>
                {revealStage >= 3 && (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Strengths */}
                      <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="bg-zinc-900/70 border border-green-500/30 rounded-2xl p-6 backdrop-blur-xl"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center gap-2 mb-4"
                        >
                          <Trophy className="w-6 h-6 text-green-400" />
                          <h3 className="text-2xl font-bold text-green-400">Strengths</h3>
                        </motion.div>
                        <ul className="space-y-3">
                          {aiResponse.strengths.map((s, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              className="text-zinc-300 flex items-start gap-2"
                            >
                              <span className="text-green-400 mt-1 text-xl">✓</span>
                              <span>{s}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      {/* Weaknesses */}
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                        className="bg-zinc-900/70 border border-red-500/30 rounded-2xl p-6 backdrop-blur-xl"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4 }}
                          className="flex items-center gap-2 mb-4"
                        >
                          <Target className="w-6 h-6 text-red-400" />
                          <h3 className="text-2xl font-bold text-red-400">Weaknesses</h3>
                        </motion.div>
                        <ul className="space-y-3">
                          {aiResponse.weaknesses.map((w, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className="text-zinc-300 flex items-start gap-2"
                            >
                              <span className="text-red-400 mt-1 text-xl">✗</span>
                              <span>{w}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>

                    {/* Improvements */}
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-zinc-900/70 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center gap-2 mb-4"
                      >
                        <Zap className="w-6 h-6 text-cyan-400" />
                        <h3 className="text-2xl font-bold text-cyan-400">Recommended Improvements</h3>
                      </motion.div>
                      <ul className="space-y-3">
                        {aiResponse.improvements.map((imp, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + i * 0.1 }}
                            className="text-zinc-300 flex items-start gap-3"
                          >
                            <span className="text-cyan-400 font-bold mt-0.5 text-lg">{i + 1}.</span>
                            <span>{imp}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* STAGE 4: META BUILD RECOMMENDATION - THE ULTIMATE REVEAL */}
              <AnimatePresence>
                {revealStage >= 4 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="relative"
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 60px rgba(168, 85, 247, 0.4)',
                          '0 0 100px rgba(168, 85, 247, 0.7)',
                          '0 0 60px rgba(168, 85, 247, 0.4)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl blur-3xl"
                    />
                    
                    <div className="relative bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500 rounded-2xl p-8 backdrop-blur-xl overflow-hidden">
                      {/* Sparkle effects */}
                      {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: [0, (Math.random() - 0.5) * 200],
                            y: [0, (Math.random() - 0.5) * 200],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                          className="absolute w-2 h-2 bg-purple-400 rounded-full"
                          style={{
                            left: '50%',
                            top: '50%',
                          }}
                        />
                      ))}
                      
                      <div className="relative z-10">
                        <motion.div
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-center mb-6"
                        >
                          <div className="flex items-center justify-center gap-3 mb-3">
                            <Sparkles className="w-8 h-8 text-purple-400" />
                            <h3 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                              CURRENT META BUILD
                            </h3>
                            <Sparkles className="w-8 h-8 text-purple-400" />
                          </div>
                          <p className="text-zinc-400">What the pros are running in {game}</p>
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                          className="bg-black/40 rounded-xl p-6 mb-4"
                        >
                          <h4 className="text-2xl font-bold text-purple-300 mb-3">
                            {aiResponse.metaBuild.title}
                          </h4>
                          <p className="text-zinc-300 leading-relaxed mb-4">
                            {aiResponse.metaBuild.summary}
                          </p>

                          <div className="mb-4">
                            <h5 className="text-sm font-bold text-purple-400 mb-2 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4" />
                              KEY ITEMS / SETUP
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {aiResponse.metaBuild.keyItems.map((item, i) => (
                                <motion.span
                                  key={i}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.7 + i * 0.1 }}
                                  className="px-3 py-1 bg-purple-600/30 border border-purple-500/50 rounded-lg text-sm font-semibold text-purple-200"
                                >
                                  {item}
                                </motion.span>
                              ))}
                            </div>
                          </div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="bg-purple-900/30 border border-purple-700/50 rounded-lg p-4"
                          >
                            <h5 className="text-sm font-bold text-purple-300 mb-2">WHY IT WORKS</h5>
                            <p className="text-zinc-300 text-sm leading-relaxed">
                              {aiResponse.metaBuild.whyItWorks}
                            </p>
                          </motion.div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                          className="text-center text-sm text-zinc-500"
                        >
                          💡 Compare your build to the meta to identify gaps
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* STAGE 5: SHARE CARD */}
              <AnimatePresence>
                {showShareCard && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring" }}
                    className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-700/50 rounded-2xl p-6 text-center"
                  >
                    <h3 className="text-2xl font-bold mb-4">Share Your Results!</h3>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold transition"
                      >
                        {copied ? (
                          <>
                            <Check className="w-5 h-5" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-5 h-5" />
                            Copy Result
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          const buildId = `build_${Date.now()}`;
                          router.push(`/build/${buildId}`);
                        }}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition"
                      >
                        View Full Details →
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