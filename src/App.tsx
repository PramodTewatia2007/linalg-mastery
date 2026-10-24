import React, { useState, useEffect, useMemo } from 'react';
import { syllabusTopics } from './data/syllabus';
import { solvedExamplesData } from './data/examplesData';
import { practiceQuestionsData } from './data/questionsData';
import { formulaReference } from './data/formulas';
import { quizQuestions } from './data/quizzes';
import { loadUserProgress, saveUserProgress } from './services/storage';
import { UserProgress } from './types';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LessonView } from './components/LessonView';
import { ExamplesSection } from './components/ExamplesSection';
import { PracticeSection } from './components/PracticeSection';
import { ContentAuditView } from './components/ContentAuditView';
import { FormulaReference } from './components/FormulaReference';
import { BookmarksView } from './components/BookmarksView';
import { QuizModal } from './components/QuizModal';
import { ProfileModal } from './components/ProfileModal';

import {
  Menu,
  BookOpen,
  FileCheck,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Search
} from 'lucide-react';

export function App() {
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const [activeTopicId, setActiveTopicId] = useState<number>(1);
  const [activeView, setActiveView] = useState<'lesson' | 'audit' | 'formulas' | 'bookmarks'>('lesson');
  const [activeLessonTab, setActiveLessonTab] = useState<'theory' | 'examples' | 'practice'>('theory');

  const [languageMode, setLanguageMode] = useState<'en' | 'hinglish' | 'both'>('both');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Sync progress to storage
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  // Current active topic
  const activeTopic = useMemo(() => {
    return syllabusTopics.find((t) => t.id === activeTopicId) || syllabusTopics[0];
  }, [activeTopicId]);

  // Filtered examples and questions for current topic
  const topicExamples = useMemo(() => {
    return solvedExamplesData.filter((e) => e.topicId === activeTopicId);
  }, [activeTopicId]);

  const topicQuestions = useMemo(() => {
    return practiceQuestionsData.filter((q) => q.topicId === activeTopicId);
  }, [activeTopicId]);

  const topicQuizQuestions = useMemo(() => {
    return quizQuestions.filter((q) => q.topicId === activeTopicId);
  }, [activeTopicId]);

  // Pre-calculate counts per topic for badges
  const solvedExamplesCountByTopic = useMemo(() => {
    const counts: Record<number, number> = {};
    syllabusTopics.forEach((t) => {
      counts[t.id] = solvedExamplesData.filter((e) => e.topicId === t.id).length;
    });
    return counts;
  }, []);

  const practiceQuestionsCountByTopic = useMemo(() => {
    const counts: Record<number, number> = {};
    syllabusTopics.forEach((t) => {
      counts[t.id] = practiceQuestionsData.filter((q) => q.topicId === t.id).length;
    });
    return counts;
  }, []);

  // Global search filtering
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();

    const matchedTopics = syllabusTopics.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.summary.toLowerCase().includes(query) ||
        t.hinglishSummary.toLowerCase().includes(query)
    );

    const matchedFormulas = formulaReference.filter(
      (f) =>
        f.name.toLowerCase().includes(query) ||
        f.description.toLowerCase().includes(query) ||
        f.latex.toLowerCase().includes(query)
    );

    const matchedExamples = solvedExamplesData.filter(
      (e) => e.title.toLowerCase().includes(query) || e.question.toLowerCase().includes(query)
    );

    const matchedQuestions = practiceQuestionsData.filter(
      (q) => q.title.toLowerCase().includes(query) || q.problem.toLowerCase().includes(query)
    );

    return {
      topics: matchedTopics,
      formulas: matchedFormulas,
      examples: matchedExamples,
      questions: matchedQuestions,
    };
  }, [searchQuery]);

  // Handlers for updating progress
  const handleToggleTopicComplete = (topicId: number) => {
    setProgress((prev) => {
      const isDone = prev.completedTopics.includes(topicId);
      const nextTopics = isDone
        ? prev.completedTopics.filter((id) => id !== topicId)
        : [...prev.completedTopics, topicId];
      return { ...prev, completedTopics: nextTopics };
    });
  };

  const handleToggleExampleComplete = (exampleId: string) => {
    setProgress((prev) => {
      const isDone = prev.completedExamples.includes(exampleId);
      const nextEx = isDone
        ? prev.completedExamples.filter((id) => id !== exampleId)
        : [...prev.completedExamples, exampleId];
      return { ...prev, completedExamples: nextEx };
    });
  };

  const handleAnswerQuestion = (questionId: string, isCorrect: boolean) => {
    setProgress((prev) => {
      const current = prev.solvedQuestions[questionId] || { attempts: 0, answeredAt: '', isCorrect: false };
      return {
        ...prev,
        solvedQuestions: {
          ...prev.solvedQuestions,
          [questionId]: {
            attempts: current.attempts + 1,
            answeredAt: new Date().toISOString(),
            isCorrect: isCorrect || current.isCorrect,
          },
        },
      };
    });
  };

  const handleToggleBookmark = (questionId: string) => {
    setProgress((prev) => {
      const isBookmarked = prev.bookmarks.includes(questionId);
      const nextBm = isBookmarked
        ? prev.bookmarks.filter((id) => id !== questionId)
        : [...prev.bookmarks, questionId];
      return { ...prev, bookmarks: nextBm };
    });
  };

  const handleSaveScore = (topicId: number, score: number, total: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [topicId]: { score, total, completedAt: new Date().toISOString() },
      },
    }));
  };

  const handleSelectTopicFromAnywhere = (topicId: number) => {
    setActiveTopicId(topicId);
    setActiveView('lesson');
    setActiveLessonTab('theory');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        progress={progress}
        activeView={activeView}
        setActiveView={(v) => {
          setActiveView(v);
          setSearchQuery('');
        }}
        onOpenProfile={() => setIsProfileOpen(true)}
        languageMode={languageMode}
        setLanguageMode={setLanguageMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalTopicsCount={syllabusTopics.length}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Left Sidebar Curriculum Navigation */}
        <Sidebar
          topics={syllabusTopics}
          activeTopicId={activeTopicId}
          onSelectTopic={handleSelectTopicFromAnywhere}
          progress={progress}
          solvedExamplesCountByTopic={solvedExamplesCountByTopic}
          practiceQuestionsCountByTopic={practiceQuestionsCountByTopic}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {/* Mobile drawer trigger bar */}
          <div className="lg:hidden flex items-center justify-between mb-4 p-3 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex items-center gap-2 text-xs font-semibold text-slate-200"
            >
              <Menu className="w-4 h-4 text-indigo-400" />
              <span>Topic {activeTopicId}: {activeTopic.title}</span>
            </button>
            <span className="text-[10px] text-indigo-400 font-mono">12 Topics Menu</span>
          </div>

          {/* Search Results Display */}
          {searchResults ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-bold text-white">
                    Search Results for "{searchQuery}"
                  </span>
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Clear Search
                </button>
              </div>

              {/* Matched Topics */}
              {searchResults.topics.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Matched Topics ({searchResults.topics.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {searchResults.topics.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleSelectTopicFromAnywhere(t.id)}
                        className="text-left p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/60 transition group"
                      >
                        <span className="text-xs font-bold text-indigo-400 block">Topic {t.id}</span>
                        <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
                          {t.title}
                        </h4>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Formulas */}
              {searchResults.formulas.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Matched Formulas ({searchResults.formulas.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {searchResults.formulas.map((f) => (
                      <div key={f.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                        <span className="text-indigo-400 font-bold block">{f.name}</span>
                        <p className="text-slate-300">{f.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : activeView === 'audit' ? (
            /* Content Audit Dashboard */
            <ContentAuditView
              topics={syllabusTopics}
              examples={solvedExamplesData}
              questions={practiceQuestionsData}
              onSelectTopic={handleSelectTopicFromAnywhere}
            />
          ) : activeView === 'formulas' ? (
            /* Formula Reference Sheet */
            <FormulaReference
              formulas={formulaReference}
              topics={syllabusTopics}
              onSelectTopic={handleSelectTopicFromAnywhere}
              languageMode={languageMode}
            />
          ) : activeView === 'bookmarks' ? (
            /* Bookmarked Practice Questions */
            <BookmarksView
              questions={practiceQuestionsData}
              progress={progress}
              onToggleBookmark={handleToggleBookmark}
              onSelectTopic={handleSelectTopicFromAnywhere}
            />
          ) : (
            /* Main Lesson View with Theory, Solved Examples, Practice Questions tabs */
            <div className="space-y-6">
              {/* Internal Lesson Segmented Bar */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <button
                  onClick={() => setActiveLessonTab('theory')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    activeLessonTab === 'theory'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Theory & 3D Visualizer</span>
                </button>

                <button
                  onClick={() => setActiveLessonTab('examples')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    activeLessonTab === 'examples'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Solved Examples ({topicExamples.length})</span>
                </button>

                <button
                  onClick={() => setActiveLessonTab('practice')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    activeLessonTab === 'practice'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Practice Questions ({topicQuestions.length})</span>
                </button>
              </div>

              {/* Render Active Tab */}
              {activeLessonTab === 'theory' ? (
                <LessonView
                  topic={activeTopic}
                  progress={progress}
                  onToggleComplete={handleToggleTopicComplete}
                  onOpenQuiz={() => setIsQuizOpen(true)}
                  languageMode={languageMode}
                  onNextTopic={() => {
                    if (activeTopicId < syllabusTopics.length) {
                      handleSelectTopicFromAnywhere(activeTopicId + 1);
                    }
                  }}
                  onGoToExamples={() => setActiveLessonTab('examples')}
                  onGoToPractice={() => setActiveLessonTab('practice')}
                />
              ) : activeLessonTab === 'examples' ? (
                <ExamplesSection
                  topicId={activeTopic.id}
                  examples={topicExamples}
                  progress={progress}
                  onToggleCompleteExample={handleToggleExampleComplete}
                  languageMode={languageMode}
                />
              ) : (
                <PracticeSection
                  topicId={activeTopic.id}
                  questions={topicQuestions}
                  progress={progress}
                  onAnswerQuestion={handleAnswerQuestion}
                  onToggleBookmark={handleToggleBookmark}
                />
              )}
            </div>
          )}
        </main>
      </div>

      {/* Quiz Modal */}
      <QuizModal
        topicId={activeTopic.id}
        topicTitle={activeTopic.title}
        questions={topicQuizQuestions.length > 0 ? topicQuizQuestions : quizQuestions.slice(0, 2)}
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSaveScore={handleSaveScore}
        languageMode={languageMode}
      />

      {/* Profile / Backup Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        progress={progress}
        onUpdateProgress={setProgress}
        topics={syllabusTopics}
      />
    </div>
  );
}

export default App;
