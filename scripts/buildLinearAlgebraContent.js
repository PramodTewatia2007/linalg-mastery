// Helper to assemble solved examples and practice questions for each topic
export const topicMetas = [
  { id: 1, name: 'Vector Spaces', slug: 'vector-spaces', subtopics: ['vs-axioms', 'vs-examples'] },
  { id: 2, name: 'Subspaces', slug: 'subspaces', subtopics: ['sub-criterion', 'sub-sums'] },
  { id: 3, name: 'Basis and Dimension', slug: 'basis-and-dimension', subtopics: ['basis-indep', 'basis-dim'] },
  { id: 4, name: 'Linear Transformations', slug: 'linear-transformations', subtopics: ['lt-def-ker-im', 'lt-rank-nullity'] },
  { id: 5, name: 'Matrix Representation of Linear Transformations', slug: 'matrix-representation', subtopics: ['mat-rep-coord', 'mat-rep-change'] },
  { id: 6, name: 'Linear Functionals (Introductory)', slug: 'linear-functionals', subtopics: ['lf-dual-basis', 'lf-annihilators'] },
  { id: 7, name: 'Transpose of Linear Transformations', slug: 'transpose-linear-transformations', subtopics: ['trans-dual-map', 'trans-ortho-relations'] },
  { id: 8, name: 'Canonical Forms', slug: 'canonical-forms', subtopics: ['cf-diag-eigen', 'cf-poly-cayley', 'cf-jcf-rcf'] },
  { id: 9, name: 'Linear Functionals and Adjoints', slug: 'linear-functionals-adjoints', subtopics: ['adj-riesz', 'adj-spectral'] },
  { id: 10, name: 'Bilinear Forms', slug: 'bilinear-forms', subtopics: ['bf-matrix-cong', 'bf-non-deg-rad'] },
  { id: 11, name: 'Symmetric Bilinear Forms', slug: 'symmetric-bilinear-forms', subtopics: ['sbf-quad-polar', 'sbf-sylvester'] },
  { id: 12, name: 'Skew-Symmetric Bilinear Forms', slug: 'skew-symmetric-bilinear-forms', subtopics: ['sk-alternating', 'sk-symplectic-basis'] },
];

console.log(`Configured ${topicMetas.length} syllabus topics for content generation.`);
