'use client';

import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧠</span>
            <h1 className="text-2xl font-bold tracking-tight">OmniConsult</h1>
          </div>
          <div className="flex items-center gap-8 text-sm">
            <a href="#features" className="hover:text-emerald-400 transition">Features</a>
            <a href="#how" className="hover:text-emerald-400 transition">How it Works</a>
            <a href="#experts" className="hover:text-emerald-400 transition">Experts</a>
            <button 
              onClick={() => window.location.href = '/app'} 
              className="bg-white text-black px-6 py-2.5 rounded-2xl font-medium hover:bg-zinc-200 transition"
            >
              Try Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-24 max-w-5xl mx-auto text-center px-6">
        <div className="inline-flex items-center gap-2 bg-zinc-900 rounded-full px-4 py-1.5 text-sm mb-6">
          <span className="text-emerald-400">●</span> Now Live
        </div>
        <h1 className="text-7xl font-bold tracking-tighter leading-tight mb-6">
          Your Personal<br />
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">AI Expert Network</span>
        </h1>
        <p className="text-2xl text-zinc-400 max-w-2xl mx-auto mb-10">
          Talk to world-class AI doctors, financial advisors, lawyers, real estate experts — anytime, in voice or video.
        </p>

        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => window.location.href = '/app'} 
            className="bg-white text-black px-10 py-4 rounded-2xl text-xl font-semibold hover:bg-zinc-200 transition"
          >
            Start Free Consultation
          </button>
          <button className="border border-zinc-700 px-10 py-4 rounded-2xl text-xl font-medium hover:bg-zinc-900 transition">
            Watch Demo
          </button>
        </div>

        <p className="text-xs text-zinc-500 mt-6">No credit card required • Cancel anytime</p>
      </div>

      {/* Features */}
      <div id="features" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-5xl font-bold text-center mb-16">Why OmniConsult?</h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            { title: "Instant Expert Switch", desc: "One app. Any profession. Doctor, Finance, Real Estate, Lawyer & more." },
            { title: "Real Voice & Video", desc: "Speak naturally. Get responses in natural voice. Video mode coming soon." },
            { title: "Deep Context Awareness", desc: "Understands current events, your history, and gives personalized advice." },
          ].map((f, i) => (
            <div key={i} className="bg-zinc-900 p-8 rounded-3xl">
              <div className="text-4xl mb-6">🚀</div>
              <h3 className="text-2xl font-semibold mb-3">{f.title}</h3>
              <p className="text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center py-20 border-t border-zinc-800">
        <h2 className="text-4xl font-bold mb-6">Ready to talk to an expert?</h2>
        <button 
          onClick={() => window.location.href = '/app'} 
          className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black px-12 py-5 rounded-2xl text-2xl font-semibold hover:brightness-110 transition"
        >
          Launch OmniConsult Now →
        </button>
      </div>
    </div>
  );
}