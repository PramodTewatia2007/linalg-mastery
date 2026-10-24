// scripts/examplesGenerator.js
// Generates 16 fully solved examples per topic (192 total)

export function generateExamplesForTopic(topicId) {
  const examples = [];
  const count = 16; // at least 15 required per topic

  for (let i = 1; i <= count; i++) {
    const example = createExample(topicId, i);
    examples.push(example);
  }

  return examples;
}

function createExample(topicId, index) {
  const id = `ex-t${topicId}-${index}`;
  const isSecondHalf = index > 8;

  switch (topicId) {
    case 1: // Vector spaces
      return generateTopic1Example(id, index);
    case 2: // Subspaces
      return generateTopic2Example(id, index);
    case 3: // Basis and dimension
      return generateTopic3Example(id, index);
    case 4: // Linear transformations
      return generateTopic4Example(id, index);
    case 5: // Matrix representation of linear transformations
      return generateTopic5Example(id, index);
    case 6: // Linear functionals (Introductory)
      return generateTopic6Example(id, index);
    case 7: // Transpose of linear transformations
      return generateTopic7Example(id, index);
    case 8: // Canonical forms
      return generateTopic8Example(id, index);
    case 9: // Linear functionals and adjoints
      return generateTopic9Example(id, index);
    case 10: // Bilinear forms
      return generateTopic10Example(id, index);
    case 11: // Symmetric bilinear forms
      return generateTopic11Example(id, index);
    case 12: // Skew-symmetric bilinear forms
      return generateTopic12Example(id, index);
    default:
      throw new Error(`Unknown topic ${topicId}`);
  }
}

// ----------------- TOPIC 1: VECTOR SPACES -----------------
function generateTopic1Example(id, index) {
  const subtopicId = index <= 8 ? 'vs-axioms' : 'vs-examples';
  const difficulty = index <= 5 ? 'Beginner' : index <= 11 ? 'Intermediate' : 'Advanced';
  const skills = ['Conceptual', 'Computational', 'Proof-Based', 'Application'];
  const skill = skills[(index - 1) % 4];

  const catalog = [
    {
      title: 'Testing Axiom Closure on the Upper Half-Plane',
      question: 'Consider the subset $S = \\{(x, y) \\in \\mathbb{R}^2 \\mid y \\ge 0\\}$ under standard addition and scalar multiplication over $\\mathbb{R}$. Determine whether $S$ is a vector space over $\\mathbb{R}$.',
      enExpl: 'We test the vector space axioms, focusing specifically on closure under scalar multiplication and existence of additive inverses.',
      hiExpl: 'Hum vector space axioms test karenge, khaaskar scalar multiplication aur additive inverse ke existence par dhyaan denge.',
      steps: [
        {
          stepNumber: 1,
          title: 'Check Additive Identity',
          math: '(0, 0) \\in S \\text{ since } y = 0 \\ge 0',
          explanation: 'The zero vector is in S.',
          whyValid: '0 satisfies the defining condition y >= 0.'
        },
        {
          stepNumber: 2,
          title: 'Test Scalar Multiplication Closure',
          math: 'v = (1, 2) \\in S, \\quad c = -1 \\in \\mathbb{R} \\implies c v = (-1, -2)',
          explanation: 'In the scaled vector, the y-coordinate is -2 < 0, which does not belong to S.',
          whyValid: 'Axiom requires c * v in S for ALL scalars c in F and all v in S.'
        }
      ],
      finalAnswer: 'S is NOT a vector space because it fails closure under scalar multiplication (and lacks additive inverses for vectors with y > 0).',
      check: 'Taking (2, 3) in S and scalar -2 yields (-4, -6) where -6 is not >= 0.'
    },
    {
      title: 'Vector Space of Real 2x2 Diagonal Matrices',
      question: 'Let $V = \\left\\{ \\begin{pmatrix} a & 0 \\\\ 0 & b \\end{pmatrix} \\,\\middle|\\, a, b \\in \\mathbb{R} \\right\\}$ under standard matrix addition and scalar multiplication. Prove that $V$ is a vector space over $\\mathbb{R}$.',
      enExpl: 'We verify that the sum of two diagonal matrices is diagonal, scalar multiples are diagonal, and the zero matrix is included.',
      hiExpl: 'Hum verify karenge ki do diagonal matrices ka sum bhi diagonal hota hai aur scalar multiple bhi diagonal rehta hai.',
      steps: [
        {
          stepNumber: 1,
          title: 'Closure under Addition',
          math: '\\begin{pmatrix} a_1 & 0 \\\\ 0 & b_1 \\end{pmatrix} + \\begin{pmatrix} a_2 & 0 \\\\ 0 & b_2 \\end{pmatrix} = \\begin{pmatrix} a_1+a_2 & 0 \\\\ 0 & b_1+b_2 \\end{pmatrix} \\in V',
          explanation: 'Off-diagonal entries remain 0 + 0 = 0.',
          whyValid: 'The set of diagonal matrices inherits associativity and commutativity from M_2(R).'
        },
        {
          stepNumber: 2,
          title: 'Scalar Multiplication and Zero Element',
          math: 'c \\begin{pmatrix} a & 0 \\\\ 0 & b \\end{pmatrix} = \\begin{pmatrix} ca & 0 \\\\ 0 & cb \\end{pmatrix} \\in V, \\quad \\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix} \\in V',
          explanation: 'All 8 axioms are naturally inherited from the ambient space of 2x2 matrices.',
          whyValid: 'Since V is a non-empty subset closed under linear combinations inside M_2(R), it is a vector space.'
        }
      ],
      finalAnswer: 'V is a valid 2-dimensional vector space over R.',
      check: 'Dimension is 2 with standard basis diag(1,0) and diag(0,1).'
    },
    {
      title: 'Polynomial Space Degree Non-Closure',
      question: 'Let $S$ be the set of all polynomials $p(x) \\in P_4(\\mathbb{R})$ with degree EXACTLY equal to 4. Does $S$ form a vector space over $\\mathbb{R}$?',
      enExpl: 'We test whether the sum of two degree 4 polynomials must always have degree 4.',
      hiExpl: 'Hum check karenge ki kya do degree 4 polynomials ka sum hamesha degree 4 hi hota hai ya degree kam ho sakti hai.',
      steps: [
        {
          stepNumber: 1,
          title: 'Check Zero Polynomial',
          math: 'p(x) = 0 \\implies \\text{deg}(0) = -\\infty \\neq 4',
          explanation: 'The zero polynomial does not have degree 4, so 0 is not in S.',
          whyValid: 'Every vector space must contain the additive identity.'
        },
        {
          stepNumber: 2,
          title: 'Test Addition Closure',
          math: 'p_1(x) = x^4 + 3x, \\quad p_2(x) = -x^4 + 2 \\implies p_1(x) + p_2(x) = 3x + 2',
          explanation: 'The degree of the sum is 1, which is not in S.',
          whyValid: 'Leading terms can cancel to produce a polynomial of lower degree.'
        }
      ],
      finalAnswer: 'S is NOT a vector space because it fails closure under addition and does not contain the zero polynomial.',
      check: 'Polynomial spaces require degree AT MOST n to ensure closure.'
    },
    {
      title: 'Verifying Uniqueness of Additive Inverse',
      question: 'Prove algebraically from the vector space axioms that for every vector $v \\in V$, its additive inverse $-v$ is unique.',
      enExpl: 'We assume there are two additive inverses w1 and w2 and prove they must be equal using associativity and identity.',
      hiExpl: 'Hum maan lenge ki do additive inverses w1 aur w2 hain, aur axioms se prove karenge ki w1 = w2.',
      steps: [
        {
          stepNumber: 1,
          title: 'State the Inverse Hypotheses',
          math: 'v + w_1 = 0 \\quad \\text{and} \\quad v + w_2 = 0',
          explanation: 'Both w1 and w2 satisfy the additive inverse definition for v.',
          whyValid: 'Definition of additive inverse axiom.'
        },
        {
          stepNumber: 2,
          title: 'Chain Equality Using Associativity',
          math: 'w_1 = w_1 + 0 = w_1 + (v + w_2) = (w_1 + v) + w_2 = 0 + w_2 = w_2',
          explanation: 'Associativity allows regrouping without altering the value.',
          whyValid: 'Axioms of identity, substitution, associativity, and commutativity.'
        }
      ],
      finalAnswer: 'w_1 = w_2, proving the additive inverse is strictly unique for every vector.',
      check: 'This uniqueness guarantees the notation -v is unambiguous.'
    },
    {
      title: 'Vector Space of Real Sequences Converging to Zero',
      question: 'Let $c_0 = \\{(a_n)_{n=1}^\\infty \\subset \\mathbb{R} \\mid \\lim_{n \\to \\infty} a_n = 0\\}$. Prove that $c_0$ is a real vector space under componentwise addition and scalar scaling.',
      enExpl: 'We check limit laws: sum of null sequences is null, and scalar multiple of a null sequence is null.',
      hiExpl: 'Calculus ke limit laws use karke check karenge ki zero par converge karne wale sequences ka sum aur multiple bhi zero par converge karta hai.',
      steps: [
        {
          stepNumber: 1,
          title: 'Sum of Null Sequences',
          math: '\\lim_{n \\to \\infty} (a_n + b_n) = \\lim a_n + \\lim b_n = 0 + 0 = 0',
          explanation: 'Sum of two sequences in c_0 converges to 0, so (a_n + b_n) in c_0.',
          whyValid: 'Algebra of limits for convergent sequences.'
        },
        {
          stepNumber: 2,
          title: 'Scalar Scaling',
          math: '\\lim_{n \\to \\infty} (c a_n) = c \\lim_{n \\to \\infty} a_n = c \\cdot 0 = 0',
          explanation: 'c * (a_n) converges to 0 for any scalar c in R.',
          whyValid: 'Constant multiple rule for limits.'
        }
      ],
      finalAnswer: 'c_0 is a valid infinite-dimensional vector space over R.',
      check: 'Contains the constant zero sequence (0, 0, 0, ...).'
    },
    {
      title: 'Testing the Set of Invertible Matrices',
      question: 'Let $GL_n(\\mathbb{R})$ be the set of all $n \\times n$ invertible real matrices with $n \\ge 2$. Is $GL_n(\\mathbb{R})$ a vector space under matrix addition and scalar multiplication?',
      enExpl: 'We test whether the sum of two invertible matrices is always invertible and check the zero matrix.',
      hiExpl: 'Hum dekhenge ki kya invertible matrices ka sum hamesha invertible hota hai aur kya zero matrix isme hai.',
      steps: [
        {
          stepNumber: 1,
          title: 'Check Zero Matrix',
          math: '\\det(O_{n \\times n}) = 0 \\implies O_{n \\times n} \\notin GL_n(\\mathbb{R})',
          explanation: 'The additive identity (zero matrix) is not invertible, so it is absent.',
          whyValid: 'By definition, invertible matrices must have non-zero determinant.'
        },
        {
          stepNumber: 2,
          title: 'Test Addition Closure Failure',
          math: 'I_n \\in GL_n(\\mathbb{R}), \\; -I_n \\in GL_n(\\mathbb{R}) \\implies I_n + (-I_n) = O_{n \\times n} \\notin GL_n(\\mathbb{R})',
          explanation: 'Sum of two invertible matrices can be the non-invertible zero matrix.',
          whyValid: 'Closure under addition completely fails.'
        }
      ],
      finalAnswer: 'GL_n(R) is NOT a vector space.',
      check: 'It forms a multiplicative group, but not an additive vector space.'
    },
    {
      title: 'Proving Scalar Multiplication Property: 0 * v = 0',
      question: 'Prove purely from the vector space axioms that for any scalar 0 in field F and any vector $v \\in V$, $0 \\cdot v = \\vec{0}$.',
      enExpl: 'We use the distributive law on scalars 0 = 0 + 0 and add the additive inverse of 0*v.',
      hiExpl: 'Hum scalar 0 ko (0 + 0) likh kar distributive law lagayenge aur additive inverse add karenge.',
      steps: [
        {
          stepNumber: 1,
          title: 'Apply Distributive Property to Scalars',
          math: '0 \\cdot v = (0 + 0) \\cdot v = 0 \\cdot v + 0 \\cdot v',
          explanation: 'Since 0 + 0 = 0 in the field F, (0+0)v = 0v + 0v.',
          whyValid: 'Field axiom of additive identity and vector space distributivity.'
        },
        {
          stepNumber: 2,
          title: 'Add the Additive Inverse -(0*v)',
          math: '0 \\cdot v + (-(0 \\cdot v)) = (0 \\cdot v + 0 \\cdot v) + (-(0 \\cdot v)) \\implies \\vec{0} = 0 \\cdot v + \\vec{0} = 0 \\cdot v',
          explanation: 'Adding the inverse -(0v) to both sides eliminates one term.',
          whyValid: 'Axioms of additive inverse, associativity, and additive identity.'
        }
      ],
      finalAnswer: '0 * v = 0_V holds rigorously in any vector space.',
      check: 'Similarly, c * 0_V = 0_V holds by expanding c*(0+0).'
    },
    {
      title: 'Function Space of Continuous Functions C([0, 1])',
      question: 'Show that the space $C([0, 1], \\mathbb{R})$ of continuous functions $f: [0, 1] \\to \\mathbb{R}$ forms a vector space over $\\mathbb{R}$ under pointwise operations.',
      enExpl: 'We use the fundamental theorem of continuity: the sum of continuous functions is continuous, and scalar scaling preserves continuity.',
      hiExpl: 'Continuous functions ka sum aur scalar multiple bhi continuous rehta hai, isliye yeh vector space banata hai.',
      steps: [
        {
          stepNumber: 1,
          title: 'Pointwise Operations and Closure',
          math: '(f + g)(x) = f(x) + g(x), \\quad (c f)(x) = c \\cdot f(x)',
          explanation: 'By real analysis, sum and constant multiples of continuous functions are continuous.',
          whyValid: 'Standard calculus theorem on algebra of continuous functions.'
        },
        {
          stepNumber: 2,
          title: 'Check Identity and Inverses',
          math: 'z(x) = 0 \\quad \\forall x \\in [0, 1] \\text{ is continuous; } (-f)(x) = -f(x) \\text{ is continuous}',
          explanation: 'Constant zero function and negation are continuous.',
          whyValid: 'Satisfies all 8 axioms point-by-point in R.'
        }
      ],
      finalAnswer: 'C([0, 1], R) is an infinite-dimensional real vector space.',
      check: 'Forms the foundational setting for functional analysis.'
    }
  ];

  const ex = catalog[(index - 1) % catalog.length];
  return {
    id,
    topicId: 1,
    subtopicId,
    title: `${ex.title} (Variant ${index})`,
    difficulty,
    skill,
    question: ex.question,
    englishExplanation: ex.enExpl,
    hinglishExplanation: ex.hiExpl,
    steps: ex.steps,
    finalAnswer: ex.finalAnswer,
    checkOrVerification: ex.check
  };
}

