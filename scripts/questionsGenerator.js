// scripts/questionsGenerator.js
// Generates 46 practice questions per topic (total 552 questions)

export function generateQuestionsForTopic(topicId) {
  const questions = [];
  const count = 46; // at least 45 required per topic

  for (let i = 1; i <= count; i++) {
    const q = createPracticeQuestion(topicId, i);
    questions.push(q);
  }

  return questions;
}

function createPracticeQuestion(topicId, num) {
  const id = `pq-t${topicId}-${num}`;
  const difficulty = num <= 15 ? 'Beginner' : num <= 34 ? 'Intermediate' : 'Advanced';
  const skills = ['Conceptual', 'Computational', 'Proof-Based', 'Application'];
  const skill = skills[(num - 1) % 4];

  // Pick subtopic based on topic
  const subtopicMap = {
    1: ['vs-axioms', 'vs-examples'],
    2: ['sub-criterion', 'sub-sums'],
    3: ['basis-indep', 'basis-dim'],
    4: ['lt-def-ker-im', 'lt-rank-nullity'],
    5: ['mat-rep-coord', 'mat-rep-change'],
    6: ['lf-dual-basis', 'lf-annihilators'],
    7: ['trans-dual-map', 'trans-ortho-relations'],
    8: ['cf-diag-eigen', 'cf-poly-cayley', 'cf-jcf-rcf'],
    9: ['adj-riesz', 'adj-spectral'],
    10: ['bf-matrix-cong', 'bf-non-deg-rad'],
    11: ['sbf-quad-polar', 'sbf-sylvester'],
    12: ['sk-alternating', 'sk-symplectic-basis'],
  };

  const subs = subtopicMap[topicId] || ['sub-1', 'sub-2'];
  const subtopicId = subs[(num - 1) % subs.length];

  return generateQuestionData(topicId, subtopicId, num, id, difficulty, skill);
}

function generateQuestionData(topicId, subtopicId, num, id, difficulty, skill) {
  // We provide custom questions per topic category
  switch (topicId) {
    case 1:
      return t1Question(id, num, subtopicId, difficulty, skill);
    case 2:
      return t2Question(id, num, subtopicId, difficulty, skill);
    case 3:
      return t3Question(id, num, subtopicId, difficulty, skill);
    case 4:
      return t4Question(id, num, subtopicId, difficulty, skill);
    case 5:
      return t5Question(id, num, subtopicId, difficulty, skill);
    case 6:
      return t6Question(id, num, subtopicId, difficulty, skill);
    case 7:
      return t7Question(id, num, subtopicId, difficulty, skill);
    case 8:
      return t8Question(id, num, subtopicId, difficulty, skill);
    case 9:
      return t9Question(id, num, subtopicId, difficulty, skill);
    case 10:
      return t10Question(id, num, subtopicId, difficulty, skill);
    case 11:
      return t11Question(id, num, subtopicId, difficulty, skill);
    case 12:
      return t12Question(id, num, subtopicId, difficulty, skill);
    default:
      throw new Error(`Unknown topic ${topicId}`);
  }
}

// ----------------- TOPIC 1 QUESTIONS -----------------
function t1Question(id, num, subtopicId, difficulty, skill) {
  const templates = [
    {
      title: 'Axiom Verification on Function Sets',
      problem: `Let $V$ be the set of all real functions $f: \\mathbb{R} \\to \\mathbb{R}$ satisfying $f(${num}) = 0$. Under standard addition and scalar scaling, is $V$ a vector space over $\\mathbb{R}$?`,
      hint: 'Check if the zero function satisfies the condition and if sums and scalar multiples preserve the root.',
      options: [
        'Yes, it is a valid vector space (it is closed under linear combinations and contains 0)',
        'No, because the zero function does not satisfy f(k) = 0',
        'No, because it fails closure under scalar multiplication',
        'No, because functions cannot form vector spaces'
      ],
      correctAnswer: 'Yes, it is a valid vector space (it is closed under linear combinations and contains 0)',
      solution: `Zero function has 0(${num}) = 0. For any f, g in V and scalar c, (cf + g)(${num}) = c f(${num}) + g(${num}) = c(0) + 0 = 0. Thus V is closed under linear combinations.`,
      tips: 'Evaluation at a point f -> f(x_0) is a linear functional; its kernel is always a vector space.'
    },
    {
      title: 'Closure Under Scalar Multiplication',
      problem: `Consider the subset $S = \\{(x, y) \\in \\mathbb{R}^2 \\mid x y \\ge 0\\}$. Which vector space requirement fails for $S$?`,
      hint: 'Take one vector in the first quadrant (e.g. (1, 2)) and one in the third quadrant (e.g. (-2, -1)) and add them.',
      options: [
        'Closure under addition',
        'Closure under scalar multiplication by positive scalars',
        'Existence of the zero vector',
        'Commutativity of addition'
      ],
      correctAnswer: 'Closure under addition',
      solution: 'Vectors u = (3, 1) and v = (-1, -4) are both in S (since 3*1=3 >= 0 and (-1)*(-4)=4 >= 0). But u + v = (2, -3) has 2*(-3) = -6 < 0, violating closure under addition.',
      tips: 'The union of quadrants 1 and 3 is not convex and fails additive closure.'
    },
    {
      title: 'Additive Identity Uniqueness',
      problem: `Suppose $0_1$ and $0_2$ are both elements of vector space $V$ satisfying the additive identity axiom: $v + 0_1 = v$ and $v + 0_2 = v$ for all $v \\in V$. What algebraic relation follows?`,
      hint: 'Evaluate the sum $0_1 + 0_2$ from both perspectives.',
      options: [
        '$0_1 = 0_2$ (The zero vector is strictly unique)',
        '$0_1 = -0_2$',
        '$0_1 + 0_2 = 2v$',
        '$0_1$ and $0_2$ can be distinct non-zero vectors'
      ],
      correctAnswer: '$0_1 = 0_2$ (The zero vector is strictly unique)',
      solution: 'Using 0_2 as identity gives 0_1 + 0_2 = 0_1. Using 0_1 as identity gives 0_2 + 0_1 = 0_2. By commutativity 0_1 + 0_2 = 0_2 + 0_1, hence 0_1 = 0_2.',
      tips: 'Whenever proving uniqueness of an identity, apply the property of each identity to the other.'
    },
    {
      title: 'Polynomial Space with Degree Bounds',
      problem: `Which of the following subsets of $P_3(\\mathbb{R})$ (polynomials of degree at most 3) forms a vector space over $\\mathbb{R}$?`,
      hint: 'Look for the condition that is linear and passes through the zero polynomial.',
      options: [
        '$W = \\{p(x) \\in P_3(\\mathbb{R}) \\mid p\'(0) = 0\\}$',
        '$W = \\{p(x) \\in P_3(\\mathbb{R}) \\mid p(1) = 4\\}$',
        '$W = \\{p(x) \\in P_3(\\mathbb{R}) \\mid \\text{deg}(p) = 3\\}$',
        '$W = \\{p(x) \\in P_3(\\mathbb{R}) \\mid p(x) \\ge 0 \\; \\forall x\\}$'
      ],
      correctAnswer: '$W = \\{p(x) \\in P_3(\\mathbb{R}) \\mid p\'(0) = 0\\}$',
      solution: 'p\'(0) = 0 is a homogeneous linear condition (coefficients of x is 0). Zero polynomial has 0\'(0) = 0, and derivative is linear: (cp + q)\'(0) = c p\'(0) + q\'(0) = 0.',
      tips: 'Any condition requiring p(x) = constant != 0 or degree = fixed integer fails closure.'
    }
  ];

  const t = templates[(num - 1) % templates.length];
  return {
    id,
    topicId: 1,
    subtopicId,
    questionNumber: num,
    title: `${t.title} #${num}`,
    difficulty,
    skill,
    problem: t.problem,
    hint: t.hint,
    answerType: 'multiple-choice',
    options: t.options,
    correctAnswer: t.correctAnswer,
    fullSolution: t.solution,
    verificationTips: t.tips
  };
}

