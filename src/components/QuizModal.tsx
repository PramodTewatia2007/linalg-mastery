import React, { useState } from 'react';
import { QuizQuestion, UserProgress } from '../types';
import { MathRenderer } from './MathRenderer';
import confetti from 'canvas-confetti';
import {
  X,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award
} from 'lucide-react';

interface QuizModalProps {
  topicId: number;
  topicTitle: string;
  questions: QuizQuestion[];
  isOpen: boolean;
  onClose: () => void;
  onSaveScore: (topicId: number, score: number, total: number) => void;
  languageMode: 'en' | 'hinglish' | 'both';
}

export const QuizModal: React.FC<QuizModalProps> = ({
  topicId,
  topicTitle,
  questions,
  isOpen,
  onClose,
  onSaveScore,
  languageMode,
}) => {
  if (!isOpen) return null;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      const finalScore = score + (selectedOption === currentQ.correctIndex ? 1 : 0);
      onSaveScore(topicId, finalScore, questions.length);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (_) {}
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Topic {topicId} Mastery Quiz</h2>
              <p className="text-[11px] text-slate-400">{topicTitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {!isFinished ? (
            <>
              {/* Progress Tracker */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span>Current Score: <strong className="text-emerald-400">{score}</strong></span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="text-base font-semibold text-white leading-relaxed">
                <MathRenderer content={currentQ.question} />
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelect(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-relaxed">
                        <MathRenderer content={opt} />
                      </span>

                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation upon answer */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-center gap-1.5 font-bold text-slate-200">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Explanation:</span>
                  </div>

                  {(languageMode === 'en' || languageMode === 'both') && (
                    <p className="text-slate-300 leading-relaxed">
                      <MathRenderer content={currentQ.explanation} />
                    </p>
                  )}

                  {(languageMode === 'hinglish' || languageMode === 'both') && (
                    <p className="text-indigo-200/90 bg-indigo-950/20 p-2 rounded-lg border border-indigo-900/30">
                      <strong className="text-indigo-400">हिं:</strong> <MathRenderer content={currentQ.hinglishExplanation} />
                    </p>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Quiz Completion Screen */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
                <Award className="w-8 h-8 text-indigo-400" />
              </div>

              <h3 className="text-xl font-bold text-white">Quiz Completed!</h3>
              <p className="text-sm text-slate-300">
                You scored <strong className="text-emerald-400 font-mono text-lg">{score}</strong> out of{' '}
                <strong className="text-slate-100 font-mono text-lg">{questions.length}</strong>.
              </p>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/40 transition"
                >
                  Return to Lesson
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Next Button */}
        {!isFinished && isAnswerSubmitted && (
          <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/40 flex items-center gap-1.5 transition"
            >
              <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
