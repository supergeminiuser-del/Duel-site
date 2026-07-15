"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Swords, Trophy, Zap } from 'lucide-react';

export default function Dashboard() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="glass glow-border rounded-2xl p-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Duelist</h1>
            <p className="text-gray-400 mt-2">Ready to claim your throne?</p>
          </div>
          <Link href="/duels/create" className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform">
            <Swords className="w-5 h-5" /> Create Duel
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-6">
            <Trophy className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold">Wins</h3>
            <p className="text-3xl text-purple-400 mt-2">0</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <Zap className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold">ELO Rating</h3>
            <p className="text-3xl text-blue-400 mt-2">1000</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <Swords className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold">Active Duels</h3>
            <p className="text-3xl text-gray-300 mt-2">0</p>
          </div>
        </div>
      </div>
    </main>
  );
}