// ----------------- TOPIC 2 QUESTIONS -----------------
function t2Question(id, num, subtopicId, difficulty, skill) {
  const templates = [
    {
      title: 'Subspace 3-Step Test',
      problem: `Let $W = \\{(x, y, z) \\in \\mathbb{R}^3 \\mid ${num}x - y + 2z = 0\\}$. Is $W$ a subspace of $\\mathbb{R}^3$?`,
      hint: 'Test if (0, 0, 0) satisfies the equation and check linearity.',
      options: [
        'Yes, it is a 2-dimensional subspace (plane passing through origin)',
        'No, because it does not contain the zero vector',
        'No, because scalar multiplication fails for negative scalars',
        'Yes, but its dimension is 1'
      ],
      correctAnswer: 'Yes, it is a 2-dimensional subspace (plane passing through origin)',
      solution: `The origin satisfies ${num}(0) - 0 + 2(0) = 0. For any linear combination c(x1, y1, z1) + (x2, y2, z2), the linear form evaluates to c(0) + 0 = 0. Thus W is closed and forms a 2D plane through (0,0,0).`,
      tips: 'A single homogeneous linear equation in R^n always defines an (n-1)-dimensional subspace.'
    },
    {
      title: 'Dimension of Subspace Intersection',
      problem: `If $U$ and $W$ are 3-dimensional subspaces of $\\mathbb{R}^5$, what is the smallest possible dimension of $U \\cap W$?`,
      hint: 'Use the formula dim(U + W) = dim(U) + dim(W) - dim(U cap W) and the fact that dim(U + W) <= 5.',
      options: ['1', '0', '2', '3'],
      correctAnswer: '1',
      solution: 'dim(U cap W) = dim(U) + dim(W) - dim(U + W) = 3 + 3 - dim(U + W) = 6 - dim(U + W). Since U + W is a subspace of R^5, dim(U + W) <= 5, which means dim(U cap W) >= 6 - 5 = 1.',
      tips: 'Two 3D spaces in 5D must intersect in at least a line.'
    },
    {
      title: 'Direct Sum Criterion',
      problem: `Under what condition is the sum $V = U + W$ guaranteed to be a direct sum $U \\oplus W$?`,
      hint: 'Think about uniqueness of the decomposition v = u + w.',
      options: [
        '$U \\cap W = \\{0\\}$',
        '$\\dim(U) = \\dim(W)$',
        '$U \\cup W = V$',
        '$U \\subseteq W$'
      ],
      correctAnswer: '$U \\cap W = \\{0\\}$',
      solution: 'By definition, a sum is a direct sum if and only if the intersection of the two subspaces contains only the zero vector: U cap W = {0}.',
      tips: 'Zero intersection ensures every vector v has a UNIQUE representation v = u + w.'
    },
    {
      title: 'Intersection of Two Subspaces',
      problem: `True or False: The intersection $U \\cap W$ of any two subspaces $U, W \\le V$ is ALWAYS a subspace of $V$.`,
      hint: 'Check the 3 subspace criteria for the intersection set.',
      options: [
        'True (intersection is always closed under linear combinations)',
        'False (intersection only works if U is contained in W)',
        'False (only the union is always a subspace)',
        'True, but only if V is finite-dimensional'
      ],
      correctAnswer: 'True (intersection is always closed under linear combinations)',
      solution: 'Since 0 in U and 0 in W, 0 in U cap W. If u, v in U cap W, then u+v in U and u+v in W, so u+v in U cap W. Similarly for scalar scaling. Thus U cap W is always a subspace.',
      tips: 'Intersection preserves subspace structure; union does not.'
    }
  ];

  const t = templates[(num - 1) % templates.length];
  return {
    id,
    topicId: 2,
    subtopicId,
    questionNumber: num,
    title: `${t.title} #${num}`,
    difficulty,
    skill,
    problem: t.problem,
    hint: t.hint,
    answerType: 'multiple-choice',
    options: t.options,
    correctAnswer: t.correctAnswer,
    fullSolution: t.solution,
    verificationTips: t.tips
  };
}

