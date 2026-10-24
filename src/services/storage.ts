import { UserProgress } from '../types';

const STORAGE_KEY = 'linalg_mastery_progress_v1';

const defaultProgress: UserProgress = {
  completedTopics: [],
  completedExamples: [],
  solvedQuestions: {},
  bookmarks: [],
  quizScores: {},
  languagePreference: 'both',
  notes: {},
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to load user progress:', e);
    return defaultProgress;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress:', e);
  }
}

export function exportProgressAsJSON(progress: UserProgress): string {
  return JSON.stringify(progress, null, 2);
}

export function importProgressFromJSON(jsonStr: string): UserProgress | null {
  try {
    const parsed = JSON.parse(jsonStr);
    const validated: UserProgress = {
      completedTopics: Array.isArray(parsed.completedTopics) ? parsed.completedTopics : [],
      completedExamples: Array.isArray(parsed.completedExamples) ? parsed.completedExamples : [],
      solvedQuestions: parsed.solvedQuestions && typeof parsed.solvedQuestions === 'object' ? parsed.solvedQuestions : {},
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
      quizScores: parsed.quizScores && typeof parsed.quizScores === 'object' ? parsed.quizScores : {},
      languagePreference: ['en', 'hinglish', 'both'].includes(parsed.languagePreference) ? parsed.languagePreference : 'both',
      notes: parsed.notes && typeof parsed.notes === 'object' ? parsed.notes : {},
    };
    saveUserProgress(validated);
    return validated;
  } catch (err) {
    console.error('Failed to import user progress JSON:', err);
    return null;
  }
}