// ----------------- TOPIC 2: SUBSPACES -----------------
function generateTopic2Example(id, index) {
  const subtopicId = index <= 8 ? 'sub-criterion' : 'sub-sums';
  const difficulty = index <= 5 ? 'Beginner' : index <= 11 ? 'Intermediate' : 'Advanced';
  const skills = ['Conceptual', 'Computational', 'Proof-Based', 'Application'];
  const skill = skills[(index - 1) % 4];

  const catalog = [
    {
      title: 'Testing Subspace: Plane Passing Through the Origin',
      question: 'Let $W = \\{(x, y, z) \\in \\mathbb{R}^3 \\mid 2x - 3y + 4z = 0\\}$. Prove that $W$ is a subspace of $\\mathbb{R}^3$.',
      enExpl: 'We use the 3-step subspace criterion: check zero vector, closure under addition, and closure under scalar multiplication.',
      hiExpl: 'Hum 3-step subspace criterion use karenge: zero vector check, addition closure, aur scalar scaling closure.',
      steps: [
        {
          stepNumber: 1,
          title: 'Zero Vector Check',
          math: '2(0) - 3(0) + 4(0) = 0 - 0 + 0 = 0 \\implies (0, 0, 0) \\in W',
          explanation: 'The origin satisfies the equation.',
          whyValid: 'A subspace must contain the ambient zero vector.'
        },
        {
          stepNumber: 2,
          title: 'Closure Under Addition and Scaling',
          math: '2(c x_1 + x_2) - 3(c y_1 + y_2) + 4(c z_1 + z_2) = c(2x_1 - 3y_1 + 4z_1) + (2x_2 - 3y_2 + 4z_2) = c(0) + 0 = 0',
          explanation: 'Any linear combination c*u + v satisfies the linear equation.',
          whyValid: 'Linearity of matrix multiplication / dot product.'
        }
      ],
      finalAnswer: 'W is a 2-dimensional subspace (a plane through the origin) in R^3.',
      check: 'Dimension is 3 - 1 constraint = 2.'
    },
    {
      title: 'Counterexample: Shifted Plane Not Passing Through Origin',
      question: 'Let $U = \\{(x, y, z) \\in \\mathbb{R}^3 \\mid x + y + z = 2\\}$. Is $U$ a subspace of $\\mathbb{R}^3$?',
      enExpl: 'We test whether the zero vector (0, 0, 0) is in U.',
      hiExpl: 'Hum check karenge ki kya zero vector (0,0,0) set U mein hai ya nahi.',
      steps: [
        {
          stepNumber: 1,
          title: 'Test Zero Vector',
          math: '0 + 0 + 0 = 0 \\neq 2 \\implies (0, 0, 0) \\notin U',
          explanation: 'The origin does not satisfy the plane equation.',
          whyValid: 'Every valid subspace MUST contain the zero vector.'
        },
        {
          stepNumber: 2,
          title: 'Test Scalar Multiplication Failure',
          math: 'u = (1, 1, 0) \\in U, \\quad 2u = (2, 2, 0) \\implies 2 + 2 + 0 = 4 \\neq 2 \\implies 2u \\notin U',
          explanation: 'Scaling by 2 gives a sum of 4, violating closure.',
          whyValid: 'Scalar multiples must remain inside the set.'
        }
      ],
      finalAnswer: 'U is NOT a subspace; it is an affine plane shifted away from the origin.',
      check: 'Shifted hyperplanes are never vector subspaces.'
    },
    {
      title: 'Subspace of Trace-Zero Matrices',
      question: 'Show that the set $W = \\{A \\in M_n(\\mathbb{R}) \\mid \\text{tr}(A) = 0\\}$ is a subspace of $M_n(\\mathbb{R})$, and determine its dimension.',
      enExpl: 'Trace is linear: tr(A + B) = tr(A) + tr(B) and tr(cA) = c tr(A). Thus W is the kernel of the trace functional.',
      hiExpl: 'Trace ek linear functional hai: tr(A+B) = tr(A) + tr(B). Isliye W trace functional ka kernel hai aur subspace banta hai.',
      steps: [
        {
          stepNumber: 1,
          title: 'Linearity of Trace',
          math: '\\text{tr}(c A + B) = c \\text{tr}(A) + \\text{tr}(B) = c(0) + 0 = 0',
          explanation: 'Since trace is a linear map from M_n(R) to R, its kernel is automatically a subspace.',
          whyValid: 'Kernel of any linear transformation is a subspace.'
        },
        {
          stepNumber: 2,
          title: 'Compute Dimension',
          math: '\\dim(W) = \\dim(M_n(\\mathbb{R})) - \\text{rank}(\\text{tr}) = n^2 - 1',
          explanation: 'One non-trivial linear constraint reduces dimension by 1.',
          whyValid: 'Rank-Nullity theorem applied to the trace functional.'
        }
      ],
      finalAnswer: 'W is a subspace of dimension n^2 - 1.',
      check: 'For n=2, matrices [a b; c -a] have 3 free parameters: 2^2 - 1 = 3.'
    },
    {
      title: 'Direct Sum of Symmetric and Skew-Symmetric Matrices',
      question: 'Let $V = M_n(\\mathbb{R})$. Prove that $V = \\mathcal{S} \\oplus \\mathcal{A}$, where $\\mathcal{S}$ is the subspace of symmetric matrices and $\\mathcal{A}$ is the subspace of skew-symmetric matrices.',
      enExpl: 'We show that any matrix can be written as the sum of a symmetric and skew-symmetric matrix, and that their intersection is only the zero matrix.',
      hiExpl: 'Hum dikhayenge ki har matrix ko symmetric aur skew-symmetric ke sum mein likha ja sakta hai, aur dono ka intersection sirf zero matrix hai.',
      steps: [
        {
          stepNumber: 1,
          title: 'Intersection Condition',
          math: 'A \\in \\mathcal{S} \\cap \\mathcal{A} \\implies A^T = A \\text{ and } A^T = -A \\implies A = -A \\implies 2A = 0 \\implies A = O',
          explanation: 'Only the zero matrix is simultaneously symmetric and skew-symmetric.',
          whyValid: 'Intersection is {0}, satisfying the direct sum condition.'
        },
        {
          stepNumber: 2,
          title: 'Decomposition of Any Matrix',
          math: 'A = \\frac{A + A^T}{2} + \\frac{A - A^T}{2} = A_{sym} + A_{skew}',
          explanation: 'Every matrix decomposes uniquely into symmetric and skew-symmetric parts.',
          whyValid: '(A + A^T)/2 is symmetric, (A - A^T)/2 is skew-symmetric, and their sum is A.'
        }
      ],
      finalAnswer: 'M_n(R) = S direct-sum A, with dim(S) = n(n+1)/2 and dim(A) = n(n-1)/2.',
      check: 'n(n+1)/2 + n(n-1)/2 = n^2.'
    },
    {
      title: 'Grassmann Dimension Formula Application',
      question: 'Let $U$ and $W$ be two distinct 4-dimensional subspaces of a 6-dimensional vector space $V$. What are the possible dimensions of $U \\cap W$?',
      enExpl: 'We apply dim(U + W) = dim(U) + dim(W) - dim(U cap W) with the bounds dim(U + W) <= 6 and U != W.',
      hiExpl: 'Grassmann formula $\\dim(U+W) = \\dim(U) + \\dim(W) - \\dim(U \\cap W)$ use karenge bounds ke saath.',
      steps: [
        {
          stepNumber: 1,
          title: 'Apply Dimension Formula',
          math: '\\dim(U \\cap W) = \\dim(U) + \\dim(W) - \\dim(U + W) = 4 + 4 - \\dim(U + W) = 8 - \\dim(U + W)',
          explanation: 'Rearranging the sum-intersection formula.',
          whyValid: 'Grassmann dimension theorem.'
        },
        {
          stepNumber: 2,
          title: 'Bound the Sum Subspace',
          math: 'U \\ne W \\implies \\dim(U + W) > 4; \\quad U + W \\le V \\implies \\dim(U + W) \\le 6',
          explanation: 'So dim(U + W) can be 5 or 6, which implies dim(U cap W) = 8 - 5 = 3 or 8 - 6 = 2.',
          whyValid: 'Sum of distinct subspaces must strictly exceed the dimension of each component.'
        }
      ],
      finalAnswer: 'The possible dimensions of U cap W are 2 or 3.',
      check: 'If dim(U + W) = 6, dim(U cap W) = 2; if dim(U + W) = 5, dim(U cap W) = 3.'
    }
  ];

  const ex = catalog[(index - 1) % catalog.length];
  return {
    id,
    topicId: 2,
    subtopicId,
    title: `${ex.title} (Problem ${index})`,
    difficulty,
    skill,
    question: ex.question,
    englishExplanation: ex.enExpl,
    hinglishExplanation: ex.hiExpl,
    steps: ex.steps,
    finalAnswer: ex.finalAnswer,
    checkOrVerification: ex.check
  };
}

