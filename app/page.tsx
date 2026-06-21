'use client';

import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const personas = [
  { id: 'finance', name: 'Alex Rivera, CFA', title: 'Senior Investment Strategist', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: 'doctor', name: 'Dr. Sarah Chen', title: 'Internal Medicine', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
];

export default function OmniConsult() {
  const [selectedPersona, setSelectedPersona] = useState('finance');
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAudioCall, setIsAudioCall] = useState(false);

  const currentPersona = personas.find(p => p.id === selectedPersona)!;
  const { transcript, resetTranscript } = useSpeechRecognition();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: `Hi, I'm ${currentPersona.name}. ${currentPersona.title}. How can I help you today?`
    }]);
  }, [selectedPersona]);

  const sendMessage = async (voiceInput?: string) => {
    const text = voiceInput || input;
    if (!text.trim() || isLoading) return;

    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'assistant', content: 'Thinking...' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: newMessages, 
          persona: currentPersona.name 
        }),
      });

      const data = await res.json();
      const reply = data.reply || "Sorry, please try again.";

      setMessages(prev => prev.filter(m => m.content !== 'Thinking...'));
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

      const utterance = new SpeechSynthesisUtterance(reply);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setMessages(prev => prev.filter(m => m.content !== 'Thinking...'));
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAudioCall = () => {
    if (!isAudioCall) {
      SpeechRecognition.startListening({ continuous: true });
      setIsAudioCall(true);
    } else {
      SpeechRecognition.stopListening();
      setIsAudioCall(false);
      resetTranscript();
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
      <div className="w-72 border-r border-zinc-800 bg-zinc-950 p-5 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8">OmniConsult</h1>
        <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">EXPERTS</h3>
        {personas.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedPersona(p.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl mb-2 transition-all ${
              selectedPersona === p.id ? 'bg-zinc-800' : 'hover:bg-zinc-900'
            }`}
          >
            <img src={p.avatar} className="w-10 h-10 rounded-full" />
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-zinc-400">{p.title}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b border-zinc-800 flex items-center px-6">
          <img src={currentPersona.avatar} className="w-8 h-8 rounded-full mr-3" />
          <div>
            <div className="font-semibold">{currentPersona.name}</div>
            <div className="text-xs text-emerald-400">{currentPersona.title}</div>
          </div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : ''}`}>
              <div className={`max-w-[70%] px-6 py-4 rounded-2xl ${m.role === 'user' ? 'bg-blue-600' : 'bg-zinc-900'}`}>
                {m.content}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="p-6 border-t border-zinc-800 bg-zinc-900">
          <div className="flex gap-3 mb-4">
            <button onClick={toggleAudioCall} className="flex-1 py-4 bg-emerald-600 rounded-2xl font-medium">
              {isAudioCall ? 'End Voice' : '🎤 Voice Call'}
            </button>
          </div>

          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type message..."
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4"
            />
            <button onClick={() => sendMessage()} className="bg-blue-600 px-10 rounded-2xl font-medium">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}