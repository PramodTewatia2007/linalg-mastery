import { Topic } from '../types';

export const syllabusTopics: Topic[] = [
  {
    id: 1,
    title: 'Vector Spaces',
    slug: 'vector-spaces',
    summary: 'The fundamental algebraic playground of linear algebra: abstract sets equipped with vector addition and scalar multiplication satisfying the 8 core field axioms.',
    hinglishSummary: 'Linear algebra ka fundamental playground: ek aisa set jisme vectors ko add kar sakte ho aur scalars se multiply kar sakte ho, aur 8 axioms follow hote hain.',
    prerequisites: ['Basic set theory', 'Familiarity with real numbers and basic field properties'],
    estimatedTimeMinutes: 75,
    visualType: 'vectors',
    formulaIds: ['vs-axioms', 'linear-comb'],
    subtopics: [
      {
        id: 'vs-axioms',
        title: 'Vector Space Axioms, Fields & Closure',
        englishOverview: 'A vector space $V$ over a field $F$ (typically $\\mathbb{R}$ or $\\mathbb{C}$) is a set together with two operations: vector addition $+: V \\times V \\to V$ and scalar multiplication $\\cdot: F \\times V \\to V$, satisfying 8 axioms: commutativity, associativity of addition, additive identity, additive inverses, multiplicative compatibility, scalar identity, and distributivity across vectors and scalars.',
        hinglishOverview: 'Vector space $V$ over a field $F$ ek aisa structure hai jisme do operations hote hain: vector addition aur scalar multiplication. Isme 8 axioms satisfy hone chahiye: addition commutative aur associative ho, zero vector exist kare, inverse ho, aur scalar multiplication properly distribute kare.',
        definitions: [
          {
            term: 'Vector Space over a Field F',
            notation: '(V, +, \\cdot, F)',
            mathLatex: 'u + v \\in V, \\quad c \\cdot u \\in V \\quad \\forall u,v \\in V, c \\in F',
            english: 'A non-empty set V closed under addition and scalar multiplication satisfying the 8 abelian and scalar axioms.',
            hinglish: 'Ek non-empty set jo addition aur scalar scaling ke under closed ho aur sabhi 8 field-vector axioms follow kare.',
            assumptions: 'The scalars belong to a field F (satisfying field axioms with non-zero multiplicative inverses).'
          },
          {
            term: 'Zero Vector and Uniqueness',
            notation: '\\vec{0} \\in V',
            mathLatex: 'v + \\vec{0} = v \\quad \\forall v \\in V',
            english: 'The additive identity element in V. It is unique: if 0 and 0\' both act as additive identities, 0 = 0 + 0\' = 0\'.',
            hinglish: 'Additive identity element jo har vector mein add karne par wahi vector deta hai. Yeh hamesha unique hota hai.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Thinking vectors must be arrows in physical 2D or 3D space.',
            correction: 'Vectors can be polynomials, matrices, continuous functions, or sequence spaces. Any objects satisfying the 8 axioms are legitimate vectors.',
            whyItHappens: 'Students often first encounter vectors exclusively in high school physics as directed line segments.'
          },
          {
            mistake: 'Assuming the additive identity 0 is the number zero.',
            correction: 'The zero vector is an element of V. In the space of 2x2 matrices, it is the zero matrix; in polynomial spaces, it is the zero polynomial.',
            whyItHappens: 'Both scalars and vector identities use the symbol 0.'
          }
        ],
        geometricIntuition: 'Think of a vector space as an infinite fabric that can be stretched (scalar multiplication) and combined (vector addition) without ever tearing or creating holes (closure).',
        applications: ['Quantum state spaces (Hilbert spaces)', 'Computer graphics coordinates', 'Fourier series and audio signal representation']
      },
      {
        id: 'vs-examples',
        title: 'Standard Spaces and Non-Examples',
        englishOverview: 'Exploration of concrete vector spaces: Euclidean n-space $F^n$, polynomial spaces $P_n(F)$, matrix spaces $M_{m \\times n}(F)$, and spaces of real-valued functions $C([a, b], \\mathbb{R})$, contrasted with counterexamples failing closure or axioms.',
        hinglishOverview: 'Concrete vector spaces ko explore karenge jaise $R^n$, polynomials $P_n(R)$, matrices $M_{m \\times n}(R)$, aur function spaces. Saath hi counterexamples dekhenge jo closure ya axioms fail karte hain.',
        definitions: [
          {
            term: 'Polynomial Space P_n(F)',
            notation: 'P_n(F)',
            mathLatex: 'P_n(F) = \\{ a_0 + a_1 x + \\dots + a_n x^n \\mid a_i \\in F \\}',
            english: 'The vector space of all polynomials of degree at most n with coefficients in F.',
            hinglish: 'Degree at most n wale polynomials ka space. Degrees add karne par kabhi n se badi nahi hoti, isliye closed rehta hai.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Assuming polynomials of exact degree n form a vector space.',
            correction: 'They do not form a vector space because $(x^n + 1) + (-x^n) = 1$, which has degree 0, violating closure under addition, and the zero polynomial has no degree n.',
            whyItHappens: 'Forgetting that closure must hold for all sums, including cancellation of highest terms.'
          }
        ],
        geometricIntuition: 'Functions and polynomials behave exactly like infinite-dimensional or finite-dimensional vectors where each power $x^k$ acts as an independent coordinate axis.',
        applications: ['Polynomial interpolation', 'Solving linear differential equations']
      }
    ]
  },
  {
    id: 2,
    title: 'Subspaces',
    slug: 'subspaces',
    summary: 'Non-empty subsets of a vector space that are themselves vector spaces under inherited operations, tested via the 3-step subspace criterion.',
    hinglishSummary: 'Ek vector space ke andar aise subsets jo khud bhi vector spaces hote hain. Inhe 3-step subspace criterion se check karte hain.',
    prerequisites: ['Vector Spaces'],
    estimatedTimeMinutes: 70,
    visualType: 'subspaces',
    formulaIds: ['subspace-crit', 'sum-dim-formula'],
    subtopics: [
      {
        id: 'sub-criterion',
        title: 'The Subspace Criterion (3-Step Test)',
        englishOverview: 'A subset $W \\subseteq V$ is a subspace if and only if: (1) $0_V \\in W$ (non-empty), (2) $W$ is closed under addition ($u, v \\in W \\implies u+v \\in W$), and (3) $W$ is closed under scalar multiplication ($c \\in F, u \\in W \\implies c u \\in W$).',
        hinglishOverview: 'Subset $W \\subseteq V$ tabhi subspace banta hai jab: (1) Zero vector $0_V \\in W$ ho, (2) $u, v \\in W \\implies u+v \\in W$ (addition closed), aur (3) $c u \\in W$ (scalar scaling closed).',
        definitions: [
          {
            term: 'Subspace',
            notation: 'W \\le V',
            mathLatex: '\\forall u, v \\in W, \\; \\alpha, \\beta \\in F \\implies \\alpha u + \\beta v \\in W',
            english: 'A subset of a vector space that is closed under linear combinations.',
            hinglish: 'Vector space ka subset jo linear combinations ke under closed ho.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Believing an affine plane like $x + y + z = 1$ is a subspace of $\\mathbb{R}^3$.',
            correction: 'It does not contain $(0,0,0)$ because $0+0+0 = 0 \\neq 1$. Therefore it is not a vector subspace.',
            whyItHappens: 'Confusing affine geometric planes with linear subspaces passing through the origin.'
          }
        ],
        geometricIntuition: 'In $\\mathbb{R}^3$, the only subspaces are the origin $\{0\}$, straight lines passing through $(0,0,0)$, flat planes passing through $(0,0,0)$, and the whole space $\\mathbb{R}^3$.',
        applications: ['Null spaces of linear systems', 'Kernel of differential operators', 'Equilibrium manifolds']
      },
      {
        id: 'sub-sums',
        title: 'Intersections, Sums & Direct Sums',
        englishOverview: 'The intersection of any collection of subspaces is always a subspace. The union is rarely a subspace (only if one contains the other). The sum $U + W = \\{u + w \\mid u \\in U, w \\in W\\}$ is the smallest subspace containing both. If $U \\cap W = \\{0\\}$, the sum is a direct sum $U \\oplus W$.',
        hinglishOverview: 'Subspaces ka intersection hamesha subspace hota hai, lekin union tabhi subspace hota hai jab ek dusre ke andar contained ho. Sum $U+W$ dono ko contain karne wala smallest subspace hai. Jab $U \\cap W = \\{0\\}$, toh use direct sum $U \\oplus W$ bolte hain.',
        definitions: [
          {
            term: 'Direct Sum',
            notation: 'U \\oplus W',
            mathLatex: 'V = U \\oplus W \\iff V = U + W \\text{ and } U \\cap W = \\{0\\}',
            english: 'Every vector v in V decomposes uniquely as v = u + w with u in U and w in W.',
            hinglish: 'Har vector v ka representation v = u + w unique hota hai.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Assuming the union of two subspaces $U \\cup W$ is a subspace.',
            correction: 'Take the x-axis and y-axis in $\\mathbb{R}^2$. Both are subspaces, but $(1,0) + (0,1) = (1,1)$, which is neither on the x-axis nor the y-axis, violating closure.',
            whyItHappens: 'Intuition from set theory where unions combine everything.'
          }
        ],
        geometricIntuition: 'In $\\mathbb{R}^3$, an xy-plane and a z-axis intersect only at the origin. Their sum spans all of $\\mathbb{R}^3$ uniquely, forming a direct sum.',
        applications: ['Decomposing signals into even and odd components: $f(x) = f_{even}(x) + f_{odd}(x)$', 'Eigenspace decomposition']
      }
    ]
  },
  {
    id: 3,
    title: 'Basis and Dimension',
    slug: 'basis-and-dimension',
    summary: 'The bedrock coordinate architecture: spanning sets, linear independence, minimal generators, maximal independent sets, and invariant dimension.',
    hinglishSummary: 'Linear algebra ka coordinate framework: linear independence, spanning sets, basis ka unique representation, aur dimension invariance.',
    prerequisites: ['Vector Spaces', 'Subspaces'],
    estimatedTimeMinutes: 80,
    visualType: 'basis',
    formulaIds: ['steinitz', 'basis-dim-formula'],
    subtopics: [
      {
        id: 'basis-indep',
        title: 'Linear Independence & Spanning Sets',
        englishOverview: 'A set of vectors $\\{v_1, \\dots, v_k\\}$ is linearly independent if $c_1 v_1 + \\dots + c_k v_k = 0$ implies $c_1 = \\dots = c_k = 0$. Otherwise it is linearly dependent. The span $\\text{span}(S)$ is the set of all linear combinations.',
        hinglishOverview: 'Vectors linearly independent tab hote hain jab unka linear combination zero banane ka sirf ek hi tareeka ho: saare coefficients $c_i = 0$ hon. Agar koi non-zero combination zero de de, toh wo dependent hain.',
        definitions: [
          {
            term: 'Linear Independence',
            notation: 'c_1 v_1 + \\dots + c_k v_k = 0 \\implies c_i = 0',
            mathLatex: '\\sum_{i=1}^k c_i v_i = 0 \\iff c_1 = c_2 = \\dots = c_k = 0',
            english: 'No vector in the set can be written as a linear combination of the remaining vectors.',
            hinglish: 'Set ka koi bhi vector baaki vectors ke linear combination ke roop mein nahi likha ja sakta.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Checking pairwise independence instead of mutual independence.',
            correction: 'Three vectors can be pairwise non-parallel while still being linearly dependent (e.g., three coplanar vectors in 3D).',
            whyItHappens: 'Thinking independence just means no two vectors point in the same direction.'
          }
        ],
        geometricIntuition: 'Linearly independent vectors in 3D define a non-degenerate 3D box (parallelepiped). Dependent vectors flatten into a 2D plane or 1D line.',
        applications: ['Data compression and PCA', 'Degrees of freedom in mechanical systems']
      },
      {
        id: 'basis-dim',
        title: 'Bases & Dimension',
        englishOverview: 'A basis $\\mathcal{B}$ of $V$ is a linearly independent subset of $V$ that spans $V$. The number of elements in any basis of a finite-dimensional space is constant, defined as the dimension $\\dim(V)$.',
        hinglishOverview: 'Basis ek aisa subset hai jo linearly independent bhi ho aur pure space ko span bhi kare. Kisi finite-dimensional vector space ke har basis mein number of elements hamesha same rehte hain, jise dimension kehte hain.',
        definitions: [
          {
            term: 'Dimension',
            notation: '\\dim(V)',
            mathLatex: '\\dim(V) = |\\mathcal{B}|',
            english: 'The unique cardinality of any basis of V. By Steinitz Exchange Lemma, any two bases have the same number of elements.',
            hinglish: 'Basis mein maujood vectors ki sankhya. Steinitz Exchange Lemma guarantee karta hai ki sabhi bases mein same number of elements honge.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Thinking a basis is unique.',
            correction: 'A vector space has infinitely many different bases; what is unique is the number of vectors in a basis (the dimension).',
            whyItHappens: 'Confusing the basis set with the dimension number.'
          }
        ],
        geometricIntuition: 'Dimension is the minimum number of independent directions needed to navigate anywhere in the space.',
        applications: ['State-space representations in control theory', 'Color representation spaces (RGB, CMYK)']
      }
    ]
  },
  {
    id: 4,
    title: 'Linear Transformations',
    slug: 'linear-transformations',
    summary: 'Structure-preserving maps between vector spaces, their kernels, images, and the cornerstone Rank-Nullity Theorem.',
    hinglishSummary: 'Vector spaces ke beech structure-preserving mappings, unka kernel (null space), image (range), aur Rank-Nullity theorem.',
    prerequisites: ['Basis and Dimension'],
    estimatedTimeMinutes: 75,
    visualType: 'transformations',
    formulaIds: ['rank-nullity', 'linear-map-def'],
    subtopics: [
      {
        id: 'lt-def-ker-im',
        title: 'Definition, Kernel & Image',
        englishOverview: 'A function $T: V \\to W$ is a linear transformation if $T(u + v) = T(u) + T(v)$ and $T(c u) = c T(u)$. Its kernel $\\ker(T) = \\{v \\in V \\mid T(v) = 0\\}$ measures what is crushed to zero, and image $\\text{im}(T) = \\{T(v) \\mid v \\in V\\}$ is the output subspace.',
        hinglishOverview: 'Linear transformation $T: V \\to W$ addition aur scalar multiplication dono ko preserve karta hai: $T(u+v) = T(u)+T(v)$ aur $T(c u) = c T(u)$. Kernel wo inputs hain jo zero par map hote hain, aur image output subspace hota hai.',
        definitions: [
          {
            term: 'Linear Transformation',
            notation: 'T \\in \\mathcal{L}(V, W)',
            mathLatex: 'T(\\alpha u + \\beta v) = \\alpha T(u) + \\beta T(v)',
            english: 'A homomorphism of vector spaces preserving the linear algebraic structure.',
            hinglish: 'Vector spaces ke beech aisi mapping jo linear combinations ko preserve kare.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Thinking $f(x) = 2x + 3$ is a linear transformation from $\\mathbb{R}$ to $\\mathbb{R}$.',
            correction: '$f(0) = 3 \\neq 0$, and $f(x+y) = 2(x+y)+3 \\neq f(x)+f(y) = 2x+2y+6$. It is an affine map, not a linear transformation.',
            whyItHappens: 'High school algebra calls $y = mx + c$ a "linear equation".'
          }
        ],
        geometricIntuition: 'Linear transformations keep grid lines parallel and evenly spaced, and always keep the origin fixed in place.',
        applications: ['Computer graphics camera projections', 'Rotation matrices', 'Differential operators $D = d/dx$']
      },
      {
        id: 'lt-rank-nullity',
        title: 'Rank-Nullity Theorem & Isomorphisms',
        englishOverview: 'For any linear map $T: V \\to W$ on a finite-dimensional space $V$, $\\dim(\\ker T) + \\dim(\\text{im } T) = \\dim(V)$. An invertible linear transformation is an isomorphism, proving that every n-dimensional vector space over F is isomorphic to $F^n$.',
        hinglishOverview: 'Agar $V$ finite-dimensional hai, toh $\\text{Nullity}(T) + \\text{Rank}(T) = \\dim(V)$. Invertible linear map ko isomorphism bolte hain, jo batata hai ki har n-dimensional space $F^n$ jaisa hi behave karta hai.',
        definitions: [
          {
            term: 'Rank-Nullity Theorem',
            notation: '\\text{nullity}(T) + \\text{rank}(T) = \\dim(V)',
            mathLatex: '\\dim(\\ker T) + \\dim(T(V)) = \\dim(V)',
            english: 'Conservation of dimensions: every input dimension either gets crushed into the kernel or preserved in the image.',
            hinglish: 'Dimensions ka conservation: input ke saare dimensions ya toh collapse hokar kernel mein jaate hain ya image mein preserve hote hain.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Applying Rank-Nullity using the dimension of the codomain $W$ instead of the domain $V$.',
            correction: 'The theorem strictly states $\\text{nullity}(T) + \\text{rank}(T) = \\dim(\\text{Domain } V)$. The codomain dimension only bounds the rank.',
            whyItHappens: 'Confusing domain with codomain.'
          }
        ],
        geometricIntuition: 'Projecting 3D space onto a 2D shadow crushes 1 dimension into a line (kernel) and keeps 2 dimensions in the shadow (image): $1 + 2 = 3$.',
        applications: ['Solving inhomogeneous linear equations $Ax = b$', 'Circuit network analysis']
      }
    ]
  },
  {
    id: 5,
    title: 'Matrix Representation of Linear Transformations',
    slug: 'matrix-representation',
    summary: 'Bridging abstract maps and concrete computations: representing transformations relative to ordered bases, and changing coordinates via similar matrices.',
    hinglishSummary: 'Abstract linear transformations ko concrete matrices mein convert karna, bases ke relative matrix nikalna, aur similarity transformation $P^{-1}AP$.',
    prerequisites: ['Basis and Dimension', 'Linear Transformations'],
    estimatedTimeMinutes: 80,
    visualType: 'matrix-rep',
    formulaIds: ['matrix-trans-def', 'change-basis-formula'],
    subtopics: [
      {
        id: 'mat-rep-coord',
        title: 'Matrix of a Transformation $[T]_{\\mathcal{B}, \\mathcal{C}}$',
        englishOverview: 'Given ordered bases $\\mathcal{B} = \\{v_1, \\dots, v_n\\}$ of $V$ and $\\mathcal{C} = \\{w_1, \\dots, w_m\\}$ of $W$, the matrix $[T]_{\\mathcal{B}, \\mathcal{C}}$ has columns that are the coordinate vectors of $T(v_j)$ with respect to $\\mathcal{C}$: column $j$ is $[T(v_j)]_\\mathcal{C}$.',
        hinglishOverview: 'Agar domain ka basis $\\mathcal{B}$ aur codomain ka basis $\\mathcal{C}$ ho, toh matrix $[T]_{\\mathcal{B}, \\mathcal{C}}$ ka $j$-th column basis vector $v_j$ ke image $T(v_j)$ ka coordinate vector hota hai.',
        definitions: [
          {
            term: 'Representation Matrix',
            notation: '[T]_{\\mathcal{B}, \\mathcal{C}}',
            mathLatex: '[T(v)]_\\mathcal{C} = [T]_{\\mathcal{B}, \\mathcal{C}} [v]_\\mathcal{B}',
            english: 'The m x n matrix whose action by matrix multiplication computes the linear transformation on coordinate vectors.',
            hinglish: 'Wo matrix jo coordinate vectors par multiply hokar abstract transformation $T$ ka result calculate karta hai.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Putting the transformed vectors directly into rows instead of columns.',
            correction: 'The coordinate vectors $[T(v_j)]_\\mathcal{C}$ MUST be placed as columns of the matrix, never rows.',
            whyItHappens: 'Row-major mental habit in writing systems of equations.'
          }
        ],
        geometricIntuition: 'Each column tells you where one unit basis vector lands after being transformed.',
        applications: ['Computer animation rigs', 'Rendering pipeline transformation matrices', 'Robotics forward kinematics']
      },
      {
        id: 'mat-rep-change',
        title: 'Change of Basis & Matrix Similarity',
        englishOverview: 'When the basis of $V$ changes from $\\mathcal{B}$ to $\\mathcal{B}\'$ via transition matrix $P = [I]_{\\mathcal{B}\', \\mathcal{B}}$, the matrix of an operator transforms via similarity: $[T]_{\\mathcal{B}\'} = P^{-1} [T]_\\mathcal{B} P$. Two matrices representing the same operator under different bases are similar.',
        hinglishOverview: 'Jab basis change hota hai matrix $P$ ke through, toh transformation matrix similarity transform se badalta hai: $[T]_{\\mathcal{B}\'} = P^{-1} [T]_\\mathcal{B} P$. Dono matrices similar kehlate hain aur unka determinant, trace, aur eigenvalues same rehte hain.',
        definitions: [
          {
            term: 'Similar Matrices',
            notation: 'A \\sim B',
            mathLatex: 'B = P^{-1} A P \\quad \\text{for an invertible } P',
            english: 'Matrices representing the exact same linear operator under different choices of basis.',
            hinglish: 'Wo matrices jo same linear operator ko alag-alag coordinate systems mein represent karte hain.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Confusing similarity $P^{-1} A P$ with congruence $P^T A P$.',
            correction: 'Similarity applies to linear operators (endomorphisms); congruence applies to bilinear forms. They are distinct concepts.',
            whyItHappens: 'Both involve sandwiching a matrix between $P$ and an inverse/transpose.'
          }
        ],
        geometricIntuition: 'Viewing the exact same geometric rotation or stretch through a rotated or tilted coordinate frame.',
        applications: ['Diagonalization for computing high matrix powers $A^k$', 'Decoupling differential equation systems']
      }
    ]
  },
  {
    id: 6,
    title: 'Linear Functionals (Introductory)',
    slug: 'linear-functionals',
    summary: 'Scalar-valued linear maps, the algebraic dual space $V^* = \\mathcal{L}(V, F)$, the dual basis, and annihilators.',
    hinglishSummary: 'Scalar-valued linear maps, dual space $V^* = \\mathcal{L}(V, F)$, dual basis, aur subspace ke annihilators $S^0$.',
    prerequisites: ['Linear Transformations', 'Basis and Dimension'],
    estimatedTimeMinutes: 70,
    visualType: 'dual-space',
    formulaIds: ['dual-basis-def', 'annihilator-dim'],
    subtopics: [
      {
        id: 'lf-dual-basis',
        title: 'The Dual Space $V^*$ & Dual Basis',
        englishOverview: 'A linear functional is a linear map $f: V \\to F$. The set of all linear functionals forms the dual space $V^* = \\mathcal{L}(V, F)$. For any basis $\\mathcal{B} = \\{v_1, \\dots, v_n\\}$ of $V$, there is a unique dual basis $\\mathcal{B}^* = \\{f_1, \\dots, f_n\\}$ of $V^*$ defined by the Kronecker delta: $f_i(v_j) = \\delta_{ij}$.',
        hinglishOverview: 'Linear functional ek aisi linear mapping hai jo vector ko scalar par bhejti hai: $f: V \\to F$. Aise sabhi functionals ke space ko Dual Space $V^*$ bolte hain. Dual basis $\\{f_i\\}$ aisi hoti hai ki $f_i(v_j) = 1$ jab $i=j$, aur $0$ jab $i \\neq j$.',
        definitions: [
          {
            term: 'Dual Basis',
            notation: '\\mathcal{B}^* = \\{f_1, \\dots, f_n\\}',
            mathLatex: 'f_i(v_j) = \\delta_{ij} = \\begin{cases} 1 & \\text{if } i = j \\\\ 0 & \\text{if } i \\neq j \\end{cases}',
            english: 'Coordinate measurement functionals that extract the i-th coordinate with respect to basis B.',
            hinglish: 'Wo measurement functionals jo kisi vector ka i-th coordinate extract karte hain.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Assuming $V$ and $V^*$ are identical spaces.',
            correction: 'Although $\\dim(V) = \\dim(V^*)$ for finite-dimensional spaces, elements of $V$ are vectors while elements of $V^*$ are functions acting on $V$. There is no canonical isomorphism without an inner product.',
            whyItHappens: 'Equal dimension tempts students to treat them as the same set.'
          }
        ],
        geometricIntuition: 'A vector is an arrow; a functional is a set of parallel planes (contour lines) measuring how many planes the vector pierces.',
        applications: ['Bra-ket notation in quantum physics (bra $\\langle \\psi |$ is a functional on ket $|\\phi\\rangle$)', 'Definite integrals as functionals $\\int_a^b f(x) dx$']
      },
      {
        id: 'lf-annihilators',
        title: 'Double Dual & Annihilators',
        englishOverview: 'For any subset $S \\subseteq V$, its annihilator $S^0 \\subseteq V^*$ is the subspace of all functionals that vanish on $S$: $S^0 = \\{f \\in V^* \\mid f(s) = 0 \\; \\forall s \\in S\\}$. For a subspace $W \\le V$, $\\dim(W) + \\dim(W^0) = \\dim(V)$. The double dual $V^{**}$ is canonically isomorphic to $V$ via evaluation $\\text{ev}_v(f) = f(v)$.',
        hinglishOverview: 'Subset $S$ ka annihilator $S^0$ aise sabhi functionals ka set hai jo $S$ ke har element par 0 value dete hain. Formula: $\\dim(W) + \\dim(W^0) = \\dim(V)$. Double dual $V^{**}$ naturally $V$ ke isomorphic hota hai evaluation map ke through.',
        definitions: [
          {
            term: 'Annihilator',
            notation: 'W^0 \\le V^*',
            mathLatex: 'W^0 = \\{ f \\in V^* \\mid f(w) = 0 \\quad \\forall w \\in W \\}',
            english: 'The subspace of functionals in the dual space that vanish on every element of W.',
            hinglish: 'Dual space ke aise functionals jo W ke sabhi vectors ko zero par bhejte hain.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Confusing the annihilator $W^0$ with the orthogonal complement $W^\\perp$.',
            correction: '$W^\\perp$ requires an inner product and lives in $V$; the annihilator $W^0$ requires no inner product and lives in the dual space $V^*$.',
            whyItHappens: 'Both satisfy dimension formulas like $\\dim(W) + \\dim(W^0) = \\dim(V)$.'
          }
        ],
        geometricIntuition: 'If $W$ is a plane through the origin in $\\mathbb{R}^3$, $W^0$ is the 1D line of all functionals whose kernel contains that plane.',
        applications: ['Constraint satisfaction in linear programming', 'Lagrange multipliers']
      }
    ]
  },
  {
    id: 7,
    title: 'Transpose of Linear Transformations',
    slug: 'transpose-linear-transformations',
    summary: 'The dual operator $T^*: W^* \\to V^*$ pulling functionals back, its matrix representation, and fundamental orthogonality relations.',
    hinglishSummary: 'Dual operator $T^*: W^* \\to V^*$ jo functionals ko pullback karta hai, iska matrix representation $A^T$, aur kernel/image ke relations.',
    prerequisites: ['Linear Transformations', 'Linear Functionals (Introductory)'],
    estimatedTimeMinutes: 70,
    visualType: 'transpose',
    formulaIds: ['transpose-op-def', 'transpose-annihilator'],
    subtopics: [
      {
        id: 'trans-dual-map',
        title: 'The Dual Map $T^*$ & Matrix Transpose',
        englishOverview: 'Given $T \\in \\mathcal{L}(V, W)$, the transpose (or dual map) $T^*: W^* \\to V^*$ is defined by pre-composition: $(T^*(g))(v) = g(T(v))$ for all $g \\in W^*, v \\in V$. If $[T]_{\\mathcal{B}, \\mathcal{C}} = A$, then the matrix of $T^*$ relative to dual bases is the matrix transpose: $[T^*]_{\\mathcal{C}^*, \\mathcal{B}^*} = A^T$.',
        hinglishOverview: 'Agar $T: V \\to W$ ho, toh transpose $T^*: W^* \\to V^*$ define hota hai: $(T^*(g))(v) = g(T(v))$. Dual bases ke respect mein $T^*$ ka matrix original matrix ka transpose $A^T$ hota hai.',
        definitions: [
          {
            term: 'Dual Operator (Transpose)',
            notation: 'T^* \\in \\mathcal{L}(W^*, V^*)',
            mathLatex: '(T^* g)(v) = g(T v) \\quad \\forall g \\in W^*, v \\in V',
            english: 'The pullback operator that transforms measurement functionals on W into measurement functionals on V.',
            hinglish: 'Pullback operator jo W ke functionals ko V ke functionals mein convert karta hai.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Thinking $T^*$ maps from $V^*$ to $W^*$.',
            correction: 'The arrows reverse! Because $T$ maps $V \\to W$, pre-composing a functional $g: W \\to F$ with $T$ yields $g \\circ T: V \\to F$, so $T^*$ maps contravariantly from $W^* \\to V^*$.',
            whyItHappens: 'Forgetting that dual functors reverse arrows.'
          }
        ],
        geometricIntuition: 'If $T$ squashes a sphere into a flat disc, $T^*$ pulls the normal vectors of that disc back into the ambient dual space.',
        applications: ['Adjoint state method in optimization and machine learning backpropagation', 'Duality in linear programming']
      },
      {
        id: 'trans-ortho-relations',
        title: 'Kernel, Image & Annihilator Dual Relations',
        englishOverview: 'Fundamental relations between an operator and its transpose: $\\ker(T^*) = (\\text{im } T)^0$ and $\\text{im}(T^*) = (\\ker T)^0$. Consequently, $\\text{rank}(T) = \\text{rank}(T^*)$, proving that column rank equals row rank purely algebraically.',
        hinglishOverview: 'Fundamental relations: $\\ker(T^*) = (\\text{im } T)^0$ aur $\\text{im}(T^*) = (\\ker T)^0$. Isse directly prove hota hai ki column rank aur row rank hamesha barabar hote hain.',
        definitions: [
          {
            term: 'Column Rank Equals Row Rank',
            notation: '\\text{rank}(T) = \\text{rank}(T^*)',
            mathLatex: '\\dim(\\text{im } T) = \\dim(\\text{im } T^*)',
            english: 'The dimension of the span of columns of A equals the dimension of the span of rows of A.',
            hinglish: 'Matrix ke columns ka span aur rows ka span hamesha same dimension rakhta hai.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Assuming row space and column space are the same subspace.',
            correction: 'They have the same dimension (rank), but for an $m \\times n$ matrix, row space lives in $F^n$ while column space lives in $F^m$.',
            whyItHappens: 'Confusing equal dimension with identical subspace.'
          }
        ],
        geometricIntuition: 'A functional vanishes on the output of $T$ if and only if it lies in the kernel of $T^*$.',
        applications: ['Fredholm Alternative for solvability of linear systems', 'Adjoint sensitivity analysis']
      }
    ]
  },
  {
    id: 8,
    title: 'Canonical Forms',
    slug: 'canonical-forms',
    summary: 'Invariant subspaces, minimal polynomials, triangular form, Jordan Canonical Form over algebraically closed fields, and Rational Canonical Form.',
    hinglishSummary: 'Invariant subspaces, minimal polynomial, Cayley-Hamilton theorem, Jordan Canonical Form (JCF), aur Rational Canonical Form (Frobenius form).',
    prerequisites: ['Matrix Representation', 'Linear Transformations'],
    estimatedTimeMinutes: 90,
    visualType: 'canonical-forms',
    formulaIds: ['jordan-block', 'cayley-hamilton'],
    subtopics: [
      {
        id: 'cf-diag-eigen',
        title: 'Eigenvalues, Invariant Subspaces & Diagonalization',
        englishOverview: 'An invariant subspace $W \\le V$ satisfies $T(W) \\subseteq W$. An eigenvector $v \\neq 0$ spans a 1D invariant subspace with $T(v) = \\lambda v$. An operator is diagonalizable if and only if its minimal polynomial splits into distinct linear factors, or equivalently, geometric multiplicity equals algebraic multiplicity for every eigenvalue.',
        hinglishOverview: 'Invariant subspace $W$ wo hota hai jisme $T(W) \\subseteq W$. Eigenvector $v$ ek 1D invariant subspace banata hai: $T(v) = \\lambda v$. Matrix tabhi diagonalizable hoti hai jab har eigenvalue ki geometric multiplicity algebraic multiplicity ke barabar ho.',
        definitions: [
          {
            term: 'T-Invariant Subspace',
            notation: 'T(W) \\subseteq W',
            mathLatex: 'w \\in W \\implies T(w) \\in W',
            english: 'A subspace preserved under the action of the linear operator T.',
            hinglish: 'Aisa subspace jiske vectors par T lagane par output bhi usi subspace mein rehta hai.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Believing every matrix can be diagonalized.',
            correction: 'Defective matrices like $\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$ have only 1 linearly independent eigenvector despite having size 2. They cannot be diagonalized over any field.',
            whyItHappens: 'Over-generalizing from symmetric or random matrices which are almost always diagonalizable.'
          }
        ],
        geometricIntuition: 'Eigenvectors are the pure stretching directions of a transformation where vectors do not rotate, only scale by $\\lambda$.',
        applications: ['Decoupling vibration modes', 'PageRank algorithm', 'Markov transition matrices']
      },
      {
        id: 'cf-poly-cayley',
        title: 'Minimal Polynomial & Cayley-Hamilton Theorem',
        englishOverview: 'The characteristic polynomial is $p_A(\\lambda) = \\det(\\lambda I - A)$. The Cayley-Hamilton theorem states $p_A(A) = 0$. The minimal polynomial $m_A(x)$ is the unique monic polynomial of least degree that annihilates $A$. $m_A(x)$ divides $p_A(x)$, and both share the exact same roots (eigenvalues).',
        hinglishOverview: 'Characteristic polynomial $p_A(\\lambda) = \\det(\\lambda I - A)$ hota hai. Cayley-Hamilton theorem kehta hai ki har matrix apne characteristic equation ko satisfy karta hai: $p_A(A) = 0$. Minimal polynomial $m_A(x)$ smallest monic polynomial hota hai jo matrix ko zero banata hai.',
        definitions: [
          {
            term: 'Cayley-Hamilton Theorem',
            notation: 'p_A(A) = 0',
            mathLatex: 'p_A(\\lambda) = \\det(\\lambda I - A) \\implies p_A(A) = O',
            english: 'Every square matrix satisfies its own characteristic equation.',
            hinglish: 'Har square matrix apni characteristic equation ko satisfy karta hai.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Proving Cayley-Hamilton by writing $p_A(A) = \\det(A I - A) = \\det(0) = 0$.',
            correction: 'This is a fatal fallacy! $\\det(\\lambda I - A)$ is a scalar polynomial in $\\lambda$; you cannot naively plug a matrix $A$ into the scalar variable before computing the determinant.',
            whyItHappens: 'Syntactic resemblance between the scalar variable and the matrix.'
          }
        ],
        geometricIntuition: 'The minimal polynomial captures the maximum order of cyclic subspaces needed to exhaust the operator action.',
        applications: ['Computing inverse matrices $A^{-1}$ using polynomial identities', 'Exponential matrix $e^{At}$ computation in ODEs']
      },
      {
        id: 'cf-jcf-rcf',
        title: 'Jordan & Rational Canonical Forms',
        englishOverview: 'Over an algebraically closed field (e.g. $\\mathbb{C}$), every matrix is similar to a Jordan Canonical Form composed of Jordan blocks $J_k(\\lambda)$ with eigenvalues on the diagonal and 1s on the superdiagonal. When the field does not contain all eigenvalues, Rational Canonical Form (Frobenius companion blocks) provides the unique canonical form without field extension.',
        hinglishOverview: 'Complex field $\\mathbb{C}$ par har matrix Jordan Canonical Form (JCF) ke similar hoti hai, jisme Jordan blocks $J_k(\\lambda)$ hote hain. Agar field algebraically closed na ho (jaise $\\mathbb{Q}$ ya $\\mathbb{R}$), toh Rational Canonical Form companion matrices ke roop mein unique form deti hai.',
        definitions: [
          {
            term: 'Jordan Block',
            notation: 'J_k(\\lambda)',
            mathLatex: 'J_k(\\lambda) = \\begin{pmatrix} \\lambda & 1 & 0 & \\dots \\\\ 0 & \\lambda & 1 & \\dots \\\\ \\vdots & & \\ddots & 1 \\\\ 0 & \\dots & 0 & \\lambda \\end{pmatrix}',
            english: 'An elementary upper triangular block representing an indecomposable nilpotent shift plus scalar scaling.',
            hinglish: 'Ek aisa block jisme diagonal par $\\lambda$ aur superdiagonal par 1s hote hain.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Assuming every real matrix has a real Jordan Canonical Form.',
            correction: 'A rotation matrix $\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$ has eigenvalues $\\pm i \\notin \\mathbb{R}$. Its Jordan form only exists over $\\mathbb{C}$, not over $\\mathbb{R}$.',
            whyItHappens: 'Forgetting that Jordan form requires the characteristic polynomial to split into linear factors.'
          }
        ],
        geometricIntuition: 'Jordan blocks isolate the shear/nilpotent memory chains along generalized eigenspaces.',
        applications: ['Solving coupled linear differential equation systems $\\dot{x} = Ax$', 'Control theory controllability matrices']
      }
    ]
  },
  {
    id: 9,
    title: 'Linear Functionals and Adjoints',
    slug: 'linear-functionals-adjoints',
    summary: 'The geometric synthesis: inner product spaces, Riesz Representation Theorem, adjoint operators, self-adjoint (Hermitian), unitary, and the Spectral Theorem.',
    hinglishSummary: 'Inner product spaces mein functionals aur adjoints: Riesz Representation Theorem, adjoint operator $T^*$, self-adjoint, unitary maps, aur Spectral Theorem.',
    prerequisites: ['Linear Functionals (Introductory)', 'Transpose of Linear Transformations'],
    estimatedTimeMinutes: 85,
    visualType: 'adjoints',
    formulaIds: ['riesz-rep', 'adjoint-def', 'spectral-thm'],
    subtopics: [
      {
        id: 'adj-riesz',
        title: 'Inner Product Spaces & Riesz Representation',
        englishOverview: 'In an inner product space $(V, \\langle \\cdot, \\cdot \\rangle)$, the Riesz Representation Theorem guarantees that for every linear functional $f \\in V^*$, there exists a unique vector $w \\in V$ such that $f(v) = \\langle v, w \\rangle$ for all $v \\in V$. This establishes an anti-linear (or linear over $\\mathbb{R}$) isomorphism between $V$ and $V^*$.',
        hinglishOverview: 'Inner product space mein Riesz Representation Theorem guarantee karta hai ki har linear functional $f$ ko ek unique vector $w$ ke inner product ke roop mein likha ja sakta hai: $f(v) = \\langle v, w \\rangle$. Yeh $V^*$ aur $V$ ke beech direct geometric bridge banata hai.',
        definitions: [
          {
            term: 'Riesz Representation Theorem',
            notation: 'f(v) = \\langle v, w \\rangle',
            mathLatex: '\\forall f \\in V^*, \\; \\exists! w \\in V \\text{ such that } f(v) = \\langle v, w \\rangle \\quad \\forall v \\in V',
            english: 'Every bounded/finite-dimensional linear functional is realized by taking the inner product with a fixed vector.',
            hinglish: 'Har linear functional ko kisi fixed vector ke saath inner product lekar represent kiya ja sakta hai.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Assuming Riesz representation holds without an inner product.',
            correction: 'Without an inner product, there is no canonical identification of $V^*$ with $V$. Riesz representation fundamentally depends on the metric structure $\\langle \\cdot, \\cdot \\rangle$.',
            whyItHappens: 'Treating the dual space and vector space as automatically identical.'
          }
        ],
        geometricIntuition: 'The representing vector $w$ points directly orthogonal to the hyperplane kernel $\\ker(f)$, and its magnitude is inversely proportional to the spacing between level contours.',
        applications: ['Quantum mechanics observables', 'Dirichlet energy minimization in PDEs']
      },
      {
        id: 'adj-spectral',
        title: 'Adjoints, Self-Adjoint Operators & Spectral Theorem',
        englishOverview: 'The adjoint $T^*$ of an operator $T$ satisfies $\\langle Tv, w \\rangle = \\langle v, T^* w \\rangle$. If $T = T^*$, $T$ is self-adjoint (Hermitian). The Spectral Theorem guarantees that every self-adjoint operator has purely real eigenvalues and an orthonormal basis of eigenvectors.',
        hinglishOverview: 'Adjoint operator $T^*$ satisfy karta hai $\\langle Tv, w \\rangle = \\langle v, T^* w \\rangle$. Agar $T = T^*$, toh wo self-adjoint hota hai. Spectral Theorem kehta hai ki self-adjoint operators ke saare eigenvalues real hote hain aur eigenvectors ka orthonormal basis exist karta hai.',
        definitions: [
          {
            term: 'Adjoint Operator',
            notation: 'T^*',
            mathLatex: '\\langle T v, w \\rangle = \\langle v, T^* w \\rangle \\quad \\forall v, w \\in V',
            english: 'The unique operator on an inner product space conjugate-transposing the inner product action.',
            hinglish: 'Inner product space ka unique operator jo conjugate transpose matrix ke through act karta hai.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Confusing the algebraic transpose with the inner-product adjoint.',
            correction: 'The algebraic transpose lives in $\\mathcal{L}(W^*, V^*)$. The inner product adjoint uses Riesz representation to map back into $\\mathcal{L}(W, V)$. Over $\\mathbb{C}$, the adjoint involves complex conjugation ($A^* = \\overline{A}^T$).',
            whyItHappens: 'Both use the notation $T^*$.'
          }
        ],
        geometricIntuition: 'Self-adjoint operators perform pure perpendicular stretching along mutually orthogonal axes, with zero rotation or shear.',
        applications: ['Principal Component Analysis (PCA)', 'Quantum mechanics observables (Hamiltonian, Momentum)', 'Singular Value Decomposition (SVD)']
      }
    ]
  },
  {
    id: 10,
    title: 'Bilinear Forms',
    slug: 'bilinear-forms',
    summary: 'Functions of two vector arguments linear in each slot, their representation matrices, congruence $A\' = P^T A P$, rank, and non-degeneracy.',
    hinglishSummary: 'Do vectors ke functions jo dono slots mein linear hote hain, representation matrix, congruence transform $P^T A P$, rank, aur non-degeneracy.',
    prerequisites: ['Vector Spaces', 'Matrix Representation'],
    estimatedTimeMinutes: 75,
    visualType: 'bilinear-forms',
    formulaIds: ['bilinear-def', 'bilinear-matrix-rep', 'congruence-formula'],
    subtopics: [
      {
        id: 'bf-matrix-cong',
        title: 'Definition, Matrix Representation & Congruence',
        englishOverview: 'A bilinear form is a map $B: V \\times V \\to F$ satisfying $B(u_1 + u_2, v) = B(u_1, v) + B(u_2, v)$, $B(c u, v) = c B(u, v)$, and similarly in the second argument. Relative to a basis $\\mathcal{B}$, $B(u, v) = [u]_\\mathcal{B}^T [B]_\\mathcal{B} [v]_\\mathcal{B}$. Under a change of basis, the matrix changes via congruence: $[B]_{\\mathcal{B}\'} = P^T [B]_\\mathcal{B} P$.',
        hinglishOverview: 'Bilinear form $B: V \\times V \\to F$ dono arguments mein linear hoti hai. Basis $\\mathcal{B}$ ke respect mein $B(u, v) = u^T A v$ hota hai. Jab basis change hota hai matrix $P$ se, toh matrix congruence transform follow karta hai: $A\' = P^T A P$.',
        definitions: [
          {
            term: 'Bilinear Form',
            notation: 'B: V \\times V \\to F',
            mathLatex: 'B(\\alpha u + \\beta v, w) = \\alpha B(u, w) + \\beta B(v, w), \\quad B(u, \\alpha v + \\beta w) = \\alpha B(u, v) + \\beta B(u, w)',
            english: 'A scalar-valued function on pairs of vectors that is linear in each argument separately.',
            hinglish: 'Do vectors ka function jo pehle aur dusre dono vectors ke respect mein alag-alag linear ho.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Applying similarity $P^{-1} A P$ to change the basis of a bilinear form.',
            correction: 'Linear operators transform via similarity $P^{-1} A P$; bilinear forms transform via congruence $P^T A P$. Never mix them up!',
            whyItHappens: 'Both are square matrices representing linear algebraic concepts.'
          }
        ],
        geometricIntuition: 'An inner product is simply a positive definite symmetric bilinear form; general bilinear forms allow hyperbolic or indefinite geometries.',
        applications: ['Metric tensors in general relativity (Minkowski spacetime metric)', 'Curvature tensors in differential geometry']
      },
      {
        id: 'bf-non-deg-rad',
        title: 'Non-Degeneracy, Rank & Radicals',
        englishOverview: 'The left radical is $\\text{rad}_L(B) = \\{u \\in V \\mid B(u, v) = 0 \\; \\forall v \\in V\\}$. A bilinear form is non-degenerate if its radical is $\{0\}$, which is equivalent to its representation matrix having non-zero determinant $\\det(A) \\neq 0$.',
        hinglishOverview: 'Radical aise vectors ka set hota hai jo pure space ke har vector ke saath zero evaluate karte hain. Agar radical sirf $\\{0\\}$ ho, toh form non-degenerate kehlaati hai, jiska matlab matrix invertible hai ($\\det(A) \\neq 0$).',
        definitions: [
          {
            term: 'Non-Degenerate Bilinear Form',
            notation: '\\text{rad}(B) = \\{0\\}',
            mathLatex: 'B(u, v) = 0 \\; \\forall v \\in V \\implies u = 0 \\iff \\det([B]) \\neq 0',
            english: 'A form where no non-zero vector is orthogonal to the entire space.',
            hinglish: 'Aisi form jisme koi bhi non-zero vector pure space ke orthogonal na ho.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Assuming non-degeneracy means $B(v, v) \\neq 0$ for all $v \\neq 0$.',
            correction: 'Non-degeneracy only requires that no vector is orthogonal to EVERY vector. A vector can have $B(v, v) = 0$ (a null or light-like vector in relativity) while the form remains fully non-degenerate!',
            whyItHappens: 'Confusing positive-definiteness with non-degeneracy.'
          }
        ],
        geometricIntuition: 'Degeneracy means the geometry collapses along certain directions, treating those directions as completely invisible.',
        applications: ['Lorentzian geometry', 'Symplectic mechanics']
      }
    ]
  },
  {
    id: 11,
    title: 'Symmetric Bilinear Forms',
    slug: 'symmetric-bilinear-forms',
    summary: 'Forms where $B(u, v) = B(v, u)$, associated quadratic forms $Q(v) = B(v, v)$, polarization identities, and Sylvester\'s Law of Inertia.',
    hinglishSummary: 'Symmetric bilinear forms $B(u, v) = B(v, u)$, unse banne wali quadratic forms $Q(v) = B(v, v)$, polarization identity, aur Sylvester\'s Law of Inertia.',
    prerequisites: ['Bilinear Forms'],
    estimatedTimeMinutes: 80,
    visualType: 'quadratic-forms',
    formulaIds: ['polarization', 'sylvester-inertia', 'quadratic-form-def'],
    subtopics: [
      {
        id: 'sbf-quad-polar',
        title: 'Quadratic Forms & Polarization Identity',
        englishOverview: 'A bilinear form is symmetric if $B(u, v) = B(v, u)$. Its associated quadratic form is $Q(v) = B(v, v)$. Over fields of characteristic $\\neq 2$, the polarization identity recovers $B$ from $Q$: $B(u, v) = \\frac{1}{2}[Q(u+v) - Q(u) - Q(v)]$.',
        hinglishOverview: 'Symmetric form wo hoti hai jisme $B(u, v) = B(v, u)$. Isse quadratic form banti hai: $Q(v) = B(v, v)$. Characteristic $\\neq 2$ mein Polarization identity se hum quadratic form se wapas symmetric bilinear form nikal sakte hain.',
        definitions: [
          {
            term: 'Polarization Identity',
            notation: 'B(u, v) = \\frac{1}{2}(Q(u+v) - Q(u) - Q(v))',
            mathLatex: 'B(u, v) = \\frac{1}{4}\\left(Q(u+v) - Q(u-v)\\right)',
            english: 'Formula recovering the symmetric bilinear form completely from its quadratic values.',
            hinglish: 'Formula jo quadratic form ki values se symmetric bilinear form ko completely recover kar leta hai.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Applying the standard polarization identity over fields of characteristic 2 (like $\\mathbb{Z}_2$).',
            correction: 'In characteristic 2, $1+1 = 0$, so dividing by 2 or 4 is undefined! Quadratic forms and symmetric bilinear forms are not equivalent in characteristic 2.',
            whyItHappens: 'Taking division by 2 for granted.'
          }
        ],
        geometricIntuition: 'A quadratic form defines energy, distance, or quadric surfaces (ellipsoids, hyperboloids, paraboloids).',
        applications: ['Hessian matrix test in multivariable calculus optimization', 'Kinetic energy $T = \\frac{1}{2} v^T M v$ in Lagrangian mechanics']
      },
      {
        id: 'sbf-sylvester',
        title: 'Diagonalization & Sylvester\'s Law of Inertia',
        englishOverview: 'Every symmetric bilinear form over $\\mathbb{R}$ can be diagonalized by congruence: there exists an invertible $P$ such that $P^T A P = \\text{diag}(I_p, -I_q, 0_r)$. Sylvester\'s Law of Inertia states that the triple of integers $(p, q, r)$ (the inertia signature) is an absolute invariant.',
        hinglishOverview: 'Real numbers par har symmetric bilinear form ko congruence se diagonalize kiya ja sakta hai taaki diagonal entries $+1, -1, 0$ hon. Sylvester\'s Law of Inertia kehta hai ki positive ($p$), negative ($q$), aur zero ($r$) entries ki sankhya hamesha invariant rehti hai.',
        definitions: [
          {
            term: 'Sylvester\'s Law of Inertia',
            notation: '\\text{Inertia}(A) = (p, q, r)',
            mathLatex: 'P^T A P = \\begin{pmatrix} I_p & 0 & 0 \\\\ 0 & -I_q & 0 \\\\ 0 & 0 & 0_r \\end{pmatrix}',
            english: 'The number of positive, negative, and zero diagonal entries is invariant under any real congruence transformation.',
            hinglish: 'Kisi bhi real congruence transform ke under positive, negative, aur zero terms ki count kabhi nahi badalti.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Thinking eigenvalues are preserved under congruence $P^T A P$.',
            correction: 'Eigenvalues are preserved under SIMILARITY $P^{-1} A P$, not congruence! Under congruence, the exact eigenvalues change, but their SIGNS (positive, negative, zero) remain invariant.',
            whyItHappens: 'Confusing similarity invariants with congruence invariants.'
          }
        ],
        geometricIntuition: 'Inertia tells you whether your quadric is a bowl $(+,+,+)$, a saddle $(+,-)$, or an infinite cylinder $(+,+,0)$.',
        applications: ['Classifying critical points in machine learning loss surfaces', 'Special relativity spacetime signature $(+,-,-,-)$']
      }
    ]
  },
  {
    id: 12,
    title: 'Skew-Symmetric Bilinear Forms',
    slug: 'skew-symmetric-bilinear-forms',
    summary: 'Alternating forms $B(v, v) = 0$, skew-symmetry $B(u, v) = -B(v, u)$, even-dimensional symplectic spaces, symplectic bases, and the Pfaffian.',
    hinglishSummary: 'Alternating forms $B(v, v) = 0$, skew-symmetry $B(u, v) = -B(v, u)$, even dimensionality, symplectic basis, block standard form, aur Pfaffian.',
    prerequisites: ['Bilinear Forms'],
    estimatedTimeMinutes: 75,
    visualType: 'skew-symmetric',
    formulaIds: ['skew-sym-def', 'symplectic-block', 'pfaffian-def'],
    subtopics: [
      {
        id: 'sk-alternating',
        title: 'Alternating Forms & Even Dimensionality',
        englishOverview: 'A bilinear form is alternating if $B(v, v) = 0$ for all $v$. Expanding $B(u+v, u+v) = 0$ reveals $B(u, v) = -B(v, u)$ (skew-symmetric). Any finite-dimensional vector space admitting a non-degenerate alternating form MUST have an even dimension $n = 2m$.',
        hinglishOverview: 'Bilinear form alternating hoti hai agar $B(v, v) = 0$ sabhi $v$ ke liye. Isse $B(u, v) = -B(v, u)$ banta hai (skew-symmetric). Agar kisi space par non-degenerate alternating form exist karti hai, toh us space ki dimension hamesha EVEN ($2m$) honi chahiye.',
        definitions: [
          {
            term: 'Alternating Bilinear Form',
            notation: 'B(v, v) = 0 \\quad \\forall v \\in V',
            mathLatex: 'B(u, v) = -B(v, u) \\quad \\forall u, v \\in V',
            english: 'A bilinear form that evaluates to zero on identical vector pairs.',
            hinglish: 'Aisi bilinear form jo identical vectors par zero evaluate karti hai.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Thinking skew-symmetric always implies alternating in characteristic 2.',
            correction: 'In characteristic 2, $B(u, v) = -B(v, u)$ just means $B(u, v) = B(v, u)$ (symmetric)! Only the condition $B(v, v) = 0$ guarantees alternating behavior across all fields.',
            whyItHappens: 'Overlooking that $-1 = +1$ in characteristic 2.'
          },
          {
            mistake: 'Believing an odd-dimensional space can have a non-degenerate skew-symmetric form.',
            correction: 'For an $n \\times n$ skew-symmetric matrix $A$ where $n$ is odd, $\\det(A) = \\det(A^T) = \\det(-A) = (-1)^n \\det(A) = -\\det(A) \\implies \\det(A) = 0$. It is ALWAYS singular when $n$ is odd!',
            whyItHappens: 'Forgetting the determinant property $\\det(-A) = (-1)^n \\det(A)$.'
          }
        ],
        geometricIntuition: 'An alternating form measures oriented area in phase space spanned by pairs of conjugate variables (position $q$ and momentum $p$).',
        applications: ['Symplectic geometry', 'Hamiltonian mechanics phase space', 'Quantum mechanics canonical commutation relations $[x, p] = i\\hbar$']
      },
      {
        id: 'sk-symplectic-basis',
        title: 'Symplectic Basis & The Pfaffian',
        englishOverview: 'Every non-degenerate skew-symmetric space possesses a symplectic basis $\\{p_1, \\dots, p_m, q_1, \\dots, q_m\\}$ where $B(p_i, q_j) = \\delta_{ij}$ and all other pairings vanish. Its representation matrix takes standard block form $\\Omega = \\begin{pmatrix} 0 & I_m \\\\ -I_m & 0 \\end{pmatrix}$. The determinant of a skew-symmetric matrix is the square of a polynomial in its entries, called the Pfaffian: $\\det(A) = (\\text{Pf}(A))^2$.',
        hinglishOverview: 'Har non-degenerate skew-symmetric space mein ek Symplectic Basis exist karta hai jisme matrix standard block form $\\begin{pmatrix} 0 & I_m \\\\ -I_m & 0 \\end{pmatrix}$ ban jaata hai. Skew-symmetric matrix ka determinant hamesha ek polynomial ka square hota hai jise Pfaffian bolte hain: $\\det(A) = (\\text{Pf}(A))^2$.',
        definitions: [
          {
            term: 'Symplectic Standard Form',
            notation: '\\Omega = \\begin{pmatrix} 0 & I_m \\\\ -I_m & 0 \\end{pmatrix}',
            mathLatex: 'P^T A P = \\begin{pmatrix} 0 & I_m \\\\ -I_m & 0 \\end{pmatrix}',
            english: 'The universal canonical form for non-degenerate alternating bilinear forms under congruence.',
            hinglish: 'Non-degenerate alternating forms ka universal canonical representation matrix.'
          },
          {
            term: 'Pfaffian',
            notation: '\\text{Pf}(A)',
            mathLatex: '\\det(A) = (\\text{Pf}(A))^2',
            english: 'A square root polynomial of the determinant of a skew-symmetric matrix.',
            hinglish: 'Skew-symmetric matrix ke determinant ka polynomial square root.'
          }
        ],
        misconceptions: [
          {
            mistake: 'Assuming the Pfaffian can be defined for any square matrix.',
            correction: 'The Pfaffian is strictly defined for skew-symmetric matrices of even size.',
            whyItHappens: 'Confusing Pfaffians with general matrix invariants.'
          }
        ],
        geometricIntuition: 'Symplectic volume preservation (Liouville\'s Theorem): phase space area is conserved like an incompressible fluid.',
        applications: ['Conservation of phase space volume in celestial mechanics', 'Quantum optics Gaussian states']
      }
    ]
  }
];
