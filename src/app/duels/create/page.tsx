"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Swords } from 'lucide-react';

export default function CreateDuel() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <main className="min-h-screen p-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="glass glow-border rounded-2xl p-8 max-w-2xl w-full"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Create a Duel</h1>
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 mb-2 block">Select Brainrot</label>
            <select className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-purple-500">
              <option>Tung Tung Sahur</option>
              <option>Brr Brr Patapim</option>
              <option>Lirili Larila</option>
            </select>
          </div>
          <div>
            <label className="text-gray-400 mb-2 block">Select Trait</label>
            <select className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-purple-500">
              <option>None</option>
              <option>Strawberry</option>
              <option>Golden</option>
            </select>
          </div>
          <div>
            <label className="text-gray-400 mb-2 block">Select Mutation</label>
            <select className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-purple-500">
              <option>Normal</option>
              <option>Rainbow</option>
              <option>Diamond</option>
            </select>
          </div>
          <button onClick={handleCreate} disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-xl font-bold flex items-center justify-center gap-2">
            <Swords className="w-5 h-5" /> {loading ? 'Creating...' : 'Publish Duel'}
          </button>
        </div>
      </motion.div>
    </main>
  );
}