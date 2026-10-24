import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  // Topic 1
  {
    id: 'q1-1',
    topicId: 1,
    question: 'Which of the following subsets of $\\mathbb{R}^2$ is a valid vector space under standard operations?',
    options: [
      'The set of points $(x, y)$ such that $x \\ge 0$ and $y \\ge 0$',
      'The set of points $(x, y)$ such that $3x - 2y = 0$',
      'The set of points $(x, y)$ such that $x^2 + y^2 = 1$',
      'The set of points $(x, y)$ such that $x + y = 5$'
    ],
    correctIndex: 1,
    explanation: '$3x - 2y = 0$ is a straight line through the origin in $\\mathbb{R}^2$. It contains $(0,0)$, is closed under addition ($3(x_1+x_2) - 2(y_1+y_2) = 0$), and closed under scalar scaling ($3(cx) - 2(cy) = c(3x-2y) = 0$). All other options either lack the zero vector or fail closure.',
    hinglishExplanation: '$3x - 2y = 0$ origin se guzarne wali line hai jo $(0,0)$ ko contain karti hai aur addition aur scalar multiplication dono ke under closed hai. Baaki sets ya toh $(0,0)$ nahi rakhte ya closure fail karte hain.'
  },
  {
    id: 'q1-2',
    topicId: 1,
    question: 'Let $V$ be the set of all polynomials of exact degree 3 with real coefficients, along with the zero polynomial. Is $V$ a vector space under standard polynomial addition and scaling?',
    options: [
      'Yes, because polynomials satisfy all 8 axioms',
      'No, because it is not closed under addition',
      'No, because scalar multiplication fails for $c = 0$',
      'Yes, because degree 3 polynomials have 4 coefficients'
    ],
    correctIndex: 1,
    explanation: 'Closure under addition fails! For example, $p(x) = x^3 + 2x$ and $q(x) = -x^3 + 5$ are both in $V$, but their sum $p(x) + q(x) = 2x + 5$ has degree 1, which is not of degree 3 and not the zero polynomial.',
    hinglishExplanation: 'Addition ke under closure fail ho jaati hai! $x^3+2x$ aur $-x^3+5$ dono degree 3 ke hain, par unhe add karne par $x^3$ cancel ho jaata hai aur degree 1 ka polynomial milta hai.'
  },

  // Topic 2
  {
    id: 'q2-1',
    topicId: 2,
    question: 'If $U$ and $W$ are subspaces of $V$ with $\\dim(U) = 4$, $\\dim(W) = 5$, and $\\dim(V) = 7$, what is the minimum possible dimension of $U \\cap W$?',
    options: ['0', '1', '2', '3'],
    correctIndex: 2,
    explanation: 'By the dimension formula, $\\dim(U + W) = \\dim(U) + \\dim(W) - \\dim(U \\cap W)$. Since $U + W \\le V$, we have $\\dim(U + W) \\le 7$. Thus $7 \\ge 4 + 5 - \\dim(U \\cap W) = 9 - \\dim(U \\cap W)$, which means $\\dim(U \\cap W) \\ge 9 - 7 = 2$.',
    hinglishExplanation: 'Formula: $\\dim(U+W) = \\dim(U) + \\dim(W) - \\dim(U \\cap W)$. Chunki $U+W \\le V$, iski dimension maximum 7 ho sakti hai. Isliye $7 \\ge 4+5 - \\dim(U \\cap W) \\implies \\dim(U \\cap W) \\ge 2$.'
  },
  {
    id: 'q2-2',
    topicId: 2,
    question: 'When is the union $U \\cup W$ of two subspaces $U, W \\le V$ guaranteed to be a subspace of $V$?',
    options: [
      'Always',
      'If and only if $U \\cap W = \\{0\\}$',
      'If and only if $U \\subseteq W$ or $W \\subseteq U$',
      'Whenever $\\dim(U) = \\dim(W)$'
    ],
    correctIndex: 2,
    explanation: 'A fundamental theorem of linear algebra states that the union of two subspaces is a subspace if and only if one is contained within the other. Otherwise, picking $u \\in U \\setminus W$ and $w \\in W \\setminus U$ yields $u + w \\notin U \\cup W$.',
    hinglishExplanation: 'Union tabhi subspace banta hai jab ek subspace dusre ke andar poora contained ho ($U \\subseteq W$ ya $W \\subseteq U$), warna unke elements ko add karne par closure fail ho jaati hai.'
  },

  // Topic 3
  {
    id: 'q3-1',
    topicId: 3,
    question: 'What is the dimension of the vector space of all $3 \\times 3$ symmetric real matrices?',
    options: ['9', '6', '3', '5'],
    correctIndex: 1,
    explanation: 'A symmetric matrix $A = A^T$ is determined by its diagonal entries and the entries strictly above the diagonal. For a $3 \\times 3$ matrix, that is 3 diagonal entries plus $\\frac{3 \\times 2}{2} = 3$ off-diagonal entries: $3 + 3 = 6$.',
    hinglishExplanation: '$3 \\times 3$ symmetric matrix mein 3 diagonal elements hote hain aur 3 upper-triangular independent elements hote hain. Total independent entries = $3 + 3 = 6$. Isliye dimension 6 hai.'
  },
  {
    id: 'q3-2',
    topicId: 3,
    question: 'If a set $S = \\{v_1, v_2, v_3, v_4\\}$ spans a 3-dimensional vector space $V$, which statement MUST be true?',
    options: [
      '$S$ is linearly independent',
      'Any subset of 3 vectors from $S$ forms a basis of $V$',
      '$S$ contains a subset that is a basis of $V$',
      'The zero vector cannot be in $S$'
    ],
    correctIndex: 2,
    explanation: 'Every finite spanning set contains a basis. Since $|S| = 4 > \\dim(V) = 3$, $S$ must be linearly dependent, but by discarding redundant vectors, one can extract an independent subset of 3 vectors that spans $V$.',
    hinglishExplanation: 'Har spanning set ke paas ek basis extract karne ki property hoti hai. Chunki 4 vectors 3-dimensional space ko span kar rahe hain, isme se ek redundant vector hatakar 3 vectors ka basis banaya ja sakta hai.'
  },

  // Topic 4
  {
    id: 'q4-1',
    topicId: 4,
    question: 'Let $T: \\mathbb{R}^5 \\to \\mathbb{R}^3$ be a linear transformation. Which of the following is IMPOSSIBLE?',
    options: [
      '$\\dim(\\ker T) = 2$ and $\\dim(\\text{im } T) = 3$',
      '$\\dim(\\ker T) = 3$ and $\\dim(\\text{im } T) = 2$',
      '$\\dim(\\ker T) = 1$ and $\\dim(\\text{im } T) = 4$',
      '$\\dim(\\ker T) = 5$ and $\\dim(\\text{im } T) = 0$'
    ],
    correctIndex: 2,
    explanation: 'Since the codomain is $\\mathbb{R}^3$, the image $\\text{im}(T)$ is a subspace of $\\mathbb{R}^3$, so $\\dim(\\text{im } T) \\le 3$. Therefore $\\dim(\\text{im } T) = 4$ is strictly impossible!',
    hinglishExplanation: 'Codomain $\\mathbb{R}^3$ hai, toh output image ka dimension kabhi bhi 3 se bada nahi ho sakta ($\\dim(\\text{im } T) \\le 3$). Isliye rank = 4 hona impossible hai.'
  },
  {
    id: 'q4-2',
    topicId: 4,
    question: 'A linear operator $T: V \\to V$ on a finite-dimensional space is injective (one-to-one) if and only if it is surjective (onto). Why does this hold?',
    options: [
      'By the definition of vector space',
      'Directly by the Rank-Nullity Theorem: $\\dim(\\ker T) + \\dim(\\text{im } T) = \\dim(V)$',
      'Because all operators on finite dimensions are orthogonal',
      'It only holds if the basis is orthonormal'
    ],
    correctIndex: 1,
    explanation: 'Injective means $\\ker T = \\{0\\} \\iff \\dim(\\ker T) = 0$. By Rank-Nullity, $\\dim(\\text{im } T) = \\dim(V) - 0 = \\dim(V)$. Since $\\text{im}(T) \\le V$ has the same finite dimension as $V$, $\\text{im}(T) = V$, making $T$ surjective!',
    hinglishExplanation: 'Injective matlab $\\ker T = \\{0\\}$, toh $\\text{nullity} = 0$. Rank-Nullity se $\\text{rank} = \\dim(V) - 0 = \\dim(V)$ ban jata hai, jisse image pura $V$ ban jaata hai (surjective).'
  },

  // Topic 5
  {
    id: 'q5-1',
    topicId: 5,
    question: 'If $A$ and $B$ are similar matrices ($B = P^{-1} A P$), which of the following properties is NOT necessarily shared by $A$ and $B$?',
    options: [
      'Determinant: $\\det(A) = \\det(B)$',
      'Trace: $\\text{tr}(A) = \\text{tr}(B)$',
      'Eigenvalues',
      'Eigenvectors'
    ],
    correctIndex: 3,
    explanation: 'Similar matrices share the exact same characteristic polynomial, determinant, trace, and eigenvalues. However, their eigenvectors are related by the basis transition matrix: if $v$ is an eigenvector of $A$, then $P^{-1}v$ is an eigenvector of $B$. They are not the same vectors!',
    hinglishExplanation: 'Similar matrices ke determinant, trace, aur eigenvalues bilkul same hote hain. Lekin eigenvectors basis change matrix $P$ ke through rotate ho jaate hain, isliye exact same nahi rehte.'
  },
  {
    id: 'q5-2',
    topicId: 5,
    question: 'Let $D: P_2(\\mathbb{R}) \\to P_2(\\mathbb{R})$ be the differentiation operator $D(p) = p\'(x)$ relative to standard basis $\\mathcal{B} = \\{1, x, x^2\\}$. What is the matrix $[D]_\\mathcal{B}$?',
    options: [
      '$\\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 2 \\\\ 0 & 0 & 0 \\end{pmatrix}$',
      '$\\begin{pmatrix} 0 & 0 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 2 & 0 \\end{pmatrix}$',
      '$\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 2 \\end{pmatrix}$',
      '$\\begin{pmatrix} 0 & 1 & 2 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$'
    ],
    correctIndex: 0,
    explanation: '$D(1) = 0 = 0\\cdot 1 + 0\\cdot x + 0\\cdot x^2 \\implies [D(1)] = (0, 0, 0)^T$. $D(x) = 1 = 1\\cdot 1 + 0\\cdot x + 0\\cdot x^2 \\implies [D(x)] = (1, 0, 0)^T$. $D(x^2) = 2x = 0\\cdot 1 + 2\\cdot x + 0\\cdot x^2 \\implies [D(x^2)] = (0, 2, 0)^T$. Placing these as columns gives the strictly upper triangular matrix.',
    hinglishExplanation: '$D(1) = 0$, $D(x) = 1$, $D(x^2) = 2x$. In results ke coordinates ko columns mein rakhne par pehla column $(0,0,0)^T$, dusra $(1,0,0)^T$, aur teesra $(0,2,0)^T$ banta hai.'
  },

  // Topic 6
  {
    id: 'q6-1',
    topicId: 6,
    question: 'Let $V = \\mathbb{R}^3$ and $W = \\text{span}\\{(1, 0, 0), (0, 1, 0)\\}$. What is the dimension of the annihilator $W^0 \\subseteq V^*$?',
    options: ['0', '1', '2', '3'],
    correctIndex: 1,
    explanation: 'By the annihilator dimension formula, $\\dim(W) + \\dim(W^0) = \\dim(V)$. Here $\\dim(V) = 3$ and $\\dim(W) = 2$ (the xy-plane). Therefore $\\dim(W^0) = 3 - 2 = 1$. The annihilator consists of all scalar multiples of the coordinate functional $f_3(x, y, z) = z$.',
    hinglishExplanation: 'Formula: $\\dim(W) + \\dim(W^0) = \\dim(V)$. Yahan $\\dim(V) = 3$ aur $\\dim(W) = 2$ hai. Isliye $\\dim(W^0) = 3 - 2 = 1$.'
  },
  {
    id: 'q6-2',
    topicId: 6,
    question: 'If $\\{v_1, \\dots, v_n\\}$ is a basis of $V$ and $\\{f_1, \\dots, f_n\\}$ is its dual basis in $V^*$, what is the value of $\\sum_{i=1}^n f_i(v) v_i$ for any $v \\in V$?',
    options: ['$\\vec{0}$', '$v$', '$\\|v\\|^2$', '$\\,n \\cdot v$'],
    correctIndex: 1,
    explanation: 'Since $f_i$ are the coordinate functionals relative to basis $\\{v_i\\}$, any vector $v$ has coordinates $c_i = f_i(v)$. Thus $\\sum_{i=1}^n f_i(v) v_i = \\sum_{i=1}^n c_i v_i = v$, which is the identity expansion.',
    hinglishExplanation: 'Chunki dual basis functionals $f_i(v)$ vector ke coordinate coefficients dete hain, unhe basis vectors $v_i$ se multiply karke add karne par wapas wahi original vector $v$ mil jata hai.'
  },

  // Topic 7
  {
    id: 'q7-1',
    topicId: 7,
    question: 'Let $T: V \\to W$ be a linear transformation. Which subspace of $V^*$ is equal to the image $\\text{im}(T^*)$ of the transpose operator?',
    options: ['$(\\text{im } T)^0$', '$(\\ker T)^0$', '$\\ker(T)$', '$V^*$'],
    correctIndex: 1,
    explanation: 'A fundamental dual relation states that $\\text{im}(T^*) = (\\ker T)^0$. That is, a functional $f \\in V^*$ is in the range of the dual map if and only if it annihilates the kernel of $T$. Meanwhile, $\\ker(T^*) = (\\text{im } T)^0$.',
    hinglishExplanation: 'Theorem: $\\text{im}(T^*) = (\\ker T)^0$. Transpose map ki range wahi functionals hote hain jo $T$ ke kernel ko annihilate karte hain.'
  },
  {
    id: 'q7-2',
    topicId: 7,
    question: 'Why does column rank equal row rank for any matrix $A \\in M_{m \\times n}(F)$?',
    options: [
      'Because matrices are square',
      'Because $[T^*] = A^T$ and $\\dim(\\text{im } T) = \\dim(\\text{im } T^*)$ via duality',
      'Because dot products are commutative',
      'It only holds over the field of real numbers'
    ],
    correctIndex: 1,
    explanation: 'The column rank of $A$ is $\\dim(\\text{im } T)$. The row rank of $A$ is the column rank of $A^T$, which is $\\dim(\\text{im } T^*)$. Using the dual identity $\\text{im}(T^*) = (\\ker T)^0$ and $\\dim((\\ker T)^0) = \\dim(V) - \\dim(\\ker T) = \\dim(\\text{im } T)$ via Rank-Nullity, the dimensions must be identical.',
    hinglishExplanation: 'Column rank $\\dim(\\text{im } T)$ hota hai aur row rank $\\dim(\\text{im } T^*)$ hota hai. Duality aur annihilator dimension formula se yeh dono rank algebraically hamesha barabar hote hain.'
  },

  // Topic 8
  {
    id: 'q8-1',
    topicId: 8,
    question: 'A $3 \\times 3$ matrix $A$ has minimal polynomial $m_A(x) = (x - 2)^2 (x - 5)$. Is $A$ diagonalizable over $\\mathbb{C}$?',
    options: [
      'Yes, because it has degree 3',
      'No, because its minimal polynomial has a repeated root $(x - 2)^2$',
      'Yes, because all roots are real numbers',
      'It depends on the characteristic polynomial'
    ],
    correctIndex: 1,
    explanation: 'A matrix is diagonalizable if and only if its minimal polynomial factors into DISTINCT linear factors (with no repeated roots). The factor $(x - 2)^2$ indicates the presence of a non-trivial Jordan block of size 2, meaning $A$ is defective and not diagonalizable.',
    hinglishExplanation: 'Matrix tabhi diagonalizable hoti hai jab minimal polynomial ke saare linear factors distinct (alag-alag) hon. Yahan $(x-2)^2$ repeated factor hai, jiska matlab size 2 ka Jordan block banega aur matrix diagonalizable nahi hogi.'
  },
  {
    id: 'q8-2',
    topicId: 8,
    question: 'What is the maximum size of a Jordan block for eigenvalue $\\lambda$ in the Jordan Canonical Form of $A$?',
    options: [
      'The algebraic multiplicity of $\\lambda$',
      'The geometric multiplicity of $\\lambda$',
      'The multiplicity of $(x - \\lambda)$ in the minimal polynomial $m_A(x)$',
      'The trace of matrix $A$'
    ],
    correctIndex: 2,
    explanation: 'The power of $(x - \\lambda)$ in the minimal polynomial $m_A(x)$ exactly equals the size of the LARGEST Jordan block associated with eigenvalue $\\lambda$. Meanwhile, the geometric multiplicity equals the total NUMBER of Jordan blocks for $\\lambda$.',
    hinglishExplanation: 'Minimal polynomial mein $(x - \\lambda)$ ki jo highest power hoti hai, wahi largest Jordan block ka size define karti hai. Total blocks ki count geometric multiplicity hoti hai.'
  },

  // Topic 9
  {
    id: 'q9-1',
    topicId: 9,
    question: 'In an inner product space $(V, \\langle \\cdot, \\cdot \\rangle)$, what does the Riesz Representation Theorem state?',
    options: [
      'Every vector has length 1',
      'Every linear functional $f \\in V^*$ can be uniquely written as $f(v) = \\langle v, w \\rangle$ for some $w \\in V$',
      'Every operator is self-adjoint',
      'The inner product of any two vectors is real'
    ],
    correctIndex: 1,
    explanation: 'The Riesz Representation Theorem provides a canonical isomorphism between $V^*$ and $V$ by showing that every linear functional is simply taking the inner product against a unique vector $w$.',
    hinglishExplanation: 'Riesz Representation Theorem kehta hai ki har continuous linear functional $f$ ko kisi unique vector $w$ ke inner product ke roop mein likha ja sakta hai: $f(v) = \\langle v, w \\rangle$.'
  },
  {
    id: 'q9-2',
    topicId: 9,
    question: 'If $T$ is a self-adjoint operator on a finite-dimensional complex inner product space, what can be said about its eigenvalues?',
    options: [
      'They are all purely imaginary',
      'They all have absolute value 1',
      'They are all strictly real',
      'They must all be positive'
    ],
    correctIndex: 2,
    explanation: 'If $T v = \\lambda v$ with $v \\neq 0$, then $\\lambda \\langle v, v \\rangle = \\langle Tv, v \\rangle = \\langle v, T^* v \\rangle = \\langle v, Tv \\rangle = \\overline{\\lambda} \\langle v, v \\rangle$. Since $\\langle v, v \\rangle > 0$, $\\lambda = \\overline{\\lambda}$, which proves $\\lambda \\in \\mathbb{R}$.',
    hinglishExplanation: 'Self-adjoint operator ke saare eigenvalues strictly REAL hote hain, kyunki $\\lambda \\langle v, v \\rangle = \\langle Tv, v \\rangle = \\langle v, Tv \\rangle = \\bar{\\lambda} \\langle v, v \\rangle \\implies \\lambda = \\bar{\\lambda}$.'
  },

  // Topic 10
  {
    id: 'q10-1',
    topicId: 10,
    question: 'How does the matrix representation $A$ of a bilinear form change when transforming to a new basis via transition matrix $P$?',
    options: [
      '$A\' = P^{-1} A P$ (Similarity)',
      '$A\' = P^T A P$ (Congruence)',
      '$A\' = P A P^T$',
      '$A\' = P A P^{-1}$'
    ],
    correctIndex: 1,
    explanation: 'Since $B(u, v) = [u]^T A [v]$, substituting $[u] = P [u\']$ gives $[u\']^T (P^T A P) [v\']$. Hence the matrix transforms by congruence $A\' = P^T A P$, NOT by similarity!',
    hinglishExplanation: 'Bilinear form ka matrix congruence transform follow karta hai: $A\' = P^T A P$. Similarity ($P^{-1}AP$) linear operators ke liye hoti hai.'
  },
  {
    id: 'q10-2',
    topicId: 10,
    question: 'A bilinear form $B$ on $V$ is non-degenerate if and only if:',
    options: [
      '$B(v, v) > 0$ for all $v \\neq 0$',
      'The matrix $[B]_\\mathcal{B}$ has $\\det([B]_\\mathcal{B}) \\neq 0$ for any basis $\\mathcal{B}$',
      'The form is symmetric',
      'The trace of its matrix is non-zero'
    ],
    correctIndex: 1,
    explanation: 'Non-degeneracy means the radical $\\text{rad}(B) = \\{u \\mid B(u, v) = 0 \\; \\forall v\\} = \\{0\\}$. In matrix terms, this means the homogeneous system $A x = 0$ has only the trivial solution $x = 0$, which is equivalent to $\\det(A) \\neq 0$.',
    hinglishExplanation: 'Non-degenerate ka matlab hota hai ki radical zero ho, yaani matrix $A$ invertible ho aur determinant non-zero ho ($\\det(A) \\neq 0$).'
  },

  // Topic 11
  {
    id: 'q11-1',
    topicId: 11,
    question: 'According to Sylvester\'s Law of Inertia, what property of a real symmetric matrix is invariant under congruence $P^T A P$?',
    options: [
      'The exact eigenvalues of $A$',
      'The trace and determinant',
      'The number of positive, negative, and zero eigenvalues (inertia signature)',
      'The eigenvectors of $A$'
    ],
    correctIndex: 2,
    explanation: 'While congruence changes the numerical values of the eigenvalues, it preserves the number of positive eigenvalues ($p$), negative eigenvalues ($q$), and zero eigenvalues ($r$). The signature $(p, q, r)$ is an absolute invariant.',
    hinglishExplanation: 'Congruence transform $P^T A P$ eigenvalues ke exact numbers ko badal sakta hai, lekin unke signs (positive $p$, negative $q$, zero $r$) hamesha fixed rehte hain. Is signature ko inertia bolte hain.'
  },
  {
    id: 'q11-2',
    topicId: 11,
    question: 'For quadratic form $Q(x, y) = 2x^2 + 6xy + 5y^2$, what is its definiteness classification?',
    options: [
      'Positive Definite',
      'Negative Definite',
      'Indefinite (Saddle)',
      'Positive Semidefinite'
    ],
    correctIndex: 0,
    explanation: 'The associated symmetric matrix is $A = \\begin{pmatrix} 2 & 3 \\\\ 3 & 5 \\end{pmatrix}$. The principal minors are $\\Delta_1 = 2 > 0$ and $\\Delta_2 = \\det(A) = (2)(5) - 3^2 = 10 - 9 = 1 > 0$. By Sylvester\'s criterion, since all leading principal minors are strictly positive, $Q$ is positive definite.',
    hinglishExplanation: 'Matrix $A = \\begin{pmatrix} 2 & 3 \\\\ 3 & 5 \\end{pmatrix}$. Leading principal minors: $\\Delta_1 = 2 > 0$ aur $\\Delta_2 = 10 - 9 = 1 > 0$. Sylvester criterion se yeh Positive Definite hai.'
  },

  // Topic 12
  {
    id: 'q12-1',
    topicId: 12,
    question: 'Why can a non-degenerate alternating bilinear form NEVER exist on an odd-dimensional vector space?',
    options: [
      'Because vectors cannot be paired',
      'Because any $n \\times n$ skew-symmetric matrix has $\\det(A) = 0$ when $n$ is odd',
      'Because alternating forms only exist in dimension 2',
      'Because the trace is always zero'
    ],
    correctIndex: 1,
    explanation: 'If $A^T = -A$ and $A$ is $n \\times n$, then $\\det(A) = \\det(A^T) = \\det(-A) = (-1)^n \\det(A)$. When $n$ is odd, $(-1)^n = -1$, giving $\\det(A) = -\\det(A) \\implies 2\\det(A) = 0 \\implies \\det(A) = 0$. Hence $A$ is always singular, making non-degeneracy impossible!',
    hinglishExplanation: 'Skew-symmetric matrix ke liye $\\det(A) = (-1)^n \\det(A)$. Agar dimension $n$ odd ho, toh $(-1)^n = -1$, jisse $\\det(A) = -\\det(A) \\implies \\det(A) = 0$. Determinant 0 hone se matrix singular ho jaati hai aur form degenerate ho jaati hai.'
  },
  {
    id: 'q12-2',
    topicId: 12,
    question: 'What is the relationship between the determinant of a $2m \\times 2m$ skew-symmetric matrix $A$ and its Pfaffian $\\text{Pf}(A)$?',
    options: [
      '$\\det(A) = 2 \\cdot \\text{Pf}(A)$',
      '$\\det(A) = (\\text{Pf}(A))^2$',
      '$\\det(A) = -\\text{Pf}(A)$',
      '$\\text{Pf}(A) = \\text{tr}(A)$'
    ],
    correctIndex: 1,
    explanation: 'A celebrated theorem of Cayley states that the determinant of any skew-symmetric matrix of even dimension is the exact square of a polynomial in its matrix entries, termed the Pfaffian: $\\det(A) = (\\text{Pf}(A))^2$.',
    hinglishExplanation: 'Even-sized skew-symmetric matrix ka determinant uske entries ke ek polynomial (Pfaffian) ka exact square hota hai: $\\det(A) = (\\text{Pf}(A))^2$.'
  }
];
