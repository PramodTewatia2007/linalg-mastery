import React, { useState, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { ThreeCanvas } from './ThreeCanvas';
import { MathRenderer } from '../MathRenderer';

export const Transformation3DVisualizer: React.FC = () => {
  // 3x3 Transformation Matrix A
  const [matrix, setMatrix] = useState<number[][]>([
    [1, 0.5, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]);

  const sceneObjectsRef = useRef<{
    arrowI?: THREE.ArrowHelper;
    arrowJ?: THREE.ArrowHelper;
    arrowK?: THREE.ArrowHelper;
    transformedCube?: THREE.LineSegments;
    originalCube?: THREE.LineSegments;
  }>({});

  // Compute det of matrix
  const a = matrix[0][0], b = matrix[0][1], c = matrix[0][2];
  const d = matrix[1][0], e = matrix[1][1], f = matrix[1][2];
  const g = matrix[2][0], h = matrix[2][1], i = matrix[2][2];

  const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  const _trace = a + e + i;
  const isSingular = Math.abs(det) < 0.001;
  const rank = Math.abs(det) > 0.05 ? 3 : (Math.abs(a) + Math.abs(e) + Math.abs(i) > 0.1 ? 2 : 1);
  const nullity = 3 - rank;

  const initScene = useCallback(
    (scene: THREE.Scene) => {
      const grid = new THREE.GridHelper(12, 12, 0x475569, 0x1e293b);
      scene.add(grid);

      const axes = new THREE.AxesHelper(5);
      scene.add(axes);

      // Transformed Basis vectors T(e1), T(e2), T(e3)
      const arrowI = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 1, 0xef4444, 0.3, 0.15);
      const arrowJ = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 1, 0x22c55e, 0.3, 0.15);
      const arrowK = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 1, 0x3b82f6, 0.3, 0.15);
      scene.add(arrowI);
      scene.add(arrowJ);
      scene.add(arrowK);
      sceneObjectsRef.current.arrowI = arrowI;
      sceneObjectsRef.current.arrowJ = arrowJ;
      sceneObjectsRef.current.arrowK = arrowK;

      // Original Unit Cube (ghosted reference)
      const unitBoxGeo = new THREE.BoxGeometry(2, 2, 2);
      const unitEdges = new THREE.EdgesGeometry(unitBoxGeo);
      const originalCube = new THREE.LineSegments(unitEdges, new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.4 }));
      originalCube.position.set(1, 1, 1); // Corner at origin
      scene.add(originalCube);
      sceneObjectsRef.current.originalCube = originalCube;

      // Transformed Unit Cube
      const transformedEdges = new THREE.BufferGeometry();
      const transLineMat = new THREE.LineBasicMaterial({ color: 0xa855f7, linewidth: 2 });
      const transformedCube = new THREE.LineSegments(transformedEdges, transLineMat);
      scene.add(transformedCube);
      sceneObjectsRef.current.transformedCube = transformedCube;

      const updateObjects = () => {
        const { arrowI, arrowJ, arrowK, transformedCube } = sceneObjectsRef.current;
        const col1 = new THREE.Vector3(matrix[0][0], matrix[1][0], matrix[2][0]);
        const col2 = new THREE.Vector3(matrix[0][1], matrix[1][1], matrix[2][1]);
        const col3 = new THREE.Vector3(matrix[0][2], matrix[1][2], matrix[2][2]);

        const updateColArrow = (arrow?: THREE.ArrowHelper, vec?: THREE.Vector3) => {
          if (!arrow || !vec) return;
          const len = vec.length();
          if (len > 0.001) {
            arrow.setDirection(vec.clone().normalize());
            arrow.setLength(len, Math.min(0.4, len * 0.25), Math.min(0.2, len * 0.15));
            arrow.visible = true;
          } else {
            arrow.visible = false;
          }
        };

        updateColArrow(arrowI, col1);
        updateColArrow(arrowJ, col2);
        updateColArrow(arrowK, col3);

        // Transform 8 corners of unit cube [0, 2]^3
        const transformPoint = (x: number, y: number, z: number) => {
          return new THREE.Vector3(
            matrix[0][0] * x + matrix[0][1] * y + matrix[0][2] * z,
            matrix[1][0] * x + matrix[1][1] * y + matrix[1][2] * z,
            matrix[2][0] * x + matrix[2][1] * y + matrix[2][2] * z
          );
        };

        const p0 = transformPoint(0, 0, 0);
        const p1 = transformPoint(2, 0, 0);
        const p2 = transformPoint(0, 2, 0);
        const p3 = transformPoint(0, 0, 2);
        const p12 = transformPoint(2, 2, 0);
        const p13 = transformPoint(2, 0, 2);
        const p23 = transformPoint(0, 2, 2);
        const p123 = transformPoint(2, 2, 2);

        const edgePoints = [
          p0, p1,  p0, p2,  p0, p3,
          p1, p12, p1, p13,
          p2, p12, p2, p23,
          p3, p13, p3, p23,
          p12, p123, p13, p123, p23, p123
        ];

        if (transformedCube) {
          transformedCube.geometry.setFromPoints(edgePoints);
        }
      };

      updateObjects();

      return {
        update: updateObjects,
      };
    },
    [matrix]
  );

  const applyPreset = (preset: 'identity' | 'shear' | 'rotZ' | 'projXY' | 'projZ' | 'scale') => {
    if (preset === 'identity') {
      setMatrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
    } else if (preset === 'shear') {
      setMatrix([[1, 1, 0], [0, 1, 0], [0, 0, 1]]);
    } else if (preset === 'rotZ') {
      const angle = Math.PI / 4;
      const cos = Number(Math.cos(angle).toFixed(2));
      const sin = Number(Math.sin(angle).toFixed(2));
      setMatrix([[cos, -sin, 0], [sin, cos, 0], [0, 0, 1]]);
    } else if (preset === 'projXY') {
      setMatrix([[1, 0, 0], [0, 1, 0], [0, 0, 0]]);
    } else if (preset === 'projZ') {
      setMatrix([[0, 0, 0], [0, 0, 0], [0, 0, 1]]);
    } else if (preset === 'scale') {
      setMatrix([[1.5, 0, 0], [0, 0.5, 0], [0, 0, 1.2]]);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
            Interactive 3D: Matrix Transformations & Rank-Nullity
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            <MathRenderer content="Every linear map $T: \mathbb{R}^3 \to \mathbb{R}^3$ is completely determined by how it transforms the standard basis vectors: column $j$ of matrix $A$ is exactly $T(\hat{e}_j)$." />
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg border text-xs font-semibold bg-indigo-950/40 border-indigo-500 text-indigo-300">
          <MathRenderer content={`Rank-Nullity: $\\text{rank}(T) + \\text{nullity}(T) = ${rank} + ${nullity} = 3$`} inline />
        </div>
      </div>

      <ThreeCanvas
        initScene={initScene}
        height="380px"
        ariaLabel="Interactive 3D visualization of matrix transformation on the unit cube and basis vectors"
        accessibilityDescription="The purple wireframe represents the transformed unit cube under matrix A. Columns of A are shown as transformed basis vectors T(e1) in red, T(e2) in green, and T(e3) in blue."
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
          <span className="text-slate-400 block font-medium">Determinant $\det(A)$</span>
          <span className={`text-base font-bold font-mono ${isSingular ? 'text-rose-400' : 'text-emerald-400'}`}>
            {det.toFixed(2)}
          </span>
        </div>
        <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
          <span className="text-slate-400 block font-medium">
            <MathRenderer content="Rank $\dim(\text{im } T)$" inline />
          </span>
          <span className="text-base font-bold font-mono text-indigo-400">{rank}</span>
        </div>
        <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
          <span className="text-slate-400 block font-medium">Nullity $\dim(\ker T)$</span>
          <span className="text-base font-bold font-mono text-amber-400">{nullity}</span>
        </div>
        <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
          <span className="text-slate-400 block font-medium">Invertibility</span>
          <span className={`text-base font-bold font-mono ${isSingular ? 'text-rose-400' : 'text-emerald-400'}`}>
            {isSingular ? 'Singular' : 'Isomorphism'}
          </span>
        </div>
      </div>

      {/* Controls & Matrix inputs */}
      <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">Preset Transformations:</span>
          <button onClick={() => applyPreset('identity')} className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700">Identity</button>
          <button onClick={() => applyPreset('shear')} className="px-2.5 py-1 text-xs bg-indigo-950 hover:bg-indigo-900 text-indigo-200 rounded-md border border-indigo-700">Shear (XY)</button>
          <button onClick={() => applyPreset('rotZ')} className="px-2.5 py-1 text-xs bg-indigo-950 hover:bg-indigo-900 text-indigo-200 rounded-md border border-indigo-700">Rotation 45°</button>
          <button onClick={() => applyPreset('projXY')} className="px-2.5 py-1 text-xs bg-rose-950 hover:bg-rose-900 text-rose-200 rounded-md border border-rose-700">Projection onto XY (Rank 2)</button>
          <button onClick={() => applyPreset('projZ')} className="px-2.5 py-1 text-xs bg-rose-950 hover:bg-rose-900 text-rose-200 rounded-md border border-rose-700">Projection onto Z (Rank 1)</button>
          <button onClick={() => applyPreset('scale')} className="px-2.5 py-1 text-xs bg-emerald-950 hover:bg-emerald-900 text-emerald-200 rounded-md border border-emerald-700">Non-uniform Scale</button>
        </div>

        <div>
          <span className="text-xs font-semibold text-slate-300 block mb-2">Matrix Entries <MathRenderer content="$[T]_{\mathcal{E}}$" inline />:</span>
          <div className="grid grid-cols-3 gap-2 max-w-sm font-mono text-xs">
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => (
                <div key={`${r}-${c}`} className="flex items-center gap-1 bg-slate-900 border border-slate-700 px-2 py-1 rounded">
                  <span className="text-slate-500 text-[10px]">a{r+1}{c+1}:</span>
                  <input
                    type="number"
                    step="0.25"
                    value={matrix[r][c]}
                    onChange={(e) => {
                      const newM = matrix.map((row) => [...row]);
                      newM[r][c] = parseFloat(e.target.value) || 0;
                      setMatrix(newM);
                    }}
                    className="w-full bg-transparent text-slate-100 text-right focus:outline-none"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
