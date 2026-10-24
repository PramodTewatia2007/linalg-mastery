import React, { useState, useRef, useEffect } from 'react';
import { MathRenderer } from '../MathRenderer';

export const Coordinate2DVisualizer: React.FC = () => {
  // Linear functional f: R^2 -> R defined by f(x, y) = a*x + b*y
  const [a, setA] = useState<number>(2);
  const [b, setB] = useState<number>(1);
  const [testPoint, setTestPoint] = useState<[number, number]>([1, 1]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const evalVal = a * testPoint[0] + b * testPoint[1];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height / 2;
    const scale = 36; // pixels per unit

    ctx.clearRect(0, 0, width, height);

    // Background grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = originX % scale; x < width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = originY % scale; y < height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Draw level sets (hyperplanes / lines) of f(x, y) = c for c = -4, -2, 0, 2, 4
    const drawLevelSet = (cVal: number, color: string, lineWidth: number, isKernel: boolean) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();

      if (Math.abs(b) > 0.001) {
        // y = (c - a*x)/b
        const x1 = -10;
        const y1 = (cVal - a * x1) / b;
        const x2 = 10;
        const y2 = (cVal - a * x2) / b;

        ctx.moveTo(originX + x1 * scale, originY - y1 * scale);
        ctx.lineTo(originX + x2 * scale, originY - y2 * scale);
      } else if (Math.abs(a) > 0.001) {
        // x = c/a
        const xConst = cVal / a;
        ctx.moveTo(originX + xConst * scale, 0);
        ctx.lineTo(originX + xConst * scale, height);
      }
      ctx.stroke();

      // Label level set
      if (isKernel) {
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 11px monospace';
        ctx.fillText('ker(f): f(v) = 0', originX + 15, originY - 15);
      }
    };

    // Draw various contour level sets
    [-6, -4, -2, 2, 4, 6].forEach((val) => {
      drawLevelSet(val, '#334155', 1, false);
    });

    // Draw Kernel (f(x, y) = 0) in bright emerald
    drawLevelSet(0, '#10b981', 2.5, true);

    // Draw current level set passing through testPoint
    drawLevelSet(evalVal, '#818cf8', 2, false);

    // Draw dual vector / normal representing functional (a, b)
    const normLen = Math.sqrt(a * a + b * b);
    if (normLen > 0.01) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      const arrowEndX = originX + a * scale;
      const arrowEndY = originY - b * scale;
      ctx.lineTo(arrowEndX, arrowEndY);
      ctx.stroke();

      // Arrowhead
      const angle = Math.atan2(-b, a);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(arrowEndX, arrowEndY);
      ctx.lineTo(arrowEndX - 10 * Math.cos(angle - Math.PI / 6), arrowEndY - 10 * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(arrowEndX - 10 * Math.cos(angle + Math.PI / 6), arrowEndY - 10 * Math.sin(angle + Math.PI / 6));
      ctx.fill();

      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('Dual vector (a, b)', arrowEndX + 8, arrowEndY);
    }

    // Draw Test Point (x, y)
    const ptScreenX = originX + testPoint[0] * scale;
    const ptScreenY = originY - testPoint[1] * scale;
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.arc(ptScreenX, ptScreenY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#f1f5f9';
    ctx.font = '12px sans-serif';
    ctx.fillText(`v = (${testPoint[0]}, ${testPoint[1]})`, ptScreenX + 10, ptScreenY - 10);
  }, [a, b, testPoint, evalVal]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const originX = canvas.width / 2;
    const originY = canvas.height / 2;
    const scale = 36;
    const worldX = Number(((clickX - originX) / scale).toFixed(1));
    const worldY = Number(((originY - clickY) / scale).toFixed(1));
    setTestPoint([worldX, worldY]);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
            Interactive 2D: Linear Functionals & Level Sets (Hyperplanes)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            <MathRenderer content="A linear functional $f \in V^*$ maps each vector to a scalar. Geometrically, $f$ is viewed as parallel contour lines. $\ker(f)$ is the line through the origin where $f(\vec{v}) = 0$. Click anywhere to test any vector!" />
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg border text-xs font-semibold bg-purple-950/40 border-purple-500 text-purple-300">
          <MathRenderer content={`Evaluation: $f(\\vec{v}) = ${evalVal.toFixed(2)}$`} inline />
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex justify-center">
        <canvas
          ref={canvasRef}
          width={560}
          height={320}
          onClick={handleCanvasClick}
          className="cursor-crosshair max-w-full block"
          title="Click to place test vector"
        />
        <div className="absolute top-2 left-3 text-[11px] text-slate-400 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
          Click canvas to evaluate $f(v)$ at that point
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
        <div>
          <span className="font-semibold text-slate-300 block mb-1">Functional Coefficients $f(x, y) = ax + by$:</span>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>$a$: <strong className="text-amber-400">{a}</strong></span>
              </div>
              <input type="range" min="-4" max="4" step="0.5" value={a} onChange={(e) => setA(parseFloat(e.target.value))} className="w-full accent-amber-500" />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>$b$: <strong className="text-amber-400">{b}</strong></span>
              </div>
              <input type="range" min="-4" max="4" step="0.5" value={b} onChange={(e) => setB(parseFloat(e.target.value))} className="w-full accent-amber-500" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <span className="font-semibold text-slate-300 block">Geometric Interpretation:</span>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            The green line is the <strong>Kernel (Null space)</strong>: <MathRenderer content="$\ker(f) = \{ (x, y) \mid ax + by = 0 \}$" inline />. It has codimension 1 (dimension $2-1=1$). The amber arrow is the normal gradient vector $(a, b)^T$. Moving in the direction of $(a, b)^T$ increases the value of $f$.
          </p>
        </div>
      </div>
    </div>
  );
};