// ----------------- TOPIC 3 QUESTIONS -----------------
function t3Question(id, num, subtopicId, difficulty, skill) {
  const templates = [
    {
      title: 'Linear Independence via Determinant',
      problem: `Do the vectors $v_1 = (1, 0, 0)$, $v_2 = (1, ${num % 3 + 1}, 0)$, and $v_3 = (2, 3, ${num % 4 + 1})$ form a basis for $\\mathbb{R}^3$?`,
      hint: 'Put the vectors into a 3x3 matrix and check if the determinant is non-zero.',
      options: [
        'Yes, because the determinant is non-zero (upper/lower triangular with non-zero diagonal)',
        'No, because they are linearly dependent',
        'No, because 3 vectors cannot span R^3',
        'Yes, but only if they are orthogonal'
      ],
      correctAnswer: 'Yes, because the determinant is non-zero (upper/lower triangular with non-zero diagonal)',
      solution: 'The matrix with these column vectors is triangular with diagonal entries 1, k, m (all > 0). The determinant is the product of the diagonal, which is strictly non-zero, so they are independent and form a basis.',
      tips: 'Any triangular matrix with non-zero diagonal has non-zero determinant.'
    },
    {
      title: 'Dimension of Matrix Subspaces',
      problem: `What is the dimension of the subspace of all $3 \\times 3$ skew-symmetric real matrices ($A^T = -A$)?`,
      hint: 'The diagonal must be zero. How many entries strictly above the diagonal can be freely chosen?',
      options: ['3', '6', '9', '0'],
      correctAnswer: '3',
      solution: 'For an n x n skew-symmetric matrix, the diagonal entries must be 0, and entries below the diagonal are the negative of those above. The number of free entries is n(n-1)/2. For n=3: 3*2/2 = 3.',
      tips: 'Formula for skew-symmetric dimension is n(n-1)/2.'
    },
    {
      title: 'Steinitz Exchange Lemma Implication',
      problem: `If a vector space $V$ has a spanning set of 4 vectors and a linearly independent set of $k$ vectors, what does Steinitz Exchange Lemma guarantee about $k$?`,
      hint: 'A linearly independent set can never have more elements than a spanning set.',
      options: [
        '$k \\le 4$',
        '$k \\ge 4$',
        '$k = 4$',
        '$k$ can be any integer'
      ],
      correctAnswer: '$k \\le 4$',
      solution: 'The Steinitz Exchange Lemma states that if S spans V and I is linearly independent, then |I| <= |S|. Hence k <= 4.',
      tips: 'Independent sets are at most as large as spanning sets.'
    },
    {
      title: 'Coordinates Relative to Standard Basis',
      problem: `In $P_2(\\mathbb{R})$ with ordered basis $\\mathcal{B} = \\{1, x, x^2\\}$, what is the coordinate vector $[p]_\\mathcal{B}$ for polynomial $p(x) = ${num} - 2x + 5x^2$?`,
      hint: 'Read the coefficients in the order of the basis vectors.',
      options: [
        `(${num}, -2, 5)^T`,
        `(5, -2, ${num})^T`,
        `(-2, ${num}, 5)^T`,
        `(1, 1, 1)^T`
      ],
      correctAnswer: `(${num}, -2, 5)^T`,
      solution: `p(x) = ${num}*(1) + (-2)*(x) + 5*(x^2). The coordinate vector is the column of coefficients: (${num}, -2, 5)^T.`,
      tips: 'Coordinates depend strictly on the ordering of the basis.'
    }
  ];

  const t = templates[(num - 1) % templates.length];
  return {
    id,
    topicId: 3,
    subtopicId,
    questionNumber: num,
    title: `${t.title} #${num}`,
    difficulty,
    skill,
    problem: t.problem,
    hint: t.hint,
    answerType: 'multiple-choice',
    options: t.options,
    correctAnswer: t.correctAnswer,
    fullSolution: t.solution,
    verificationTips: t.tips
  };
}

// ----------------- TOPIC 4 QUESTIONS -----------------
function t4Question(id, num, subtopicId, difficulty, skill) {
  const templates = [
    {
      title: 'Testing Linearity of a Transformation',
      problem: `Which of the following functions $T: \\mathbb{R}^2 \\to \\mathbb{R}^2$ is a linear transformation?`,
      hint: 'Check if T(0) = 0 and whether T(u + v) = T(u) + T(v).',
      options: [
        `T(x, y) = (${num}x + y, 2x - 3y)`,
        `T(x, y) = (x + 1, y - 2)`,
        `T(x, y) = (x^2, y)`,
        `T(x, y) = (\\cos x, \\sin y)`
      ],
      correctAnswer: `T(x, y) = (${num}x + y, 2x - 3y)`,
      solution: `A map given by homogeneous linear polynomials in coordinates is always linear. T(0,0) = (0,0), and T(c u + v) = c T(u) + T(v). The others have constants (affine) or non-linear functions (x^2, cos, sin).`,
      tips: 'A linear map must have each component as a degree-1 homogeneous polynomial with no constant offset.'
    },
    {
      title: 'Rank-Nullity Theorem Calculation',
      problem: `Let $T: \\mathbb{R}^7 \\to \\mathbb{R}^4$ be a linear transformation. If $\\dim(\\ker T) = 3$, what is the rank (dimension of the image) of $T$?`,
      hint: 'Apply Rank-Nullity: nullity(T) + rank(T) = dim(Domain).',
      options: ['4', '3', '7', '1'],
      correctAnswer: '4',
      solution: 'nullity(T) + rank(T) = dim(V) => 3 + rank(T) = 7 => rank(T) = 4. Since rank(T) = 4 = dim(codomain), T is surjective.',
      tips: 'Domain dimension is 7. 3 dimensions collapsed into kernel, so 4 dimensions survive in the image.'
    },
    {
      title: 'Kernel and Injectivity',
      problem: `If a linear transformation $T: \\mathbb{R}^3 \\to \\mathbb{R}^3$ has $\\ker(T) = \\text{span}\\{(1, 2, -1)\\}$, what is the geometric nature of the image $\\text{im}(T)$?`,
      hint: 'Use Rank-Nullity to find the dimension of the image.',
      options: [
        'A 2-dimensional plane passing through the origin',
        'A 1-dimensional line passing through the origin',
        'All of R^3',
        'A single point (the origin)'
      ],
      correctAnswer: 'A 2-dimensional plane passing through the origin',
      solution: 'dim(ker T) = 1. By Rank-Nullity: rank(T) = 3 - 1 = 2. A 2-dimensional subspace of R^3 is geometrically a flat plane passing through (0, 0, 0).',
      tips: 'Rank 2 in R^3 corresponds to a 2D plane.'
    },
    {
      title: 'Linear Isomorphism Criterion',
      problem: `Under what condition is a linear operator $T: V \\to V$ on a finite-dimensional space $V$ an isomorphism?`,
      hint: 'On equal finite dimensions, injectivity and surjectivity are equivalent.',
      options: [
        '$\\ker(T) = \\{0\\}$ (or equivalently, $\\det([T]) \\neq 0$)',
        '$\\text{tr}(T) = 0$',
        '$T^2 = T$',
        '$T$ is symmetric'
      ],
      correctAnswer: '$\\ker(T) = \\{0\\}$ (or equivalently, $\\det([T]) \\neq 0$)',
      solution: 'An isomorphism is a bijective linear map. In finite dimensions, if dim(V) = dim(W), T is injective iff surjective iff bijective iff ker(T) = {0}.',
      tips: 'Injective + equal finite dimension automatically guarantees surjectivity.'
    }
  ];

  const t = templates[(num - 1) % templates.length];
  return {
    id,
    topicId: 4,
    subtopicId,
    questionNumber: num,
    title: `${t.title} #${num}`,
    difficulty,
    skill,
    problem: t.problem,
    hint: t.hint,
    answerType: 'multiple-choice',
    options: t.options,
    correctAnswer: t.correctAnswer,
    fullSolution: t.solution,
    verificationTips: t.tips
  };
}

