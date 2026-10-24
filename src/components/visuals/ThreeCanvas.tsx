import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Maximize2, RefreshCw } from 'lucide-react';

interface ThreeCanvasProps {
  initScene: (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
  ) => {
    update?: (time: number) => void;
    dispose?: () => void;
    resetView?: () => void;
  };
  className?: string;
  height?: string;
  ariaLabel: string;
  accessibilityDescription: string;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  initScene,
  className = '',
  height = '420px',
  ariaLabel,
  accessibilityDescription,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const resetViewFnRef = useRef<(() => void) | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Mouse / Touch interaction state
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({ radius: 8, theta: Math.PI / 4, phi: Math.PI / 3 });

  const [isFullscreen, setIsFullscreen] = useState(false);

  const updateCameraPosition = useCallback(() => {
    if (!cameraRef.current) return;
    const { radius, theta, phi } = sphericalRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(0, 0, 0);
  }, []);

  const handleReset = useCallback(() => {
    sphericalRef.current = { radius: 8, theta: Math.PI / 4, phi: Math.PI / 3 };
    updateCameraPosition();
    if (resetViewFnRef.current) {
      resetViewFnRef.current();
    }
  }, [updateCameraPosition]);

  const handleZoom = (delta: number) => {
    sphericalRef.current.radius = Math.max(3, Math.min(25, sphericalRef.current.radius + delta));
    updateCameraPosition();
  };

  const handleRotate = (angleDelta: number) => {
    sphericalRef.current.theta += angleDelta;
    updateCameraPosition();
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const heightPx = container.clientHeight || 420;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0b1120'); // deep slate navy
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 1000);
    cameraRef.current = camera;
    updateCameraPosition();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Ambient and directional lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x6366f1, 0.4);
    dirLight2.position.set(-10, -5, -10);
    scene.add(dirLight2);

    // Call user init
    const sceneHandle = initScene(scene, camera, renderer);
    cleanupRef.current = sceneHandle.dispose || null;
    resetViewFnRef.current = sceneHandle.resetView || null;

    let startTime = performance.now();
    const renderLoop = (time: number) => {
      animFrameIdRef.current = requestAnimationFrame(renderLoop);
      if (sceneHandle.update) {
        sceneHandle.update((time - startTime) * 0.001);
      }
      renderer.render(scene, camera);
    };
    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      renderer.dispose();
    };
  }, [initScene, updateCameraPosition]);

  // Pointer event handlers for orbiting
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - prevMousePosRef.current.x;
    const deltaY = e.clientY - prevMousePosRef.current.y;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };

    sphericalRef.current.theta -= deltaX * 0.008;
    // Clamp phi so we don't flip upside down
    sphericalRef.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, sphericalRef.current.phi - deltaY * 0.008));

    updateCameraPosition();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    sphericalRef.current.radius = Math.max(3, Math.min(25, sphericalRef.current.radius + e.deltaY * 0.01));
    updateCameraPosition();
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-xl ${
        isFullscreen ? 'fixed inset-4 z-50 h-[calc(100vh-2rem)]' : ''
      } ${className}`}
      style={{ height: isFullscreen ? 'calc(100vh - 2rem)' : height }}
      role="region"
      aria-label={ariaLabel}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') handleRotate(-0.1);
          if (e.key === 'ArrowRight') handleRotate(0.1);
          if (e.key === 'ArrowUp') handleZoom(-0.5);
          if (e.key === 'ArrowDown') handleZoom(0.5);
          if (e.key === 'r' || e.key === 'R') handleReset();
        }}
      />

      {/* Screen-reader accessible description */}
      <div className="sr-only">
        <p>{ariaLabel}</p>
        <p>{accessibilityDescription}</p>
        <p>Interactive 3D view: Click and drag to rotate, mouse wheel or up/down arrows to zoom, left/right arrows to rotate, R to reset.</p>
      </div>

      {/* Interactive HUD Overlay Buttons */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md px-2 py-1.5 rounded-lg border border-slate-700/60 shadow-md">
        <button
          onClick={() => handleRotate(-0.2)}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
          title="Rotate Left (Keyboard: Left Arrow)"
          aria-label="Rotate left"
        >
          <RotateCw className="w-4 h-4 transform -scale-x-100" />
        </button>
        <button
          onClick={() => handleRotate(0.2)}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
          title="Rotate Right (Keyboard: Right Arrow)"
          aria-label="Rotate right"
        >
          <RotateCw className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-slate-700 mx-0.5" />
        <button
          onClick={() => handleZoom(-1)}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
          title="Zoom In (Keyboard: Up Arrow)"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(1)}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
          title="Zoom Out (Keyboard: Down Arrow)"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-slate-700 mx-0.5" />
        <button
          onClick={handleReset}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
          title="Reset Camera View (Keyboard: R)"
          aria-label="Reset view"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
          title="Toggle Fullscreen"
          aria-label="Toggle fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Axis and Control Legend */}
      <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-700/60 text-xs shadow-md flex flex-wrap items-center gap-3 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
          <span className="text-slate-300 font-medium">X (Red)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          <span className="text-slate-300 font-medium">Y (Green)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
          <span className="text-slate-300 font-medium">Z (Blue)</span>
        </div>
        <span className="text-slate-500 hidden sm:inline">| Drag to orbit • Scroll to zoom</span>
      </div>
    </div>
  );
};
