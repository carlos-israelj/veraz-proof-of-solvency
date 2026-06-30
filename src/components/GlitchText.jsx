/**
 * Glitch Text Effect
 * Cyberpunk-style text glitching for headers and important elements
 */
export default function GlitchText({ children, active = true, className = '' }) {
  return (
    <span className={`glitch-text ${active ? 'active' : ''} ${className}`} data-text={children}>
      {children}
      <style jsx>{`
        .glitch-text {
          position: relative;
          display: inline-block;
        }

        .glitch-text.active::before,
        .glitch-text.active::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-text.active::before {
          animation: glitch-1 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
          color: rgba(0, 255, 255, 0.8);
          z-index: -1;
        }

        .glitch-text.active::after {
          animation: glitch-2 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
          color: rgba(255, 0, 68, 0.8);
          z-index: -2;
        }

        @keyframes glitch-1 {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes glitch-2 {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(2px, -2px);
          }
          40% {
            transform: translate(2px, 2px);
          }
          60% {
            transform: translate(-2px, -2px);
          }
          80% {
            transform: translate(-2px, 2px);
          }
          100% {
            transform: translate(0);
          }
        }

        /* Trigger glitch on hover */
        .glitch-text:hover::before,
        .glitch-text:hover::after {
          animation-duration: 0.15s;
        }
      `}</style>
    </span>
  );
}
