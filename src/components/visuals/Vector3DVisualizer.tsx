import React, { useState, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { ThreeCanvas } from './ThreeCanvas';
import { MathRenderer } from '../MathRenderer';

export const Vector3DVisualizer: React.FC = () => {
  const [u, setU] = useState<[number, number, number]>([2, 1, 0]);
  const [v, setV] = useState<[number, number, number]>([0, 2, 2]);
  const [c1, setC1] = useState<number>(1);
  const [c2, setC2] = useState<number>(1);
  const [showSpan, setShowSpan] = useState<boolean>(true);

  // References to 3D objects in Three.js scene
  const sceneObjectsRef = useRef<{
    arrowU?: THREE.ArrowHelper;
    arrowV?: THREE.ArrowHelper;
    arrowResult?: THREE.ArrowHelper;
    spanMesh?: THREE.Mesh;
    gridHelper?: THREE.GridHelper;
  }>({});

  const updateVisuals = useCallback(() => {
    const { arrowU, arrowV, arrowResult, spanMesh } = sceneObjectsRef.current;
    const vecU = new THREE.Vector3(...u);
    const vecV = new THREE.Vector3(...v);
    const vecRes = new THREE.Vector3(
      c1 * u[0] + c2 * u[1], // compute combination
      c1 * u[1] + c2 * v[1],
      c1 * u[2] + c2 * v[2]
    );
    // Correct linear combination: c1*u + c2*v
    vecRes.set(
      c1 * u[0] + c2 * v[0],
      c1 * u[1] + c2 * v[1],
      c1 * u[2] + c2 * v[2]
    );

    if (arrowU) {
      const len = vecU.length();
      if (len > 0.001) {
        arrowU.setDirection(vecU.clone().normalize());
        arrowU.setLength(len, Math.min(0.5, len * 0.25), Math.min(0.25, len * 0.15));
      }
    }
    if (arrowV) {
      const len = vecV.length();
      if (len > 0.001) {
        arrowV.setDirection(vecV.clone().normalize());
        arrowV.setLength(len, Math.min(0.5, len * 0.25), Math.min(0.25, len * 0.15));
      }
    }
    if (arrowResult) {
      const len = vecRes.length();
      if (len > 0.001) {
        arrowResult.setDirection(vecRes.clone().normalize());
        arrowResult.setLength(len, Math.min(0.6, len * 0.25), Math.min(0.3, len * 0.15));
        arrowResult.visible = true;
      } else {
        arrowResult.visible = false;
      }
    }

    if (spanMesh) {
      spanMesh.visible = showSpan;
      // Normal to plane spanned by u and v
      const normal = new THREE.Vector3().crossVectors(vecU, vecV);
      if (normal.length() > 0.001) {
        normal.normalize();
        const orientation = new THREE.Matrix4();
        // default plane faces Z (0, 0, 1)
        orientation.lookAt(new THREE.Vector3(0, 0, 0), normal, new THREE.Vector3(0, 1, 0));
        spanMesh.quaternion.setFromRotationMatrix(orientation);
      }
    }
  }, [u, v, c1, c2, showSpan]);

  const initScene = useCallback(
    (scene: THREE.Scene) => {
      // Coordinate Grid on XZ plane
      const grid = new THREE.GridHelper(12, 12, 0x475569, 0x1e293b);
      grid.position.y = 0;
      scene.add(grid);
      sceneObjectsRef.current.gridHelper = grid;

      // Coordinate axes lines
      const axes = new THREE.AxesHelper(5);
      scene.add(axes);

      // Arrow for u (Amber)
      const dirU = new THREE.Vector3(2, 1, 0).normalize();
      const arrowU = new THREE.ArrowHelper(dirU, new THREE.Vector3(0, 0, 0), Math.sqrt(5), 0xf59e0b, 0.4, 0.2);
      scene.add(arrowU);
      sceneObjectsRef.current.arrowU = arrowU;

      // Arrow for v (Cyan)
      const dirV = new THREE.Vector3(0, 2, 2).normalize();
      const arrowV = new THREE.ArrowHelper(dirV, new THREE.Vector3(0, 0, 0), Math.sqrt(8), 0x06b6d4, 0.4, 0.2);
      scene.add(arrowV);
      sceneObjectsRef.current.arrowV = arrowV;

      // Arrow for Result c1*u + c2*v (Violet/Purple)
      const dirRes = new THREE.Vector3(2, 3, 2).normalize();
      const arrowResult = new THREE.ArrowHelper(dirRes, new THREE.Vector3(0, 0, 0), Math.sqrt(17), 0xa855f7, 0.5, 0.25);
      scene.add(arrowResult);
      sceneObjectsRef.current.arrowResult = arrowResult;

      // Plane representing Span{u, v}
      const planeGeo = new THREE.PlaneGeometry(10, 10);
      const planeMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const spanMesh = new THREE.Mesh(planeGeo, planeMat);
      scene.add(spanMesh);
      sceneObjectsRef.current.spanMesh = spanMesh;

      updateVisuals();

      return {
        update: () => {
          updateVisuals();
        },
        dispose: () => {
          planeGeo.dispose();
          planeMat.dispose();
        },
      };
    },
    [updateVisuals]
  );

  const resultVector = [
    Number((c1 * u[0] + c2 * v[0]).toFixed(2)),
    Number((c1 * u[1] + c2 * v[1]).toFixed(2)),
    Number((c1 * u[2] + c2 * v[2]).toFixed(2)),
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
            Interactive 3D: Vectors, Linear Combinations & Span
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            <MathRenderer content="Visualize how scalars scale vectors and how their combinations span a 2D subspace (plane) in $\mathbb{R}^3$." />
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-300 flex items-center gap-2 cursor-pointer bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <input
              type="checkbox"
              checked={showSpan}
              onChange={(e) => setShowSpan(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 bg-slate-900"
            />
            <span>Show Span Plane</span>
          </label>
        </div>
      </div>

      <ThreeCanvas
        initScene={initScene}
        height="380px"
        ariaLabel="Interactive 3D representation of vectors u, v and their linear combination c1*u + c2*v in R3"
        accessibilityDescription="This diagram displays two vectors u in amber and v in cyan, a transparent blue plane showing their span, and the resulting linear combination vector in purple. Adjusting the sliders updates the vector positions and combinations."
      />

      {/* Math Result readout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
        <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl">
          <span className="text-amber-400 font-semibold block text-xs">Vector u (Amber)</span>
          <div className="mt-1 font-mono text-amber-200">
            <MathRenderer content={`\\vec{u} = (${u[0]}, ${u[1]}, ${u[2]})^T`} />
          </div>
        </div>

        <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-xl">
          <span className="text-cyan-400 font-semibold block text-xs">Vector v (Cyan)</span>
          <div className="mt-1 font-mono text-cyan-200">
            <MathRenderer content={`\\vec{v} = (${v[0]}, ${v[1]}, ${v[2]})^T`} />
          </div>
        </div>

        <div className="p-3 bg-purple-950/30 border border-purple-800/40 rounded-xl">
          <span className="text-purple-400 font-semibold block text-xs">Linear Combination (Purple)</span>
          <div className="mt-1 font-mono text-purple-200">
            <MathRenderer
              content={`\\vec{w} = ${c1}\\vec{u} + ${c2}\\vec{v} = (${resultVector[0]}, ${resultVector[1]}, ${resultVector[2]})^T`}
            />
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-medium text-slate-300">
            <span>Scalar $c_1$ for $\vec{u}$: <span className="text-amber-400 font-bold">{c1}</span></span>
          </div>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.25"
            value={c1}
            onChange={(e) => setC1(parseFloat(e.target.value))}
            className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
          />

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block">$u_x$: {u[0]}</span>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={u[0]}
                onChange={(e) => setU([parseFloat(e.target.value), u[1], u[2]])}
                className="w-full accent-amber-500"
              />
            </div>
            <div>
              <span className="text-slate-400 block">$u_y$: {u[1]}</span>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={u[1]}
                onChange={(e) => setU([u[0], parseFloat(e.target.value), u[2]])}
                className="w-full accent-amber-500"
              />
            </div>
            <div>
              <span className="text-slate-400 block">$u_z$: {u[2]}</span>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={u[2]}
                onChange={(e) => setU([u[0], u[1], parseFloat(e.target.value)])}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs font-medium text-slate-300">
            <span>Scalar $c_2$ for $\vec{v}$: <span className="text-cyan-400 font-bold">{c2}</span></span>
          </div>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.25"
            value={c2}
            onChange={(e) => setC2(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-800 rounded-lg cursor-pointer"
          />

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block">$v_x$: {v[0]}</span>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={v[0]}
                onChange={(e) => setV([parseFloat(e.target.value), v[1], v[2]])}
                className="w-full accent-cyan-500"
              />
            </div>
            <div>
              <span className="text-slate-400 block">$v_y$: {v[1]}</span>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={v[1]}
                onChange={(e) => setV([v[0], parseFloat(e.target.value), v[2]])}
                className="w-full accent-cyan-500"
              />
            </div>
            <div>
              <span className="text-slate-400 block">$v_z$: {v[2]}</span>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={v[2]}
                onChange={(e) => setV([v[0], v[1], parseFloat(e.target.value)])}
                className="w-full accent-cyan-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
