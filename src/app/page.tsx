"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swords, Trophy, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="glass glow-border rounded-2xl p-12 max-w-4xl w-full text-center"
      >
        <h1 className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          BRAINROT DUEL ARENA
        </h1>
        <p className="text-gray-400 text-xl mb-8">The ultimate competitive esports platform for Roblox Steal a Brainrot.</p>
        
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform">
            <Swords className="w-5 h-5" /> Login to Fight
          </Link>
          <Link href="/register" className="bg-gray-800 border border-gray-700 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-700 transition-colors">
            Register
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-12">
          <div className="flex flex-col items-center">
            <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
            <h3 className="font-bold">Climb Ranks</h3>
            <p className="text-gray-500 text-sm">ELO & Leaderboards</p>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="font-bold">AI Verified</h3>
            <p className="text-gray-500 text-sm">No Scams</p>
          </div>
          <div className="flex flex-col items-center">
            <Swords className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="font-bold">Safe Escrow</h3>
            <p className="text-gray-500 text-sm">Middleman Protected</p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}