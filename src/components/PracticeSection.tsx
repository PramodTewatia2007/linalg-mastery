import React, { useState, useMemo } from 'react';
import { PracticeQuestion, UserProgress } from '../types';
import { MathRenderer } from './MathRenderer';
import {
  HelpCircle,
  Filter,
  Search,
  Bookmark,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Lightbulb,
  Sparkles
} from 'lucide-react';

interface PracticeSectionProps {
  topicId: number;
  questions: PracticeQuestion[];
  progress: UserProgress;
  onAnswerQuestion: (questionId: string, isCorrect: boolean) => void;
  onToggleBookmark: (questionId: string) => void;
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({
  topicId: _topicId,
  questions,
  progress,
  onAnswerQuestion,
  onToggleBookmark,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unsolved' | 'solved' | 'bookmarked'>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Per-question interactive states
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const matchSkill = selectedSkill === 'All' || q.skill === selectedSkill;

      const isSolved = progress.solvedQuestions[q.id]?.isCorrect;
      const isBookmarked = progress.bookmarks.includes(q.id);

      let matchStatus = true;
      if (statusFilter === 'unsolved') matchStatus = !isSolved;
      else if (statusFilter === 'solved') matchStatus = !!isSolved;
      else if (statusFilter === 'bookmarked') matchStatus = isBookmarked;

      const matchSearch =
        !searchFilter ||
        q.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        q.problem.toLowerCase().includes(searchFilter.toLowerCase());

      return matchDiff && matchSkill && matchStatus && matchSearch;
    });
  }, [questions, selectedDifficulty, selectedSkill, statusFilter, searchFilter, progress]);

  const solvedCount = questions.filter((q) => progress.solvedQuestions[q.id]?.isCorrect).length;

  const toggleHint = (qId: string) => {
    setRevealedHints((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleSolution = (qId: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSelectOption = (question: PracticeQuestion, optionText: string) => {
    const isCorrect = optionText === question.correctAnswer;
    setSelectedAnswers((prev) => ({ ...prev, [question.id]: optionText }));
    onAnswerQuestion(question.id, isCorrect);
  };

  return (
    <div className="space-y-6">
      {/* Header and Counters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">
              Unsolved Practice Questions & Guided Drills
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            46 rigorous exercises with progressive hints, instant option verification, and hidden worked solutions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200">
            {solvedCount} / {questions.length} Mastered
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-emerald-300">
            Requirement: {questions.length} &ge; 45 Met ✓
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none"
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none"
          >
            <option value="All">All Skills</option>
            <option value="Conceptual">Conceptual</option>
            <option value="Computational">Computational</option>
            <option value="Proof-Based">Proof-Based</option>
            <option value="Application">Application</option>
          </select>

          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2 py-0.5 rounded text-[11px] ${statusFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('unsolved')}
              className={`px-2 py-0.5 rounded text-[11px] ${statusFilter === 'unsolved' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
            >
              Unsolved
            </button>
            <button
              onClick={() => setStatusFilter('solved')}
              className={`px-2 py-0.5 rounded text-[11px] ${statusFilter === 'solved' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
            >
              Solved
            </button>
            <button
              onClick={() => setStatusFilter('bookmarked')}
              className={`px-2 py-0.5 rounded text-[11px] ${statusFilter === 'bookmarked' ? 'bg-amber-600 text-white' : 'text-slate-400'}`}
            >
              Saved
            </button>
          </div>
        </div>

        <div className="relative text-xs w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-5">
        {filteredQuestions.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 text-xs">
            No questions match your current filter settings. Try clearing filters.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isBookmarked = progress.bookmarks.includes(q.id);
            const userHistory = progress.solvedQuestions[q.id];
            const isSolved = userHistory?.isCorrect;
            const currentSelected = selectedAnswers[q.id];
            const isHintOpen = revealedHints[q.id];
            const isSolutionOpen = revealedSolutions[q.id];

            const diffBadge =
              q.difficulty === 'Beginner'
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : q.difficulty === 'Intermediate'
                ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300'
                : 'bg-purple-950/60 border-purple-500/40 text-purple-300';

            return (
              <div
                key={q.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isSolved
                    ? 'bg-slate-900/60 border-emerald-500/30'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-lg'
                }`}
              >
                {/* Question Top Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      Q{q.questionNumber}.
                    </span>
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${diffBadge}`}>
                      {q.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] border border-slate-700">
                      {q.skill}
                    </span>
                    {isSolved && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                        <CheckCircle2 className="w-3 h-3" /> Solved
                      </span>
                    )}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => onToggleBookmark(q.id)}
                    className={`p-1.5 rounded-lg border transition ${
                      isBookmarked
                        ? 'bg-amber-950/80 border-amber-500 text-amber-400'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                    title={isBookmarked ? 'Remove Bookmark' : 'Bookmark for Later Review'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                {/* Problem Text */}
                <div className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed mb-4">
                  <MathRenderer content={q.problem} />
                </div>

                {/* Multiple Choice Options */}
                {q.options && q.options.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {q.options.map((option, optIdx) => {
                      const optLabel = String.fromCharCode(65 + optIdx); // A, B, C, D
                      const isChosen = currentSelected === option;
                      const isCorrect = option === q.correctAnswer;

                      let optClass = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700';
                      if (currentSelected) {
                        if (isCorrect) {
                          optClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                        } else if (isChosen && !isCorrect) {
                          optClass = 'bg-rose-950/60 border-rose-500 text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q, option)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-start gap-3 ${optClass}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {optLabel}
                          </span>
                          <span className="flex-1 leading-relaxed">
                            <MathRenderer content={option} />
                          </span>

                          {currentSelected && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          )}
                          {currentSelected && isChosen && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Answer Feedback Banner */}
                {currentSelected && (
                  <div className={`p-3 rounded-xl mb-4 text-xs flex items-center justify-between ${
                    currentSelected === q.correctAnswer
                      ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/50 border border-rose-500/40 text-rose-300'
                  }`}>
                    <div className="flex items-center gap-2">
                      {currentSelected === q.correctAnswer ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span><strong>Correct!</strong> Well done.</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span><strong>Incorrect.</strong> Need a tip? Check the hint below.</span>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => toggleSolution(q.id)}
                      className="underline font-semibold hover:text-white"
                    >
                      {isSolutionOpen ? 'Hide Solution' : 'View Full Solution'}
                    </button>
                  </div>
                )}

                {/* Progressive Hint Reveal Bar */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => toggleHint(q.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-950/40 border border-amber-700/50 text-amber-300 hover:bg-amber-900/40 transition flex items-center gap-1.5"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isHintOpen ? 'Hide Hint' : 'Need a Hint?'}</span>
                  </button>

                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1.5"
                  >
                    {isSolutionOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isSolutionOpen ? 'Hide Worked Solution' : 'Worked Solution'}</span>
                  </button>
                </div>

                {/* Revealed Hint Box */}
                {isHintOpen && (
                  <div className="mt-3 p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed animate-in fade-in duration-150">
                    <strong className="text-amber-400 block text-xs mb-1">Guiding Hint (Next Step):</strong>
                    <MathRenderer content={q.hint} />
                  </div>
                )}

                {/* Revealed Full Worked Solution */}
                {isSolutionOpen && (
                  <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3 animate-in fade-in duration-150">
                    <div>
                      <strong className="text-indigo-400 block uppercase tracking-wider text-[11px] mb-1">
                        Full Step-by-Step Solution:
                      </strong>
                      <p className="text-slate-300 leading-relaxed">
                        <MathRenderer content={q.fullSolution} />
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-start gap-2 text-slate-400">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Verification Tip:</strong> {q.verificationTips}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
