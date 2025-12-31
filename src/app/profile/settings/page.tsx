'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  MapPin,
  Calendar,
  Globe,
  Clock,
  Save,
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  Shield,
  Bell,
  Link as LinkIcon
} from 'lucide-react';

export default function ProfileSettingsPage() {
  // Form state
  const [formData, setFormData] = useState({
    displayName: 'ShadowGod42',
    bio: 'Endgame grinder | Build theorycrafter | Always looking for a solid squad',
    location: 'North America',
    timezone: 'EST',
    mainGame: 'Destiny 2',
    discordTag: 'ShadowGod42#1234',
    availability: 'Evenings & Weekends (EST)',
    twitchUrl: '',
    youtubeUrl: '',
    twitterUrl: ''
  });

  const [intentTags, setIntentTags] = useState(['DPS', 'Endgame', 'Raids', 'Competitive']);
  const [playstyle, setPlaystyle] = useState(['Aggressive', 'Meta-focused', 'Team Player']);
  const [newTag, setNewTag] = useState('');
  const [newStyle, setNewStyle] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Available options
  const availableIntentTags = [
    'DPS', 'Tank', 'Support', 'Healer',
    'PvP', 'PvE', 'Raids', 'Dungeons',
    'Endgame', 'Casual', 'Competitive', 'Speedrun',
    'Solo', 'Group', 'Teaching', 'Learning'
  ];

  const availablePlaystyles = [
    'Aggressive', 'Defensive', 'Balanced',
    'Meta-focused', 'Off-meta', 'Experimental',
    'Team Player', 'Solo Player', 'Leader',
    'Min-Maxer', 'Casual', 'Hardcore'
  ];

  const timezones = ['EST', 'CST', 'MST', 'PST', 'GMT', 'CET', 'JST', 'AEST'];

  const locations = [
    'North America', 'South America', 'Europe',
    'Asia', 'Oceania', 'Africa', 'Middle East'
  ];

  const games = [
    'Destiny 2', 'World of Warcraft', 'Path of Exile 2',
    'Apex Legends', 'League of Legends', 'Valorant',
    'Diablo 4', 'Elden Ring', 'Monster Hunter'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addIntentTag = (tag: string) => {
    if (!intentTags.includes(tag)) {
      setIntentTags([...intentTags, tag]);
    }
    setNewTag('');
  };

  const removeIntentTag = (tag: string) => {
    setIntentTags(intentTags.filter(t => t !== tag));
  };

  const addPlaystyle = (style: string) => {
    if (!playstyle.includes(style)) {
      setPlaystyle([...playstyle, style]);
    }
    setNewStyle('');
  };

  const removePlaystyle = (style: string) => {
    setPlaystyle(playstyle.filter(s => s !== style));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
          <p className="text-gray-400">Customize your profile and gaming preferences</p>
        </motion.div>

        {/* Settings Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >

          {/* Avatar Section */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" />
              Profile Picture
            </h2>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-4xl font-bold">
                {formData.displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Upload Image
                </button>
                <p className="text-sm text-gray-400 mt-2">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" />
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => handleInputChange('displayName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="Your display name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell others about yourself..."
                />
                <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/200 characters</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Timezone
                  </label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                  >
                    {timezones.map(tz => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Gaming Info */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              Gaming Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Main Game
                </label>
                <select
                  value={formData.mainGame}
                  onChange={(e) => handleInputChange('mainGame', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                >
                  {games.map(game => (
                    <option key={game} value={game}>{game}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Availability
                </label>
                <input
                  type="text"
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="e.g., Evenings & Weekends (EST)"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Discord Tag
                </label>
                <input
                  type="text"
                  value={formData.discordTag}
                  onChange={(e) => handleInputChange('discordTag', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="YourName#1234"
                />
              </div>
            </div>
          </div>

          {/* Intent Tags */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              Intent Tags
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Select tags that describe your gaming interests and playstyle
            </p>

            {/* Current Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {intentTags.map(tag => (
                <div
                  key={tag}
                  className="flex items-center gap-2 px-3 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/30"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => removeIntentTag(tag)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Tag */}
            <div className="flex flex-wrap gap-2">
              {availableIntentTags
                .filter(tag => !intentTags.includes(tag))
                .map(tag => (
                  <button
                    key={tag}
                    onClick={() => addIntentTag(tag)}
                    className="px-3 py-2 bg-gray-800 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 rounded-lg border border-gray-700 hover:border-cyan-500/30 transition-all duration-300 text-sm"
                  >
                    + {tag}
                  </button>
                ))}
            </div>
          </div>

          {/* Playstyle */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              Playstyle Preferences
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Choose tags that describe how you like to play
            </p>

            {/* Current Styles */}
            <div className="flex flex-wrap gap-2 mb-4">
              {playstyle.map(style => (
                <div
                  key={style}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/30"
                >
                  <span>{style}</span>
                  <button
                    onClick={() => removePlaystyle(style)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Style */}
            <div className="flex flex-wrap gap-2">
              {availablePlaystyles
                .filter(style => !playstyle.includes(style))
                .map(style => (
                  <button
                    key={style}
                    onClick={() => addPlaystyle(style)}
                    className="px-3 py-2 bg-gray-800 hover:bg-purple-500/20 text-gray-400 hover:text-purple-400 rounded-lg border border-gray-700 hover:border-purple-500/30 transition-all duration-300 text-sm"
                  >
                    + {style}
                  </button>
                ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-cyan-400" />
              Social Links
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Twitch
                </label>
                <input
                  type="text"
                  value={formData.twitchUrl}
                  onChange={(e) => handleInputChange('twitchUrl', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="https://twitch.tv/yourname"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  YouTube
                </label>
                <input
                  type="text"
                  value={formData.youtubeUrl}
                  onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="https://youtube.com/@yourname"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Twitter/X
                </label>
                <input
                  type="text"
                  value={formData.twitterUrl}
                  onChange={(e) => handleInputChange('twitterUrl', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="https://twitter.com/yourname"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Save className="w-5 h-5" />
                  </motion.div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>

            <button className="px-6 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold transition-all duration-300">
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