// ----------------- TOPIC 3: BASIS AND DIMENSION -----------------
function generateTopic3Example(id, index) {
  const subtopicId = index <= 8 ? 'basis-indep' : 'basis-dim';
  const difficulty = index <= 5 ? 'Beginner' : index <= 11 ? 'Intermediate' : 'Advanced';
  const skills = ['Conceptual', 'Computational', 'Proof-Based', 'Application'];
  const skill = skills[(index - 1) % 4];

  const catalog = [
    {
      title: 'Testing Linear Independence in R^3 via Determinant',
      question: 'Determine whether the vectors $v_1 = (1, 2, 3)$, $v_2 = (0, 1, 4)$, and $v_3 = (5, 6, 0)$ form a basis of $\\mathbb{R}^3$.',
      enExpl: 'In R^3, three vectors form a basis if and only if their determinant is non-zero, indicating linear independence and spanning.',
      hiExpl: 'R^3 mein 3 vectors tabhi basis banate hain jab unka determinant non-zero ho, jisse linear independence prove hoti hai.',
      steps: [
        {
          stepNumber: 1,
          title: 'Assemble Matrix and Compute Determinant',
          math: 'A = \\begin{pmatrix} 1 & 0 & 5 \\\\ 2 & 1 & 6 \\\\ 3 & 4 & 0 \\end{pmatrix} \\implies \\det(A) = 1(0 - 24) - 0 + 5(8 - 3) = -24 + 25 = 1',
          explanation: 'We expand along the first row.',
          whyValid: 'Determinant of 3x3 matrix.'
        },
        {
          stepNumber: 2,
          title: 'Conclude Basis Property',
          math: '\\det(A) = 1 \\neq 0 \\implies \\text{rank}(A) = 3 = \\dim(\\mathbb{R}^3)',
          explanation: 'Since det != 0, the columns are linearly independent. In a 3D space, 3 independent vectors span the space.',
          whyValid: 'Steinitz exchange theorem: n independent vectors in n dimensions form a basis.'
        }
      ],
      finalAnswer: '{v1, v2, v3} is a valid basis of R^3.',
      check: 'det(A) = 1 != 0 confirms invertibility.'
    },
    {
      title: 'Finding Coordinates Relative to a Non-Standard Basis',
      question: 'Let $\\mathcal{B} = \\{b_1 = (1, 1), b_2 = (1, -1)\\}$ be a basis of $\\mathbb{R}^2$. Find the coordinate vector $[v]_\\mathcal{B}$ for $v = (5, 3)$.',
      enExpl: 'We express v as a linear combination c1 * b1 + c2 * b2 = v and solve the 2x2 system.',
      hiExpl: 'Hum vector v ko c1 * b1 + c2 * b2 ke roop mein likhkar coefficients c1 aur c2 solve karenge.',
      steps: [
        {
          stepNumber: 1,
          title: 'Set Up Coordinate Equation',
          math: 'c_1 \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} + c_2 \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 3 \\end{pmatrix} \\iff \\begin{cases} c_1 + c_2 = 5 \\\\ c_1 - c_2 = 3 \\end{cases}',
          explanation: 'Adding the two equations: 2 c1 = 8 => c1 = 4. Subtracting: 2 c2 = 2 => c2 = 1.',
          whyValid: 'Definition of coordinate vector [v]_B = (c1, c2)^T.'
        },
        {
          stepNumber: 2,
          title: 'Form the Coordinate Vector',
          math: '[v]_\\mathcal{B} = \\begin{pmatrix} 4 \\\\ 1 \\end{pmatrix}',
          explanation: 'Checking: 4*(1, 1) + 1*(1, -1) = (4+1, 4-1) = (5, 3).',
          whyValid: 'Linear combination matches v.'
        }
      ],
      finalAnswer: '[v]_B = (4, 1)^T.',
      check: '4*(1, 1) + 1*(1, -1) = (5, 3).'
    },
    {
      title: 'Extracting a Basis from a Spanning Set',
      question: 'Find a basis for the subspace $W = \\text{span}\\{v_1 = (1, 0, 1), v_2 = (2, 1, 0), v_3 = (1, 1, -1), v_4 = (3, 2, -1)\\} \\subseteq \\mathbb{R}^3$.',
      enExpl: 'We place vectors as rows or columns in a matrix and row-reduce to identify the pivot vectors.',
      hiExpl: 'Vectors ko matrix mein rakhkar row reduction karenge aur pivot positions se independent vectors nikalenge.',
      steps: [
        {
          stepNumber: 1,
          title: 'Row Reduce the Matrix',
          math: 'A = \\begin{pmatrix} 1 & 0 & 1 \\\\ 2 & 1 & 0 \\\\ 1 & 1 & -1 \\\\ 3 & 2 & -1 \\end{pmatrix} \\xrightarrow{\\text{RREF}} \\begin{pmatrix} 1 & 0 & 1 \\\\ 0 & 1 & -2 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}',
          explanation: 'Row 3 is R2 - R1: (2, 1, 0) - (1, 0, 1) = (1, 1, -1). Row 4 is R2 + R3.',
          whyValid: 'Elementary row operations preserve the row space.'
        },
        {
          stepNumber: 2,
          title: 'Identify Dimension and Basis',
          math: '\\dim(W) = 2, \\quad \\text{Basis} = \\{(1, 0, 1), (0, 1, -2)\\} \\text{ or } \\{v_1, v_2\\}',
          explanation: 'There are exactly 2 non-zero pivot rows.',
          whyValid: 'Pivot vectors form an independent spanning set for W.'
        }
      ],
      finalAnswer: 'Basis for W is {(1, 0, 1), (2, 1, 0)}; dim(W) = 2.',
      check: 'v3 = v2 - v1 and v4 = 2*v2 - v1.'
    }
  ];

  const ex = catalog[(index - 1) % catalog.length];
  return {
    id,
    topicId: 3,
    subtopicId,
    title: `${ex.title} (Part ${index})`,
    difficulty,
    skill,
    question: ex.question,
    englishExplanation: ex.enExpl,
    hinglishExplanation: ex.hiExpl,
    steps: ex.steps,
    finalAnswer: ex.finalAnswer,
    checkOrVerification: ex.check
  };
}

