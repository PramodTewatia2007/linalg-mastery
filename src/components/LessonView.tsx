import React, { useState } from 'react';
import { Topic, UserProgress } from '../types';
import { MathRenderer } from './MathRenderer';
import { VisualSelector } from './visuals/VisualSelector';
import {
  Clock,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Cpu,
  CheckCircle,
  Circle,
  HelpCircle,
  PlayCircle,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface LessonViewProps {
  topic: Topic;
  progress: UserProgress;
  onToggleComplete: (topicId: number) => void;
  onOpenQuiz: () => void;
  languageMode: 'en' | 'hinglish' | 'both';
  onNextTopic?: () => void;
  onGoToExamples: () => void;
  onGoToPractice: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  topic,
  progress,
  onToggleComplete,
  onOpenQuiz,
  languageMode,
  onNextTopic,
  onGoToExamples,
  onGoToPractice,
}) => {
  const isCompleted = progress.completedTopics.includes(topic.id);
  const [activeSubtopicTab, setActiveSubtopicTab] = useState<string>(topic.subtopics[0]?.id || '');

  const currentSubtopic = topic.subtopics.find((s) => s.id === activeSubtopicTab) || topic.subtopics[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Topic Header Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Syllabus Topic {topic.id} of 12
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                {topic.estimatedTimeMinutes} min study
              </span>
              {isCompleted && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Completed
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {topic.title}
            </h1>

            {/* Dual Language Overview */}
            <div className="space-y-2 pt-1">
              {(languageMode === 'en' || languageMode === 'both') && (
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  <MathRenderer content={topic.summary} />
                </p>
              )}

              {(languageMode === 'hinglish' || languageMode === 'both') && (
                <div className="p-3 rounded-xl bg-slate-950/60 border border-indigo-950/60 text-xs sm:text-sm text-indigo-200/90 leading-relaxed font-sans">
                  <span className="font-bold text-indigo-400 block text-xs mb-1 uppercase tracking-wider">
                    हिन्दी / Hinglish Intuition:
                  </span>
                  <MathRenderer content={topic.hinglishSummary} />
                </div>
              )}
            </div>

            {/* Prerequisites */}
            {topic.prerequisites.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Prerequisites:</span>
                {topic.prerequisites.map((p, idx) => (
                  <span key={idx} className="bg-slate-800/90 px-2.5 py-0.5 rounded-md text-slate-300 border border-slate-700">
                    {p}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => onToggleComplete(topic.id)}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
              <span>{isCompleted ? 'Topic Completed' : 'Mark as Complete'}</span>
            </button>

            <button
              onClick={onOpenQuiz}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Take Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive 3D / 2D Visualizer Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <h2 className="text-base font-bold text-slate-200 uppercase tracking-wide">
              Interactive Mathematical Visualizer
            </h2>
          </div>
          <span className="text-xs text-slate-400">Live 3D Geometry</span>
        </div>

        <VisualSelector topic={topic} />
      </section>

      {/* Subtopics Navigation Tabs */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {topic.subtopics.map((sub, idx) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubtopicTab(sub.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${
                  activeSubtopicTab === sub.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span className="opacity-70">Subtopic {idx + 1}:</span>
                <span>{sub.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Subtopic Content */}
        {currentSubtopic && (
          <div className="space-y-6">
            {/* Subtopic Overview */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                {currentSubtopic.title}
              </h3>

              {(languageMode === 'en' || languageMode === 'both') && (
                <p className="text-sm text-slate-300 leading-relaxed">
                  <MathRenderer content={currentSubtopic.englishOverview} />
                </p>
              )}

              {(languageMode === 'hinglish' || languageMode === 'both') && (
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-indigo-950 text-xs sm:text-sm text-indigo-200 leading-relaxed">
                  <strong className="text-indigo-400 block text-xs mb-1">Hinglish Explanation:</strong>
                  <MathRenderer content={currentSubtopic.hinglishOverview} />
                </div>
              )}
            </div>

            {/* Definitions & Mathematical Rigor */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Rigorous Definitions & Assumptions
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSubtopic.definitions.map((def, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5 hover:border-slate-700 transition"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-100 text-sm">{def.term}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                        <MathRenderer content={def.notation} inline />
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-center text-xs text-indigo-200 border border-slate-800/80 overflow-x-auto">
                      <MathRenderer content={`$$${def.mathLatex}$$`} />
                    </div>

                    {(languageMode === 'en' || languageMode === 'both') && (
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <MathRenderer content={def.english} />
                      </p>
                    )}

                    {(languageMode === 'hinglish' || languageMode === 'both') && (
                      <p className="text-xs text-indigo-200/90 bg-indigo-950/20 p-2 rounded border border-indigo-900/30">
                        <strong className="text-indigo-400">हिं:</strong> <MathRenderer content={def.hinglish} />
                      </p>
                    )}

                    {def.assumptions && (
                      <div className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800/60">
                        Assumptions: {def.assumptions}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Common Misconceptions & Typical Errors */}
            {currentSubtopic.misconceptions.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Common Misconceptions & Fatal Fallacies
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentSubtopic.misconceptions.map((misc, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2 text-xs"
                    >
                      <div className="text-rose-300 font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span>Mistake: {misc.mistake}</span>
                      </div>
                      <div className="text-slate-300 pl-3.5 border-l-2 border-emerald-500/60">
                        <strong className="text-emerald-400 block mb-0.5">Correct Understanding:</strong>
                        <MathRenderer content={misc.correction} />
                      </div>
                      <div className="text-slate-400 text-[11px] pl-3.5 italic">
                        Why this happens: {misc.whyItHappens}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Geometric Intuition & Applications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Geometric Intuition
                </span>
                <p className="text-slate-300 leading-relaxed">
                  <MathRenderer content={currentSubtopic.geometricIntuition} />
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="font-bold text-sky-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  Applications in Science & Engineering
                </span>
                <ul className="space-y-1 text-slate-300 list-disc list-inside">
                  {currentSubtopic.applications.map((app, idx) => (
                    <li key={idx}><MathRenderer content={app} /></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Navigation Footer to Examples and Practice */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Ready to test your understanding?</h4>
          <p className="text-xs text-slate-400">
            Work through 16 fully solved step-by-step examples or test yourself with 46 practice questions.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onGoToExamples}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/40 transition flex items-center justify-center gap-1.5"
          >
            <span>Solved Examples (16)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onGoToPractice}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/40 transition flex items-center justify-center gap-1.5"
          >
            <span>Practice Questions (46)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
