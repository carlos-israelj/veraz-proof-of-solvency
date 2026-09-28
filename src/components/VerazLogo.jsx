import { useEffect, useState } from 'react';

/**
 * Veraz Logo Component
 *
 * The V monogram symbol: left arm solid (private, opaque), right arm outline (public, transparent).
 * They only meet at the vertex, which is filled with the secondary/solvent green.
 *
 * Variants:
 * - "symbol": Just the V icon
 * - "lockup": V icon + "veraz" wordmark
 * - "mono": Monochrome version (inherits currentColor)
 *
 * Sizes: "sm" (16px), "md" (24px), "lg" (32px), "xl" (48px)
 */

export default function VerazLogo({
  variant = "lockup", // "symbol" | "lockup" | "mono"
  size = "md",        // "sm" | "md" | "lg" | "xl"
  className = "",
  href = "/"
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48
  };

  const iconSize = sizeMap[size] || 24;

  // Symbol SVG paths from brand tokens
  const Symbol = ({ className: symbolClass = "" }) => (
    <svg
      viewBox="0 0 64 64"
      width={iconSize}
      height={iconSize}
      fill="none"
      aria-label="Veraz"
      role="img"
      className={symbolClass}
      style={{ flexShrink: 0 }}
    >
      {/* Private arm (left) - solid */}
      <path
        d="M7 8H17L37 52H27Z"
        fill={variant === "mono" ? "currentColor" : "currentColor"}
      />
      {/* Public arm (right) - outline */}
      <path
        d="M47 8H57L37 52H27Z"
        stroke="currentColor"
        strokeWidth="3.5"
        fill="none"
      />
      {/* Vertex (intersection point) - always green except in mono */}
      <path
        d="M32 41L37 52H27Z"
        fill={variant === "mono" ? "none" : "var(--vz-secondary)"}
        stroke={variant === "mono" ? "currentColor" : "none"}
        strokeWidth={variant === "mono" ? "3.5" : "0"}
      />
    </svg>
  );

  if (variant === "symbol" || variant === "mono") {
    return (
      <a href={href} className={`vz-symbol ${className}`} aria-label="Veraz">
        <Symbol />
      </a>
    );
  }

  // Lockup variant (symbol + wordmark)
  return (
    <a href={href} className={`vz-lockup ${className}`} aria-label="Veraz">
      <Symbol className="vz-symbol" />
      <span className="vz-wordmark">veraz</span>
    </a>
  );
}

/**
 * Animated version with proof verification animation
 * Based on veraz-proof-verified.anim.svg from brand kit
 *
 * Animation sequence (1.8s total):
 * - 0-20%: Private arm fades in
 * - 20-55%: Public arm draws (outline)
 * - 60-78%: Vertex fills with green
 */
export function VerazLogoAnimated({
  verified = false,
  playing = true,
  size = "lg",
  className = ""
}) {
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48
  };

  const iconSize = sizeMap[size] || 32;

  return (
    <div className={`vz-symbol-animated ${className}`} style={{ display: 'inline-block', position: 'relative' }}>
      <svg
        viewBox="0 0 64 64"
        width={iconSize}
        height={iconSize}
        fill="none"
        aria-label="Veraz Proof Verified"
        role="img"
      >
        {/* Private arm (left) - fades in 0-20% */}
        <path
          d="M7 8H17L37 52H27Z"
          fill="currentColor"
          className={playing ? 'anim-private-arm' : ''}
          style={{
            opacity: verified && !playing ? 1 : undefined
          }}
        />
        {/* Public arm (right) - draws 20-55% */}
        <path
          d="M47 8H57L37 52H27Z"
          stroke="currentColor"
          strokeWidth="3.5"
          fill="none"
          className={playing ? 'anim-public-arm' : ''}
          strokeDasharray={verified && !playing ? 'none' : undefined}
        />
        {/* Vertex - fills 60-78% */}
        <path
          d="M32 41L37 52H27Z"
          fill="var(--vz-secondary)"
          className={playing ? 'anim-vertex' : ''}
          style={{
            opacity: verified && !playing ? 1 : undefined,
            filter: verified ? 'drop-shadow(0 0 4px var(--vz-secondary))' : 'none'
          }}
        />
      </svg>

      <style>{`
        .vz-symbol-animated {
          position: relative;
        }

        /* Private arm animation: fade in 0-20% (0-360ms) */
        .anim-private-arm {
          opacity: 0;
          animation: fadeIn 0.36s ease-out forwards;
        }

        /* Public arm animation: stroke draws 20-55% (360ms-990ms) */
        .anim-public-arm {
          stroke-dasharray: 150;
          stroke-dashoffset: 150;
          animation: drawStroke 0.63s ease-out 0.36s forwards;
        }

        /* Vertex animation: fill 60-78% (1080ms-1404ms) */
        .anim-vertex {
          opacity: 0;
          transform-origin: center;
          animation: fillVertex 0.324s ease-out 1.08s forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes drawStroke {
          from { stroke-dashoffset: 150; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes fillVertex {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Glow pulse for verified state */
        .vz-symbol-animated.verified {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 4px var(--vz-secondary));
          }
          50% {
            filter: drop-shadow(0 0 8px var(--vz-secondary));
          }
        }
      `}</style>
    </div>
  );
}
