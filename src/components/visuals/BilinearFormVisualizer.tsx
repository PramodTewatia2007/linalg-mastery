import React, { useState, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { ThreeCanvas } from './ThreeCanvas';
import { MathRenderer } from '../MathRenderer';

export const BilinearFormVisualizer: React.FC = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(0); // cross term 2*b*xy
  const [c, setC] = useState<number>(1);

  // Discriminant and Eigenvalues of [a b; b c]
  const tr = a + c;
  const det = a * c - b * b;
  const discriminant = Math.sqrt(Math.max(0, (a - c) ** 2 + 4 * b ** 2));
  const lambda1 = (tr + discriminant) / 2;
  const lambda2 = (tr - discriminant) / 2;

  // Sylvester's inertia signature: (p = positive, q = negative, r = zero)
  let p = 0, q = 0, r = 0;
  if (Math.abs(lambda1) < 0.001) r++;
  else if (lambda1 > 0) p++;
  else q++;

  if (Math.abs(lambda2) < 0.001) r++;
  else if (lambda2 > 0) p++;
  else q++;

  let classification = 'Indefinite (Saddle)';
  if (p === 2) classification = 'Positive Definite (Elliptic Paraboloid)';
  else if (q === 2) classification = 'Negative Definite (Inverted Paraboloid)';
  else if (p === 1 && q === 0) classification = 'Positive Semidefinite (Degenerate Trough)';
  else if (p === 0 && q === 1) classification = 'Negative Semidefinite (Degenerate Trough)';

  const sceneObjectsRef = useRef<{
    surfaceMesh?: THREE.Mesh;
    wireMesh?: THREE.LineSegments;
  }>({});

  const initScene = useCallback(
    (scene: THREE.Scene) => {
      const grid = new THREE.GridHelper(10, 10, 0x475569, 0x1e293b);
      scene.add(grid);

      const axes = new THREE.AxesHelper(4);
      scene.add(axes);

      // Parametric surface geometry for z = ax^2 + 2bxy + cy^2
      const segments = 36;
      const size = 3;
      const geo = new THREE.PlaneGeometry(size * 2, size * 2, segments, segments);
      geo.rotateX(-Math.PI / 2); // Lay flat on XZ plane initially

      const mat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        wireframe: false,
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.2,
      });

      const surfaceMesh = new THREE.Mesh(geo, mat);
      scene.add(surfaceMesh);
      sceneObjectsRef.current.surfaceMesh = surfaceMesh;

      const wireGeo = new THREE.WireframeGeometry(geo);
      const wireMat = new THREE.LineBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.4 });
      const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
      scene.add(wireMesh);
      sceneObjectsRef.current.wireMesh = wireMesh;

      const updateSurface = () => {
        const { surfaceMesh, wireMesh } = sceneObjectsRef.current;
        if (!surfaceMesh) return;

        const posAttr = surfaceMesh.geometry.attributes.position;
        const count = posAttr.count;

        for (let i = 0; i < count; i++) {
          const x = posAttr.getX(i);
          const y = posAttr.getZ(i); // Z in Three.js is 2nd horizontal coordinate
          // z height = a*x^2 + 2*b*x*y + c*y^2
          const zVal = 0.4 * (a * x * x + 2 * b * x * y + c * y * y);
          posAttr.setY(i, zVal);
        }

        posAttr.needsUpdate = true;
        surfaceMesh.geometry.computeVertexNormals();

        if (wireMesh) {
          wireMesh.geometry.dispose();
          wireMesh.geometry = new THREE.WireframeGeometry(surfaceMesh.geometry);
        }

        // Color based on definiteness
        if (p === 2) {
          (surfaceMesh.material as THREE.MeshStandardMaterial).color.setHex(0x10b981); // Emerald
        } else if (q === 2) {
          (surfaceMesh.material as THREE.MeshStandardMaterial).color.setHex(0xef4444); // Red
        } else if (p === 1 && q === 1) {
          (surfaceMesh.material as THREE.MeshStandardMaterial).color.setHex(0xf59e0b); // Amber (Saddle)
        } else {
          (surfaceMesh.material as THREE.MeshStandardMaterial).color.setHex(0x8b5cf6); // Purple
        }
      };

      updateSurface();

      return {
        update: updateSurface,
        dispose: () => {
          geo.dispose();
          mat.dispose();
        },
      };
    },
    [a, b, c, p, q]
  );

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
            Interactive 3D: Quadratic Forms, Energy Landscapes & Sylvester's Inertia
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            <MathRenderer content="Every symmetric bilinear form induces a quadratic form $Q(x, y) = \vec{x}^T A \vec{x}$. Its 3D graph $z = Q(x, y)$ visualizes energy, curvature, and definiteness." />
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg border text-xs font-semibold bg-slate-800/80 border-slate-700 text-slate-200">
          Sylvester Signature: (p={p}, q={q}, r={r})
        </div>
      </div>

      <ThreeCanvas
        initScene={initScene}
        height="380px"
        ariaLabel="Interactive 3D surface plot representing a quadratic form z equals a x squared plus 2 b x y plus c y squared"
        accessibilityDescription="This 3D surface illustrates the graph of a quadratic form. When both eigenvalues are positive, the surface is an elliptic bowl opening upwards. When eigenvalues have opposite signs, the surface is a hyperbolic saddle."
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
          <span className="text-slate-400 block font-medium">
            <MathRenderer content="Matrix $A = \begin{pmatrix} a & b \\ b & c \end{pmatrix}$" inline />
          </span>
          <div className="font-mono text-sm text-slate-200 mt-1">
            <MathRenderer content={`\\begin{pmatrix} ${a} & ${b} \\\\ ${b} & ${c} \\end{pmatrix}`} />
          </div>
        </div>

        <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
          <span className="text-slate-400 block font-medium">Eigenvalues ($\lambda_1, \lambda_2$)</span>
          <span className="text-sm font-bold font-mono text-indigo-400 block mt-1">
            <MathRenderer content={`$\\lambda_1 \\approx ${lambda1.toFixed(2)}$, $\\lambda_2 \\approx ${lambda2.toFixed(2)}$`} inline />
          </span>
          <span className="text-[11px] text-slate-500">
            <MathRenderer content={`$\\det(A) = ${det.toFixed(2)}$, $\\text{tr}(A) = ${tr.toFixed(2)}$`} inline />
          </span>
        </div>

        <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
          <span className="text-slate-400 block font-medium">Geometric Form</span>
          <span className={`text-sm font-bold block mt-1 ${
            p === 2 ? 'text-emerald-400' : q === 2 ? 'text-rose-400' : p === 1 && q === 1 ? 'text-amber-400' : 'text-purple-400'
          }`}>
            {classification}
          </span>
        </div>
      </div>

      {/* Presets and Sliders */}
      <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">Form Presets:</span>
          <button onClick={() => { setA(1); setB(0); setC(1); }} className="px-2.5 py-1 text-xs bg-emerald-950 hover:bg-emerald-900 text-emerald-200 rounded-md border border-emerald-700">Positive Definite ($x^2 + y^2$)</button>
          <button onClick={() => { setA(1); setB(0); setC(-1); }} className="px-2.5 py-1 text-xs bg-amber-950 hover:bg-amber-900 text-amber-200 rounded-md border border-amber-700">Hyperbolic Saddle ($x^2 - y^2$)</button>
          <button onClick={() => { setA(0); setB(1); setC(0); }} className="px-2.5 py-1 text-xs bg-amber-950 hover:bg-amber-900 text-amber-200 rounded-md border border-amber-700">Pure Cross-Term ($2xy$)</button>
          <button onClick={() => { setA(1); setB(0); setC(0); }} className="px-2.5 py-1 text-xs bg-purple-950 hover:bg-purple-900 text-purple-200 rounded-md border border-purple-700">Degenerate Trough ($x^2$)</button>
          <button onClick={() => { setA(-1); setB(0); setC(-1); }} className="px-2.5 py-1 text-xs bg-rose-950 hover:bg-rose-900 text-rose-200 rounded-md border border-rose-700">Negative Definite ($-x^2 - y^2$)</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>$a$ ($x^2$ coefficient): <strong className="text-indigo-400">{a}</strong></span>
            </div>
            <input type="range" min="-2" max="2" step="0.25" value={a} onChange={(e) => setA(parseFloat(e.target.value))} className="w-full accent-indigo-500" />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>$b$ ($xy$ cross-term): <strong className="text-amber-400">{b}</strong></span>
            </div>
            <input type="range" min="-2" max="2" step="0.25" value={b} onChange={(e) => setB(parseFloat(e.target.value))} className="w-full accent-amber-500" />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>$c$ ($y^2$ coefficient): <strong className="text-emerald-400">{c}</strong></span>
            </div>
            <input type="range" min="-2" max="2" step="0.25" value={c} onChange={(e) => setC(parseFloat(e.target.value))} className="w-full accent-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
