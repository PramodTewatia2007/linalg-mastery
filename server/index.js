// server/index.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Load generated data
let examplesData = [];
let questionsData = [];

try {
  const exRaw = fs.readFileSync(path.join(__dirname, '../src/data/examplesData.ts'), 'utf-8');
  const qRaw = fs.readFileSync(path.join(__dirname, '../src/data/questionsData.ts'), 'utf-8');
  
  // Extract json array from ts file
  const exJson = exRaw.replace(/^import[^\n]+\n+export const solvedExamplesData: SolvedExample\[\] = /, '').replace(/;\s*$/, '');
  const qJson = qRaw.replace(/^import[^\n]+\n+export const practiceQuestionsData: PracticeQuestion\[\] = /, '').replace(/;\s*$/, '');
  
  examplesData = JSON.parse(exJson);
  questionsData = JSON.parse(qJson);
  console.log(`Server loaded ${examplesData.length} solved examples and ${questionsData.length} practice questions.`);
} catch (e) {
  console.error('Error loading data on server:', e);
}

// In-memory profile storage with fallback
let serverProfile = {
  completedTopics: [],
  completedExamples: [],
  solvedQuestions: {},
  bookmarks: [],
  quizScores: {},
  languagePreference: 'both',
  notes: {},
};

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Linear Algebra Mastery',
    version: '1.0.0',
    totalTopics: 12,
    totalSolvedExamples: examplesData.length,
    totalPracticeQuestions: questionsData.length,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/audit', (req, res) => {
  const auditReport = [];
  let allPassed = true;

  for (let topicId = 1; topicId <= 12; topicId++) {
    const topicEx = examplesData.filter((e) => e.topicId === topicId);
    const topicQ = questionsData.filter((q) => q.topicId === topicId);

    const exPassed = topicEx.length >= 15;
    const qPassed = topicQ.length >= 45;
    const compliant = exPassed && qPassed;
    if (!compliant) allPassed = false;

    auditReport.push({
      topicId,
      solvedExamplesCount: topicEx.length,
      solvedExamplesRequirementMet: exPassed,
      practiceQuestionsCount: topicQ.length,
      practiceQuestionsRequirementMet: qPassed,
      status: compliant ? 'COMPLIANT' : 'DEFICIT',
    });
  }

  res.json({
    allCompliant: allPassed,
    totalSolvedExamples: examplesData.length,
    totalPracticeQuestions: questionsData.length,
    report: auditReport,
  });
});

app.get('/api/progress', (req, res) => {
  res.json(serverProfile);
});

app.post('/api/progress', (req, res) => {
  if (req.body && typeof req.body === 'object') {
    serverProfile = { ...serverProfile, ...req.body };
    res.json({ success: true, updated: serverProfile });
  } else {
    res.status(400).json({ error: 'Invalid progress body' });
  }
});

// Serve compiled static files in production
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    // If request does not start with /api, serve index.html for client-side routing
    if (!req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Linear Algebra Mastery API server listening on http://localhost:${PORT}`);
});
