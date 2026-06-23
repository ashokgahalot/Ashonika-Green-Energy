import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  originalX: number;
  originalY: number;
}

interface InteractiveBackgroundParticlesProps {
  theme: 'light' | 'dark';
}

export default function InteractiveBackgroundParticles({ theme }: InteractiveBackgroundParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 70; // Perfect count: rich enough to be visible, low enough for 120 FPS
    const connectionDistance = 120;
    const mouseInfluenceRadius = 150;

    // Handle high DPI screens perfectly
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Re-initialize or adjust particles to fit the new viewport
      initParticles(width, height);
    };

    const initParticles = (width: number, height: number) => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 1.5 + 1; // subtle, small, refined points
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.4, // slow elegant drift
          vy: (Math.random() - 0.5) * 0.4,
          radius,
          baseRadius: radius,
          originalX: x,
          originalY: y
        });
      }
    };

    // Initialize
    resizeCanvas();

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Animation loop
    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clear the canvas cleanly
      ctx.clearRect(0, 0, width, height);

      // Lerp mouse coordinates for butter-smooth movement lag reduction
      const mouse = mouseRef.current;
      if (mouse.active) {
        if (mouse.x === -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.08;
          mouse.y += (mouse.targetY - mouse.y) * 0.08;
        }
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // Theme-specific colors
      // Emerald: rgb(16, 185, 129), Amber: rgb(245, 158, 11)
      const isDark = theme === 'dark';
      const particleColor = isDark ? 'rgba(52, 211, 153, 0.3)' : 'rgba(16, 185, 129, 0.2)';
      const connectionColorBase = isDark ? '52, 211, 153' : '16, 185, 129';
      const secondaryColorBase = isDark ? '245, 158, 11' : '217, 119, 6'; // amber accents

      // Update and draw particles
      particles.forEach((p, index) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen boundaries smoothly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction (Subtle repulsion/attraction & size changes)
        let sizeRatio = 1;
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseInfluenceRadius) {
            // Push particles subtly away from cursor
            const force = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * force * 1.5;
            p.y -= Math.sin(angle) * force * 1.5;

            // Make particles closer to the mouse larger and slightly glowy
            sizeRatio = 1 + force * 1.2;
          }
        }

        // Pulse effect based on time/index to make them look alive
        const pulse = Math.sin(Date.now() * 0.001 + index) * 0.2 + 0.95;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius * sizeRatio * pulse, 0, Math.PI * 2);
        // Alternate particle color slightly (emerald / amber) to match Ashonika brand palette
        if (index % 7 === 0) {
          ctx.fillStyle = isDark ? `rgba(${secondaryColorBase}, 0.25)` : `rgba(${secondaryColorBase}, 0.15)`;
        } else {
          ctx.fillStyle = particleColor;
        }
        ctx.fill();

        // Check distance to other particles for connecting lines
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            // Faint, clean, luxury line connection
            const alpha = (1 - dist / connectionDistance) * (isDark ? 0.08 : 0.045);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Highlight connections that are also close to the pointer
            let isNearMouse = false;
            if (mouse.active) {
              const mx = (p.x + p2.x) / 2;
              const my = (p.y + p2.y) / 2;
              const mdx = mouse.x - mx;
              const mdy = mouse.y - my;
              const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
              if (mdist < mouseInfluenceRadius * 0.8) {
                isNearMouse = true;
              }
            }

            if (isNearMouse) {
              ctx.strokeStyle = `rgba(${connectionColorBase}, ${alpha * 2.2})`;
              ctx.lineWidth = 0.8;
            } else {
              ctx.strokeStyle = `rgba(${connectionColorBase}, ${alpha})`;
              ctx.lineWidth = 0.4;
            }
            ctx.stroke();
          }
        }

        // Draw faint line connecting mouse to particles
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseInfluenceRadius) {
            const alpha = (1 - dist / mouseInfluenceRadius) * (isDark ? 0.12 : 0.07);
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = index % 5 === 0 
              ? `rgba(${secondaryColorBase}, ${alpha})`
              : `rgba(${connectionColorBase}, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      id="bg-interactive-particles"
      className="fixed inset-0 pointer-events-none select-none transition-opacity duration-500"
      style={{
        zIndex: 1, // Place above deep background but below components & text
        opacity: 0.85
      }}
    />
  );
}