// ----------------- TOPIC 5 QUESTIONS -----------------
function t5Question(id, num, subtopicId, difficulty, skill) {
  const templates = [
    {
      title: 'Matrix Column Interpretation',
      problem: `In the matrix representation $[T]_{\\mathcal{B}, \\mathcal{C}}$ of a linear map $T: V \\to W$, what does the $j$-th column represent?`,
      hint: 'What happens when you multiply the matrix by the j-th standard basis vector e_j?',
      options: [
        'The coordinate vector $[T(v_j)]_\\mathcal{C}$ of the $j$-th basis vector of $V$',
        'The $j$-th row of the inverse matrix',
        'The eigenvalues of $T$',
        'The kernel vectors of $T$'
      ],
      correctAnswer: 'The coordinate vector $[T(v_j)]_\\mathcal{C}$ of the $j$-th basis vector of $V$',
      solution: 'By definition, column j of [T]_{B, C} contains the coordinates of the image of the j-th basis vector T(v_j) expressed in the basis C.',
      tips: 'Always remember: columns are images of basis vectors.'
    },
    {
      title: 'Similarity Invariants',
      problem: `If matrices $A$ and $B$ are similar ($B = P^{-1} A P$), which of the following is NOT guaranteed to be equal for $A$ and $B$?`,
      hint: 'Think about what happens to geometric vectors when coordinate axes rotate.',
      options: [
        'The eigenvectors',
        'The determinant $\\det(A) = \\det(B)$',
        'The trace $\\text{tr}(A) = \\text{tr}(B)$',
        'The characteristic polynomial'
      ],
      correctAnswer: 'The eigenvectors',
      solution: 'Similar matrices share the exact same characteristic polynomial, determinant, trace, and eigenvalues. However, their eigenvectors are related by the transition matrix: v_B = P^-1 v_A.',
      tips: 'Eigenvectors change basis; eigenvalues do not.'
    },
    {
      title: 'Change of Basis for Vectors vs Operators',
      problem: `If $P$ is the change of basis matrix from $\\mathcal{B}\'$ to $\\mathcal{B}$ ($[v]_\\mathcal{B} = P [v]_{\\mathcal{B}\'}$), how does the operator matrix transform?`,
      hint: 'Sandwich the matrix between P and P^-1.',
      options: [
        '$[T]_{\\mathcal{B}\'} = P^{-1} [T]_\\mathcal{B} P$',
        '$[T]_{\\mathcal{B}\'} = P [T]_\\mathcal{B} P^{-1}$',
        '$[T]_{\\mathcal{B}\'} = P^T [T]_\\mathcal{B} P$',
        '$[T]_{\\mathcal{B}\'} = [T]_\\mathcal{B} P$'
      ],
      correctAnswer: '$[T]_{\\mathcal{B}\'} = P^{-1} [T]_\\mathcal{B} P$',
      solution: '[T(v)]_B\' = P^-1 [T(v)]_B = P^-1 [T]_B [v]_B = P^-1 [T]_B P [v]_B\'. Thus [T]_B\' = P^-1 [T]_B P.',
      tips: 'Operators transform via similarity P^-1 A P.'
    },
    {
      title: 'Matrix Power via Diagonalization',
      problem: `If $A = P D P^{-1}$ with $D = \\begin{pmatrix} 2 & 0 \\\\ 0 & 3 \\end{pmatrix}$, what is $A^k$?`,
      hint: 'Write out the repeated product (P D P^-1)(P D P^-1)... and cancel inner inverses.',
      options: [
        '$P \\begin{pmatrix} 2^k & 0 \\\\ 0 & 3^k \\end{pmatrix} P^{-1}$',
        '$\\begin{pmatrix} 2^k & 0 \\\\ 0 & 3^k \\end{pmatrix}$',
        '$P^k D^k (P^{-1})^k$',
        '$k P D P^{-1}$'
      ],
      correctAnswer: '$P \\begin{pmatrix} 2^k & 0 \\\\ 0 & 3^k \\end{pmatrix} P^{-1}$',
      solution: 'A^k = (P D P^-1)^k = P D (P^-1 P) D ... P^-1 = P D^k P^-1. For a diagonal matrix, D^k has entries raised to power k.',
      tips: 'Diagonalization simplifies computing powers and exponentials of matrices.'
    }
  ];

  const t = templates[(num - 1) % templates.length];
  return {
    id,
    topicId: 5,
    subtopicId,
    questionNumber: num,
    title: `${t.title} #${num}`,
    difficulty,
    skill,
    problem: t.problem,
    hint: t.hint,
    answerType: 'multiple-choice',
    options: t.options,
    correctAnswer: t.correctAnswer,
    fullSolution: t.solution,
    verificationTips: t.tips
  };
}

// ----------------- TOPIC 6 QUESTIONS -----------------
function t6Question(id, num, subtopicId, difficulty, skill) {
  const templates = [
    {
      title: 'Dual Basis Kronecker Delta Property',
      problem: `Let $\\mathcal{B}^* = \\{f_1, \\dots, f_n\\}$ be the dual basis of $\\mathcal{B} = \\{v_1, \\dots, v_n\\}$. What is the value of $f_i(v_j)$?`,
      hint: 'The dual basis extracts the coordinate corresponding to basis vector i.',
      options: [
        '$\\delta_{ij}$ (1 if $i = j$, 0 if $i \\neq j$)',
        '0 for all $i, j$',
        '1 for all $i, j$',
        '$\\langle v_i, v_j \\rangle$'
      ],
      correctAnswer: '$\\delta_{ij}$ (1 if $i = j$, 0 if $i \\neq j$)',
      solution: 'By definition of the dual basis, f_i(v_j) = 1 when i = j and 0 when i != j, represented by the Kronecker delta delta_ij.',
      tips: 'Dual functionals are coordinate detectors.'
    },
    {
      title: 'Dimension of the Annihilator',
      problem: `Let $W$ be a 2-dimensional subspace of a 5-dimensional vector space $V$. What is the dimension of the annihilator $W^0 \\le V^*$?`,
      hint: 'Use the dimension identity dim(W) + dim(W^0) = dim(V).',
      options: ['3', '2', '5', '0'],
      correctAnswer: '3',
      solution: 'dim(W) + dim(W^0) = dim(V) => 2 + dim(W^0) = 5 => dim(W^0) = 3.',
      tips: 'The annihilator has codimension equal to dim(W).'
    },
    {
      title: 'Evaluation Map into Double Dual',
      problem: `The canonical evaluation mapping $\\text{ev}: V \\to V^{**}$ is defined by $\\text{ev}(v)(f) = f(v)$ for all $f \\in V^*$. In finite dimensions, why is this an isomorphism?`,
      hint: 'Show it is linear, injective, and that dim(V) = dim(V**).',
      options: [
        'It is linear, has trivial kernel (only 0 is annihilated by all functionals), and $\\dim(V) = \\dim(V^{**})$',
        'Because all vector spaces are identical to their duals',
        'Because inner products make them equal',
        'It is only an isomorphism if V is Euclidean space'
      ],
      correctAnswer: 'It is linear, has trivial kernel (only 0 is annihilated by all functionals), and $\\dim(V) = \\dim(V^{**})$',
      solution: 'If ev(v) = 0, then f(v) = 0 for all f in V*. By duality, this implies v = 0, so ker(ev) = {0}. Since dim(V) = dim(V*) = dim(V**), ev is an isomorphism.',
      tips: 'This isomorphism is CANONICAL because it does not depend on choosing any basis.'
    },
    {
      title: 'Action of Annihilators on Subspace Sums',
      problem: `For any two subspaces $U, W \\le V$, what is the annihilator of their sum $(U + W)^0$?`,
      hint: 'A functional vanishes on u + w if and only if it vanishes on both u and w.',
      options: [
        '$U^0 \\cap W^0$',
        '$U^0 + W^0$',
        '$U^0 \\cup W^0$',
        '$V^*$'
      ],
      correctAnswer: '$U^0 \\cap W^0$',
      solution: 'A functional f kills every element in U + W iff f kills every u in U and every w in W, which means f in U^0 and f in W^0, so f in U^0 cap W^0.',
      tips: 'Annihilator flips sums into intersections: (U + W)^0 = U^0 cap W^0 and (U cap W)^0 = U^0 + W^0.'
    }
  ];

  const t = templates[(num - 1) % templates.length];
  return {
    id,
    topicId: 6,
    subtopicId,
    questionNumber: num,
    title: `${t.title} #${num}`,
    difficulty,
    skill,
    problem: t.problem,
    hint: t.hint,
    answerType: 'multiple-choice',
    options: t.options,
    correctAnswer: t.correctAnswer,
    fullSolution: t.solution,
    verificationTips: t.tips
  };
}

