import React, { useState, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { ThreeCanvas } from './ThreeCanvas';
import { MathRenderer } from '../MathRenderer';

export const Subspace3DVisualizer: React.FC = () => {
  const [subspaceType, setSubspaceType] = useState<'plane-origin' | 'plane-offset' | 'line-origin' | 'line-offset'>('plane-origin');
  const [offsetD, setOffsetD] = useState<number>(0);
  const [normalVec] = useState<[number, number, number]>([0, 1, 0]);

  const sceneObjectsRef = useRef<{
    planeMesh?: THREE.Mesh;
    lineMesh?: THREE.Line;
    originMarker?: THREE.Mesh;
  }>({});

  const isRealSubspace = (subspaceType === 'plane-origin' || subspaceType === 'line-origin') && offsetD === 0;

  const initScene = useCallback(
    (scene: THREE.Scene) => {
      // Coordinate grid
      const grid = new THREE.GridHelper(12, 12, 0x475569, 0x1e293b);
      scene.add(grid);

      // Axes
      const axes = new THREE.AxesHelper(5);
      scene.add(axes);

      // Origin marker sphere
      const originGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const originMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
      const originMarker = new THREE.Mesh(originGeo, originMat);
      scene.add(originMarker);
      sceneObjectsRef.current.originMarker = originMarker;

      // Plane representation
      const planeGeo = new THREE.PlaneGeometry(10, 10);
      const planeMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const planeMesh = new THREE.Mesh(planeGeo, planeMat);
      scene.add(planeMesh);
      sceneObjectsRef.current.planeMesh = planeMesh;

      // Line representation
      const lineMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 3 });
      const linePoints = [new THREE.Vector3(-6, -6, -6), new THREE.Vector3(6, 6, 6)];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMesh = new THREE.Line(lineGeo, lineMat);
      scene.add(lineMesh);
      sceneObjectsRef.current.lineMesh = lineMesh;

      const updateObjects = () => {
        const { planeMesh, lineMesh, originMarker } = sceneObjectsRef.current;
        if (!planeMesh || !lineMesh) return;

        const currentOffset = subspaceType.includes('offset') ? (offsetD === 0 ? 1.5 : offsetD) : 0;

        if (subspaceType.startsWith('plane')) {
          planeMesh.visible = true;
          lineMesh.visible = false;

          const n = new THREE.Vector3(...normalVec).normalize();
          const orientation = new THREE.Matrix4();
          orientation.lookAt(new THREE.Vector3(0, 0, 0), n, new THREE.Vector3(0, 1, 0));
          planeMesh.quaternion.setFromRotationMatrix(orientation);
          planeMesh.position.copy(n.clone().multiplyScalar(currentOffset));

          if (currentOffset === 0) {
            (planeMesh.material as THREE.MeshStandardMaterial).color.setHex(0x10b981); // Emerald (Subspace)
          } else {
            (planeMesh.material as THREE.MeshStandardMaterial).color.setHex(0xf43f5e); // Rose (Not a subspace!)
          }
        } else {
          planeMesh.visible = false;
          lineMesh.visible = true;

          const dir = new THREE.Vector3(1, 1, 0.5).normalize();
          const p1 = dir.clone().multiplyScalar(-7).add(new THREE.Vector3(0, currentOffset, 0));
          const p2 = dir.clone().multiplyScalar(7).add(new THREE.Vector3(0, currentOffset, 0));
          lineMesh.geometry.setFromPoints([p1, p2]);

          if (currentOffset === 0) {
            (lineMesh.material as THREE.LineBasicMaterial).color.setHex(0x10b981);
          } else {
            (lineMesh.material as THREE.LineBasicMaterial).color.setHex(0xf43f5e);
          }
        }

        if (originMarker) {
          (originMarker.material as THREE.MeshBasicMaterial).color.setHex(
            currentOffset === 0 ? 0x22c55e : 0xef4444
          );
        }
      };

      updateObjects();

      return {
        update: updateObjects,
        dispose: () => {
          planeGeo.dispose();
          planeMat.dispose();
          lineGeo.dispose();
          lineMat.dispose();
          originGeo.dispose();
          originMat.dispose();
        },
      };
    },
    [subspaceType, offsetD, normalVec]
  );

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            Interactive 3D: Subspaces vs. Affine Sets
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Test why every valid vector subspace MUST pass through the zero vector $(0,0,0)$ and maintain closure under addition and scalar multiplication.
          </p>
        </div>

        <div className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${
          isRealSubspace
            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
            : 'bg-rose-950/40 border-rose-500 text-rose-300'
        }`}>
          <span className={`w-2 h-2 rounded-full ${isRealSubspace ? 'bg-emerald-400' : 'bg-rose-400'}`} />
          {isRealSubspace ? 'VALID SUBSPACE (Contains 0)' : 'NOT A SUBSPACE (Zero & Closure Fail)'}
        </div>
      </div>

      <ThreeCanvas
        initScene={initScene}
        height="380px"
        ariaLabel="Interactive 3D representation showing planes and lines passing through the origin versus translated affine sets"
        accessibilityDescription="Green planes or lines pass directly through the origin (0,0,0) and represent genuine vector subspaces. Red planes or lines are shifted away by an offset, showing that they do not contain the origin and fail the subspace axioms."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2">Select Geometry Configuration:</label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => { setSubspaceType('plane-origin'); setOffsetD(0); }}
              className={`p-2.5 rounded-lg border text-left transition ${
                subspaceType === 'plane-origin'
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="font-bold block">Plane through $(0,0,0)$</span>
              <span className="text-[11px] text-slate-400">$ax + by + cz = 0$</span>
            </button>

            <button
              onClick={() => { setSubspaceType('plane-offset'); setOffsetD(2); }}
              className={`p-2.5 rounded-lg border text-left transition ${
                subspaceType === 'plane-offset'
                  ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="font-bold block">Shifted Plane</span>
              <span className="text-[11px] text-slate-400">$ax + by + cz = d \neq 0$</span>
            </button>

            <button
              onClick={() => { setSubspaceType('line-origin'); setOffsetD(0); }}
              className={`p-2.5 rounded-lg border text-left transition ${
                subspaceType === 'line-origin'
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="font-bold block">Line through $(0,0,0)$</span>
              <span className="text-[11px] text-slate-400"><MathRenderer content="$\text{Span}\{\vec{v}\}$" inline /></span>
            </button>

            <button
              onClick={() => { setSubspaceType('line-offset'); setOffsetD(2); }}
              className={`p-2.5 rounded-lg border text-left transition ${
                subspaceType === 'line-offset'
                  ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="font-bold block">Shifted Line</span>
              <span className="text-[11px] text-slate-400"><MathRenderer content="$\vec{p} + \text{Span}\{\vec{v}\}$" inline /></span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs font-medium text-slate-300">
            <span>Offset from origin ($d$): <span className={offsetD === 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{offsetD}</span></span>
          </div>
          <input
            type="range"
            min="0"
            max="4"
            step="0.5"
            value={offsetD}
            onChange={(e) => setOffsetD(parseFloat(e.target.value))}
            className={`w-full rounded-lg cursor-pointer ${offsetD === 0 ? 'accent-emerald-500' : 'accent-rose-500'}`}
          />

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1">
            <span className="font-semibold text-slate-200 block">Subspace Test Verdict:</span>
            {isRealSubspace ? (
              <p className="text-emerald-400">
                ✓ <strong>Passed</strong>: Set contains $\vec{0} = (0,0,0)$. For any vectors $u, v$ in this set and scalar $c$, $u+v$ and $c u$ remain on this plane/line.
              </p>
            ) : (
              <p className="text-rose-400">
                ✗ <strong>Failed</strong>: $\vec{0} \notin W$. If $v \in W$, then $0 \cdot v = \vec{0} \notin W$, so closure under scalar multiplication fails immediately!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
