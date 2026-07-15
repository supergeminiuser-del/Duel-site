"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swords, Trophy, Crosshair, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen grid-bg flex flex-col items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-border pb-4 mb-8">
          <h1 className="text-2xl font-bold tracking-tight">
            BRAINROT <span className="text-accent">DUEL</span>
          </h1>
          <div className="flex gap-2">
            <Link href="/login" className="px-4 py-2 text-sm font-medium border border-border hover:bg-secondary transition-colors">
              Войти
            </Link>
            <Link href="/register" className="px-4 py-2 text-sm font-bold bg-white text-black hover:bg-gray-300 transition-colors flex items-center gap-1">
              Регистрация <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border mb-8">
          <div className="bcard p-6 flex flex-col justify-between h-40">
            <span className="text-xs text-gray-500 uppercase tracking-widest">Активные дуэли</span>
            <span className="text-5xl font-bold text-white">1,248</span>
          </div>
          <div className="bcard p-6 flex flex-col justify-between h-40">
            <span className="text-xs text-gray-500 uppercase tracking-widest">Игроков онлайн</span>
            <span className="text-5xl font-bold text-accent glow-green">342</span>
          </div>
          <div className="bcard p-6 flex flex-col justify-between h-40">
            <span className="text-xs text-gray-500 uppercase tracking-widest">Объем рынка</span>
            <span className="text-5xl font-bold text-white">12.4M</span>
          </div>
        </div>

        {/* Action Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bcard p-8 hover:border-accent transition-colors group cursor-pointer">
            <div className="flex justify-between items-center mb-4">
              <Crosshair className="w-8 h-8 text-accent" />
              <span className="text-xs text-gray-500">PVP 1x1</span>
            </div>
            <h2 className="text-xl font-bold mb-2">Создать дуэль</h2>
            <p className="text-sm text-gray-500 mb-6">Выбери свой Brainrot, выбери условия и брось вызов другому игроку.</p>
            <Link href="/duels/create" className="inline-flex items-center gap-2 text-sm font-bold text-accent group-hover:gap-3 transition-all">
              НАЧАТЬ ПОЕДИНОК <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bcard p-8 hover:border-white transition-colors group cursor-pointer">
            <div className="flex justify-between items-center mb-4">
              <Trophy className="w-8 h-8 text-white" />
              <span className="text-xs text-gray-500">Рейтинг</span>
            </div>
            <h2 className="text-xl font-bold mb-2">Топ игроков</h2>
            <p className="text-sm text-gray-500 mb-6">Соревнуйся, побеждай и поднимай свой MMR в глобальной таблице лидеров.</p>
            <Link href="/leaderboard" className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all">
              ТАБЛИЦА ЛИДЕРОВ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-700 font-mono">
          SYSTEM STATUS: ONLINE | SECURE ESCROW ACTIVE
        </div>
      </motion.div>
    </main>
  );
}