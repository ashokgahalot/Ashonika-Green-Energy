import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  maxLife: number;
  life: number;
  rotation: number;
  rotSpeed: number;
}

export default function CursorFollowerArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const mouseRef = useRef<Point>({ x: -100, y: -100 });
  const trailRef = useRef<Point[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);

  useEffect(() => {
    // Disable on touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      const prevX = mouseRef.current.x;
      const prevY = mouseRef.current.y;
      
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Initialize trail if first movement
      if (prevX === -100) {
        trailRef.current = Array(15).fill({ x: e.clientX, y: e.clientY });
        return;
      }

      // Spawn beautiful mini star sparkles when the cursor actively moves
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Spawn density proportional to movement distance
      const spawnCount = Math.min(Math.floor(distance / 6) + 1, 6);

      for (let i = 0; i < spawnCount; i++) {
        const ratio = i / spawnCount;
        // Interpolate points between previous and current for complete line sparkle coverage
        const spawnX = prevX + deltaX * ratio + (Math.random() - 0.5) * 4;
        const spawnY = prevY + deltaY * ratio + (Math.random() - 0.5) * 4;

        // Elegant futuristic theme palette: Emerald green, golden solar amber, light mint
        const colors = [
          'rgba(16, 185, 129, 0.95)', // emerald-500
          'rgba(52, 211, 153, 0.95)', // emerald-400
          'rgba(245, 158, 11, 0.95)',  // amber-500
          'rgba(251, 191, 36, 0.95)',  // amber-400
          'rgba(255, 255, 255, 1.0)',   // pure white core
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Random vector drift speeds
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.3;

        sparklesRef.current.push({
          x: spawnX,
          y: spawnY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.2, // slight upward float
          size: Math.random() * 5 + 3,
          opacity: 1.0,
          color,
          maxLife: Math.random() * 25 + 15,
          life: 0,
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    const handleMouseLeave = () => {
      // Fade out slowly
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Dynamic animation frame loop
    let animationId: number;

    const draw4PointStar = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
      color: string,
      rotation: number,
      opacity: number
    ) => {
      c.save();
      c.translate(cx, cy);
      c.rotate(rotation);
      c.globalAlpha = opacity;
      c.fillStyle = color;
      c.beginPath();
      
      // Draw standard beautiful high-end four-point sparkle shape
      c.moveTo(0, -size);
      c.quadraticCurveTo(0, 0, size, 0);
      c.quadraticCurveTo(0, 0, 0, size);
      c.quadraticCurveTo(0, 0, -size, 0);
      c.quadraticCurveTo(0, 0, 0, -size);
      
      c.fill();
      c.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update the sparkling trail coordinates
      const trail = trailRef.current;
      const target = mouseRef.current;

      if (target.x !== -100 && target.y !== -100) {
        if (trail.length === 0) {
          trailRef.current = Array(20).fill({ x: target.x, y: target.y });
        } else {
          // Push current, pop oldest
          trail.unshift({ x: target.x, y: target.y });
          if (trail.length > 22) {
            trail.pop();
          }
        }
      }

      // 2. Render trailing neon line with gradient transition
      if (trail.length > 1) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);

        for (let i = 1; i < trail.length - 1; i++) {
          // Smooth bezier control points instead of rigid lines for premium fluidity
          const xc = (trail[i].x + trail[i + 1].x) / 2;
          const yc = (trail[i].y + trail[i + 1].y) / 2;
          ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        }

        // Tapering glow lines setup
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Outer ambient glow ribbon
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
        ctx.lineWidth = 12;
        ctx.stroke();

        // Inner sharp laser core trail (gradient-colored emerald to amber)
        const gradient = ctx.createLinearGradient(
          trail[0].x, 
          trail[0].y, 
          trail[trail.length - 1].x, 
          trail[trail.length - 1].y
        );
        gradient.addColorStop(0, 'rgba(52, 211, 153, 0.85)'); // bright mint
        gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.5)'); // clean emerald
        gradient.addColorStop(1, 'rgba(245, 158, 11, 0.0)');  // amber fadeout

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Update and draw existing particles (solar energy sparkles)
      const sparkles = sparklesRef.current;
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.life += 1;
        
        // Apply velocity with air friction resistance
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.93;
        s.vy *= 0.93;
        s.rotation += s.rotSpeed;

        // Fade intensity based on remaining life
        s.opacity = 1.0 - (s.life / s.maxLife);

        if (s.life >= s.maxLife) {
          sparkles.splice(i, 1);
          continue;
        }

        // Draw individual star sparkle with ambient neon blur effects
        draw4PointStar(ctx, s.x, s.y, s.size * s.opacity, s.color, s.rotation, s.opacity);
        
        // Add a secondary cross flare lines for top-tier premium highlights
        if (s.size > 5 && s.opacity > 0.4) {
          ctx.save();
          ctx.strokeStyle = s.color;
          ctx.globalAlpha = s.opacity * 0.4;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(s.x - s.size * 1.5, s.y);
          ctx.lineTo(s.x + s.size * 1.5, s.y);
          ctx.moveTo(s.x, s.y - s.size * 1.5);
          ctx.lineTo(s.x, s.y + s.size * 1.5);
          ctx.stroke();
          ctx.restore();
        }
      }

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] bg-transparent overflow-hidden"
    />
  );
}
