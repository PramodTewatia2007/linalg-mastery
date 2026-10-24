import React from 'react';
import {
  Compass,
  BookOpen,
  CheckCircle2,
  Bookmark,
  FileText,
  Search,
  User,
  Languages,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { UserProgress } from '../types';

interface NavbarProps {
  progress: UserProgress;
  activeView: 'lesson' | 'audit' | 'formulas' | 'bookmarks';
  setActiveView: (view: 'lesson' | 'audit' | 'formulas' | 'bookmarks') => void;
  onOpenProfile: () => void;
  languageMode: 'en' | 'hinglish' | 'both';
  setLanguageMode: (mode: 'en' | 'hinglish' | 'both') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalTopicsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  progress,
  activeView,
  setActiveView,
  onOpenProfile,
  languageMode,
  setLanguageMode,
  searchQuery,
  setSearchQuery,
  totalTopicsCount,
}) => {
  const completedCount = progress.completedTopics.length;
  const progressPercent = Math.round((completedCount / totalTopicsCount) * 100);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('lesson')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-100 tracking-tight">
                  LinearAlgebra<span className="text-indigo-400">Mastery</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Full Course
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Rigorous • English & Hinglish • Interactive 3D</p>
            </div>
          </button>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search topics, theorems, formulas, questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-xs text-slate-500 hover:text-slate-300"
            >
              Clear
            </button>
          )}
        </div>

        {/* Actions & Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-xs">
            <button
              onClick={() => setLanguageMode('both')}
              className={`px-2 py-1 rounded-lg font-medium transition ${
                languageMode === 'both' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Dual explanations: English and Hinglish side-by-side"
            >
              Dual
            </button>
            <button
              onClick={() => setLanguageMode('en')}
              className={`px-2 py-1 rounded-lg font-medium transition ${
                languageMode === 'en' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="English only"
            >
              EN
            </button>
            <button
              onClick={() => setLanguageMode('hinglish')}
              className={`px-2 py-1 rounded-lg font-medium transition ${
                languageMode === 'hinglish' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Hinglish only"
            >
              हिं
            </button>
          </div>

          {/* Formulas Sheet Button */}
          <button
            onClick={() => setActiveView('formulas')}
            className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition ${
              activeView === 'formulas'
                ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Formula Reference Sheet"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden lg:inline">Formulas</span>
          </button>

          {/* Bookmarks */}
          <button
            onClick={() => setActiveView('bookmarks')}
            className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition ${
              activeView === 'bookmarks'
                ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Saved Questions & Bookmarks"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">Saved</span>
            {progress.bookmarks.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                {progress.bookmarks.length}
              </span>
            )}
          </button>

          {/* Content Audit View (Author Requirements Verification) */}
          <button
            onClick={() => setActiveView('audit')}
            className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition ${
              activeView === 'audit'
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Content Audit Dashboard: Verify 15+ solved examples & 45+ questions per topic"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden xl:inline">Content Audit</span>
          </button>

          {/* Profile / Stats */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
            title="Learner Profile & Data Sync"
          >
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-[11px] font-semibold text-slate-200 block leading-tight">{progressPercent}% Done</span>
              <span className="text-[9px] text-slate-500 block leading-tight">{completedCount}/{totalTopicsCount} Topics</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
