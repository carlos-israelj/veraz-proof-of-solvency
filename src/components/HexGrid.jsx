/**
 * Hexagonal Grid Overlay
 * Subtle geometric pattern for cryptographic aesthetic
 */
export default function HexGrid({ opacity = 0.05 }) {
  return (
    <div className="hex-grid">
      <style jsx>{`
        .hex-grid {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          opacity: ${opacity};
          background-image:
            linear-gradient(30deg, transparent 48%, var(--emerald-electric) 49%, var(--emerald-electric) 51%, transparent 52%),
            linear-gradient(150deg, transparent 48%, var(--emerald-electric) 49%, var(--emerald-electric) 51%, transparent 52%),
            linear-gradient(270deg, transparent 48%, var(--emerald-electric) 49%, var(--emerald-electric) 51%, transparent 52%);
          background-size: 60px 104px;
          background-position: 0 0, 30px 52px, 30px 52px;
          animation: hexShift 20s linear infinite;
        }

        @keyframes hexShift {
          0% {
            background-position: 0 0, 30px 52px, 30px 52px;
          }
          100% {
            background-position: 60px 104px, 90px 156px, 90px 156px;
          }
        }
      `}</style>
    </div>
  );
}
