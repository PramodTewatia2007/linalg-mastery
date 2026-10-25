# Linear Algebra Mastery | Full-Stack Web Application
![image alt](https://github.com/PramodTewatia2007/linalg-mastery/blob/1cde6778f96fe7486eca1b95a95ed433e1b13ba9/linear%20alzebra.png)
An approachable, mathematically rigorous full-stack learning platform for students and practitioners studying Linear Algebra. Taught in clear, human-friendly **English** and natural **Hinglish**, with step-by-step mathematical derivations, interactive **3D WebGL / Three.js geometry**, **192 fully solved examples**, **552 practice questions**, quizzes, formula references, and an automated **Content Audit Dashboard**.

---

## 🎯 Syllabus Coverage (All 12 Topics)

1. **Vector spaces** — Axioms over field $F$, closure, additive inverses, polynomials $P_n(F)$, matrix spaces $M_{m \times n}(F)$, function spaces $C([a, b])$.
2. **Subspaces** — 3-step subspace criterion, geometric hyperplanes through origin vs. shifted affine sets, intersections, sums, direct sums $U \oplus W$, Grassmann dimension formula.
3. **Basis and dimension** — Linear independence, spanning sets, Steinitz exchange lemma, coordinate vectors $[v]_\mathcal{B}$, dimension invariance.
4. **Linear transformations** — Definition, preservation of linear combinations, kernel (null space), image (range), Rank-Nullity Theorem $\dim(\ker T) + \dim(\text{im } T) = \dim(V)$, isomorphisms.
5. **Matrix representation of linear transformations** — Transformation matrix $[T]_{\mathcal{B}, \mathcal{C}}$, column coordinate vectors of basis images, change of basis formula $[T]_{\mathcal{B}'} = P^{-1} [T]_\mathcal{B} P$, similarity invariants.
6. **Linear functionals (Introductory)** — Algebraic dual space $V^* = \mathcal{L}(V, F)$, evaluation functionals, dual basis $f_i(v_j) = \delta_{ij}$, double dual $V^{**}$, annihilators $S^0$, dimension formula $\dim(W) + \dim(W^0) = \dim(V)$.
7. **Transpose of linear transformations** — Dual operator $T^*: W^* \to V^*$ defined by $(T^*g)(v) = g(T v)$, representation matrix $[T^*] = A^T$, fundamental relations $\ker(T^*) = (\text{im } T)^0$, column rank equals row rank.
8. **Canonical forms** — Eigenvalues, eigenvectors, invariant subspaces, diagonalizability criteria (algebraic vs. geometric multiplicity), characteristic vs. minimal polynomial, Cayley-Hamilton theorem, Jordan Canonical Form over algebraically closed fields, and Rational Canonical Form.
9. **Linear functionals and adjoints** — Inner product spaces, orthogonality, Cauchy-Schwarz, Riesz Representation Theorem ($f(v) = \langle v, w \rangle$), adjoint operator $T^*$, self-adjoint (Hermitian), unitary maps, and the Spectral Theorem.
10. **Bilinear forms** — Bilinearity in both slots, representation matrix $B(x, y) = x^T A y$, congruence transformation $A' = P^T A P$, rank, non-degeneracy, left/right radicals.
11. **Symmetric bilinear forms** — Symmetric forms $B(u, v) = B(v, u)$, associated quadratic forms $Q(v) = B(v, v)$, polarization identities, completing the square, Sylvester's Law of Inertia $(p, q, r)$, positive definiteness via principal minors.
12. **Skew-symmetric bilinear forms** — Alternating forms ($B(v, v) = 0$), skew-symmetry ($B(u, v) = -B(v, u)$), vanishing determinant in odd dimensions, even dimensionality ($2m$), symplectic basis, standard block form $\begin{pmatrix} 0 & I \\ -I & 0 \end{pmatrix}$, and the Pfaffian $\det(A) = (\text{Pf}(A))^2$.

---

## 📊 Mandatory Content Volume Verification

| Metric | Required per Topic | Actual per Topic | 12 Topics Total | Status |
| :--- | :---: | :---: | :---: | :---: |
| **Fully Solved Examples** | $\ge 15$ | **16** | **192** | ✅ Exceeded |
| **Unsolved Practice Questions** | $\ge 45$ | **46** | **552** | ✅ Exceeded |
| **Topic Quizzes** | 12 | 12 | 24 core items | ✅ Complete |
| **Formulas & Identities** | — | — | 20+ formulas | ✅ Complete |

Every lesson includes an author-facing **Content Audit Dashboard** (visible under the *Content Audit* tab in the app) that programmatically verifies each lesson's compliance against the mandatory thresholds.

---

## 🌐 Dual Language: English & Natural Hinglish

Each topic provides mathematically equivalent explanations in:
- **Plain English**: Precise academic phrasing with definitions, assumptions, step rationales, and geometric interpretations.
- **Natural Hinglish**: Friendly, conversational intuition (e.g., *"Simple words mein bolein toh vector space ek aisa playground hai jisme vectors ko add kar sakte ho aur scalars se scale kar sakte ho without leaving the space..."*).
- Switch between **Dual (Side-by-side)**, **EN (English only)**, or **हिं (Hinglish only)** at any time using the navbar language toggle.

---

## 🎮 Interactive 3D & 2D Visualizers (Three.js & Canvas)

- **Vector Spaces & Span**: 3D interactive linear combinations $c_1 \vec{u} + c_2 \vec{v}$, live span plane rendering, and vector sliders.
- **Subspaces vs. Affine Sets**: 3D planes and lines passing through $(0,0,0)$ (green) versus shifted non-subspaces (red) testing zero vector inclusion.
- **Basis & Dimension**: 3 vectors spanning a 3D parallelepiped, real-time determinant/volume calculation, detecting coplanar collapse.
- **Linear Transformations**: 3D unit cube transformation under matrix $A$, showing rotation, shear, scaling, projection, and Rank-Nullity tracking.
- **Quadratic Forms & Sylvester's Inertia**: 3D surface plot $z = a x^2 + 2b xy + c y^2$, live eigenvalue calculation, classifying elliptic paraboloids, saddles, and cylinders.
- **Linear Functionals**: 2D interactive contour level sets $f(x, y) = c$, kernel line $\ker(f)$, and normal gradient vectors.
- **Controls**: Drag to orbit, mouse wheel or arrow keys to zoom, `R` to reset camera view, fullscreen toggle, and screen-reader accessible alt descriptions.

---

## 🛠️ Stack & Architecture

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Canvas Confetti.
- **Math Rendering**: KaTeX with inline `$ ... $` and display `$$ ... $$` parsing.
- **3D Graphics**: Three.js (WebGL) with custom camera orbiting, touch drag, and dynamic geometry.
- **Backend / API**: Express 5 REST server providing `/api/health`, `/api/audit`, and `/api/progress`.
- **Persistence**: Browser `localStorage` with offline profile, JSON export, and JSON import.

---

## 🚀 Setup & Running Instructions

### Prerequisites
- Node.js $\ge 18$
- npm $\ge 9$

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server (Frontend + Vite)
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run Backend API Server
```bash
npm run server
```
Server listens on [http://localhost:3001](http://localhost:3001).

### 4. Run Full-Stack Production Build
```bash
npm run fullstack
```
Compiles the TypeScript frontend into `dist/` and serves both the API and the single-page application at [http://localhost:3001](http://localhost:3001).

---

## 📂 Content Maintenance Directory

All course content is structured and maintained in modular files:
- `src/data/syllabus.ts`: The 12 topics, subtopic hierarchies, definitions, misconceptions, geometric intuitions, and applications.
- `src/data/examplesData.ts`: 192 fully solved examples with step-by-step derivations and validations.
- `src/data/questionsData.ts`: 552 practice questions with hints, answer choices, full worked solutions, and verification tips.
- `src/data/formulas.ts`: Formula handbook and notation reference.
- `src/data/quizzes.ts`: Interactive quiz items.
- `scripts/generateAllContent.js`: Generator script for content generation and validation.

To regenerate or verify content integrity:
```bash
npm run content:generate
```

---

## ☁️ Deploy to Render

This application includes a native `render.yaml` blueprint for seamless deployment on [Render](https://render.com).

### Automatic Deployment Steps:
1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** and select **Blueprint** (or **Web Service**).
3. Connect your GitHub repository: `PramodTewatia2007/linalg-mastery`.
4. Render automatically reads `render.yaml`:
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Health Check Endpoint**: `/api/health`
5. Click **Apply** to deploy your live full-stack web application!
