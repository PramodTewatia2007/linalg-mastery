import React from 'react';
import { PracticeQuestion, UserProgress } from '../types';
import { MathRenderer } from './MathRenderer';
import {
  Bookmark,
  Trash2,
  ExternalLink,
  HelpCircle,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

interface BookmarksViewProps {
  questions: PracticeQuestion[];
  progress: UserProgress;
  onToggleBookmark: (questionId: string) => void;
  onSelectTopic: (topicId: number) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  questions,
  progress,
  onToggleBookmark,
  onSelectTopic,
}) => {
  const bookmarkedQuestions = questions.filter((q) => progress.bookmarks.includes(q.id));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <h1 className="text-2xl font-bold text-white">
              Saved Review List & Bookmarks
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Questions you flagged for later review, challenging proofs, and revision.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-xs font-semibold text-amber-300">
          {bookmarkedQuestions.length} Questions Saved
        </span>
      </div>

      {bookmarkedQuestions.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 space-y-3">
          <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No Bookmarked Questions Yet</h3>
          <p className="text-xs max-w-md mx-auto">
            Click the bookmark icon on any practice question to add it to your personal review list.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarkedQuestions.map((q) => {
            const isSolved = progress.solvedQuestions[q.id]?.isCorrect;

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      Topic {q.topicId} • Q{q.questionNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {q.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                      {q.skill}
                    </span>
                    {isSolved && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                        <CheckCircle2 className="w-3 h-3" /> Solved
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectTopic(q.topicId)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 hover:text-white transition flex items-center gap-1"
                    >
                      <span>Go to Topic</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => onToggleBookmark(q.id)}
                      className="p-1.5 rounded-lg border border-rose-900/50 bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 transition"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-sm text-slate-200 font-medium leading-relaxed">
                  <MathRenderer content={q.problem} />
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <span className="text-amber-400 font-bold block flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5" /> Hint:
                  </span>
                  <MathRenderer content={q.hint} />
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1 text-slate-300">
                  <span className="text-indigo-400 font-bold block">Worked Solution:</span>
                  <MathRenderer content={q.fullSolution} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
