import React, { useState, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { ThreeCanvas } from './ThreeCanvas';
import { MathRenderer } from '../MathRenderer';

export const BasisDimension3DVisualizer: React.FC = () => {
  const [v1, setV1] = useState<[number, number, number]>([2, 0, 0]);
  const [v2, setV2] = useState<[number, number, number]>([0, 2, 0]);
  const [v3, setV3] = useState<[number, number, number]>([0, 0, 2]);

  // Compute 3x3 Determinant
  const det =
    v1[0] * (v2[1] * v3[2] - v2[2] * v3[1]) -
    v1[1] * (v2[0] * v3[2] - v2[2] * v3[0]) +
    v1[2] * (v2[0] * v3[1] - v2[1] * v3[0]);

  const volume = Math.abs(det);
  const isLinearlyIndependent = Math.abs(det) > 0.05;

  const sceneObjectsRef = useRef<{
    arrow1?: THREE.ArrowHelper;
    arrow2?: THREE.ArrowHelper;
    arrow3?: THREE.ArrowHelper;
    parallelepipedMesh?: THREE.Mesh;
    parallelepipedLine?: THREE.LineSegments;
  }>({});

  const initScene = useCallback(
    (scene: THREE.Scene) => {
      const grid = new THREE.GridHelper(12, 12, 0x475569, 0x1e293b);
      scene.add(grid);

      const axes = new THREE.AxesHelper(5);
      scene.add(axes);

      const arrow1 = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 2, 0xef4444, 0.4, 0.2);
      const arrow2 = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 2, 0x22c55e, 0.4, 0.2);
      const arrow3 = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 2, 0x3b82f6, 0.4, 0.2);
      scene.add(arrow1);
      scene.add(arrow2);
      scene.add(arrow3);
      sceneObjectsRef.current.arrow1 = arrow1;
      sceneObjectsRef.current.arrow2 = arrow2;
      sceneObjectsRef.current.arrow3 = arrow3;

      // Parallelepiped box geometry updated on each frame
      const pMat = new THREE.MeshStandardMaterial({
        color: 0x818cf8,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
      });
      const pGeo = new THREE.BufferGeometry();
      const pMesh = new THREE.Mesh(pGeo, pMat);
      scene.add(pMesh);
      sceneObjectsRef.current.parallelepipedMesh = pMesh;

      // Wireframe outline
      const wireMat = new THREE.LineBasicMaterial({ color: 0xc7d2fe, linewidth: 2 });
      const wireGeo = new THREE.BufferGeometry();
      const pLine = new THREE.LineSegments(wireGeo, wireMat);
      scene.add(pLine);
      sceneObjectsRef.current.parallelepipedLine = pLine;

      const updateObjects = () => {
        const { arrow1, arrow2, arrow3, parallelepipedMesh, parallelepipedLine } = sceneObjectsRef.current;
        const vec1 = new THREE.Vector3(...v1);
        const vec2 = new THREE.Vector3(...v2);
        const vec3 = new THREE.Vector3(...v3);

        const updateArrow = (arrow?: THREE.ArrowHelper, vec?: THREE.Vector3) => {
          if (!arrow || !vec) return;
          const len = vec.length();
          if (len > 0.001) {
            arrow.setDirection(vec.clone().normalize());
            arrow.setLength(len, Math.min(0.5, len * 0.2), Math.min(0.25, len * 0.1));
            arrow.visible = true;
          } else {
            arrow.visible = false;
          }
        };

        updateArrow(arrow1, vec1);
        updateArrow(arrow2, vec2);
        updateArrow(arrow3, vec3);

        // 8 vertices of the parallelepiped: 0, v1, v2, v3, v1+v2, v1+v3, v2+v3, v1+v2+v3
        const p0 = new THREE.Vector3(0, 0, 0);
        const p1 = vec1.clone();
        const p2 = vec2.clone();
        const p3 = vec3.clone();
        const p12 = vec1.clone().add(vec2);
        const p13 = vec1.clone().add(vec3);
        const p23 = vec2.clone().add(vec3);
        const p123 = vec1.clone().add(vec2).add(vec3);

        // 6 faces (12 triangles)
        const vertices = [
          // bottom face (0, p1, p12, p2)
          p0.x, p0.y, p0.z,  p1.x, p1.y, p1.z,  p12.x, p12.y, p12.z,
          p0.x, p0.y, p0.z,  p12.x, p12.y, p12.z,  p2.x, p2.y, p2.z,
          // top face (p3, p13, p123, p23)
          p3.x, p3.y, p3.z,  p123.x, p123.y, p123.z,  p13.x, p13.y, p13.z,
          p3.x, p3.y, p3.z,  p23.x, p23.y, p23.z,  p123.x, p123.y, p123.z,
          // front face (0, p1, p13, p3)
          p0.x, p0.y, p0.z,  p13.x, p13.y, p13.z,  p1.x, p1.y, p1.z,
          p0.x, p0.y, p0.z,  p3.x, p3.y, p3.z,  p13.x, p13.y, p13.z,
          // back face (p2, p12, p123, p23)
          p2.x, p2.y, p2.z,  p12.x, p12.y, p12.z,  p123.x, p123.y, p123.z,
          p2.x, p2.y, p2.z,  p123.x, p123.y, p123.z,  p23.x, p23.y, p23.z,
          // left face (0, p2, p23, p3)
          p0.x, p0.y, p0.z,  p2.x, p2.y, p2.z,  p23.x, p23.y, p23.z,
          p0.x, p0.y, p0.z,  p23.x, p23.y, p23.z,  p3.x, p3.y, p3.z,
          // right face (p1, p12, p123, p13)
          p1.x, p1.y, p1.z,  p123.x, p123.y, p123.z,  p12.x, p12.y, p12.z,
          p1.x, p1.y, p1.z,  p13.x, p13.y, p13.z,  p123.x, p123.y, p123.z,
        ];

        if (parallelepipedMesh) {
          parallelepipedMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
          parallelepipedMesh.geometry.computeVertexNormals();
        }

        // 12 edges
        const edgePoints = [
          p0, p1,  p0, p2,  p0, p3,
          p1, p12, p1, p13,
          p2, p12, p2, p23,
          p3, p13, p3, p23,
          p12, p123, p13, p123, p23, p123
        ];
        if (parallelepipedLine) {
          parallelepipedLine.geometry.setFromPoints(edgePoints);
        }
      };

      updateObjects();

      return {
        update: updateObjects,
      };
    },
    [v1, v2, v3]
  );

  const applyPreset = (preset: 'standard' | 'coplanar' | 'collinear' | 'sheared') => {
    if (preset === 'standard') {
      setV1([2, 0, 0]);
      setV2([0, 2, 0]);
      setV3([0, 0, 2]);
    } else if (preset === 'coplanar') {
      // v3 is in the plane of v1 and v2
      setV1([2, 1, 0]);
      setV2([0, 2, 0]);
      setV3([2, 3, 0]); // v3 = v1 + v2
    } else if (preset === 'collinear') {
      setV1([1, 1, 1]);
      setV2([2, 2, 2]);
      setV3([3, 3, 3]);
    } else if (preset === 'sheared') {
      setV1([2, 1, 0]);
      setV2([1, 2, 1]);
      setV3([0, 1, 2]);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
            Interactive 3D: Basis, Linear Independence & Parallelepiped Volume
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            <MathRenderer content="3 vectors in $\mathbb{R}^3$ form a basis if and only if they are linearly independent, meaning their parallelepiped volume $\det([\vec{v}_1 \ \vec{v}_2 \ \vec{v}_3]) \neq 0$." />
          </p>
        </div>

        <div className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${
          isLinearlyIndependent
            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
            : 'bg-rose-950/40 border-rose-500 text-rose-300'
        }`}>
          <span className={`w-2 h-2 rounded-full ${isLinearlyIndependent ? 'bg-emerald-400' : 'bg-rose-400'}`} />
          {isLinearlyIndependent ? 'BASIS OF R³ (Lin. Independent, Vol > 0)' : 'DEPENDENT (Collapsed Vol = 0)'}
        </div>
      </div>

      <ThreeCanvas
        initScene={initScene}
        height="380px"
        ariaLabel="Interactive 3D representation showing three vectors v1, v2, v3 and their spanned parallelepiped volume"
        accessibilityDescription="Three arrows representing v1 (red), v2 (green), and v3 (blue) define a 3D parallelepiped. When the vectors are independent, the box has nonzero volume. When coplanar, the box flattens into a 2D sheet, demonstrating linear dependence."
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
          <span className="text-slate-400 block font-medium">Determinant $\det(M)$</span>
          <span className={`text-base font-bold font-mono ${isLinearlyIndependent ? 'text-emerald-400' : 'text-rose-400'}`}>
            {det.toFixed(2)}
          </span>
        </div>

        <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
          <span className="text-slate-400 block font-medium">Parallelepiped Volume</span>
          <span className="text-base font-bold font-mono text-indigo-400">
            {volume.toFixed(2)}
          </span>
        </div>

        <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
          <span className="text-slate-400 block font-medium">Span Dimension</span>
          <span className="text-base font-bold font-mono text-amber-400">
            {isLinearlyIndependent ? '3 (Full space R³)' : '< 3 (Plane or Line)'}
          </span>
        </div>

        <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
          <span className="text-slate-400 block font-medium">Coordinate System</span>
          <span className="text-base font-bold font-mono text-cyan-400">
            {isLinearlyIndependent ? 'Invertible / Unique Coordinates' : 'Redundant / Infinitely Many'}
          </span>
        </div>
      </div>

      {/* Presets and Sliders */}
      <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">Quick Presets:</span>
          <button
            onClick={() => applyPreset('standard')}
            className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 transition"
          >
            Standard Basis $(e_1, e_2, e_3)$
          </button>
          <button
            onClick={() => applyPreset('sheared')}
            className="px-2.5 py-1 text-xs bg-indigo-950 hover:bg-indigo-900 text-indigo-200 rounded-md border border-indigo-700 transition"
          >
            General Invertible Basis
          </button>
          <button
            onClick={() => applyPreset('coplanar')}
            className="px-2.5 py-1 text-xs bg-rose-950 hover:bg-rose-900 text-rose-200 rounded-md border border-rose-700 transition"
          >
            Coplanar ($v_3 = v_1 + v_2$, Vol = 0)
          </button>
          <button
            onClick={() => applyPreset('collinear')}
            className="px-2.5 py-1 text-xs bg-rose-950 hover:bg-rose-900 text-rose-200 rounded-md border border-rose-700 transition"
          >
            Collinear (1D Span)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-2.5 bg-rose-950/20 border border-rose-900/40 rounded-lg space-y-2">
            <span className="text-rose-400 font-semibold block"><MathRenderer content={`$\\vec{v}_1$ (Red): (${v1.join(', ')})`} inline /></span>
            <div className="grid grid-cols-3 gap-1">
              <input type="range" min="-3" max="3" step="0.5" value={v1[0]} onChange={(e) => setV1([+e.target.value, v1[1], v1[2]])} />
              <input type="range" min="-3" max="3" step="0.5" value={v1[1]} onChange={(e) => setV1([v1[0], +e.target.value, v1[2]])} />
              <input type="range" min="-3" max="3" step="0.5" value={v1[2]} onChange={(e) => setV1([v1[0], v1[1], +e.target.value])} />
            </div>
          </div>

          <div className="p-2.5 bg-emerald-950/20 border border-emerald-900/40 rounded-lg space-y-2">
            <span className="text-emerald-400 font-semibold block"><MathRenderer content={`$\\vec{v}_2$ (Green): (${v2.join(', ')})`} inline /></span>
            <div className="grid grid-cols-3 gap-1">
              <input type="range" min="-3" max="3" step="0.5" value={v2[0]} onChange={(e) => setV2([+e.target.value, v2[1], v2[2]])} />
              <input type="range" min="-3" max="3" step="0.5" value={v2[1]} onChange={(e) => setV2([v2[0], +e.target.value, v2[2]])} />
              <input type="range" min="-3" max="3" step="0.5" value={v2[2]} onChange={(e) => setV2([v2[0], v2[1], +e.target.value])} />
            </div>
          </div>

          <div className="p-2.5 bg-sky-950/20 border border-sky-900/40 rounded-lg space-y-2">
            <span className="text-sky-400 font-semibold block"><MathRenderer content={`$\\vec{v}_3$ (Blue): (${v3.join(', ')})`} inline /></span>
            <div className="grid grid-cols-3 gap-1">
              <input type="range" min="-3" max="3" step="0.5" value={v3[0]} onChange={(e) => setV3([+e.target.value, v3[1], v3[2]])} />
              <input type="range" min="-3" max="3" step="0.5" value={v3[1]} onChange={(e) => setV3([v3[0], +e.target.value, v3[2]])} />
              <input type="range" min="-3" max="3" step="0.5" value={v3[2]} onChange={(e) => setV3([v3[0], v3[1], +e.target.value])} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