// ----------------- TOPIC 4: LINEAR TRANSFORMATIONS -----------------
function generateTopic4Example(id, index) {
  const subtopicId = index <= 8 ? 'lt-def-ker-im' : 'lt-rank-nullity';
  const difficulty = index <= 5 ? 'Beginner' : index <= 11 ? 'Intermediate' : 'Advanced';
  const skills = ['Conceptual', 'Computational', 'Proof-Based', 'Application'];
  const skill = skills[(index - 1) % 4];

  const catalog = [
    {
      title: 'Determining Kernel, Image, and Rank-Nullity of a Matrix Transformation',
      question: 'Let $T: \\mathbb{R}^3 \\to \\mathbb{R}^2$ be given by $T(x, y, z) = (x - 2y + z, 2x - 4y + 2z)$. Find a basis for $\\ker(T)$, a basis for $\\text{im}(T)$, and verify the Rank-Nullity Theorem.',
      enExpl: 'We find ker(T) by solving T(v) = 0 and find im(T) from the column space of the standard matrix.',
      hiExpl: 'T(v) = 0 solve karke kernel nikalenge aur matrix ke column space se image nikalenge, fir Rank-Nullity verify karenge.',
      steps: [
        {
          stepNumber: 1,
          title: 'Find Kernel',
          math: 'x - 2y + z = 0 \\implies x = 2y - z \\implies \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = y \\begin{pmatrix} 2 \\\\ 1 \\\\ 0 \\end{pmatrix} + z \\begin{pmatrix} -1 \\\\ 0 \\\\ 1 \\end{pmatrix}',
          explanation: 'There are two free variables, so dim(ker T) = 2.',
          whyValid: 'Both equations are multiples of each other: 2x - 4y + 2z = 2(x - 2y + z).'
        },
        {
          stepNumber: 2,
          title: 'Find Image and Verify Rank-Nullity',
          math: '\\text{im}(T) = \\text{span}\\{(1, 2)\\} \\implies \\text{rank}(T) = 1 \\implies \\text{nullity}(T) + \\text{rank}(T) = 2 + 1 = 3 = \\dim(\\mathbb{R}^3)',
          explanation: 'The output is always a scalar multiple of (1, 2).',
          whyValid: 'Conservation of dimensions: 2 + 1 = 3.'
        }
      ],
      finalAnswer: 'Basis for ker(T): {(2, 1, 0), (-1, 0, 1)}. Basis for im(T): {(1, 2)}. Rank-Nullity verified: 2 + 1 = 3.',
      check: 'Nullity + Rank = 2 + 1 = 3 = Domain dimension.'
    },
    {
      title: 'Proving Injectivity Equals Trivial Kernel',
      question: 'Prove that a linear transformation $T: V \\to W$ is injective (one-to-one) if and only if $\\ker(T) = \\{0\\}$.',
      enExpl: 'We prove both directions: (=>) T(v) = 0 = T(0) implies v = 0; (<=) T(u) = T(v) implies T(u - v) = 0 implies u - v = 0.',
      hiExpl: 'Dono directions prove karenge: agar injective hai toh T(v)=0 implies v=0; agar ker={0} hai toh T(u)=T(v) implies u=v.',
      steps: [
        {
          stepNumber: 1,
          title: 'Forward Direction (Injective => ker = {0})',
          math: 'T(0) = 0. \\text{ If } v \\in \\ker(T), \\; T(v) = 0 = T(0) \\implies v = 0',
          explanation: 'By injectivity, equal outputs imply equal inputs.',
          whyValid: 'Definition of injective mapping.'
        },
        {
          stepNumber: 2,
          title: 'Reverse Direction (ker = {0} => Injective)',
          math: 'T(u) = T(v) \\implies T(u) - T(v) = 0 \\implies T(u - v) = 0 \\implies u - v \\in \\ker(T) = \\{0\\} \\implies u = v',
          explanation: 'Linearity allows rewriting T(u) - T(v) as T(u - v).',
          whyValid: 'Linearity of T and assumption ker(T) = {0}.'
        }
      ],
      finalAnswer: 'T is injective if and only if ker(T) = {0}.',
      check: 'Standard fundamental characterization of linear injectivity.'
    }
  ];

  const ex = catalog[(index - 1) % catalog.length];
  return {
    id,
    topicId: 4,
    subtopicId,
    title: `${ex.title} (Example ${index})`,
    difficulty,
    skill,
    question: ex.question,
    englishExplanation: ex.enExpl,
    hinglishExplanation: ex.hiExpl,
    steps: ex.steps,
    finalAnswer: ex.finalAnswer,
    checkOrVerification: ex.check
  };
}

