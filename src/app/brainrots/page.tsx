"use client";
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const brainrots = [
  { name: "Tung Tung Sahur", rarity: "Legendary", income: "125K/sec", value: "50.0M" },
  { name: "Brr Brr Patapim", rarity: "Mythic", income: "250K/sec", value: "120.0M" },
  { name: "Lirili Larila", rarity: "Epic", income: "45K/sec", value: "15.5M" },
  { name: "Tralero Tralala", rarity: "Rare", income: "12K/sec", value: "2.1M" },
];

export default function BrainrotDatabase() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Brainrot Database</h1>
          <div className="relative w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input placeholder="Search..." className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2 pl-10 focus:outline-none focus:border-purple-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brainrots.map((b, i) => (
            <motion.div key={b.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <div className={`glass p-4 rounded-2xl hover:glow-border transition-all cursor-pointer ${b.rarity === 'Mythic' ? 'border-blue-500' : b.rarity === 'Legendary' ? 'border-yellow-500' : 'border-gray-700'}`}>
                <div className="aspect-square rounded-xl bg-gray-900 mb-4 flex items-center justify-center text-gray-600">
                  No Image
                </div>
                <h3 className="font-bold text-lg">{b.name}</h3>
                <p className="text-xs text-gray-500 uppercase mb-3">{b.rarity}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Income:</span>
                  <span className="text-green-400 font-medium">{b.income}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-400">Value:</span>
                  <span className="text-purple-400 font-medium">{b.value}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}