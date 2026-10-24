import React, { useState, useMemo } from 'react';
import { FormulaItem, Topic } from '../types';
import { MathRenderer } from './MathRenderer';
import {
  FileText,
  Search,
  Filter,
  Copy,
  Check,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface FormulaReferenceProps {
  formulas: FormulaItem[];
  topics: Topic[];
  onSelectTopic: (topicId: number) => void;
  languageMode: 'en' | 'hinglish' | 'both';
}

export const FormulaReference: React.FC<FormulaReferenceProps> = ({
  formulas,
  topics,
  onSelectTopic,
  languageMode,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredFormulas = useMemo(() => {
    return formulas.filter((f) => {
      const matchTopic = selectedTopicId === 'All' || f.topicId.toString() === selectedTopicId;
      const matchSearch =
        !searchFilter ||
        f.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        f.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
        f.latex.toLowerCase().includes(searchFilter.toLowerCase());
      return matchTopic && matchSearch;
    });
  }, [formulas, selectedTopicId, searchFilter]);

  const handleCopyLatex = (f: FormulaItem) => {
    navigator.clipboard.writeText(f.latex);
    setCopiedId(f.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h1 className="text-2xl font-bold text-white">
              Formula & Notation Reference Handbook
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Core definitions, theorems, transformation laws, and identities with LaTeX code and dual English-Hinglish intuition.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-xs font-semibold text-indigo-300">
          {filteredFormulas.length} Formulas Available
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Topic:
          </span>

          <select
            value={selectedTopicId}
            onChange={(e) => setSelectedTopicId(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none"
          >
            <option value="All">All Topics (1 - 12)</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id.toString()}>
                {t.id}. {t.title}
              </option>
            ))}
          </select>
        </div>

        <div className="relative text-xs w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search formulas or LaTeX..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Grid of Formula Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFormulas.map((f) => {
          const topic = topics.find((t) => t.id === f.topicId);

          return (
            <div
              key={f.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between gap-4 shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
                      Topic {f.topicId}: {topic?.title}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">{f.name}</h3>
                  </div>

                  <button
                    onClick={() => handleCopyLatex(f)}
                    className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                    title="Copy LaTeX formula to clipboard"
                  >
                    {copiedId === f.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Math Block */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-center font-mono text-sm text-indigo-200 overflow-x-auto">
                  <MathRenderer content={`$$${f.latex}$$`} />
                </div>

                {/* Descriptions */}
                <div className="space-y-1.5 text-xs">
                  {(languageMode === 'en' || languageMode === 'both') && (
                    <p className="text-slate-300 leading-relaxed">
                      <MathRenderer content={f.description} />
                    </p>
                  )}

                  {(languageMode === 'hinglish' || languageMode === 'both') && (
                    <p className="text-indigo-200/90 bg-indigo-950/20 p-2 rounded-lg border border-indigo-900/30">
                      <strong className="text-indigo-400">हिं:</strong> <MathRenderer content={f.hinglishDescription} />
                    </p>
                  )}

                  {f.notes && (
                    <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800/60">
                      Note: {f.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Navigation link */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <button
                  onClick={() => onSelectTopic(f.topicId)}
                  className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold transition"
                >
                  <span>Go to Topic Lesson</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
