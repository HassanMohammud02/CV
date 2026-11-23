import React, { useState } from 'react';
import { ArrowRight, MessageSquare, Send, Sparkles, X } from 'lucide-react';
import { generateRecruiterReply } from '../utils/aiResponder';

const STARTER_QUESTIONS = [
  'What is Hassan studying?',
  'What finance projects has Hassan completed?',
  "What are Hassan's strongest skills?",
  'What leadership experience does Hassan have?',
  'Why should Hassan be hired?',
];

export default function AIAssistant({
  isOpen,
  onToggle,
  profile,
  projects,
  skills,
  onNavigate,
}) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello — I'm Hassan's AI Recruiter Assistant. Ask me about his OsloMet Economics & Business Administration degree, finance & Power BI case studies, IKEA & student leadership experience, or hiring fit.",
      actionLabel: 'Open Recruiter Dashboard',
      targetPage: 'recruiter',
    },
  ]);

  const handleSend = (questionText) => {
    const trimmed = (questionText ?? input).trim();
    if (!trimmed) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };

    const reply = generateRecruiterReply(trimmed, { profile, projects, skills });
    const botMsg = {
      id: `b-${Date.now() + 1}`,
      sender: 'assistant',
      text: reply.text,
      actionLabel: reply.actionLabel,
      targetPage: reply.targetPage,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    if (!questionText) setInput('');
  };

  return (
    <div className="no-print fixed bottom-5 right-5 z-40">
      {isOpen ? (
        <div className="flex h-[500px] w-[350px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:w-[390px] dark:border-slate-800 dark:bg-navy-900">
          {/* Header */}
          <div className="flex items-center justify-between bg-navy-900 px-4 py-3.5 text-white">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600/30 text-emerald-300">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold">AI Recruiter Assistant</div>
                <div className="text-[11px] text-slate-300">Executive Candidate Concierge</div>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggle}
              aria-label="Close AI Assistant"
              className="rounded-lg p-1 text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-navy-900 text-white dark:bg-emerald-700'
                      : 'border border-slate-200 bg-slate-50 text-slate-800 dark:border-slate-800 dark:bg-navy-950 dark:text-slate-200'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'assistant' && msg.targetPage && (
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(msg.targetPage);
                      onToggle();
                    }}
                    className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
                  >
                    <span>{msg.actionLabel || 'View Section'}</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Starter Prompts */}
          <div className="border-t border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-navy-950">
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Suggested Recruiter Questions
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {STARTER_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700 dark:border-slate-700 dark:bg-navy-900 dark:text-slate-300 dark:hover:border-emerald-500"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-navy-900"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about degree, finance, or skills..."
              className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="rounded-lg bg-navy-900 p-2 text-white transition hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-2.5 rounded-full bg-navy-900 px-4 py-3 text-xs font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
        >
          <MessageSquare className="h-4 w-4 text-emerald-300 dark:text-white" />
          <span>AI Recruiter Assistant</span>
        </button>
      )}
    </div>
  );
}