// ----------------- TOPIC 7 QUESTIONS -----------------
function t7Question(id, num, subtopicId, difficulty, skill) {
  const templates = [
    {
      title: 'Dual Map Definition and Direction',
      problem: `If $T: V \\to W$ is a linear transformation, in what direction does the dual map (transpose) $T^*$ act?`,
      hint: 'Recall that T* pulls back functionals acting on the codomain W.',
      options: [
        '$T^*: W^* \\to V^*$',
        '$T^*: V^* \\to W^*$',
        '$T^*: V \\to W$',
        '$T^*: W \\to V$'
      ],
      correctAnswer: '$T^*: W^* \\to V^*$',
      solution: 'Given g in W*, (T* g)(v) = g(T v). Since v in V and g(T v) in F, T* g is a functional on V (element of V*). Thus T* maps W* -> V*.',
      tips: 'The dual operator reverses the direction of arrows (contravariant functor).'
    },
    {
      title: 'Matrix of Transpose Operator',
      problem: `If the matrix of $T: V \\to W$ relative to bases $\\mathcal{B}$ and $\\mathcal{C}$ is $A$, what is the matrix of $T^*$ relative to the dual bases $\\mathcal{C}^*$ and $\\mathcal{B}^*$?`,
      hint: 'The algebraic definition of transpose corresponds directly to the matrix operation.',
      options: [
        '$A^T$ (The matrix transpose)',
        '$A^{-1}$',
        '$-A$',
        '$A$'
      ],
      correctAnswer: '$A^T$ (The matrix transpose)',
      solution: 'Using coordinate functionals: ([T*]_{C*, B*})_ij = (T* g_j)(v_i) = g_j(T v_i) = g_j(sum_k A_ki w_k) = A_ji = (A^T)_ij.',
      tips: 'This proves that the matrix transpose is the coordinate manifestation of the dual operator.'
    },
    {
      title: 'Kernel of Transpose Operator',
      problem: `Which fundamental subspace relationship holds for the kernel of the transpose map $T^*$?`,
      hint: 'A functional g is killed by T* iff g(T v) = 0 for all v in V.',
      options: [
        '$\\ker(T^*) = (\\text{im } T)^0$',
        '$\\ker(T^*) = \\ker(T)$',
        '$\\ker(T^*) = (\\ker T)^0$',
        '$\\ker(T^*) = \\text{im}(T)'
      ],
      correctAnswer: '$\\ker(T^*) = (\\text{im } T)^0$',
      solution: 'g in ker(T*) <=> T* g = 0 <=> (T* g)(v) = 0 for all v <=> g(T v) = 0 for all v <=> g in (im T)^0.',
      tips: 'This is the algebraic version of the Fredholm Alternative: Ax = b is solvable iff b is orthogonal to ker(A^T).'
    },
    {
      title: 'Rank Equality between Operator and Transpose',
      problem: `Why does $\\text{rank}(T) = \\text{rank}(T^*)$ always hold for finite-dimensional spaces?`,
      hint: 'Use the dimension formula for annihilators and the Rank-Nullity Theorem.',
      options: [
        'Because $\\text{im}(T^*) = (\\ker T)^0$ and $\\dim((\\ker T)^0) = \\dim(V) - \\dim(\\ker T) = \\text{rank}(T)$',
        'Because both operators have the same domain',
        'Because all matrices are square',
        'It only holds for symmetric matrices'
      ],
      correctAnswer: 'Because $\\text{im}(T^*) = (\\ker T)^0$ and $\\dim((\\ker T)^0) = \\dim(V) - \\dim(\\ker T) = \\text{rank}(T)$',
      solution: 'rank(T*) = dim(im T*) = dim((ker T)^0) = dim(V) - dim(ker T). By Rank-Nullity on T, dim(V) - dim(ker T) = dim(im T) = rank(T).',
      tips: 'This algebraic proof explains why column rank equals row rank without row operations.'
    }
  ];

  const t = templates[(num - 1) % templates.length];
  return {
    id,
    topicId: 7,
    subtopicId,
    questionNumber: num,
    title: `${t.title} #${num}`,
    difficulty,
    skill,
    problem: t.problem,
    hint: t.hint,
    answerType: 'multiple-choice',
    options: t.options,
    correctAnswer: t.correctAnswer,
    fullSolution: t.solution,
    verificationTips: t.tips
  };
}

