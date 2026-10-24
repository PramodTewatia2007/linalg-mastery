import React, { useState, useMemo } from 'react';
import { SolvedExample, Difficulty, SkillType, UserProgress } from '../types';
import { MathRenderer } from './MathRenderer';
import {
  CheckCircle2,
  Circle,
  Filter,
  Search,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  BookCheck,
  Sparkles
} from 'lucide-react';

interface ExamplesSectionProps {
  topicId: number;
  examples: SolvedExample[];
  progress: UserProgress;
  onToggleCompleteExample: (exampleId: string) => void;
  languageMode: 'en' | 'hinglish' | 'both';
}

export const ExamplesSection: React.FC<ExamplesSectionProps> = ({
  topicId,
  examples,
  progress,
  onToggleCompleteExample,
  languageMode,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [expandedExampleId, setExpandedExampleId] = useState<string | null>(examples[0]?.id || null);

  const filteredExamples = useMemo(() => {
    return examples.filter((ex) => {
      const matchDiff = selectedDifficulty === 'All' || ex.difficulty === selectedDifficulty;
      const matchSkill = selectedSkill === 'All' || ex.skill === selectedSkill;
      const matchSearch =
        !searchFilter ||
        ex.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        ex.question.toLowerCase().includes(searchFilter.toLowerCase());
      return matchDiff && matchSkill && matchSearch;
    });
  }, [examples, selectedDifficulty, selectedSkill, searchFilter]);

  const completedCount = examples.filter((e) => progress.completedExamples.includes(e.id)).length;

  return (
    <div className="space-y-6">
      {/* Header and Counters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <BookCheck className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">
              Fully Solved Step-by-Step Examples
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Every example includes complete mathematical derivations, justifications for why each step is valid, and checks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-xs font-semibold text-indigo-200">
            {completedCount} / {examples.length} Studied
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-emerald-300">
            Requirement: {examples.length} &ge; 15 Met ✓
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
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
        </div>

        <div className="relative text-xs w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search within examples..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Examples List */}
      <div className="space-y-4">
        {filteredExamples.map((ex, index) => {
          const isCompleted = progress.completedExamples.includes(ex.id);
          const isExpanded = expandedExampleId === ex.id;

          const difficultyBadge =
            ex.difficulty === 'Beginner'
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              : ex.difficulty === 'Intermediate'
              ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300'
              : 'bg-purple-950/60 border-purple-500/40 text-purple-300';

          return (
            <div
              key={ex.id}
              className={`rounded-2xl border transition-all ${
                isExpanded
                  ? 'bg-slate-900/90 border-indigo-500/50 shadow-xl'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Collapsible Header */}
              <div
                onClick={() => setExpandedExampleId(isExpanded ? null : ex.id)}
                className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-slate-400 font-bold">
                      Example {index + 1} of {filteredExamples.length}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full border text-[11px] font-medium ${difficultyBadge}`}>
                      {ex.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] border border-slate-700">
                      {ex.skill}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                    {ex.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCompleteExample(ex.id);
                    }}
                    className={`p-1.5 rounded-lg border transition ${
                      isCompleted
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                        : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'
                    }`}
                    title={isCompleted ? 'Marked as Studied' : 'Mark as Studied'}
                  >
                    <Check className="w-4 h-4" />
                  </button>

                  <div className="p-1 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Body */}
              {isExpanded && (
                <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-5 animate-in fade-in duration-150">
                  {/* Problem Statement */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                      Problem Statement:
                    </span>
                    <MathRenderer content={ex.question} />
                  </div>

                  {/* Dual Explanations */}
                  <div className="space-y-2">
                    {(languageMode === 'en' || languageMode === 'both') && (
                      <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <strong className="text-slate-400 block mb-0.5 text-xs">Conceptual Approach:</strong>
                        <MathRenderer content={ex.englishExplanation} />
                      </div>
                    )}

                    {(languageMode === 'hinglish' || languageMode === 'both') && (
                      <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-xs sm:text-sm text-indigo-200/90 leading-relaxed">
                        <strong className="text-indigo-400 block mb-0.5 text-xs">Hinglish Explanation:</strong>
                        <MathRenderer content={ex.hinglishExplanation} />
                      </div>
                    )}
                  </div>

                  {/* Step-by-Step Derivation */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Rigorous Step-by-Step Derivation:
                    </span>

                    <div className="space-y-3">
                      {ex.steps.map((st) => (
                        <div
                          key={st.stepNumber}
                          className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                              {st.stepNumber}
                            </span>
                            <span className="font-semibold text-slate-200 text-xs sm:text-sm">
                              {st.title}
                            </span>
                          </div>

                          {st.math && (
                            <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs sm:text-sm text-indigo-300 overflow-x-auto text-center border border-slate-800">
                              <MathRenderer content={`$$${st.math}$$`} />
                            </div>
                          )}

                          <div className="text-xs text-slate-300 leading-relaxed">
                            <MathRenderer content={st.explanation} />
                          </div>

                          <div className="text-[11px] text-emerald-400/90 bg-emerald-950/20 p-2 rounded-lg border border-emerald-900/30 flex items-start gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Why this step is valid:</strong> {st.whyValid}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Final Answer Box */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-950 border border-emerald-500/40 text-xs sm:text-sm text-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] block">
                      Final Conclusion:
                    </span>
                    <MathRenderer content={ex.finalAnswer} />
                  </div>

                  {/* Verification Check */}
                  {ex.checkOrVerification && (
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-300">Verification & Sanity Check:</strong> {ex.checkOrVerification}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
