"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass glow-border rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="Username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-purple-500" required />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-purple-500" required />
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-purple-500" required />
          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl font-bold">Register</button>
        </form>
        <p className="text-center text-gray-400 mt-4">Already have an account? <Link href="/login" className="text-purple-400">Login</Link></p>
      </div>
    </div>
  );
}