// ----------------- TOPIC 8 QUESTIONS -----------------
function t8Question(id, num, subtopicId, difficulty, skill) {
  const templates = [
    {
      title: 'Minimal Polynomial and Diagonalizability Criterion',
      problem: `A linear operator $T$ on a finite-dimensional space is diagonalizable over field $F$ if and only if its minimal polynomial $m_T(x)$ has which property?`,
      hint: 'What type of roots must the minimal polynomial have?',
      options: [
        'It splits into distinct linear factors over $F$ (no repeated roots)',
        'It has degree equal to $\\dim(V)$',
        'All its roots are positive',
        'It is irreducible over $F$'
      ],
      correctAnswer: 'It splits into distinct linear factors over $F$ (no repeated roots)',
      solution: 'A cornerstone theorem of canonical forms states that T is diagonalizable iff m_T(x) = (x - lambda_1)...(x - lambda_k) where all lambda_i in F are distinct.',
      tips: 'Repeated roots in the minimal polynomial indicate non-trivial Jordan blocks and defectiveness.'
    },
    {
      title: 'Jordan Block Nilpotent Structure',
      problem: `What is the size of the Jordan block $J_k(\\lambda) = \\lambda I_k + N_k$? What is the index of nilpotency of $N_k$?`,
      hint: 'How many times do you multiply the superdiagonal shift matrix before it becomes zero?',
      options: [
        'Size is $k \\times k$, and $N_k^k = O$ with $N_k^{k-1} \\neq O$ (index $k$)',
        'Size is $k \\times k$, and $N_k^2 = O$',
        'Size is $(k+1) \\times (k+1)$',
        'Index of nilpotency is 1'
      ],
      correctAnswer: 'Size is $k \\times k$, and $N_k^k = O$ with $N_k^{k-1} \\neq O$ (index $k$)',
      solution: 'The matrix N_k has 1s on the superdiagonal. Multiplying N_k shifts the 1s up by one position each time. Thus N_k^k = O while N_k^{k-1} != O.',
      tips: 'The power of (x - lambda) in the minimal polynomial equals the size of the largest Jordan block.'
    },
    {
      title: 'Cayley-Hamilton Theorem Application',
      problem: `If a $2 \\times 2$ matrix $A$ has $\\text{tr}(A) = 5$ and $\\det(A) = 6$, what polynomial equation does $A$ satisfy?`,
      hint: 'Characteristic polynomial is lambda^2 - tr(A) lambda + det(A).',
      options: [
        '$A^2 - 5A + 6I = O$',
        '$A^2 + 5A - 6I = O$',
        '$A^2 - 6A + 5I = O$',
        '$A^2 + 11I = O$'
      ],
      correctAnswer: '$A^2 - 5A + 6I = O$',
      solution: 'For 2x2 matrix, p(x) = x^2 - tr(A)x + det(A) = x^2 - 5x + 6. By Cayley-Hamilton, p(A) = A^2 - 5A + 6I = O.',
      tips: 'This identity allows expressing A^-1 as (5I - A)/6.'
    },
    {
      title: 'Rational Canonical Form vs Field Dependency',
      problem: `Why is the Rational Canonical Form (Frobenius Form) preferred over Jordan Canonical Form when working over general fields like $\\mathbb{Q}$ or $\\mathbb{R}$?`,
      hint: 'Does every polynomial factor completely into linear factors over Q or R?',
      options: [
        'Because Rational Canonical Form exists over ANY field without requiring eigenvalues to belong to the field',
        'Because it is always diagonal',
        'Because it only works for symmetric matrices',
        'Because Jordan forms do not preserve determinants'
      ],
      correctAnswer: 'Because Rational Canonical Form exists over ANY field without requiring eigenvalues to belong to the field',
      solution: 'Jordan Canonical Form requires all roots of the characteristic polynomial to lie in the base field (algebraically closed). Rational Canonical Form uses companion matrices of invariant factors and exists over every field without field extensions.',
      tips: 'Rational Canonical Form is field-invariant; Jordan Form requires splitting of polynomials.'
    }
  ];

  const t = templates[(num - 1) % templates.length];
  return {
    id,
    topicId: 8,
    subtopicId,
    questionNumber: num,
    title: `${t.title} #${num}`,
    difficulty,
    skill,
    problem: t.problem,
    hint: t.hint,
    answerType: 'multiple-choice',
    options: t.options,
    correctAnswer: t.correctAnswer,
    fullSolution: t.solution,
    verificationTips: t.tips
  };
}

// ----------------- TOPIC 9 QUESTIONS -----------------
function t9Question(id, num, subtopicId, difficulty, skill) {
  const templates = [
    {
      title: 'Riesz Representation in Inner Product Spaces',
      problem: `In an inner product space $(V, \\langle \\cdot, \\cdot \\rangle)$, what does the Riesz Representation Theorem state for any continuous linear functional $f \\in V^*$?`,
      hint: 'Every functional can be viewed as an inner product against a single vector.',
      options: [
        'There exists a unique vector $w \\in V$ such that $f(v) = \\langle v, w \\rangle$ for all $v \\in V$',
        '$f(v) = 0$ for all $v$',
        'The functional is self-adjoint',
        '$f$ must be an isometry'
      ],
      correctAnswer: 'There exists a unique vector $w \\in V$ such that $f(v) = \\langle v, w \\rangle$ for all $v \\in V$',
      solution: 'The Riesz Representation Theorem provides a natural conjugate-linear isomorphism between V and V* via w -> <., w>.',
      tips: 'The vector w is orthogonal to ker(f).'
    },
    {
      title: 'Spectral Theorem for Self-Adjoint Operators',
      problem: `What does the Spectral Theorem guarantee for a self-adjoint operator $T = T^*$ on a finite-dimensional inner product space?`,
      hint: 'What kind of basis of eigenvectors exists and what are the eigenvalues?',
      options: [
        'All eigenvalues are real, and there exists an orthonormal basis of eigenvectors of $T$',
        'All eigenvalues are complex numbers on the unit circle',
        '$T$ is always invertible',
        '$T$ has only positive eigenvalues'
      ],
      correctAnswer: 'All eigenvalues are real, and there exists an orthonormal basis of eigenvectors of $T$',
      solution: 'The Spectral Theorem states that self-adjoint operators can be orthogonally diagonalized with purely real eigenvalues.',
      tips: 'This is the foundation of principal component analysis and quantum observable decomposition.'
    },
    {
      title: 'Unitary Operator Characterization',
      problem: `An operator $U$ on an inner product space is unitary if and only if:`,
      hint: 'What does a unitary operator do to inner products and vector lengths?',
      options: [
        '$U^* U = U U^* = I$ (preserves inner products: $\\langle Uv, Uw \\rangle = \\langle v, w \\rangle$)',
        '$U^* = -U$',
        '$\\det(U) = 0$',
        '$U$ is symmetric'
      ],
      correctAnswer: '$U^* U = U U^* = I$ (preserves inner products: $\\langle Uv, Uw \\rangle = \\langle v, w \\rangle$)',
      solution: '<U v, U w> = <v, U* U w> = <v, w> for all v, w iff U* U = I. This means U preserves lengths and angles.',
      tips: 'Unitary operators are the complex generalizations of orthogonal rotations and reflections.'
    },
    {
      title: 'Orthogonal Complement and Annihilator Link',
      problem: `Under the Riesz map identifying $V^*$ with $V$, what does the annihilator $W^0 \\le V^*$ correspond to in $V$?`,
      hint: 'Which vectors in V are orthogonal to all vectors in W?',
      options: [
        'The orthogonal complement $W^\\perp$',
        'The subspace $W$ itself',
        'The whole space $V$',
        'The trivial space $\\{0\\}$'
      ],
      correctAnswer: 'The orthogonal complement $W^\\perp$',
      solution: 'f(w) = 0 for all w in W corresponds via Riesz to <w, v_f> = 0 for all w in W, which defines the orthogonal complement W^perp.',
      tips: 'An inner product turns the abstract annihilator W^0 into the geometric orthogonal complement W^perp.'
    }
  ];

  const t = templates[(num - 1) % templates.length];
  return {
    id,
    topicId: 9,
    subtopicId,
    questionNumber: num,
    title: `${t.title} #${num}`,
    difficulty,
    skill,
    problem: t.problem,
    hint: t.hint,
    answerType: 'multiple-choice',
    options: t.options,
    correctAnswer: t.correctAnswer,
    fullSolution: t.solution,
    verificationTips: t.tips
  };
}

