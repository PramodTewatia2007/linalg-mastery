import React, { useState } from 'react';
import { UserProgress, Topic } from '../types';
import { exportProgressAsJSON, importProgressFromJSON } from '../services/storage';
import {
  X,
  User,
  Download,
  Upload,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sparkles,
  Award
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  topics: Topic[];
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  progress,
  onUpdateProgress,
  topics,
}) => {
  if (!isOpen) return null;

  const [importText, setImportText] = useState<string>('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const completedTopicsCount = progress.completedTopics.length;
  const completedExamplesCount = progress.completedExamples.length;
  const solvedQuestionsCount = Object.values(progress.solvedQuestions).filter((q) => q.isCorrect).length;
  const quizzesTaken = Object.keys(progress.quizScores).length;

  const handleExport = () => {
    const dataStr = exportProgressAsJSON(progress);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linalg-mastery-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const imported = importProgressFromJSON(importText);
    if (imported) {
      onUpdateProgress(imported);
      setImportStatus('Progress imported successfully!');
      setTimeout(() => setImportStatus(null), 3000);
      setImportText('');
    } else {
      setImportStatus('Invalid JSON format. Please verify and try again.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your learning progress? This cannot be undone.')) {
      const resetState: UserProgress = {
        completedTopics: [],
        completedExamples: [],
        solvedQuestions: {},
        bookmarks: [],
        quizScores: {},
        languagePreference: 'both',
        notes: {},
      };
      onUpdateProgress(resetState);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Learner Profile & Persistence</h2>
              <p className="text-xs text-slate-400">Local offline profile with zero tracking</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Local storage privacy note */}
          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-indigo-200 leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-indigo-300 block mb-0.5">Local Storage Persistence:</strong>
              Your progress, solved questions, bookmarks, and quiz scores are stored directly in your browser's private local storage. No external sign-in or server tracking required.
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Topics Done</span>
              <span className="text-lg font-bold text-indigo-400 font-mono mt-0.5 block">
                {completedTopicsCount} / {topics.length}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Examples Done</span>
              <span className="text-lg font-bold text-purple-400 font-mono mt-0.5 block">
                {completedExamplesCount}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Questions Solved</span>
              <span className="text-lg font-bold text-emerald-400 font-mono mt-0.5 block">
                {solvedQuestionsCount}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Quizzes Taken</span>
              <span className="text-lg font-bold text-amber-400 font-mono mt-0.5 block">
                {quizzesTaken}
              </span>
            </div>
          </div>

          {/* Export / Backup Section */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-200 text-sm">Export / Backup Progress</h4>
                <p className="text-slate-400 text-[11px]">Download your entire study history as a JSON file.</p>
              </div>
              <button
                onClick={handleExport}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
            </div>
          </div>

          {/* Import / Restore Section */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="font-bold text-slate-200 text-sm">Import / Restore Progress</h4>
            <p className="text-slate-400 text-[11px]">Paste previously exported JSON progress data below to restore your study state.</p>
            <textarea
              rows={3}
              placeholder="Paste JSON progress string here..."
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-[11px] focus:outline-none focus:border-indigo-500"
            />
            {importStatus && (
              <p className={`text-[11px] ${importStatus.includes('success') ? 'text-emerald-400' : 'text-rose-400'}`}>
                {importStatus}
              </p>
            )}
            <button
              onClick={handleImport}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import & Sync</span>
            </button>
          </div>

          {/* Danger Zone: Reset */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-bold text-rose-400 block">Reset Learning Progress</span>
              <span className="text-slate-500 text-[11px]">Clears all completed topics, examples, and scores.</span>
            </div>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950/60 border border-rose-800/60 text-rose-300 hover:bg-rose-900 transition flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
