'use client';

import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const personas = [
  { id: 'finance', name: 'Alex Rivera, CFA', title: 'Senior Investment Strategist', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: 'doctor', name: 'Dr. Sarah Chen', title: 'Internal Medicine & Cardiology', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 'realestate', name: 'Mia Thompson', title: 'Luxury Real Estate Advisor', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { id: 'lawyer', name: 'James Mitchell Esq.', title: 'Corporate & Family Attorney', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' },
];

export default function OmniConsult() {
  const [selectedPersona, setSelectedPersona] = useState('finance');
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAudioCall, setIsAudioCall] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);

  const currentPersona = personas.find(p => p.id === selectedPersona)!;
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Memory - Persistent across persona changes (basic version)
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: `Hello, I'm ${currentPersona.name}, ${currentPersona.title}. How can I help you with your situation today?`
      }]);
    }
  }, [selectedPersona]);

  useEffect(() => {
    if (transcript && isAudioCall) {
      sendMessage(transcript);
      resetTranscript();
    }
  }, [transcript]);

  const sendMessage = async (voiceInput?: string) => {
    const text = voiceInput || input;
    if (!text.trim() || isLoading) return;

    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'assistant', content: 'Analyzing your request...' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: newMessages, 
          persona: `${currentPersona.name} - ${currentPersona.title}` 
        }),
      });

      const data = await res.json();
      const reply = data.reply;

      setMessages(prev => prev.filter(m => m.content !== 'Analyzing your request...'));
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

      const utterance = new SpeechSynthesisUtterance(reply);
      utterance.rate = 0.93;
      window.speechSynthesis.speak(utterance);

    } catch (e) {
      setMessages(prev => prev.filter(m => m.content !== 'Analyzing your request...'));
      setMessages(prev => [...prev, { role: 'assistant', content: "I apologize, please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-96 bg-zinc-950 border-r border-zinc-800 p-8 overflow-auto">
        <h1 className="text-5xl font-bold mb-2">OmniConsult</h1>
        <p className="text-emerald-400 mb-10">Your Personal Expert Network</p>

        <h3 className="uppercase text-xs tracking-widest text-zinc-500 mb-6">EXPERTS</h3>
        {personas.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedPersona(p.id)}
            className={`w-full p-6 rounded-3xl mb-4 flex gap-6 transition-all ${selectedPersona === p.id ? 'bg-white text-black scale-105' : 'hover:bg-zinc-900'}`}
          >
            <img src={p.avatar} className="w-20 h-20 rounded-2xl" />
            <div className="text-left">
              <div className="font-semibold text-2xl">{p.name}</div>
              <div className="text-zinc-400">{p.title}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Premium Consultation Room */}
      <div className="flex-1 flex flex-col">
        <div className="h-[560px] bg-zinc-950 relative flex items-center justify-center">
          <div className="text-center z-10">
            <img src={currentPersona.avatar} className="w-80 h-80 rounded-full mx-auto mb-10 shadow-[0_0_60px_rgb(16,185,129)]" />
            <h2 className="text-5xl font-bold mb-3">{currentPersona.name}</h2>
            <p className="text-2xl text-emerald-400">{currentPersona.title}</p>
          </div>

          {(isAudioCall || isVideoCall) && (
            <div className="absolute bottom-16 bg-red-600 px-12 py-5 rounded-2xl text-2xl font-medium">
              {isVideoCall ? "📹 LIVE VIDEO CONSULTATION" : "🎤 LIVE AUDIO CONSULTATION"}
            </div>
          )}
        </div>

        <div className="flex-1 p-10 overflow-auto space-y-8">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : ''}`}>
              <div className={`max-w-3xl px-8 py-7 rounded-3xl text-lg ${m.role === 'user' ? 'bg-blue-600' : 'bg-zinc-900 border border-zinc-800'}`}>
                {m.content}
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 border-t border-zinc-800 bg-zinc-950">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button onClick={() => setIsAudioCall(!isAudioCall)} className="py-7 text-xl font-semibold rounded-3xl bg-emerald-600 hover:bg-emerald-500">
              {isAudioCall ? "End Audio Call" : "🎤 Start Audio Call"}
            </button>
            <button onClick={() => setIsVideoCall(!isVideoCall)} className="py-7 text-xl font-semibold rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600">
              {isVideoCall ? "End Video Call" : "📹 Start Video Call"}
            </button>
          </div>

          <div className="flex gap-4">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask your question..."
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-3xl px-8 py-7 text-lg"
            />
            <button onClick={() => sendMessage()} className="bg-blue-600 px-16 rounded-3xl font-semibold text-lg">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}