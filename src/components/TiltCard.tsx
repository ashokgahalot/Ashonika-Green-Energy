import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  key?: React.Key;
}

export default function TiltCard({ children, className = '', onClick, id }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Normalize mouse positions on element X and Y [-0.5, 0.5]
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map normalized coordinates to rotations
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  // Spring animations for buttery smooth transitions
  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  // Subtle depth effects: light reflection (glare overlay)
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);
  const glareOpacity = useTransform(
    x,
    [-0.5, 0, 0.5],
    [0.12, 0, 0.12]
  );
  const glareOpacitySpring = useSpring(glareOpacity, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`relative ${className}`}
    >
      {/* 3D dynamic glare layer */}
      <motion.div
        style={{
          background: 'radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.18) 0%, transparent 75%)',
          ['--glare-x' as any]: glareX,
          ['--glare-y' as any]: glareY,
          opacity: glareOpacitySpring,
        }}
        className="absolute inset-0 pointer-events-none z-30 rounded-2xl pointer-events-none"
      />
      
      {/* 3D depth preserve-3d content container */}
      <div style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
}