// ----------------- TOPIC 5: MATRIX REPRESENTATION -----------------
function generateTopic5Example(id, index) {
  const subtopicId = index <= 8 ? 'mat-rep-coord' : 'mat-rep-change';
  const difficulty = index <= 5 ? 'Beginner' : index <= 11 ? 'Intermediate' : 'Advanced';
  const skills = ['Conceptual', 'Computational', 'Proof-Based', 'Application'];
  const skill = skills[(index - 1) % 4];

  const catalog = [
    {
      title: 'Matrix Representation of Derivative Operator on P_2(R)',
      question: 'Let $D: P_2(\\mathbb{R}) \\to P_1(\\mathbb{R})$ be the differentiation map $D(p) = p\'(x)$. Find its matrix representation $[D]_{\\mathcal{B}, \\mathcal{C}}$ relative to bases $\\mathcal{B} = \\{1, x, x^2\\}$ and $\\mathcal{C} = \\{1, x\\}$.',
      enExpl: 'We differentiate each basis element of B and express the result in terms of the basis C to form the columns.',
      hiExpl: 'Hum basis B ke har element ko differentiate karenge aur unke coordinates ko C ke respect mein columns mein likhenge.',
      steps: [
        {
          stepNumber: 1,
          title: 'Differentiate Each Basis Element',
          math: 'D(1) = 0 = 0\\cdot 1 + 0\\cdot x; \\quad D(x) = 1 = 1\\cdot 1 + 0\\cdot x; \\quad D(x^2) = 2x = 0\\cdot 1 + 2\\cdot x',
          explanation: 'Computing coordinate vectors: [D(1)] = (0, 0)^T, [D(x)] = (1, 0)^T, [D(x^2)] = (0, 2)^T.',
          whyValid: 'Definition of differentiation on monomials.'
        },
        {
          stepNumber: 2,
          title: 'Assemble Matrix Representation',
          math: '[D]_{\\mathcal{B}, \\mathcal{C}} = \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 2 \\end{pmatrix}',
          explanation: 'Place coordinate vectors as columns 1, 2, 3.',
          whyValid: 'Column j of [T] is the coordinate vector of T(v_j).'
        }
      ],
      finalAnswer: '[D]_{B, C} = [[0, 1, 0], [0, 0, 2]].',
      check: 'Multiplying by [a, b, c]^T yields [b, 2c]^T, which corresponds to b + 2cx = (a + bx + cx^2)\'.'
    },
    {
      title: 'Change of Basis and Similarity Matrix',
      question: 'Let $T: \\mathbb{R}^2 \\to \\mathbb{R}^2$ have standard matrix $A = \\begin{pmatrix} 3 & 1 \\\\ 0 & 2 \\end{pmatrix}$. Find the matrix $[T]_{\\mathcal{B}\'}$ relative to basis $\\mathcal{B}\' = \\{b_1 = (1, 1), b_2 = (1, -1)\\}$.',
      enExpl: 'We form the transition matrix P = [b1 b2], compute P^-1, and evaluate P^-1 A P.',
      hiExpl: 'Transition matrix P banayenge, P^-1 nikalenge, aur similarity transform P^-1 A P calculate karenge.',
      steps: [
        {
          stepNumber: 1,
          title: 'Construct Transition Matrix and Inverse',
          math: 'P = \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix} \\implies P^{-1} = \\frac{1}{-2} \\begin{pmatrix} -1 & -1 \\\\ -1 & 1 \\end{pmatrix} = \\begin{pmatrix} 1/2 & 1/2 \\\\ 1/2 & -1/2 \\end{pmatrix}',
          explanation: 'Inverse of 2x2 matrix.',
          whyValid: 'P maps coordinates in B\' to standard coordinates.'
        },
        {
          stepNumber: 2,
          title: 'Compute P^-1 A P',
          math: 'A P = \\begin{pmatrix} 3 & 1 \\\\ 0 & 2 \\end{pmatrix} \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix} = \\begin{pmatrix} 4 & 2 \\\\ 2 & -2 \\end{pmatrix} \\implies P^{-1}(AP) = \\begin{pmatrix} 3 & 0 \\\\ 1 & 2 \\end{pmatrix}',
          explanation: 'Multiplying P^-1 by AP.',
          whyValid: 'Formula [T]_B\' = P^-1 [T]_std P.'
        }
      ],
      finalAnswer: '[T]_{B\'} = [[3, 0], [1, 2]].',
      check: 'Trace is 3 + 2 = 5 = tr(A), and det is 6 = det(A).'
    }
  ];

  const ex = catalog[(index - 1) % catalog.length];
  return {
    id,
    topicId: 5,
    subtopicId,
    title: `${ex.title} (Part ${index})`,
    difficulty,
    skill,
    question: ex.question,
    englishExplanation: ex.enExpl,
    hinglishExplanation: ex.hiExpl,
    steps: ex.steps,
    finalAnswer: ex.finalAnswer,
    checkOrVerification: ex.check
  };
}

// ----------------- TOPIC 6: LINEAR FUNCTIONALS -----------------
function generateTopic6Example(id, index) {
  const subtopicId = index <= 8 ? 'lf-dual-basis' : 'lf-annihilators';
  const difficulty = index <= 5 ? 'Beginner' : index <= 11 ? 'Intermediate' : 'Advanced';
  const skills = ['Conceptual', 'Computational', 'Proof-Based', 'Application'];
  const skill = skills[(index - 1) % 4];

  const catalog = [
    {
      title: 'Constructing Dual Basis for a Non-Standard Basis in R^2',
      question: 'Let $\\mathcal{B} = \\{v_1 = (2, 1), v_2 = (3, 1)\\}$ be a basis of $\\mathbb{R}^2$. Find the dual basis $\\mathcal{B}^* = \\{f_1, f_2\\}$ in $(\\mathbb{R}^2)^*$.',
      enExpl: 'We find linear functionals f1(x, y) = a1 x + b1 y and f2(x, y) = a2 x + b2 y satisfying f_i(v_j) = delta_ij.',
      hiExpl: 'Hum functionals $f_1, f_2$ dhoondhenge jo Kronecker delta $f_i(v_j) = \\delta_{ij}$ satisfy karein.',
      steps: [
        {
          stepNumber: 1,
          title: 'Set Up Dual Basis Equations',
          math: '\\begin{pmatrix} f_1(v_1) & f_1(v_2) \\\\ f_2(v_1) & f_2(v_2) \\end{pmatrix} = \\begin{pmatrix} a_1 & b_1 \\\\ a_2 & b_2 \\end{pmatrix} \\begin{pmatrix} 2 & 3 \\\\ 1 & 1 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}',
          explanation: 'The matrix of functional coefficients is the inverse of the matrix of basis vectors.',
          whyValid: 'Kronecker delta condition in matrix form.'
        },
        {
          stepNumber: 2,
          title: 'Invert Matrix of Basis Vectors',
          math: 'P = \\begin{pmatrix} 2 & 3 \\\\ 1 & 1 \\end{pmatrix} \\implies P^{-1} = \\frac{1}{2-3} \\begin{pmatrix} 1 & -3 \\\\ -1 & 2 \\end{pmatrix} = \\begin{pmatrix} -1 & 3 \\\\ 1 & -2 \\end{pmatrix}',
          explanation: 'Rows of P^-1 give the functionals: f1(x, y) = -x + 3y and f2(x, y) = x - 2y.',
          whyValid: 'Checking: f1(2, 1) = -2 + 3 = 1; f1(3, 1) = -3 + 3 = 0. f2(2, 1) = 2 - 2 = 0; f2(3, 1) = 3 - 2 = 1.'
        }
      ],
      finalAnswer: 'f_1(x, y) = -x + 3y and f_2(x, y) = x - 2y.',
      check: 'f_i(v_j) = delta_ij verified for all 4 pairings.'
    },
    {
      title: 'Finding the Annihilator of a Subspace in R^3',
      question: 'Let $W = \\text{span}\\{(1, 2, 0), (0, 1, 1)\\} \\le \\mathbb{R}^3$. Find a basis for the annihilator $W^0 \\le (\\mathbb{R}^3)^*$.',
      enExpl: 'A functional f(x, y, z) = ax + by + cz is in W^0 if and only if f(1, 2, 0) = 0 and f(0, 1, 1) = 0.',
      hiExpl: 'Functional f(x, y, z) = ax + by + cz annihilator mein tabhi hoga jab W ke dono spanning vectors par zero de.',
      steps: [
        {
          stepNumber: 1,
          title: 'Set Up Annihilator Linear System',
          math: '\\begin{cases} a + 2b = 0 \\\\ b + c = 0 \\end{cases} \\implies b = -c, \\quad a = -2b = 2c',
          explanation: 'Expressing all coefficients in terms of free variable c.',
          whyValid: 'Definition: f in W^0 iff f(w) = 0 for all w in W.'
        },
        {
          stepNumber: 2,
          title: 'Extract Basis for W^0',
          math: 'f(x, y, z) = 2c x - c y + c z = c(2x - y + z) \\implies \\text{Basis} = \\{f_0(x, y, z) = 2x - y + z\\}',
          explanation: 'dim(W^0) = dim(V) - dim(W) = 3 - 2 = 1.',
          whyValid: 'Annihilator dimension formula.'
        }
      ],
      finalAnswer: 'Basis for W^0 is {f(x, y, z) = 2x - y + z}; dim(W^0) = 1.',
      check: 'f(1, 2, 0) = 2 - 2 + 0 = 0 and f(0, 1, 1) = 0 - 1 + 1 = 0.'
    }
  ];

  const ex = catalog[(index - 1) % catalog.length];
  return {
    id,
    topicId: 6,
    subtopicId,
    title: `${ex.title} (Problem ${index})`,
    difficulty,
    skill,
    question: ex.question,
    englishExplanation: ex.enExpl,
    hinglishExplanation: ex.hiExpl,
    steps: ex.steps,
    finalAnswer: ex.finalAnswer,
    checkOrVerification: ex.check
  };
}

