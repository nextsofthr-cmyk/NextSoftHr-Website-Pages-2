import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface SuccessCheckmarkProps {
  size?: number;
  triggerConfetti?: boolean;
}

export const SuccessCheckmark: React.FC<SuccessCheckmarkProps> = ({ 
  size = 64, 
  triggerConfetti = true 
}) => {
  useEffect(() => {
    if (triggerConfetti) {
      // Fire a subtle, elegant brand-colored confetti burst
      try {
        confetti({
          particleCount: 55,
          spread: 60,
          origin: { y: 0.55 },
          colors: ['#84CC16', '#A3E635', '#0F2D6B', '#2563EB', '#65A30D'],
          ticks: 200,
          gravity: 0.9,
          scalar: 0.85,
          shapes: ['circle', 'square'],
          disableForReducedMotion: true
        });
      } catch (err) {
        // Safe fallback if canvas is not supported in environment
        console.debug('Confetti canvas trigger skipped:', err);
      }
    }
  }, [triggerConfetti]);

  return (
    <div className="relative flex items-center justify-center mx-auto my-2" style={{ width: size + 24, height: size + 24 }}>
      {/* Outer ambient pulsing halo in brand lemon green */}
      <div 
        className="absolute inset-0 rounded-full bg-lime-400/20 animate-ping pointer-events-none"
        style={{ animationDuration: '2.5s' }}
      ></div>

      {/* Secondary soft glow */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-lime-100 to-emerald-50 border border-lime-300/50 shadow-inner"></div>

      {/* Animated SVG Checkmark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 52 52"
        fill="none"
        className="relative z-10 drop-shadow-sm"
      >
        {/* Circle track */}
        <circle
          cx="26"
          cy="26"
          r="24"
          stroke="#84CC16"
          strokeWidth="3.5"
          className="stroke-lime-500 transition-all duration-700"
          style={{
            strokeDasharray: 150,
            strokeDashoffset: 0,
            animation: 'nextsoft-stroke-circle 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards'
          }}
        />

        {/* Checkmark tick */}
        <path
          d="M15 27.5L22.5 35L37.5 18"
          stroke="#0F2D6B"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 50,
            strokeDashoffset: 0,
            animation: 'nextsoft-stroke-check 0.45s 0.25s cubic-bezier(0.65, 0, 0.45, 1) both'
          }}
        />
      </svg>

      <style>{`
        @keyframes nextsoft-stroke-circle {
          0% {
            stroke-dashoffset: 150;
            transform: rotate(-90deg);
            transform-origin: center;
          }
          100% {
            stroke-dashoffset: 0;
            transform: rotate(0deg);
            transform-origin: center;
          }
        }
        @keyframes nextsoft-stroke-check {
          0% {
            stroke-dashoffset: 50;
            opacity: 0;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