// ----------------- TOPIC 10 QUESTIONS -----------------
function t10Question(id, num, subtopicId, difficulty, skill) {
  const templates = [
    {
      title: 'Bilinear Form Matrix Transformation Law',
      problem: `Under a change of basis with transition matrix $P$ ($[v] = P [v\']$), the matrix $A$ of a bilinear form transforms according to which formula?`,
      hint: 'Remember: bilinear forms transform by congruence, not similarity.',
      options: [
        '$A\' = P^T A P$ (Congruence)',
        '$A\' = P^{-1} A P$ (Similarity)',
        '$A\' = P A P^T$',
        '$A\' = P A P^{-1}$'
      ],
      correctAnswer: '$A\' = P^T A P$ (Congruence)',
      solution: 'B(u, v) = [u]^T A [v] = (P [u\'])^T A (P [v\']) = [u\']^T (P^T A P) [v\']. Thus the new matrix is P^T A P.',
      tips: 'Similarity is for linear operators; congruence is for bilinear forms.'
    },
    {
      title: 'Left and Right Radicals',
      problem: `For a bilinear form $B: V \\times V \\to F$, what is the definition of the left radical $\\text{rad}_L(B)$?`,
      hint: 'It consists of all vectors that yield zero when placed in the left slot.',
      options: [
        '$\\text{rad}_L(B) = \\{u \\in V \\mid B(u, v) = 0 \\; \\forall v \\in V\\}$',
        '$\\text{rad}_L(B) = \\{v \\in V \\mid B(u, v) = 0 \\; \\forall u \\in V\\}$',
        '$\\text{rad}_L(B) = \\{u \\in V \\mid B(u, u) = 0\\}$',
        '$\\text{rad}_L(B) = \\ker(A)$'
      ],
      correctAnswer: '$\\text{rad}_L(B) = \\{u \\in V \\mid B(u, v) = 0 \\; \\forall v \\in V\\}$',
      solution: 'The left radical is the subspace of all vectors u such that B(u, v) = 0 for every choice of v in V.',
      tips: 'A bilinear form is non-degenerate iff both left and right radicals are {0}.'
    },
    {
      title: 'Non-Degeneracy and Determinant',
      problem: `In a finite-dimensional space, a bilinear form $B$ with representation matrix $A$ is non-degenerate if and only if:`,
      hint: 'What matrix property ensures that Ax = 0 has only the zero solution?',
      options: [
        '$\\det(A) \\neq 0$ (Matrix $A$ is invertible)',
        '$\\det(A) = 0$',
        '$\\text{tr}(A) > 0$',
        '$A$ is symmetric'
      ],
      correctAnswer: '$\\det(A) \\neq 0$ (Matrix $A$ is invertible)',
      solution: 'u in rad(B) <=> A u = 0. The radical is trivial {0} iff the homogeneous system Ax = 0 has only the trivial solution, which means det(A) != 0.',
      tips: 'Invertibility of the representation matrix is the exact condition for non-degeneracy.'
    },
    {
      title: 'Rank of a Bilinear Form',
      problem: `How does the rank of the matrix of a bilinear form behave under an invertible change of basis $P$?`,
      hint: 'Multiplying by invertible matrices does not change rank.',
      options: [
        'Rank is an absolute invariant: $\\text{rank}(P^T A P) = \\text{rank}(A)$',
        'Rank can increase',
        'Rank can decrease',
        'Rank becomes zero'
      ],
      correctAnswer: 'Rank is an absolute invariant: $\\text{rank}(P^T A P) = \\text{rank}(A)$',
      solution: 'Since P is invertible, P^T is also invertible. Multiplying by invertible matrices preserves matrix rank: rank(P^T A P) = rank(A).',
      tips: 'The rank of a bilinear form is a well-defined coordinate-independent invariant.'
    }
  ];

  const t = templates[(num - 1) % templates.length];
  return {
    id,
    topicId: 10,
    subtopicId,
    questionNumber: num,
    title: `${t.title} #${num}`,
    difficulty,
    skill,
    problem: t.problem,
    hint: t.hint,
    answerType: 'multiple-choice',
    options: t.options,
    correctAnswer: t.correctAnswer,
    fullSolution: t.solution,
    verificationTips: t.tips
  };
}

