/**
 * Animated Text Reveal
 * Text appears with a sliding mask effect
 */
export default function RevealText({ children, delay = 0, className = '' }) {
  return (
    <span
      className={`reveal-text ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
      <style jsx>{`
        .reveal-text {
          display: inline-block;
          animation: textReveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
          clip-path: inset(0 100% 0 0);
        }

        @keyframes textReveal {
          0% {
            clip-path: inset(0 100% 0 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>
    </span>
  );
}