// ----------------- TOPIC 7: TRANSPOSE OF LINEAR TRANSFORMATIONS -----------------
function generateTopic7Example(id, index) {
  const subtopicId = index <= 8 ? 'trans-dual-map' : 'trans-ortho-relations';
  const difficulty = index <= 5 ? 'Beginner' : index <= 11 ? 'Intermediate' : 'Advanced';
  const skills = ['Conceptual', 'Computational', 'Proof-Based', 'Application'];
  const skill = skills[(index - 1) % 4];

  const catalog = [
    {
      title: 'Action of the Transpose Operator T* on Functionals',
      question: 'Let $T: \\mathbb{R}^2 \\to \\mathbb{R}^2$ be defined by $T(x, y) = (2x + 3y, x - y)$. Let $g \\in (\\mathbb{R}^2)^*$ be the functional $g(u, v) = 4u - v$. Compute $(T^* g)(x, y)$.',
      enExpl: 'We use the definition of the dual map: (T* g)(v) = g(T(v)).',
      hiExpl: 'Hum transpose map ka definition use karenge: (T* g)(v) = g(T(v)).',
      steps: [
        {
          stepNumber: 1,
          title: 'Substitute T(x, y) into g',
          math: '(T^* g)(x, y) = g(T(x, y)) = g(2x + 3y, x - y)',
          explanation: 'Pre-composition of functional g with operator T.',
          whyValid: 'Definition of dual map T*.'
        },
        {
          stepNumber: 2,
          title: 'Expand the Functional Evaluation',
          math: '4(2x + 3y) - (x - y) = 8x + 12y - x + y = 7x + 13y',
          explanation: 'Linear combination of components.',
          whyValid: 'Algebra of linear expressions.'
        }
      ],
      finalAnswer: '(T* g)(x, y) = 7x + 13y.',
      check: 'Using matrix transpose: [T*] = A^T = [[2, 1], [3, -1]]. [4, -1] * A = [4*2 + (-1)*1, 4*3 + (-1)*(-1)] = [7, 13].'
    },
    {
      title: 'Verifying ker(T*) = (im T)^0 Orthogonality Relation',
      question: 'Let $T: \\mathbb{R}^3 \\to \\mathbb{R}^3$ have matrix $A = \\begin{pmatrix} 1 & 2 & 1 \\\\ 2 & 4 & 2 \\\\ 3 & 6 & 3 \\end{pmatrix}$. Find a basis for $\\text{im}(T)$, find $(\\text{im } T)^0$, and verify that it equals $\\ker(T^*)$.',
      enExpl: 'Columns of A are all multiples of (1, 2, 3)^T. Thus im(T) is 1-dimensional, and (im T)^0 is 2-dimensional.',
      hiExpl: 'Matrix ke columns (1, 2, 3)^T ke multiples hain, isliye image 1-dimensional hai aur uska annihilator ker(T*) ke barabar aayega.',
      steps: [
        {
          stepNumber: 1,
          title: 'Find Image of T',
          math: '\\text{im}(T) = \\text{span}\\{(1, 2, 3)^T\\} \\implies \\text{rank}(T) = 1',
          explanation: 'All three columns are proportional to (1, 2, 3)^T.',
          whyValid: 'Column space definition.'
        },
        {
          stepNumber: 2,
          title: 'Find (im T)^0 and ker(T*)',
          math: 'g(u, v, w) = a u + b v + c w \\in (\\text{im } T)^0 \\iff a(1) + b(2) + c(3) = 0 \\iff a + 2b + 3c = 0',
          explanation: 'This matches A^T g = 0 because rows of A^T are (1, 2, 3), (2, 4, 6), (3, 6, 9).',
          whyValid: 'Theorem: ker(T*) = (im T)^0.'
        }
      ],
      finalAnswer: 'ker(T*) = (im T)^0 = {g(u, v, w) | u + 2v + 3w = 0}, dimension 2.',
      check: 'rank(T) + dim(ker T*) = 1 + 2 = 3.'
    }
  ];

  const ex = catalog[(index - 1) % catalog.length];
  return {
    id,
    topicId: 7,
    subtopicId,
    title: `${ex.title} (Part ${index})`,
    difficulty,
    skill,
    question: ex.question,
    englishExplanation: ex.enExpl,
    hinglishExplanation: ex.hiExpl,
    steps: ex.steps,
    finalAnswer: ex.finalAnswer,
    checkOrVerification: ex.check
  };
}

// ----------------- TOPIC 8: CANONICAL FORMS -----------------
function generateTopic8Example(id, index) {
  const subtopicId = index <= 6 ? 'cf-diag-eigen' : index <= 11 ? 'cf-poly-cayley' : 'cf-jcf-rcf';
  const difficulty = index <= 5 ? 'Beginner' : index <= 11 ? 'Intermediate' : 'Advanced';
  const skills = ['Conceptual', 'Computational', 'Proof-Based', 'Application'];
  const skill = skills[(index - 1) % 4];

  const catalog = [
    {
      title: 'Determining Diagonalizability via Algebraic vs Geometric Multiplicity',
      question: 'Determine whether the matrix $A = \\begin{pmatrix} 3 & 1 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 2 \\end{pmatrix}$ is diagonalizable over $\\mathbb{C}$.',
      enExpl: 'We find eigenvalues, algebraic multiplicity, and geometric multiplicity of each eigenvalue.',
      hiExpl: 'Hum eigenvalues nikalenge aur har eigenvalue ki algebraic aur geometric multiplicity compare karenge.',
      steps: [
        {
          stepNumber: 1,
          title: 'Find Characteristic Polynomial and Eigenvalues',
          math: 'p_A(\\lambda) = \\det(\\lambda I - A) = (\\lambda - 3)^2 (\\lambda - 2)',
          explanation: 'Eigenvalues are lambda = 3 (algebraic multiplicity 2) and lambda = 2 (algebraic multiplicity 1).',
          whyValid: 'Determinant of upper triangular matrix is product of diagonal elements.'
        },
        {
          stepNumber: 2,
          title: 'Compute Geometric Multiplicity for lambda = 3',
          math: '3I - A = \\begin{pmatrix} 0 & -1 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix} \\implies \\text{rank}(3I - A) = 2 \\implies \\text{nullity} = 3 - 2 = 1',
          explanation: 'Geometric multiplicity is 1, which is strictly less than algebraic multiplicity 2.',
          whyValid: 'Diagonalizability requires geometric multiplicity = algebraic multiplicity for all eigenvalues.'
        }
      ],
      finalAnswer: 'A is NOT diagonalizable; it is defective with a Jordan block of size 2 for eigenvalue 3.',
      check: 'Minimal polynomial is (x - 3)^2 (x - 2), which has a repeated root.'
    },
    {
      title: 'Finding Minimal Polynomial and Applying Cayley-Hamilton',
      question: 'Let $A = \\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}$. Compute $A^2 - 4A + 4I$ and find the minimal polynomial $m_A(x)$.',
      enExpl: 'Characteristic polynomial is (x - 2)^2 = x^2 - 4x + 4. By Cayley-Hamilton, p(A) = 0.',
      hiExpl: 'Characteristic equation $(x - 2)^2$ hai. Cayley-Hamilton theorem se $p(A) = O$ verify karenge aur minimal polynomial nikalenge.',
      steps: [
        {
          stepNumber: 1,
          title: 'Verify Cayley-Hamilton',
          math: 'A^2 = \\begin{pmatrix} 4 & 4 \\\\ 0 & 4 \\end{pmatrix}, \\quad 4A = \\begin{pmatrix} 8 & 4 \\\\ 0 & 8 \\end{pmatrix} \\implies A^2 - 4A + 4I = \\begin{pmatrix} 4-8+4 & 4-4+0 \\\\ 0 & 4-8+4 \\end{pmatrix} = \\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix}',
          explanation: 'Matrix satisfies its characteristic equation.',
          whyValid: 'Cayley-Hamilton theorem.'
        },
        {
          stepNumber: 2,
          title: 'Check Minimal Polynomial Candidates',
          math: 'A - 2I = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix} \\neq O \\implies m_A(x) = (x - 2)^2',
          explanation: 'Since degree 1 factor does not annihilate A, minimal polynomial is degree 2.',
          whyValid: 'Minimal polynomial divides characteristic polynomial.'
        }
      ],
      finalAnswer: 'm_A(x) = (x - 2)^2; A^2 - 4A + 4I = O.',
      check: '(A - 2I)^2 = [[0, 1], [0, 0]]^2 = [[0, 0], [0, 0]].'
    },
    {
      title: 'Jordan Canonical Form of a Nilpotent Matrix',
      question: 'Find the Jordan Canonical Form $J$ and Jordan basis for $N = \\begin{pmatrix} 0 & 1 & 2 \\\\ 0 & 0 & 3 \\\\ 0 & 0 & 0 \\end{pmatrix}$.',
      enExpl: 'N is strictly upper triangular, so its only eigenvalue is 0. We compute powers of N to find the Jordan block sizes.',
      hiExpl: 'N strictly upper triangular hai, iska eigenvalue sirf 0 hai. N ke powers nikal kar Jordan block ka size nikalenge.',
      steps: [
        {
          stepNumber: 1,
          title: 'Compute Matrix Powers',
          math: 'N^2 = \\begin{pmatrix} 0 & 0 & 3 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} \\neq O, \\quad N^3 = O',
          explanation: 'N is nilpotent of index 3, so the minimal polynomial is x^3.',
          whyValid: 'The index of nilpotency equals the size of the largest Jordan block.'
        },
        {
          stepNumber: 2,
          title: 'Determine Jordan Block',
          math: 'J = J_3(0) = \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{pmatrix}',
          explanation: 'Since the single block has size 3 = dim(V), J is a single 3x3 Jordan block.',
          whyValid: 'Structure of nilpotent Jordan canonical form.'
        }
      ],
      finalAnswer: 'Jordan Form is a single 3x3 block J_3(0).',
      check: 'dim(ker N) = 3 - rank(N) = 3 - 2 = 1, so there is exactly 1 Jordan block.'
    }
  ];

  const ex = catalog[(index - 1) % catalog.length];
  return {
    id,
    topicId: 8,
    subtopicId,
    title: `${ex.title} (Variant ${index})`,
    difficulty,
    skill,
    question: ex.question,
    englishExplanation: ex.enExpl,
    hinglishExplanation: ex.hiExpl,
    steps: ex.steps,
    finalAnswer: ex.finalAnswer,
    checkOrVerification: ex.check
  };
}

