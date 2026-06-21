'use client';

import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧠</span>
            <h1 className="text-2xl font-bold">OmniConsult</h1>
          </div>
          <div className="flex items-center gap-8">
            <a href="#features" className="hover:text-emerald-400 transition">Features</a>
            <a href="#experts" className="hover:text-emerald-400 transition">Experts</a>
            <button 
              onClick={() => window.location.href = '/app'}
              className="bg-white text-black px-6 py-2.5 rounded-2xl font-medium hover:bg-zinc-200 transition"
            >
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 text-center px-6 max-w-5xl mx-auto">
        <div className="inline-flex bg-emerald-500/10 text-emerald-400 text-sm px-4 py-1.5 rounded-full mb-6">
          Your Universal AI Expert
        </div>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
          Talk to Any Expert.<br />
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Anytime.
          </span>
        </h1>
        <p className="text-2xl text-zinc-400 max-w-2xl mx-auto mb-10">
          Doctor, Finance Advisor, Real Estate Agent, Lawyer — all in one powerful AI platform with voice & video.
        </p>

        <button 
          onClick={() => window.location.href = '/app'}
          className="bg-white text-black text-xl px-10 py-5 rounded-2xl font-semibold hover:bg-zinc-100 transition"
        >
          Start Free Consultation →
        </button>
      </div>

      {/* Features */}
      <div id="features" className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        {[
          ["🎤 Voice & Video", "Natural conversations with lifelike AI experts"],
          ["🔄 Switch Instantly", "Change from Doctor to Finance Advisor in one click"],
          ["🧠 Deep Intelligence", "Real-time knowledge + full context awareness"],
        ].map(([title, desc], i) => (
          <div key={i} className="bg-zinc-900 p-8 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-4">{title}</h3>
            <p className="text-zinc-400">{desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center py-16 border-t border-zinc-800">
        <h2 className="text-4xl font-bold mb-6">Ready to talk to your expert?</h2>
        <button 
          onClick={() => window.location.href = '/app'}
          className="bg-gradient-to-r from-emerald-500 to-cyan-400 text-black px-12 py-5 rounded-2xl text-2xl font-semibold"
        >
          Open OmniConsult
        </button>
      </div>
    </div>
  );
}