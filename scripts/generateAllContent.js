// scripts/generateAllContent.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Topic data definitions with dedicated question catalogs
import { generateExamplesForTopic } from './examplesGenerator.js';
import { generateQuestionsForTopic } from './questionsGenerator.js';

const allExamples = [];
const allQuestions = [];

for (let topicId = 1; topicId <= 12; topicId++) {
  const examples = generateExamplesForTopic(topicId);
  const questions = generateQuestionsForTopic(topicId);
  allExamples.push(...examples);
  allQuestions.push(...questions);
  console.log(`Topic ${topicId}: Generated ${examples.length} solved examples and ${questions.length} practice questions.`);
}

const outDir = path.join(__dirname, '../src/data');

const examplesFileContent = `import { SolvedExample } from '../types';

export const solvedExamplesData: SolvedExample[] = ${JSON.stringify(allExamples, null, 2)};
`;

const questionsFileContent = `import { PracticeQuestion } from '../types';

export const practiceQuestionsData: PracticeQuestion[] = ${JSON.stringify(allQuestions, null, 2)};
`;

fs.writeFileSync(path.join(outDir, 'examplesData.ts'), examplesFileContent, 'utf-8');
fs.writeFileSync(path.join(outDir, 'questionsData.ts'), questionsFileContent, 'utf-8');

console.log(`Total Solved Examples: ${allExamples.length}`);
console.log(`Total Practice Questions: ${allQuestions.length}`);
console.log('Successfully written to src/data/examplesData.ts and src/data/questionsData.ts');