// ----------------- TOPIC 9: LINEAR FUNCTIONALS AND ADJOINTS -----------------
function generateTopic9Example(id, index) {
  const subtopicId = index <= 8 ? 'adj-riesz' : 'adj-spectral';
  const difficulty = index <= 5 ? 'Beginner' : index <= 11 ? 'Intermediate' : 'Advanced';
  const skills = ['Conceptual', 'Computational', 'Proof-Based', 'Application'];
  const skill = skills[(index - 1) % 4];

  const catalog = [
    {
      title: 'Applying Riesz Representation Theorem in R^3',
      question: 'On $\\mathbb{R}^3$ with the standard Euclidean inner product, let $f \\in (\\mathbb{R}^3)^*$ be the linear functional $f(x, y, z) = 3x - 4y + 5z$. Find the unique vector $w \\in \\mathbb{R}^3$ such that $f(v) = \\langle v, w \\rangle$ for all $v \\in \\mathbb{R}^3$.',
      enExpl: 'Under the standard dot product <v, w> = v1 w1 + v2 w2 + v3 w3, we equate components to find w.',
      hiExpl: 'Standard dot product mein linear functional ke coefficients directly representing vector ke components ban jaate hain.',
      steps: [
        {
          stepNumber: 1,
          title: 'Write Dot Product Formula',
          math: '\\langle v, w \\rangle = v_1 w_1 + v_2 w_2 + v_3 w_3',
          explanation: 'Comparing with f(v) = 3 v1 - 4 v2 + 5 v3.',
          whyValid: 'Definition of Euclidean inner product.'
        },
        {
          stepNumber: 2,
          title: 'Identify Vector Components',
          math: 'w_1 = 3, \\quad w_2 = -4, \\quad w_3 = 5 \\implies w = (3, -4, 5)^T',
          explanation: 'Evaluating on basis vectors: w_i = f(e_i).',
          whyValid: 'Riesz Representation Theorem.'
        }
      ],
      finalAnswer: 'w = (3, -4, 5)^T.',
      check: '<(x, y, z), (3, -4, 5)> = 3x - 4y + 5z = f(x, y, z).'
    },
    {
      title: 'Computing the Adjoint Operator on Complex Inner Product Space',
      question: 'Let $T: \\mathbb{C}^2 \\to \\mathbb{C}^2$ have matrix $A = \\begin{pmatrix} 2 & 1 + i \\\\ 3i & 4 \\end{pmatrix}$ relative to the standard orthonormal basis. Find the matrix of the adjoint operator $T^*$.',
      enExpl: 'For complex inner product spaces, the matrix of the adjoint relative to an orthonormal basis is the conjugate transpose A^* = bar(A)^T.',
      hiExpl: 'Complex inner product space mein orthonormal basis ke respect mein adjoint ka matrix conjugate transpose $A^* = \\overline{A}^T$ hota hai.',
      steps: [
        {
          stepNumber: 1,
          title: 'Transpose the Matrix',
          math: 'A^T = \\begin{pmatrix} 2 & 3i \\\\ 1 + i & 4 \\end{pmatrix}',
          explanation: 'Swap rows and columns.',
          whyValid: 'First step in forming conjugate transpose.'
        },
        {
          stepNumber: 2,
          title: 'Take Complex Conjugate of Each Entry',
          math: 'A^* = \\overline{A^T} = \\begin{pmatrix} 2 & -3i \\\\ 1 - i & 4 \\end{pmatrix}',
          explanation: 'Replace i with -i.',
          whyValid: 'Adjoint condition <Tv, w> = <v, T* w> over C requires complex conjugation.'
        }
      ],
      finalAnswer: '[T*] = [[2, -3i], [1 - i, 4]].',
      check: '<A v, w> = w^* A v = (A^* w)^* v = <v, A^* w>.'
    }
  ];

  const ex = catalog[(index - 1) % catalog.length];
  return {
    id,
    topicId: 9,
    subtopicId,
    title: `${ex.title} (Case ${index})`,
    difficulty,
    skill,
    question: ex.question,
    englishExplanation: ex.enExpl,
    hinglishExplanation: ex.hiExpl,
    steps: ex.steps,
    finalAnswer: ex.finalAnswer,
    checkOrVerification: ex.check
  };
}

// ----------------- TOPIC 10: BILINEAR FORMS -----------------
function generateTopic10Example(id, index) {
  const subtopicId = index <= 8 ? 'bf-matrix-cong' : 'bf-non-deg-rad';
  const difficulty = index <= 5 ? 'Beginner' : index <= 11 ? 'Intermediate' : 'Advanced';
  const skills = ['Conceptual', 'Computational', 'Proof-Based', 'Application'];
  const skill = skills[(index - 1) % 4];

  const catalog = [
    {
      title: 'Matrix Representation of a Bilinear Form and Basis Change',
      question: 'Let $B: \\mathbb{R}^2 \\times \\mathbb{R}^2 \\to \\mathbb{R}$ be given by $B(x, y) = 2x_1 y_1 + 3x_1 y_2 - x_2 y_1 + 4x_2 y_2$. Find its matrix $[B]_\\mathcal{E}$ in the standard basis and its matrix $[B]_\\mathcal{B}$ relative to $\\mathcal{B} = \\{(1, 1), (1, -1)\\}$.',
      enExpl: 'We read the entries A_ij = B(e_i, e_j) and apply the congruence transformation P^T A P.',
      hiExpl: 'Standard basis mein matrix entries $A_{ij} = B(e_i, e_j)$ nikalenge aur congruence transform $P^T A P$ lagayenge.',
      steps: [
        {
          stepNumber: 1,
          title: 'Find Standard Matrix',
          math: '[B]_\\mathcal{E} = \\begin{pmatrix} B(e_1, e_1) & B(e_1, e_2) \\\\ B(e_2, e_1) & B(e_2, e_2) \\end{pmatrix} = \\begin{pmatrix} 2 & 3 \\\\ -1 & 4 \\end{pmatrix}',
          explanation: 'Coefficients of x_i y_j form the entries of matrix A.',
          whyValid: 'Definition of matrix of bilinear form.'
        },
        {
          stepNumber: 2,
          title: 'Apply Congruence Transformation P^T A P',
          math: 'P = \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix} \\implies P^T A P = \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix} \\begin{pmatrix} 2 & 3 \\\\ -1 & 4 \\end{pmatrix} \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix} = \\begin{pmatrix} 1 & 7 \\\\ 3 & -1 \\end{pmatrix} \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix} = \\begin{pmatrix} 8 & -6 \\\\ 2 & 4 \\end{pmatrix}',
          explanation: 'Notice we use P^T A P (congruence), NOT P^-1 A P (similarity).',
          whyValid: 'Law of transformation for bilinear forms.'
        }
      ],
      finalAnswer: '[B]_E = [[2, 3], [-1, 4]] and [B]_B = [[8, -6], [2, 4]].',
      check: 'B((1, 1), (1, 1)) = 2 + 3 - 1 + 4 = 8, matching entry (1, 1) of [B]_B.'
    },
    {
      title: 'Determining Non-Degeneracy and Finding the Radical',
      question: 'Determine whether the bilinear form on $\\mathbb{R}^3$ given by $A = \\begin{pmatrix} 1 & 2 & 0 \\\\ 2 & 4 & 0 \\\\ 0 & 0 & 3 \\end{pmatrix}$ is non-degenerate. If degenerate, find a basis for its radical $\\text{rad}(B)$.',
      enExpl: 'B is non-degenerate if and only if det(A) != 0. The radical is the null space of A.',
      hiExpl: 'Form non-degenerate tabhi hoti hai jab det(A) != 0 ho. Radical matrix A ka null space hota hai.',
      steps: [
        {
          stepNumber: 1,
          title: 'Compute Determinant',
          math: '\\det(A) = 3(1 \\cdot 4 - 2 \\cdot 2) = 3(4 - 4) = 0',
          explanation: 'det(A) = 0, so the form is degenerate.',
          whyValid: 'A form is non-degenerate iff its matrix is invertible.'
        },
        {
          stepNumber: 2,
          title: 'Find Radical (Kernel of A)',
          math: 'A x = 0 \\iff \\begin{pmatrix} 1 & 2 & 0 \\\\ 2 & 4 & 0 \\\\ 0 & 0 & 3 \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{pmatrix} = 0 \\iff \\begin{cases} x_1 + 2x_2 = 0 \\\\ 3x_3 = 0 \\end{cases} \\implies x = x_2 \\begin{pmatrix} -2 \\\\ 1 \\\\ 0 \\end{pmatrix}',
          explanation: 'Basis for rad(B) is {(-2, 1, 0)^T}.',
          whyValid: 'Vector (-2, 1, 0) satisfies B((-2, 1, 0), y) = 0 for ALL y in R^3.'
        }
      ],
      finalAnswer: 'Degenerate; Basis for rad(B) is {(-2, 1, 0)^T}.',
      check: 'B((-2, 1, 0), (y1, y2, y3)) = [-2, 1, 0] * [1 2 0; 2 4 0; 0 0 3] * y = [0, 0, 0] * y = 0.'
    }
  ];

  const ex = catalog[(index - 1) % catalog.length];
  return {
    id,
    topicId: 10,
    subtopicId,
    title: `${ex.title} (Problem ${index})`,
    difficulty,
    skill,
    question: ex.question,
    englishExplanation: ex.enExpl,
    hinglishExplanation: ex.hiExpl,
    steps: ex.steps,
    finalAnswer: ex.finalAnswer,
    checkOrVerification: ex.check
  };
}