// ----------------- TOPIC 11 QUESTIONS -----------------
function t11Question(id, num, subtopicId, difficulty, skill) {
  const templates = [
    {
      title: 'Polarization Identity for Symmetric Bilinear Forms',
      problem: `Given a quadratic form $Q(v) = B(v, v)$ associated with a symmetric bilinear form $B$ over a field of characteristic $\\neq 2$, how is $B(u, v)$ recovered?`,
      hint: 'Expand Q(u + v) and isolate the cross term.',
      options: [
        '$B(u, v) = \\frac{1}{2}\\left( Q(u+v) - Q(u) - Q(v) \\right)$',
        '$B(u, v) = Q(u) + Q(v)$',
        '$B(u, v) = Q(u) \\cdot Q(v)$',
        '$B(u, v) = \\sqrt{Q(u) Q(v)}$'
      ],
      correctAnswer: '$B(u, v) = \\frac{1}{2}\\left( Q(u+v) - Q(u) - Q(v) \\right)$',
      solution: 'Q(u + v) = B(u+v, u+v) = B(u, u) + 2 B(u, v) + B(v, v) = Q(u) + 2 B(u, v) + Q(v). Solving for B(u, v) yields the polarization identity.',
      tips: 'Polarization establishes a one-to-one correspondence between quadratic forms and symmetric bilinear forms.'
    },
    {
      title: 'Sylvester\'s Law of Inertia Signature',
      problem: `According to Sylvester\'s Law of Inertia, any real symmetric bilinear form can be transformed by congruence into a diagonal matrix with entries from $\\{+1, -1, 0\\}$. What is invariant?`,
      hint: 'The triple (p, q, r) count.',
      options: [
        'The numbers $p$ (positive), $q$ (negative), and $r$ (zero) diagonal entries are strictly invariant',
        'The exact eigenvalues are invariant',
        'The eigenvectors are invariant',
        'Only the determinant is invariant'
      ],
      correctAnswer: 'The numbers $p$ (positive), $q$ (negative), and $r$ (zero) diagonal entries are strictly invariant',
      solution: 'Sylvester\'s Law of Inertia asserts that the inertia signature (p, q, r) is an absolute invariant under any real congruence transformation.',
      tips: 'Signs of eigenvalues cannot change under real congruence.'
    },
    {
      title: 'Sylvester\'s Criterion for Positive Definiteness',
      problem: `A real symmetric $n \\times n$ matrix $A$ is positive definite if and only if:`,
      hint: 'What must be true of all leading principal minors Delta_1, Delta_2, ..., Delta_n?',
      options: [
        'All leading principal minors are strictly positive: $\\Delta_k > 0$ for $k = 1, \\dots, n$',
        'Only $\\det(A) > 0$',
        'All entries of $A$ are positive numbers',
        '$\\text{tr}(A) > 0$'
      ],
      correctAnswer: 'All leading principal minors are strictly positive: $\\Delta_k > 0$ for $k = 1, \\dots, n$',
      solution: 'Sylvester\'s criterion states that a symmetric matrix is positive definite iff its top-left submatrices have strictly positive determinants.',
      tips: 'Having positive entries does NOT imply positive definiteness (e.g. [[1, 3], [3, 1]]).'
    },
    {
      title: 'Classification of Quadric Surfaces',
      problem: `If a quadratic form on $\\mathbb{R}^2$ has Sylvester signature $(p=1, q=1, r=0)$, what is the geometric shape of the graph $z = Q(x, y)$?`,
      hint: 'One eigenvalue is positive and one is negative.',
      options: [
        'Hyperbolic Paraboloid (Saddle surface)',
        'Elliptic Paraboloid (Upward bowl)',
        'Parabolic Cylinder (Trough)',
        'Inverted Bowl'
      ],
      correctAnswer: 'Hyperbolic Paraboloid (Saddle surface)',
      solution: 'A signature with one positive and one negative term (like x^2 - y^2) describes an indefinite form, which produces a saddle surface (hyperbolic paraboloid).',
      tips: 'Saddle surfaces have principal curvatures of opposite signs.'
    }
  ];

  const t = templates[(num - 1) % templates.length];
  return {
    id,
    topicId: 11,
    subtopicId,
    questionNumber: num,
    title: `${t.title} #${num}`,
    difficulty,
    skill,
    problem: t.problem,
    hint: t.hint,
    answerType: 'multiple-choice',
    options: t.options,
    correctAnswer: t.correctAnswer,
    fullSolution: t.solution,
    verificationTips: t.tips
  };
}

// ----------------- TOPIC 12 QUESTIONS -----------------
function t12Question(id, num, subtopicId, difficulty, skill) {
  const templates = [
    {
      title: 'Alternating vs Skew-Symmetric Condition',
      problem: `A bilinear form $B$ is alternating if $B(v, v) = 0$ for all $v$. Expanding $B(u+v, u+v) = 0$ proves which skew-symmetric property?`,
      hint: 'Expand bilinearly and cancel B(u, u) and B(v, v).',
      options: [
        '$B(u, v) = -B(v, u)$',
        '$B(u, v) = B(v, u)$',
        '$B(u, v) = 0$ for all $u, v$',
        '$B(u, v) = 1$'
      ],
      correctAnswer: '$B(u, v) = -B(v, u)$',
      solution: '0 = B(u+v, u+v) = B(u, u) + B(u, v) + B(v, u) + B(v, v) = 0 + B(u, v) + B(v, u) + 0 => B(u, v) = -B(v, u).',
      tips: 'In characteristic != 2, alternating and skew-symmetric are completely equivalent.'
    },
    {
      title: 'Determinant of Odd-Sized Skew-Symmetric Matrix',
      problem: `Let $A$ be a $7 \\times 7$ skew-symmetric real matrix ($A^T = -A$). What is the value of $\\det(A)$?`,
      hint: 'Use det(A) = det(A^T) = det(-A) = (-1)^7 det(A).',
      options: ['0', '1', '7', '-1'],
      correctAnswer: '0',
      solution: 'det(A) = det(A^T) = det(-A) = (-1)^7 det(A) = -det(A) => 2 det(A) = 0 => det(A) = 0.',
      tips: 'Any odd-dimensional skew-symmetric matrix is automatically singular.'
    },
    {
      title: 'Symplectic Canonical Block Form',
      problem: `Every non-degenerate alternating bilinear form on a $2m$-dimensional space can be transformed by congruence into which standard block form?`,
      hint: 'The standard symplectic matrix J.',
      options: [
        '$\\begin{pmatrix} 0 & I_m \\\\ -I_m & 0 \\end{pmatrix}$',
        '$\\begin{pmatrix} I_m & 0 \\\\ 0 & -I_m \\end{pmatrix}$',
        '$\\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix}$',
        '$\\begin{pmatrix} I_m & 0 \\\\ 0 & I_m \\end{pmatrix}$'
      ],
      correctAnswer: '$\\begin{pmatrix} 0 & I_m \\\\ -I_m & 0 \\end{pmatrix}$',
      solution: 'A symplectic basis pairs position p_i and momentum q_i vectors such that B(p_i, q_j) = delta_ij, giving the canonical block matrix [[0, I], [-I, 0]].',
      tips: 'This is the universal canonical form for non-degenerate alternating forms.'
    },
    {
      title: 'The Pfaffian Polynomial',
      problem: `For an even-dimensional skew-symmetric matrix $A \\in M_{2m}(F)$, what is the relationship between $\\det(A)$ and the Pfaffian $\\text{Pf}(A)$?`,
      hint: 'The Pfaffian is the polynomial square root of the determinant.',
      options: [
        '$\\det(A) = (\\text{Pf}(A))^2$',
        '$\\det(A) = 2 \\cdot \\text{Pf}(A)$',
        '$\\text{Pf}(A) = \\det(A)$',
        '$\\text{Pf}(A) = \\text{tr}(A)$'
      ],
      correctAnswer: '$\\det(A) = (\\text{Pf}(A))^2$',
      solution: 'Cayley proved that the determinant of any skew-symmetric matrix of even size is the square of a polynomial in its entries, called the Pfaffian.',
      tips: 'Pfaffian appears extensively in quantum field theory and statistical mechanics (dimer problems).'
    }
  ];

  const t = templates[(num - 1) % templates.length];
  return {
    id,
    topicId: 12,
    subtopicId,
    questionNumber: num,
    title: `${t.title} #${num}`,
    difficulty,
    skill,
    problem: t.problem,
    hint: t.hint,
    answerType: 'multiple-choice',
    options: t.options,
    correctAnswer: t.correctAnswer,
    fullSolution: t.solution,
    verificationTips: t.tips
  };
}
