/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface BackgroundProps {
  type: 'about' | 'services' | 'industries' | 'calculator' | 'whychoose' | 'projects' | 'process' | 'testimonials' | 'blog' | 'contact';
}

export default function SectionBackground3D({ type }: BackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current || !isHoveredRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      // Store normal coordinates around center
      mousePosRef.current = {
        x: (e.clientX - rect.left - rect.width / 2) / (rect.width / 2),
        y: (e.clientY - rect.top - rect.height / 2) / (rect.height / 2),
      };
    };

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      mousePosRef.current = { x: 0, y: 0 };
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    resizeCanvas();

    let time = 0;
    let autoRotX = 0;
    let autoRotY = 0;

    // Helper: 3D point projection function
    const project = (x: number, y: number, z: number, rx: number, ry: number, cx: number, cy: number, fov = 350) => {
      // Rotate around Y
      let x1 = x * Math.cos(ry) - z * Math.sin(ry);
      let z1 = x * Math.sin(ry) + z * Math.cos(ry);
      
      // Rotate around X
      let y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
      let z2 = y * Math.sin(rx) + z1 * Math.cos(rx);

      // Perspective scale factor
      const zoom = fov / (fov + z2);
      return {
        x: cx + x1 * zoom,
        y: cy + y2 * zoom,
        z: z2,
        scale: zoom,
      };
    };

    // -----------------------------------------------------------------
    // Section Seed Instantiations
    // -----------------------------------------------------------------

    // About plexus nodes
    const aboutNodes = Array.from({ length: 42 }, () => ({
      x: (Math.random() - 0.5) * 450,
      y: (Math.random() - 0.5) * 350,
      z: (Math.random() - 0.5) * 300,
      size: Math.random() * 3 + 1,
      color: Math.random() > 0.45 ? '#10B981' : '#FFC107',
    }));

    // Services cuboids
    const servicesSlabs = Array.from({ length: 8 }, (_, i) => {
      const angle = (i * Math.PI * 2) / 8;
      return {
        cx: Math.cos(angle) * 180,
        cy: (Math.random() - 0.5) * 120,
        cz: Math.sin(angle) * 180,
        w: 45,
        h: 12,
        d: 35,
        rotSpX: (Math.random() - 0.5) * 0.015,
        rotSpY: (Math.random() - 0.5) * 0.015 + 0.005,
        rotSpZ: (Math.random() - 0.5) * 0.01,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        rz: Math.random() * Math.PI,
      };
    });

    // Industries 3D Geodesic Sphere Nodes
    const indSphereNodes = Array.from({ length: 45 }, (_, i) => {
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / 45);
      const theta = Math.PI * (1 + 5 ** 0.5) * k;
      const r = 160;
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        size: Math.random() * 2.5 + 1.5,
        color: i % 3 === 0 ? '#10B981' : i % 3 === 1 ? '#FFC107' : '#0EA5E9',
        pulseSpeed: 1 + Math.random() * 1.5,
        pulseOffset: Math.random() * Math.PI * 2,
      };
    });

    // Calculator flying terrain nodes
    const calcTerrainGridX = 14;
    const calcTerrainGridZ = 12;
    const calcNodes: { x: number; z: number; phase: number }[] = [];
    for (let i = 0; i < calcTerrainGridX; i++) {
      for (let j = 0; j < calcTerrainGridZ; j++) {
        calcNodes.push({
          x: (i - (calcTerrainGridX - 1) / 2) * 60,
          z: (j - (calcTerrainGridZ - 1) / 2) * 60,
          phase: (i * 0.4) + (j * 0.5)
        });
      }
    }

    // Projects octahedrons
    const projPrisms = Array.from({ length: 5 }, (_, i) => ({
      x: (i - 2) * 160,
      y: (i % 2 === 0 ? -40 : 40) + (Math.sin(i) * 20),
      z: Math.cos(i) * 60,
      size: 35,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotSp: 0.006 + (i * 0.003),
    }));

    // Process spiral helix
    const processFibers = Array.from({ length: 65 }, (_, i) => ({
      step: i,
      color: i % 2 === 0 ? 'rgba(52, 211, 153, 0.7)' : 'rgba(251, 191, 36, 0.7)',
    }));

    // Testimonials auroral concentric ripple rings
    const testRingCount = 4;

    // Contact communication vectors
    const contactLinks = Array.from({ length: 15 }, () => ({
      x1: (Math.random() - 0.5) * 500,
      y1: (Math.random() - 0.5) * 400,
      z1: (Math.random() - 0.5) * 350,
      x2: (Math.random() - 0.5) * 500,
      y2: (Math.random() - 0.5) * 400,
      z2: (Math.random() - 0.5) * 350,
      pulsePos: Math.random(),
      speed: 0.005 + Math.random() * 0.007,
    }));

    // Main animation loop
    const render = () => {
      if (!ctx || !canvas) return;

      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Centers for local projections
      const cx = width / 2;
      const cy = height / 2;

      // Calculate responsive display scale factor based on viewport size for responsive layout bounds
      const displayScale = Math.min(1.0, Math.max(0.48, width / 768));

      // Smooth mouse rotation offsets
      const targetMouseX = mousePosRef.current.x * 0.18;
      const targetMouseY = -mousePosRef.current.y * 0.18;
      autoRotX += (targetMouseY - autoRotX) * 0.08 + 0.001;
      autoRotY += (targetMouseX - autoRotY) * 0.08 + 0.001;

      // Add a subtle styling ambient background light in standard canvas itself
      const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(width, height) * 0.75);
      
      switch (type) {
        // =================================================================
        // About Background Plexus Cluster
        // =================================================================
        case 'about': {
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.03)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);

          // Render projected plexus
          const projected = aboutNodes.map(n => {
            const p = project(n.x, n.y, n.z, autoRotX * 0.5, autoRotY + time * 0.1, cx, cy, 400);
            return { ...p, size: n.size, color: n.color };
          });

          // Draw connections
          ctx.lineWidth = 0.5;
          for (let i = 0; i < projected.length; i++) {
            for (let j = i + 1; j < projected.length; j++) {
              const dx = projected[i].x - projected[j].x;
              const dy = projected[i].y - projected[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 115) {
                const alpha = (1 - dist / 115) * 0.17 * (projected[i].scale + projected[j].scale) / 2;
                ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
                ctx.beginPath();
                ctx.moveTo(projected[i].x, projected[i].y);
                ctx.lineTo(projected[j].x, projected[j].y);
                ctx.stroke();
              }
            }
          }

          // Draw the projected anchor points
          projected.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0.1, Math.min(1, p.scale * 0.85));
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.scale, 0, Math.PI * 2);
            ctx.fill();
            
            // Outer glow ring
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.arc(p.x, p.y, (p.size * 3) * p.scale, 0, Math.PI * 2);
            ctx.stroke();
          });
          ctx.globalAlpha = 1.0;
          break;
        }

        // =================================================================
        // Services Background Rotating Panel Slabs
        // =================================================================
        case 'services': {
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.03)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);

          // For each modular slab
          servicesSlabs.forEach((slab) => {
            slab.rx += slab.rotSpX;
            slab.ry += slab.rotSpY;

            // Define vertices of 3D box centered at slab.cx, slab.cy, slab.cz
            const hw = (slab.w / 2) * displayScale;
            const hh = (slab.h / 2) * displayScale;
            const hd = (slab.d / 2) * displayScale;

            const baseVertices = [
              { x: -hw, y: -hh, z: -hd },
              { x: hw, y: -hh, z: -hd },
              { x: hw, y: hh, z: -hd },
              { x: -hw, y: hh, z: -hd },
              { x: -hw, y: -hh, z: hd },
              { x: hw, y: -hh, z: hd },
              { x: hw, y: hh, z: hd },
              { x: -hw, y: hh, z: hd },
            ];

            // Project vertices with rotation of slab + world rotation
            const pVertices = baseVertices.map(v => {
              // Rotate around local center
              let lx = v.x * Math.cos(slab.ry) - v.z * Math.sin(slab.ry);
              let lz = v.x * Math.sin(slab.ry) + v.z * Math.cos(slab.ry);
              let ly = v.y * Math.cos(slab.rx) - lz * Math.sin(slab.rx);
              lz = v.y * Math.sin(slab.rx) + lz * Math.cos(slab.rx);

              // Translate to slab orbit position (scaled for device width responsiveness)
              const wx = lx + slab.cx * displayScale;
              const wy = ly + slab.cy * displayScale;
              const wz = lz + slab.cz * displayScale;

              // Project with world rotation
              return project(wx, wy, wz, autoRotX * 0.3, autoRotY + time * 0.05, cx, cy, 450);
            });

            // Draw wireframe faces
            const faces = [
              [0, 1, 2, 3], // Back
              [4, 5, 6, 7], // Front
              [0, 1, 5, 4], // Top
              [2, 3, 7, 6], // Bottom
              [0, 3, 7, 4], // Left
              [1, 2, 6, 5], // Right
            ];

            const sortedFaces = faces.map(indices => {
              const avgZ = (pVertices[indices[0]].z + pVertices[indices[1]].z + pVertices[indices[2]].z + pVertices[indices[3]].z) / 4;
              return { indices, avgZ };
            }).sort((a, b) => b.avgZ - a.avgZ); // Draw back to front

            sortedFaces.forEach(f => {
              ctx.beginPath();
              ctx.moveTo(pVertices[f.indices[0]].x, pVertices[f.indices[0]].y);
              for (let idx = 1; idx < 4; idx++) {
                ctx.lineTo(pVertices[f.indices[idx]].x, pVertices[f.indices[idx]].y);
              }
              ctx.closePath();

              // Translucent tech-blue fill
              const faceAlpha = Math.max(0.02, Math.min(0.12, 100 / (f.avgZ + 100)));
              ctx.fillStyle = `rgba(16, 185, 129, ${faceAlpha})`;
              ctx.fill();

              // Neon line edges
              ctx.lineWidth = 0.85;
              ctx.strokeStyle = `rgba(16, 185, 129, ${faceAlpha * 3.5})`;
              ctx.stroke();
            });
          });
          break;
        }

        // =================================================================
        // Industries 3D Geodesic Sphere Network
        // =================================================================
        case 'industries': {
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.03)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);

          const rxVal = autoRotX * 0.5 + 0.2; // Tilt slightly
          const ryVal = autoRotY + time * 0.05; // Continuously rotate Y

          // Project sphere nodes
          const projectedNodes = indSphereNodes.map(n => {
            // Apply scale for responsive layout
            const scaledRadius = 160 * displayScale;
            // Recalculate coordinates with displayScale
            const px = (n.x / 160) * scaledRadius;
            const py = (n.y / 160) * scaledRadius;
            const pz = (n.z / 160) * scaledRadius;
            const p = project(px, py, pz, rxVal, ryVal, cx, cy, 400);
            return {
              ...p,
              size: n.size,
              color: n.color,
              x3d: px,
              y3d: py,
              z3d: pz,
              pulse: Math.sin(time * n.pulseSpeed + n.pulseOffset) * 0.4 + 0.6
            };
          });

          // Draw connections between nodes that are close in 3D distance
          ctx.lineWidth = 0.5;
          for (let i = 0; i < projectedNodes.length; i++) {
            const p1 = projectedNodes[i];
            for (let j = i + 1; j < projectedNodes.length; j++) {
              const p2 = projectedNodes[j];
              const dx = p1.x3d - p2.x3d;
              const dy = p1.y3d - p2.y3d;
              const dz = p1.z3d - p2.z3d;
              const dist3d = Math.sqrt(dx * dx + dy * dy + dz * dz);

              // Connect nodes within a certain 3D threshold 
              const connectThreshold = 125 * displayScale;
              if (dist3d < connectThreshold) {
                const alpha = (1 - dist3d / connectThreshold) * 0.15 * ((p1.scale + p2.scale) / 2);
                ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();

                // Occasional animated energy pulse along connections
                if ((i + j) % 7 === 0) {
                  const pulsePos = (time * 0.5 + (i * 0.1)) % 1;
                  const pulseX = p1.x + (p2.x - p1.x) * pulsePos;
                  const pulseY = p1.y + (p2.y - p1.y) * pulsePos;
                  ctx.fillStyle = '#FFC107';
                  ctx.globalAlpha = alpha * 3;
                  ctx.beginPath();
                  ctx.arc(pulseX, pulseY, 1.5 * displayScale, 0, Math.PI * 2);
                  ctx.fill();
                  ctx.globalAlpha = 1.0;
                }
              }
            }
          }

          // Draw orbital rings around the sphere
          const ringRadii = [180 * displayScale, 190 * displayScale];
          ringRadii.forEach((rad, ringIdx) => {
            ctx.beginPath();
            const ringRotValX = rxVal + (ringIdx === 0 ? 0.3 : -0.3);
            const ringRotValY = ryVal * (ringIdx === 0 ? 1.5 : -1.2);
            for (let a = 0; a <= Math.PI * 2; a += 0.08) {
              const px = Math.cos(a) * rad;
              const pz = Math.sin(a) * rad;
              const coord = project(px, 0, pz, ringRotValX, ringRotValY, cx, cy, 400);
              if (a === 0) ctx.moveTo(coord.x, coord.y);
              else ctx.lineTo(coord.x, coord.y);
            }
            ctx.closePath();
            ctx.lineWidth = 0.6;
            ctx.strokeStyle = ringIdx === 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(14, 165, 233, 0.08)';
            ctx.stroke();

            // Sockets / Satellites on orbital rings
            const satAngle = time * 0.8 * (ringIdx === 0 ? 1 : -0.7) + ringIdx;
            const satX = Math.cos(satAngle) * rad;
            const satZ = Math.sin(satAngle) * rad;
            const satCoord = project(satX, 0, satZ, ringRotValX, ringRotValY, cx, cy, 400);

            ctx.fillStyle = ringIdx === 0 ? '#10B981' : '#0EA5E9';
            ctx.beginPath();
            ctx.arc(satCoord.x, satCoord.y, 4 * satCoord.scale * displayScale, 0, Math.PI * 2);
            ctx.fill();
          });

          // Sort and paint nodes front-to-back so closer ones paint on top (by depth value)
          const sortedNodes = [...projectedNodes].sort((a, b) => b.z - a.z);

          sortedNodes.forEach(p => {
            ctx.globalAlpha = Math.max(0.1, Math.min(1.0, p.scale * p.pulse));
            ctx.fillStyle = p.color;

            // Draw center point
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.scale * displayScale, 0, Math.PI * 2);
            ctx.fill();

            // Draw delicate outer halo for closer nodes
            if (p.z < 80) {
              ctx.strokeStyle = p.color;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.arc(p.x, p.y, (p.size * 3) * p.scale * displayScale, 0, Math.PI * 2);
              ctx.stroke();
            }
          });

          ctx.globalAlpha = 1.0;
          break;
        }

        // =================================================================
        // SolarCalculator Terrain mesh wavy graph surface
        // =================================================================
        case 'calculator': {
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.04)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);

          const rxVal = 0.8; // Set strong tilt for depth mesh
          const ryVal = autoRotY * 0.4 + time * 0.04;

          const projectedMesh = calcNodes.map(n => {
            const h = Math.sin(time * 0.85 + n.phase) * 25 + Math.cos(time * 0.5 + n.phase * 0.5) * 15;
            return project(n.x, h - 50, n.z, rxVal, ryVal, cx, cy, 400);
          });

          // Draw the wireframe grid sheets lines connecting adjacent nodes
          ctx.lineWidth = 0.65;
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.16)';

          for (let i = 0; i < calcTerrainGridX; i++) {
            for (let j = 0; j < calcTerrainGridZ; j++) {
              const currentIdx = i * calcTerrainGridZ + j;

              // Connect to next column
              if (i < calcTerrainGridX - 1) {
                const nextColIdx = (i + 1) * calcTerrainGridZ + j;
                ctx.beginPath();
                ctx.moveTo(projectedMesh[currentIdx].x, projectedMesh[currentIdx].y);
                ctx.lineTo(projectedMesh[nextColIdx].x, projectedMesh[nextColIdx].y);
                ctx.stroke();
              }

              // Connect to next row
              if (j < calcTerrainGridZ - 1) {
                const nextRowIdx = currentIdx + 1;
                ctx.beginPath();
                ctx.moveTo(projectedMesh[currentIdx].x, projectedMesh[currentIdx].y);
                ctx.lineTo(projectedMesh[nextRowIdx].x, projectedMesh[nextRowIdx].y);
                ctx.stroke();
              }
            }
          }

          // Draw neon anchor nodes
          projectedMesh.forEach((p, idx) => {
            if (idx % 3 === 0) {
              const scaleFac = Math.max(0.1, p.scale);
              ctx.fillStyle = idx % 6 === 0 ? '#10B981' : '#FFC107';
              ctx.globalAlpha = Math.max(0.1, Math.min(0.9, scaleFac * 0.75));
              ctx.beginPath();
              ctx.arc(p.x, p.y, 2 * scaleFac, 0, Math.PI * 2);
              ctx.fill();
            }
          });
          ctx.globalAlpha = 1.0;
          break;
        }

        // =================================================================
        // WhyChoose Concentric Solar Tech Orbits
        // =================================================================
        case 'whychoose': {
          gradient.addColorStop(0, 'rgba(251, 191, 36, 0.03)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);

          const rxVal = 0.9;
          const ryVal = autoRotY * 0.4;

          // Draw 4 circular paths
          for (let rIdx = 0; rIdx < 4; rIdx++) {
            const rad = 100 + rIdx * 65;
            ctx.beginPath();
            
            // Draw circle as multiple segments
            for (let theta = 0; theta <= Math.PI * 2; theta += 0.1) {
              const px = Math.cos(theta) * rad;
              const pz = Math.sin(theta) * rad;
              const coords = project(px, 0, pz, rxVal, ryVal, cx, cy, 380);
              
              if (theta === 0) ctx.moveTo(coords.x, coords.y);
              else ctx.lineTo(coords.x, coords.y);
            }
            ctx.closePath();
            ctx.lineWidth = 0.55;
            ctx.strokeStyle = `rgba(251, 191, 36, ${0.12 + (rIdx * 0.03)})`;
            ctx.stroke();

            // Track traveling satellites on orbits
            const orbitalSpeed = 0.015 - rIdx * 0.0025;
            const currentAngle = time * 20 * orbitalSpeed + rIdx * (Math.PI / 2);
            
            const px = Math.cos(currentAngle) * rad;
            const pz = Math.sin(currentAngle) * rad;
            const satCoords = project(px, Math.sin(time + rIdx) * 12, pz, rxVal, ryVal, cx, cy, 380);

            // Orbit satellite node glow
            ctx.fillStyle = '#FFC107';
            ctx.beginPath();
            ctx.arc(satCoords.x, satCoords.y, 4 * satCoords.scale, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(satCoords.x, satCoords.y, 10 * satCoords.scale, 0, Math.PI * 2);
            ctx.stroke();
          }
          break;
        }

        // =================================================================
        // Projects Background Spinning Octahedrons/Prisms
        // =================================================================
        case 'projects': {
          gradient.addColorStop(0, 'rgba(14, 165, 233, 0.03)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);

          projPrisms.forEach((prism) => {
            prism.rotX += prism.rotSp;
            prism.rotY += prism.rotSp * 0.8;

            const r = prism.size;
            // Vertices of double-pyramid octahedron
            const baseVertices = [
              { x: 0, y: -r, z: 0 },   // Top tip
              { x: 0, y: r, z: 0 },    // Bottom tip
              { x: -r, y: 0, z: -r },  // Middle vertices
              { x: r, y: 0, z: -r },
              { x: r, y: 0, z: r },
              { x: -r, y: 0, z: r },
            ];

            const pVertices = baseVertices.map(v => {
              // Apply local spin
              let lx = v.x * Math.cos(prism.rotY) - v.z * Math.sin(prism.rotY);
              let lz = v.x * Math.sin(prism.rotY) + v.z * Math.cos(prism.rotY);
              let ly = v.y * Math.cos(prism.rotX) - lz * Math.sin(prism.rotX);
              lz = v.y * Math.sin(prism.rotX) + lz * Math.cos(prism.rotX);

              // Translate to world position
              const wx = lx + prism.x;
              const wy = ly + prism.y;
              const wz = lz + prism.z;

              // Apply general global perspective tilt
              return project(wx, wy, wz, autoRotX * 0.2, autoRotY + time * 0.04, cx, cy, 400);
            });

            // 12 Octahedron edges connectivity matrices
            const edges = [
              [0, 2], [0, 3], [0, 4], [0, 5], // Top pyramid
              [1, 2], [1, 3], [1, 4], [1, 5], // Bottom pyramid
              [2, 3], [3, 4], [4, 5], [5, 2], // Mid-ring
            ];

            ctx.lineWidth = 0.75;
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';

            edges.forEach(edge => {
              ctx.beginPath();
              ctx.moveTo(pVertices[edge[0]].x, pVertices[edge[0]].y);
              ctx.lineTo(pVertices[edge[1]].x, pVertices[edge[1]].y);
              ctx.stroke();
            });

            // Put small glowing balls at top/bottom vertex tips
            ctx.fillStyle = '#0EA5E9';
            [0, 1].forEach((vIdx) => {
              ctx.beginPath();
              ctx.arc(pVertices[vIdx].x, pVertices[vIdx].y, 4 * pVertices[vIdx].scale, 0, Math.PI * 2);
              ctx.fill();
            });
          });
          break;
        }

        // =================================================================
        // Process Double helix or spiral flows
        // =================================================================
        case 'process': {
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.03)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);

          const rxVal = 0.2; // slight horizontal perspective
          const ryVal = autoRotY * 0.5 + time * 0.1;

          // Render spiral fibers
          processFibers.forEach((fiber) => {
            const zDistance = -200 + fiber.step * 7.5;
            const currentAngle = fiber.step * 0.24 + time;
            const helixRadius = 140;

            const px = Math.cos(currentAngle) * helixRadius;
            const py = Math.sin(currentAngle) * helixRadius;

            const p1 = project(px, py, zDistance, rxVal, ryVal, cx, cy, 380);
            
            // Mirror secondary node strand
            const px2 = Math.cos(currentAngle + Math.PI) * helixRadius;
            const py2 = Math.sin(currentAngle + Math.PI) * helixRadius;
            const p2 = project(px2, py2, zDistance, rxVal, ryVal, cx, cy, 380);

            // Connect lines between binary helix elements
            ctx.lineWidth = 0.45;
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.07 * p1.scale})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Sockets dots
            ctx.fillStyle = fiber.color;
            ctx.globalAlpha = Math.max(0.1, Math.min(0.8, p1.scale * 0.65));
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, 2.5 * p1.scale, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p2.x, p2.y, 2.5 * p2.scale, 0, Math.PI * 2);
            ctx.fill();
          });
          ctx.globalAlpha = 1.0;
          break;
        }

        // =================================================================
        // Testimonials Aureole concentric wave lines
        // =================================================================
        case 'testimonials': {
          gradient.addColorStop(0, 'rgba(239, 68, 68, 0.015)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);

          // Render 3D warped soundwave ripples
          for (let r = 0; r < testRingCount; r++) {
            const baseRad = 70 + r * 95;
            ctx.beginPath();
            
            // Build distorted circular curve projecting perspective
            for (let a = 0; a <= Math.PI * 2; a += 0.08) {
              // Wavelength disturbances depending on angle and time
              const offsetFreq = Math.sin(a * 4 - time * 1.5) * 14 * Math.cos(r + time);
              const realRadius = baseRad + offsetFreq;
              
              const px = Math.cos(a) * realRadius;
              const py = Math.sin(a) * realRadius;
              const p = project(px, py, Math.sin(time + r) * 20, 0.5, autoRotY * 0.4, cx, cy, 400);

              if (a === 0) ctx.moveTo(p.x, p.y);
              else ctx.lineTo(p.x, p.y);
            }
            ctx.closePath();
            ctx.lineWidth = 0.85;
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.12 / (r + 1)})`;
            ctx.stroke();
          }
          break;
        }

        // =================================================================
        // Blog Floating Tilted planar panels (Cards)
        // =================================================================
        case 'blog': {
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.02)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);

          const cardCount = 7;
          for (let i = 0; i < cardCount; i++) {
            const rotYOffset = autoRotY * 0.3 + time * 0.08 + (i * Math.PI * 2) / cardCount;
            const orbitX = Math.cos(rotYOffset) * 220;
            const orbitZ = Math.sin(rotYOffset) * 220;
            const orbitY = Math.sin(time + i) * 60;

            // Draw a tilted 3D square (a single card)
            const cw = 44;
            const ch = 28;

            const vCoords = [
              { x: -cw, y: -ch, z: 0 },
              { x: cw, y: -ch, z: 0 },
              { x: cw, y: ch, z: 0 },
              { x: -cw, y: ch, z: 0 },
            ];

            const pVertex = vCoords.map(v => {
              // local card rot
              let zrotVal = time * 0.2 + i;
              let lx = v.x * Math.cos(zrotVal) - v.y * Math.sin(zrotVal);
              let ly = v.x * Math.sin(zrotVal) + v.y * Math.cos(zrotVal);

              const wx = lx + orbitX;
              const wy = ly + orbitY;
              const wz = orbitZ;

              return project(wx, wy, wz, autoRotX * 0.4, autoRotY * 0.3, cx, cy, 400);
            });

            ctx.beginPath();
            ctx.moveTo(pVertex[0].x, pVertex[0].y);
            for (let idx = 1; idx < 4; idx++) {
              ctx.lineTo(pVertex[idx].x, pVertex[idx].y);
            }
            ctx.closePath();

            const avgZ = (pVertex[0].z + pVertex[1].z + pVertex[2].z + pVertex[3].z) / 4;
            const alpha = Math.max(0.01, Math.min(0.18, 120 / (avgZ + 150)));

            ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.fill();
            ctx.lineWidth = 0.7;
            ctx.strokeStyle = `rgba(251, 191, 36, ${alpha * 2})`;
            ctx.stroke();
          }
          break;
        }

        // =================================================================
        // Contact Signal Communication Streams Matrix
        // =================================================================
        case 'contact': {
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.04)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);

          const rxVal = autoRotX * 0.4;
          const ryVal = autoRotY * 0.4 + time * 0.03;

          // Draw floating vectors representing digital handshake connectivity links
          contactLinks.forEach((link) => {
            link.pulsePos += link.speed;
            if (link.pulsePos > 1) {
              link.pulsePos = 0;
            }

            const p1 = project(link.x1, link.y1, link.z1, rxVal, ryVal, cx, cy, 380);
            const p2 = project(link.x2, link.y2, link.z2, rxVal, ryVal, cx, cy, 380);

            // Draw line edge
            ctx.lineWidth = 0.55;
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.06 * p1.scale})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Trace traveling message packet
            const px = link.x1 + (link.x2 - link.x1) * link.pulsePos;
            const py = link.y1 + (link.y2 - link.y1) * link.pulsePos;
            const pz = link.z1 + (link.z2 - link.z1) * link.pulsePos;

            const signalCoords = project(px, py, pz, rxVal, ryVal, cx, cy, 380);
            
            ctx.fillStyle = '#FFC107';
            ctx.globalAlpha = Math.max(0.2, Math.min(0.9, signalCoords.scale));
            ctx.beginPath();
            ctx.arc(signalCoords.x, signalCoords.y, 2.5 * signalCoords.scale, 0, Math.PI * 2);
            ctx.fill();
          });
          ctx.globalAlpha = 1.0;
          break;
        }

        default:
          break;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [type]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-65 md:opacity-80 transition-opacity duration-500"
      />
    </div>
  );
}