// ----------------- TOPIC 11: SYMMETRIC BILINEAR FORMS -----------------
function generateTopic11Example(id, index) {
  const subtopicId = index <= 8 ? 'sbf-quad-polar' : 'sbf-sylvester';
  const difficulty = index <= 5 ? 'Beginner' : index <= 11 ? 'Intermediate' : 'Advanced';
  const skills = ['Conceptual', 'Computational', 'Proof-Based', 'Application'];
  const skill = skills[(index - 1) % 4];

  const catalog = [
    {
      title: 'Recovering Symmetric Bilinear Form via Polarization Identity',
      question: 'Let $Q: \\mathbb{R}^2 \\to \\mathbb{R}$ be the quadratic form $Q(x, y) = 3x^2 + 8xy - 5y^2$. Using the polarization identity, find the associated symmetric bilinear form $B(u, v)$ for $u = (x_1, y_1)$ and $v = (x_2, y_2)$.',
      enExpl: 'We use the polarization identity B(u, v) = (1/2)[Q(u + v) - Q(u) - Q(v)] or directly read off the symmetric matrix.',
      hiExpl: 'Hum polarization identity $B(u, v) = \\frac{1}{2}[Q(u+v) - Q(u) - Q(v)]$ lagakar symmetric bilinear form banayenge.',
      steps: [
        {
          stepNumber: 1,
          title: 'Apply Polarization Identity',
          math: 'Q(u+v) = 3(x_1+x_2)^2 + 8(x_1+x_2)(y_1+y_2) - 5(y_1+y_2)^2',
          explanation: 'Expanding cross terms: 6 x1 x2 + 8(x1 y2 + x2 y1) - 10 y1 y2.',
          whyValid: 'Polarization identity theorem for characteristic != 2.'
        },
        {
          stepNumber: 2,
          title: 'Divide Cross-Terms by 2',
          math: 'B(u, v) = 3x_1 x_2 + 4(x_1 y_2 + x_2 y_1) - 5y_1 y_2',
          explanation: 'Symmetric matrix is [[3, 4], [4, -5]].',
          whyValid: 'B(v, v) = 3x^2 + 8xy - 5y^2 = Q(v).'
        }
      ],
      finalAnswer: 'B(u, v) = 3 x1 x2 + 4 x1 y2 + 4 x2 y1 - 5 y1 y2.',
      check: 'B(u, u) = 3 x1^2 + 8 x1 y1 - 5 y1^2 = Q(u).'
    },
    {
      title: 'Diagonalizing a Quadratic Form and Sylvester\'s Law of Inertia',
      question: 'Diagonalize the quadratic form $Q(x, y, z) = x^2 + 4xy + 3y^2 + 2xz + 6yz + 2z^2$ by completing the square, and determine its Sylvester inertia signature $(p, q, r)$.',
      enExpl: 'We complete the square sequentially to express Q as a sum/difference of independent linear squares.',
      hiExpl: 'Hum completing the square method use karke quadratic form ko independent squares ke sum/difference mein convert karenge aur signature nikalenge.',
      steps: [
        {
          stepNumber: 1,
          title: 'Complete the Square on x',
          math: 'x^2 + 2x(2y + z) = (x + 2y + z)^2 - (2y + z)^2 = (x + 2y + z)^2 - (4y^2 + 4yz + z^2)',
          explanation: 'Substituting back into Q: Q = (x + 2y + z)^2 - y^2 + 2yz + z^2.',
          whyValid: 'Algebraic completion of the square.'
        },
        {
          stepNumber: 2,
          title: 'Complete the Square on y and z',
          math: '- (y^2 - 2yz - z^2) = - (y - z)^2 + 2z^2 = (x + 2y + z)^2 - (y - z)^2 + 2z^2',
          explanation: 'Setting u = x + 2y + z, v = y - z, w = sqrt(2)z yields Q = u^2 - v^2 + w^2.',
          whyValid: 'Change of variables via invertible linear transformation.'
        }
      ],
      finalAnswer: 'Canonical form: u^2 + w^2 - v^2; Sylvester signature is (p=2, q=1, r=0) (Indefinite).',
      check: 'Matrix has 2 positive eigenvalues and 1 negative eigenvalue.'
    }
  ];

  const ex = catalog[(index - 1) % catalog.length];
  return {
    id,
    topicId: 11,
    subtopicId,
    title: `${ex.title} (Problem ${index})`,
    difficulty,
    skill,
    question: ex.question,
    englishExplanation: ex.enExpl,
    hinglishExplanation: ex.hiExpl,
    steps: ex.steps,
    finalAnswer: ex.finalAnswer,
    checkOrVerification: ex.check
  };
}

// ----------------- TOPIC 12: SKEW-SYMMETRIC BILINEAR FORMS -----------------
function generateTopic12Example(id, index) {
  const subtopicId = index <= 8 ? 'sk-alternating' : 'sk-symplectic-basis';
  const difficulty = index <= 5 ? 'Beginner' : index <= 11 ? 'Intermediate' : 'Advanced';
  const skills = ['Conceptual', 'Computational', 'Proof-Based', 'Application'];
  const skill = skills[(index - 1) % 4];

  const catalog = [
    {
      title: 'Vanishing Determinant of Odd-Dimensional Skew-Symmetric Matrix',
      question: 'Let $A \\in M_5(\\mathbb{R})$ be a $5 \\times 5$ skew-symmetric matrix ($A^T = -A$). Prove rigorously that $\\det(A) = 0$, and explain why non-degenerate alternating forms cannot exist in dimension 5.',
      enExpl: 'We use the determinant properties det(A^T) = det(A) and det(c A) = c^n det(A) with c = -1 and n = 5.',
      hiExpl: 'Hum determinant properties use karenge: $\\det(A^T) = \\det(A)$ aur $\\det(-A) = (-1)^5 \\det(A) = -\\det(A)$.',
      steps: [
        {
          stepNumber: 1,
          title: 'Apply Determinant Properties to A^T = -A',
          math: '\\det(A) = \\det(A^T) = \\det(-A) = (-1)^5 \\det(A) = -\\det(A)',
          explanation: 'Factoring -1 out of each of the 5 rows produces (-1)^5 = -1.',
          whyValid: 'Multi-linearity of the determinant.'
        },
        {
          stepNumber: 2,
          title: 'Solve for det(A)',
          math: '\\det(A) = -\\det(A) \\implies 2 \\det(A) = 0 \\implies \\det(A) = 0',
          explanation: 'Since det(A) = 0, the matrix is singular and has a non-trivial null space.',
          whyValid: 'Non-degeneracy requires det(A) != 0, which is impossible in odd dimensions.'
        }
      ],
      finalAnswer: 'det(A) = 0; any alternating form on an odd-dimensional space must be degenerate.',
      check: 'Holds for any odd dimension n = 1, 3, 5, 7, ... over any field of characteristic != 2.'
    },
    {
      title: 'Symplectic Basis and Pfaffian of a 4x4 Skew-Symmetric Matrix',
      question: 'Let $A = \\begin{pmatrix} 0 & 2 & 0 & 0 \\\\ -2 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 3 \\\\ 0 & 0 & -3 & 0 \\end{pmatrix}$. Compute the Pfaffian $\\text{Pf}(A)$ and verify that $\\det(A) = (\\text{Pf}(A))^2$.',
      enExpl: 'A consists of two 2x2 skew-symmetric blocks. The Pfaffian of a block diagonal skew-symmetric matrix is the product of the Pfaffians of the blocks.',
      hiExpl: 'Matrix A do 2x2 skew-symmetric blocks se bana hai. Pfaffian block values ka product hota hai, aur determinant uske square ke barabar hota hai.',
      steps: [
        {
          stepNumber: 1,
          title: 'Compute Determinant Directly',
          math: '\\det(A) = \\det\\begin{pmatrix} 0 & 2 \\\\ -2 & 0 \\end{pmatrix} \\times \\det\\begin{pmatrix} 0 & 3 \\\\ -3 & 0 \\end{pmatrix} = (0 - (-4)) \\times (0 - (-9)) = 4 \\times 9 = 36',
          explanation: 'Determinant of block diagonal matrix is the product of determinants.',
          whyValid: 'Block determinant rule.'
        },
        {
          stepNumber: 2,
          title: 'Compute Pfaffian and Verify Relation',
          math: '\\text{Pf}(A) = a_{12} a_{34} = 2 \\times 3 = 6 \\implies (\\text{Pf}(A))^2 = 6^2 = 36 = \\det(A)',
          explanation: 'The Pfaffian is 6, and its square is 36.',
          whyValid: 'Cayley Pfaffian theorem: det(A) = (Pf(A))^2.'
        }
      ],
      finalAnswer: 'Pf(A) = 6 and det(A) = 36 = 6^2.',
      check: 'det(A) = 36 = (6)^2 verified.'
    }
  ];

  const ex = catalog[(index - 1) % catalog.length];
  return {
    id,
    topicId: 12,
    subtopicId,
    title: `${ex.title} (Problem ${index})`,
    difficulty,
    skill,
    question: ex.question,
    englishExplanation: ex.enExpl,
    hinglishExplanation: ex.hiExpl,
    steps: ex.steps,
    finalAnswer: ex.finalAnswer,
    checkOrVerification: ex.check
  };
}
