import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: 'rect' | 'circle' | 'strip';
  rotation: number;
  rotationSpeed: number;
  wobble: number;
  wobbleSpeed: number;
  opacity: number;
  decay: number;
}

interface ConfettiEffectProps {
  active?: boolean;
  duration?: number; // duration in ms
  particleCount?: number;
  onComplete?: () => void;
  className?: string;
}

const BRAND_COLORS = [
  '#A3E635', // Lime accent
  '#84CC16', // Darker lime
  '#0265DC', // NextSoft primary blue
  '#38BDF8', // Sky blue
  '#F59E0B', // Gold
  '#FBBF24', // Amber
  '#10B981', // Emerald
  '#EC4899', // Pink
  '#8B5CF6', // Purple
  '#FFFFFF', // White glint
];

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  active = true,
  duration = 4500,
  particleCount = 120,
  onComplete,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isCancelled = false;

    // Handle high DPI displays
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = (rect.width || window.innerWidth) * dpr;
      canvas.height = (rect.height || window.innerHeight) * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    const particles: Particle[] = [];

    // Helper to spawn a burst of particles from an origin
    const spawnBurst = (originX: number, originY: number, angleDeg: number, spreadDeg: number, count: number) => {
      const minAngle = ((angleDeg - spreadDeg / 2) * Math.PI) / 180;
      const maxAngle = ((angleDeg + spreadDeg / 2) * Math.PI) / 180;

      for (let i = 0; i < count; i++) {
        const angle = minAngle + Math.random() * (maxAngle - minAngle);
        const speed = 7 + Math.random() * 14;
        const color = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
        const shapeRand = Math.random();
        const shape: 'rect' | 'circle' | 'strip' =
          shapeRand < 0.4 ? 'rect' : shapeRand < 0.7 ? 'strip' : 'circle';

        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2, // initial upward lift
          size: shape === 'strip' ? 10 + Math.random() * 6 : 6 + Math.random() * 6,
          color,
          shape,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          wobble: Math.random() * 10,
          wobbleSpeed: 0.05 + Math.random() * 0.1,
          opacity: 1,
          decay: 0.003 + Math.random() * 0.004,
        });
      }
    };

    // Cannon 1: Bottom left shooting up-right (45°-65°)
    spawnBurst(width * 0.08, height * 0.85, -60, 50, Math.floor(particleCount * 0.4));
    // Cannon 2: Bottom right shooting up-left (115°-135°)
    spawnBurst(width * 0.92, height * 0.85, -120, 50, Math.floor(particleCount * 0.4));
    // Center fountain burst from top-mid
    spawnBurst(width * 0.5, height * 0.25, -90, 80, Math.floor(particleCount * 0.2));

    // Staggered secondary burst after 400ms for continuous celebration excitement
    const secondaryBurstTimeout = setTimeout(() => {
      if (isCancelled) return;
      spawnBurst(width * 0.25, height * 0.6, -75, 40, Math.floor(particleCount * 0.2));
      spawnBurst(width * 0.75, height * 0.6, -105, 40, Math.floor(particleCount * 0.2));
    }, 450);

    const startTime = performance.now();

    const render = (now: number) => {
      if (isCancelled) return;

      const elapsed = now - startTime;
      ctx.clearRect(0, 0, width, height);

      let activeParticles = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.opacity <= 0.01) continue;
        activeParticles++;

        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22; // gravity
        p.vx *= 0.985; // air resistance
        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;

        // Apply decay faster after 1.5 seconds
        if (elapsed > 1500) {
          p.opacity -= p.decay * 1.8;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;

        const wobbleX = Math.cos(p.wobble) * 2;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2 + wobbleX, -p.size / 2, p.size, p.size * 0.75);
        } else if (p.shape === 'strip') {
          ctx.fillRect(-p.size * 0.8 + wobbleX, -p.size * 0.2, p.size * 1.6, p.size * 0.4);
        } else {
          ctx.beginPath();
          ctx.arc(wobbleX, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (activeParticles > 0 && elapsed < duration) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        onComplete?.();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isCancelled = true;
      clearTimeout(secondaryBurstTimeout);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [active, duration, particleCount, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-[100] w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};
