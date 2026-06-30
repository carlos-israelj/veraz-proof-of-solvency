import { useEffect, useRef, useState } from 'react';

/**
 * Shield Construction Animation
 * Particles assemble into a cryptographic shield when proof is verified
 */
export default function ShieldAnimation({ onComplete }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('assembling'); // assembling -> complete
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const size = 300;
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    const particles = [];
    const shieldPoints = [];

    // Generate shield shape points (hexagonal shield)
    const sides = 6;
    const radius = 80;
    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
      shieldPoints.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      });
    }

    // Create particles
    class Particle {
      constructor(targetX, targetY) {
        this.currentX = Math.random() * size;
        this.currentY = Math.random() * size;
        this.targetX = targetX;
        this.targetY = targetY;
        this.radius = Math.random() * 2 + 1;
        this.speed = Math.random() * 0.05 + 0.02;
        this.arrived = false;
      }

      update() {
        if (this.arrived) return;

        const dx = this.targetX - this.currentX;
        const dy = this.targetY - this.currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 2) {
          this.arrived = true;
          return;
        }

        this.currentX += dx * this.speed;
        this.currentY += dy * this.speed;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.currentX, this.currentY, this.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          this.currentX, this.currentY, 0,
          this.currentX, this.currentY, this.radius * 2
        );
        gradient.addColorStop(0, 'rgba(0, 255, 136, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Create particles for shield outline
    const particlesPerSide = 15;
    shieldPoints.forEach((point, i) => {
      const nextPoint = shieldPoints[(i + 1) % shieldPoints.length];
      for (let j = 0; j < particlesPerSide; j++) {
        const t = j / particlesPerSide;
        const x = point.x + (nextPoint.x - point.x) * t;
        const y = point.y + (nextPoint.y - point.y) * t;
        particles.push(new Particle(x, y));
      }
    });

    // Add center particles for fill effect
    const fillRadius = 60;
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * fillRadius;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      particles.push(new Particle(x, y));
    }

    let frame = 0;
    const maxFrames = 120;

    function animate() {
      ctx.clearRect(0, 0, size, size);

      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw shield outline when particles arrive
      if (frame > 30) {
        ctx.beginPath();
        shieldPoints.forEach((point, i) => {
          if (i === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        });
        ctx.closePath();
        const opacity = Math.min((frame - 30) / 30, 1);
        ctx.strokeStyle = `rgba(0, 255, 136, ${opacity * 0.6})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Glow effect
        ctx.shadowColor = 'rgba(0, 255, 136, 0.8)';
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw center icon
      if (frame > 60) {
        const opacity = Math.min((frame - 60) / 20, 1);
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(0, 255, 136, ${opacity})`;
        ctx.fillText('✓', centerX, centerY);
      }

      frame++;

      if (frame < maxFrames) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setPhase('complete');
        if (onComplete) {
          setTimeout(onComplete, 500);
        }
      }
    }

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete]);

  return (
    <div className="shield-animation">
      <canvas ref={canvasRef} />
      <style jsx>{`
        .shield-animation {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: var(--space-xl) 0;
        }

        canvas {
          filter: drop-shadow(0 0 20px rgba(0, 255, 136, 0.5));
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
