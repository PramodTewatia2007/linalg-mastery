import React from 'react';
import { Topic, UserProgress } from '../types';
import {
  CheckCircle2,
  Circle,
  Clock,
  Layers,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface SidebarProps {
  topics: Topic[];
  activeTopicId: number;
  onSelectTopic: (id: number) => void;
  progress: UserProgress;
  solvedExamplesCountByTopic: Record<number, number>;
  practiceQuestionsCountByTopic: Record<number, number>;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  topics,
  activeTopicId,
  onSelectTopic,
  progress,
  solvedExamplesCountByTopic,
  practiceQuestionsCountByTopic,
  isOpenMobile,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)] w-72 lg:w-80 bg-slate-950/95 lg:bg-slate-950/60 border-r border-slate-800/80 flex flex-col transition-transform duration-200 overflow-hidden ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Syllabus Curriculum
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
            12 Topics
          </span>
        </div>

        {/* Topics List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin">
          {topics.map((topic, index) => {
            const isSelected = topic.id === activeTopicId;
            const isCompleted = progress.completedTopics.includes(topic.id);
            const exCount = solvedExamplesCountByTopic[topic.id] || 16;
            const qCount = practiceQuestionsCountByTopic[topic.id] || 46;

            return (
              <button
                key={topic.id}
                onClick={() => {
                  onSelectTopic(topic.id);
                  onCloseMobile();
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-150 relative group ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-950/80 to-slate-900 border-indigo-500/80 text-white shadow-md shadow-indigo-950/30'
                    : 'bg-slate-900/50 border-slate-800/60 text-slate-300 hover:bg-slate-900 hover:border-slate-700 hover:text-white'
                }`}
              >
                {/* Active indicator bar */}
                {isSelected && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-indigo-500" />
                )}

                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-500 font-bold">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span className="text-xs font-semibold leading-snug line-clamp-1">
                      {topic.title}
                    </span>
                  </div>

                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5 group-hover:text-slate-400" />
                  )}
                </div>

                {/* Sub-badges for counts and time */}
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800/40 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1 text-indigo-300">
                    <FileCheck className="w-3 h-3" />
                    {exCount} Solved
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 text-emerald-300">
                    <HelpCircle className="w-3 h-3" />
                    {qCount} Questions
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    {topic.estimatedTimeMinutes}m
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Syllabus Footer summary */}
        <div className="p-3 bg-slate-950 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
          <span>Total Solved: <strong className="text-indigo-400">192</strong></span>
          <span>Practice: <strong className="text-emerald-400">552</strong></span>
        </div>
      </aside>
    </>
  );
};
