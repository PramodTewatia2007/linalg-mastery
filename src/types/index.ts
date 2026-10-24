export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type SkillType = 'Conceptual' | 'Computational' | 'Proof-Based' | 'Application';

export interface StepExplanation {
  stepNumber: number;
  title: string;
  math?: string;
  explanation: string;
  whyValid: string;
}

export interface SolvedExample {
  id: string;
  topicId: number;
  subtopicId: string;
  title: string;
  difficulty: Difficulty;
  skill: SkillType;
  question: string;
  englishExplanation: string;
  hinglishExplanation: string;
  steps: StepExplanation[];
  finalAnswer: string;
  checkOrVerification?: string;
}

export interface PracticeQuestion {
  id: string;
  topicId: number;
  subtopicId: string;
  questionNumber: number;
  title: string;
  difficulty: Difficulty;
  skill: SkillType;
  problem: string;
  hint: string;
  answerType: 'multiple-choice' | 'numerical' | 'matrix' | 'proof-steps';
  options?: string[];
  correctAnswer: string;
  fullSolution: string;
  verificationTips: string;
}

export interface Subtopic {
  id: string;
  title: string;
  englishOverview: string;
  hinglishOverview: string;
  definitions: {
    term: string;
    notation: string;
    mathLatex: string;
    english: string;
    hinglish: string;
    assumptions?: string;
  }[];
  misconceptions: {
    mistake: string;
    correction: string;
    whyItHappens: string;
  }[];
  geometricIntuition: string;
  applications: string[];
}

export interface Topic {
  id: number;
  title: string;
  slug: string;
  summary: string;
  hinglishSummary: string;
  prerequisites: string[];
  estimatedTimeMinutes: number;
  subtopics: Subtopic[];
  visualType: 'vectors' | 'subspaces' | 'basis' | 'transformations' | 'matrix-rep' | 'dual-space' | 'transpose' | 'canonical-forms' | 'adjoints' | 'bilinear-forms' | 'quadratic-forms' | 'skew-symmetric';
  formulaIds: string[];
}

export interface QuizQuestion {
  id: string;
  topicId: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hinglishExplanation: string;
}

export interface FormulaItem {
  id: string;
  topicId: number;
  name: string;
  latex: string;
  description: string;
  hinglishDescription: string;
  notes?: string;
}

export interface UserProgress {
  completedTopics: number[];
  completedExamples: string[];
  solvedQuestions: Record<string, { answeredAt: string; attempts: number; isCorrect: boolean }>;
  bookmarks: string[];
  quizScores: Record<number, { score: number; total: number; completedAt: string }>;
  languagePreference: 'en' | 'hinglish' | 'both';
  notes: Record<string, string>;
}
