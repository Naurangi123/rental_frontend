import React, { useState, useRef, useEffect } from 'react'
import {
  ArrowLeft, Phone, Video, MoreVertical, Search,
  Paperclip, Smile, Mic, Send, Lock, Check, CheckCheck,
  Image, Pin
} from "lucide-react";

const MESSAGES = [
  { id: 1, from: 'them', text: 'Hey! Just reviewed the design files you sent over 🔥', time: '10:12 AM', status: 'read' },
  { id: 2, from: 'them', text: 'The color palette is absolutely stunning. Really impressed with the work.', time: '10:13 AM', status: 'read' },
  { id: 3, from: 'me', text: 'Thank you so much! I spent a lot of time on the gradients and spacing.', time: '10:15 AM', status: 'read' },
  { id: 4, from: 'me', text: 'Let me know if you want any revisions on the typography scale!', time: '10:15 AM', status: 'read' },
  { id: 5, from: 'them', text: 'Nope, looks perfect. When can we schedule the handoff call?', time: '10:18 AM', status: 'read' },
  { id: 6, from: 'me', text: "I'm free Thursday after 2pm or anytime Friday 🗓️", time: '10:20 AM', status: 'delivered' },
  { id: 7, from: 'them', text: 'Friday 11am works great for me!', time: '10:22 AM', status: 'read' },
];

const CONTACT = { name: 'Aria Chen', role: 'Design Lead', online: true, color: 'from-violet-400 to-fuchsia-400' };

const Avatar = ({ contact, size = 'md' }) => {
  const s = size === 'sm' ? 'w-9 h-9 text-xs' : size === 'lg' ? 'w-12 h-12 text-sm' : 'w-10 h-10 text-xs';
  return (
    <div className={`relative flex-shrink-0 ${s} rounded-2xl bg-gradient-to-br ${contact.color} flex items-center justify-center font-bold text-white shadow-lg`}>
      {contact.name.split(' ').map(n => n[0]).join('')}
      {contact.online && (
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0f0f1a]" />
      )}
    </div>
  );
};

export default function Message() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(MESSAGES);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: prev.length + 1, from: 'me', text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    }]);
    setInput('');
  };

  return (
    <div
      className="flex h-auto w-full overflow-hidden"
      style={{ background: '#0f0f1a', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >

      {/* ── CHAT PANEL ── */}
      <main className="relative z-10 flex flex-1 flex-col min-w-0">

        {/* Chat header */}
        <header
          className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{ background: 'rgba(15,15,26,0.8)', borderColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}
        >
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.45)' }}>
              <ArrowLeft size={18} />
            </button>
            <Avatar contact={CONTACT} size="lg" />
            <div>
              <h2 className="text-white font-semibold text-base leading-tight">{CONTACT.name}</h2>
              <p className="text-xs" style={{ color: CONTACT.online ? '#34d399' : 'rgba(255,255,255,0.35)' }}>
                {CONTACT.online ? '● Active now' : 'Last seen recently'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[Phone, Video, Search, Pin, MoreVertical].map((Icon, i) => (
              <button key={i}
                className="rounded-2xl flex items-center justify-center transition-all hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.45)' }}>
                <Icon size={20} />
              </button>
            ))}
          </div>
        </header>

        {/* Encryption badge */}
        <div className="flex justify-center py-3 flex-shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
            style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.25)' }}>
            <Lock size={10} />
            End-to-end encrypted · Messages are private
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-2 space-y-3" style={{ scrollbarWidth: 'none' }}>
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-xs px-3" style={{ color: 'rgba(255,255,255,0.25)' }}>Today</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {messages.map((msg, idx) => {
            const isMe = msg.from === 'me';
            const prevSame = idx > 0 && messages[idx - 1].from === msg.from;
            return (
              <div key={msg.id} className={`flex items-end gap-2.5 ${isMe ? 'flex-row-reverse' : 'flex-row'} ${prevSame ? 'mt-1' : 'mt-4'}`}>
                {!isMe && !prevSame && <Avatar contact={CONTACT} size="sm" />}
                {!isMe && prevSame && <div className="w-9 flex-shrink-0" />}

                <div className="group relative max-w-lg">
                  <div
                    className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={isMe ? {
                      background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                      color: 'white',
                      borderBottomRightRadius: prevSame ? '1rem' : '0.375rem',
                      boxShadow: '0 4px 24px rgba(124,58,237,0.3)',
                    } : {
                      background: 'rgba(255,255,255,0.07)',
                      color: 'rgba(255,255,255,0.85)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderBottomLeftRadius: prevSame ? '1rem' : '0.375rem',
                    }}
                  >
                    {msg.text}
                  </div>
                  <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>{msg.time}</span>
                    {isMe && (
                      msg.status === 'read'
                        ? <CheckCheck size={12} style={{ color: '#7c3aed' }} />
                        : <Check size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Typing indicator */}
        <div className="px-6 mb-1 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Avatar contact={CONTACT} size="sm" />
            <div className="flex items-center gap-1 px-4 py-2.5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {[0, 1, 2].map(i => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/40"
                  style={{ animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="px-5 py-4 flex-shrink-0"
          style={{ background: 'rgba(15,15,26,0.6)', backdropFilter: 'blur(20px)' }}>
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <button className="transition-all hover:scale-110" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <Smile size={20} />
            </button>

            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={`Message ${CONTACT.name.split(' ')[0]}…`}
              className="flex-1 bg-transparent text-sm outline-none text-white/80 placeholder-white/20"
            />

            <div className="flex items-center gap-2">
              <button className="transition-all hover:scale-110" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <Paperclip size={18} />
              </button>
              <button className="transition-all hover:scale-110" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <Image size={18} />
              </button>
              <button className="transition-all hover:scale-110" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <Mic size={18} />
              </button>
            </div>

            <button
              onClick={send}
              className="rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95"
              style={{
                background: input.trim() ? 'linear-gradient(135deg, #7c3aed, #4f46e5)' : 'rgba(255,255,255,0.08)',
                color: input.trim() ? 'white' : 'rgba(255,255,255,0.25)',
                boxShadow: input.trim() ? '0 4px 16px rgba(124,58,237,0.4)' : 'none',
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}