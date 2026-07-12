/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';

interface InteractiveSceneProps {
  theme?: 'light' | 'dark';
}

export default function InteractiveScene({ theme = 'light' }: InteractiveSceneProps) {
  const themeRef = useRef(theme);
  
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [debugTime, setDebugTime] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Responsive Canvas Sizing with high-DPI scaling
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

    // Environment Objects Setup
    // Layered slow-moving clouds
    const clouds = [
      { x: 100, y: 50, size: 45, speed: 0.12, opacity: 0.25 },
      { x: 350, y: 30, size: 60, speed: 0.08, opacity: 0.20 },
      { x: 600, y: 70, size: 35, speed: 0.15, opacity: 0.30 },
      { x: 850, y: 40, size: 55, speed: 0.06, opacity: 0.18 },
    ];

    // Flying Birds
    const birds = [
      { x: -60, y: 100, speedX: 0.7, speedY: 0.05, size: 6, wingSpeed: 7, baseHeight: 100 },
      { x: -140, y: 80, speedX: 0.8, speedY: -0.03, size: 5, wingSpeed: 8, baseHeight: 80 },
      { x: -220, y: 120, speedX: 0.6, speedY: 0.08, size: 7, wingSpeed: 6, baseHeight: 120 },
    ];

    // Sparks for inverter connection
    const sparks: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; life: number }[] = [];

    let time = 0;

    const draw = () => {
      if (!ctx || !canvas) return;

      time += 0.016; // Approx 60fps clock increment
      
      // Calculate responsive variables
      const isMobile = width < 768;
      
      // Setup anchor positions
      const houseX = isMobile ? width * 0.5 : width * 0.75;
      const groundY = height - 60;
      const houseY = groundY;
      const houseW = isMobile ? 140 : 180;
      const houseH = isMobile ? 120 : 150;

      // 1. Dawn to Bright Day Sunrise cycle (12 seconds transition on load, then gently hovers)
      const sunriseDuration = 12.0; 
      const sunriseProgress = Math.min(1.0, time / sunriseDuration);

      // Camera Slowly Floats - smooth low-frequency cinematic camera shake
      const cameraFloatX = Math.sin(time * 0.35) * 6 + (mousePosRef.current.x - width / 2) * 0.02;
      const cameraFloatY = Math.cos(time * 0.25) * 4 + (mousePosRef.current.y - height / 2) * 0.02;

      // CLEAR & DRAW BACKGROUND (Parallax sky layer - no camera float)
      ctx.clearRect(0, 0, width, height);

      // Dynamic Sky Gradient representing dawn shifting to a gorgeous golden solar day
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (themeRef.current === 'dark') {
        if (sunriseProgress < 1.0) {
          // Blend from Indigo/Orange (Dawn) to Soft Blue/Teal-Gold (Day)
          const dR1 = 15, dG1 = 23, dB1 = 42; // Indigo
          const dR2 = 249, dG2 = 115, dB2 = 22; // Dawn Orange
          
          const bR1 = 12, bG1 = 74, bB1 = 96; // Deep Teal
          const bR2 = 254, bG2 = 243, bB2 = 199; // Gold Amber
          
          const mixR1 = Math.round(dR1 + (bR1 - dR1) * sunriseProgress);
          const mixG1 = Math.round(dG1 + (bG1 - dG1) * sunriseProgress);
          const mixB1 = Math.round(dB1 + (bB1 - dB1) * sunriseProgress);
          
          const mixR2 = Math.round(dR2 + (bR2 - dR2) * sunriseProgress);
          const mixG2 = Math.round(dG2 + (bG2 - dG2) * sunriseProgress);
          const mixB2 = Math.round(dB2 + (bB2 - dB2) * sunriseProgress);

          skyGrad.addColorStop(0, `rgb(${mixR1}, ${mixG1}, ${mixB1})`);
          skyGrad.addColorStop(1, `rgb(${mixR2}, ${mixG2}, ${mixB2})`);
        } else {
          // Full daytime active bright sky colors
          skyGrad.addColorStop(0, '#0c4a60'); // Rich deep teal-sky
          skyGrad.addColorStop(0.7, '#115e59'); // Emerald horizon glow
          skyGrad.addColorStop(1, '#fef3c7'); // Warm gold bottom glow
        }
      } else {
        // Light theme sky
        if (sunriseProgress < 1.0) {
          // Soft dawn transition for light theme
          const dR1 = 254, dG1 = 243, dB1 = 199; // Amber 100
          const dR2 = 255, dG2 = 237, dB2 = 213; // Orange 100
          
          const bR1 = 248, bG1 = 250, bB1 = 252; // Slate 50
          const bR2 = 240, bG2 = 253, bB2 = 244; // Emerald 50
          
          const mixR1 = Math.round(dR1 + (bR1 - dR1) * sunriseProgress);
          const mixG1 = Math.round(dG1 + (bG1 - dG1) * sunriseProgress);
          const mixB1 = Math.round(dB1 + (bB1 - dB1) * sunriseProgress);
          
          const mixR2 = Math.round(dR2 + (bR2 - dR2) * sunriseProgress);
          const mixG2 = Math.round(dG2 + (bG2 - dG2) * sunriseProgress);
          const mixB2 = Math.round(dB2 + (bB2 - dB2) * sunriseProgress);

          skyGrad.addColorStop(0, `rgb(${mixR1}, ${mixG1}, ${mixB1})`);
          skyGrad.addColorStop(1, `rgb(${mixR2}, ${mixG2}, ${mixB2})`);
        } else {
          // Crisp beautiful daytime solar light theme
          skyGrad.addColorStop(0, '#f8fafc'); // Slate 50
          skyGrad.addColorStop(0.6, '#f0fdf4'); // Emerald 50
          skyGrad.addColorStop(1, '#fffbeb'); // Amber 50
        }
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant mountain ranges / Hills (Slight parallax)
      ctx.save();
      ctx.translate(cameraFloatX * 0.2, 0);
      if (themeRef.current === 'dark') {
        ctx.fillStyle = 'rgba(6, 78, 59, 0.4)'; // Distant deep green hills
      } else {
        ctx.fillStyle = 'rgba(16, 185, 129, 0.12)'; // Softer light green hills
      }
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.quadraticCurveTo(width * 0.25, groundY - 140, width * 0.5, groundY - 70);
      ctx.quadraticCurveTo(width * 0.75, groundY - 180, width, groundY);
      ctx.fill();

      // Mid-distance hills
      if (themeRef.current === 'dark') {
        ctx.fillStyle = 'rgba(4, 120, 87, 0.55)';
      } else {
        ctx.fillStyle = 'rgba(52, 211, 153, 0.18)'; // Beautiful pale green hills for light mode
      }
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.quadraticCurveTo(width * 0.15, groundY - 70, width * 0.4, groundY - 40);
      ctx.quadraticCurveTo(width * 0.7, groundY - 100, width, groundY);
      ctx.fill();
      ctx.restore();

      // THE SUN SLOWLY RISES
      // It climbs up the sky, starting from below the horizon to high in the upper-left sky
      const sunStartX = width * 0.3;
      const sunStartY = groundY - 10;
      const sunEndX = isMobile ? width * 0.35 : width * 0.25;
      const sunEndY = height * 0.18;

      const sunX = sunStartX + (sunEndX - sunStartX) * sunriseProgress;
      const sunY = sunStartY + (sunEndY - sunStartY) * sunriseProgress;
      const sunRadius = isMobile ? 22 : 32;

      ctx.save();
      // Sun glow
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, sunRadius * 3);
      sunGlow.addColorStop(0, '#ffffff');
      sunGlow.addColorStop(0.2, '#fef08a'); // Warm bright yellow
      sunGlow.addColorStop(0.5, 'rgba(249, 115, 22, 0.4)'); // Solar Orange
      sunGlow.addColorStop(1, 'rgba(249, 115, 22, 0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius * 3, 0, Math.PI * 2);
      ctx.fill();

      // Inner solid sun
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // DRAW CLOUDS (Parallax clouds)
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      clouds.forEach(cloud => {
        cloud.x += cloud.speed;
        if (cloud.x > width + 100) {
          cloud.x = -120;
        }
        ctx.save();
        ctx.globalAlpha = cloud.opacity + (sunriseProgress * 0.1); // cloud colors brighten during day
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.size * 0.6, cloud.y - cloud.size * 0.3, cloud.size * 0.8, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.size * 1.2, cloud.y, cloud.size * 0.7, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      // DRAW BIRDS FLYING (Parallax birds layer)
      ctx.strokeStyle = '#042f2e';
      ctx.lineWidth = 1.8;
      birds.forEach(bird => {
        bird.x += bird.speedX;
        bird.y = bird.baseHeight + Math.sin(time * 2 + bird.x * 0.01) * 12;
        if (bird.x > width + 100) {
          bird.x = -150;
          bird.y = bird.baseHeight;
        }

        const wingFlap = Math.sin(time * bird.wingSpeed) * bird.size;
        ctx.save();
        ctx.beginPath();
        // Left wing
        ctx.moveTo(bird.x - bird.size, bird.y + wingFlap);
        ctx.quadraticCurveTo(bird.x - bird.size * 0.5, bird.y - bird.size * 0.5, bird.x, bird.y);
        // Right wing
        ctx.quadraticCurveTo(bird.x + bird.size * 0.5, bird.y - bird.size * 0.5, bird.x + bird.size, bird.y + wingFlap);
        ctx.stroke();
        ctx.restore();
      });

      // MAIN FOREGROUND ACTION (Applying camera floating / zoom motion)
      ctx.save();
      ctx.translate(cameraFloatX, cameraFloatY);

      // Light travels across rooftop solar panels: Draw sunrays flowing towards the house roof
      if (sunriseProgress > 0.15) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = 'rgba(253, 224, 71, 0.12)';
        ctx.lineWidth = 1.5;
        
        // Dynamic radiating solar ray lines
        const rayCount = 8;
        const targetRoofX = houseX;
        const targetRoofY = houseY - houseH;
        
        for (let r = 0; r < rayCount; r++) {
          const raySweep = Math.sin(time * 0.5 + r) * 25;
          ctx.beginPath();
          ctx.moveTo(sunX, sunY);
          ctx.lineTo(targetRoofX - 60 + (r * 20) + raySweep, targetRoofY - 30);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Draw the foreground road
      const roadH = 40;
      ctx.fillStyle = '#1e293b'; // Slate dark asphalt
      ctx.fillRect(0, groundY - 15, width, roadH + 15);
      
      // Road markings
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 2;
      ctx.setLineDash([12, 18]);
      ctx.beginPath();
      ctx.moveTo(0, groundY + 10);
      ctx.lineTo(width, groundY + 10);
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      // Road shoulder
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, groundY - 18, width, 3);

      // Draw a solar energy grid distribution power pole on the right margin
      const poleX = isMobile ? width - 25 : houseX + (houseW * 0.9);
      const poleY = groundY - 15;
      
      ctx.save();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      // Main beam vertical
      ctx.beginPath();
      ctx.moveTo(poleX, poleY);
      ctx.lineTo(poleX, poleY - 160);
      ctx.stroke();
      // Horizontal crossbeams
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(poleX - 25, poleY - 150);
      ctx.lineTo(poleX + 25, poleY - 150);
      ctx.moveTo(poleX - 20, poleY - 120);
      ctx.lineTo(poleX + 20, poleY - 120);
      ctx.stroke();
      // Ceramic insulators
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(poleX - 27, poleY - 156, 4, 6);
      ctx.fillRect(poleX + 23, poleY - 156, 4, 6);
      ctx.fillRect(poleX - 22, poleY - 126, 4, 6);
      ctx.fillRect(poleX + 18, poleY - 126, 4, 6);
      ctx.restore();

      // DRAW THE ASHONIKA SMART SOLAR HOUSE
      // House Body
      ctx.save();
      ctx.shadowColor = 'rgba(2, 6, 23, 0.15)';
      ctx.shadowBlur = 12;
      
      const houseGrad = ctx.createLinearGradient(houseX - houseW/2, houseY, houseX + houseW/2, houseY);
      houseGrad.addColorStop(0, '#f8fafc'); // Crisp modern architectural plaster white
      houseGrad.addColorStop(1, '#e2e8f0');
      ctx.fillStyle = houseGrad;
      ctx.fillRect(houseX - houseW/2, houseY - houseH, houseW, houseH);
      ctx.restore();

      // Architectural wood accents & Door
      ctx.fillStyle = '#7c2d12'; // Rich wood panel door
      const doorW = 28;
      const doorH = 50;
      ctx.fillRect(houseX - houseW/4 - doorW/2, houseY - doorH, doorW, doorH);
      // Door handle
      ctx.fillStyle = '#fcd34d';
      ctx.beginPath();
      ctx.arc(houseX - houseW/4 + doorW/2 - 4, houseY - doorH/2, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Modern Glass Windows with indoor light glowing at dawn, turning off at bright daytime
      const windowLightAlpha = Math.max(0, 1.0 - (sunriseProgress * 1.5));
      const winW = 32;
      const winH = 26;
      const drawWindow = (wx: number, wy: number) => {
        ctx.save();
        // Glow effect
        if (windowLightAlpha > 0) {
          ctx.shadowColor = 'rgba(253, 224, 71, 0.7)';
          ctx.shadowBlur = 8;
        }
        // Base window glass
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(wx, wy, winW, winH);
        
        // Golden glowing interior light (dawn)
        ctx.fillStyle = `rgba(253, 224, 71, ${windowLightAlpha * 0.8})`;
        ctx.fillRect(wx, wy, winW, winH);

        // Glass reflection sheen
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.moveTo(wx, wy);
        ctx.lineTo(wx + winW * 0.6, wy);
        ctx.lineTo(wx, wy + winH * 0.6);
        ctx.closePath();
        ctx.fill();

        // Window pane borders
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(wx, wy, winW, winH);
        ctx.beginPath();
        ctx.moveTo(wx + winW/2, wy);
        ctx.lineTo(wx + winW/2, wy + winH);
        ctx.moveTo(wx, wy + winH/2);
        ctx.lineTo(wx + winW, wy + winH/2);
        ctx.stroke();
        ctx.restore();
      };

      drawWindow(houseX + houseW/4 - winW/2, houseY - doorH + 10); // Ground floor right window
      drawWindow(houseX - houseW/4 - winW/2, houseY - houseH + 25); // First floor left window
      drawWindow(houseX + houseW/4 - winW/2, houseY - houseH + 25); // First floor right window

      // Angled Modern Rooftop Construction (Gable/Pitch solar roof)
      // Left side roof pitch starting from wall to apex
      const roofApexX = houseX - houseW * 0.1;
      const roofApexY = houseY - houseH - 45;
      const roofLeftY = houseY - houseH - 5;
      const roofRightY = houseY - houseH - 15;

      ctx.save();
      // Wooden roof beams
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(houseX - houseW/2 - 8, roofLeftY);
      ctx.lineTo(roofApexX, roofApexY);
      ctx.lineTo(houseX + houseW/2 + 8, roofRightY);
      ctx.stroke();
      
      // Inside triangular pediment
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(houseX - houseW/2, houseY - houseH);
      ctx.lineTo(roofApexX, roofApexY + 2);
      ctx.lineTo(houseX + houseW/2, houseY - houseH);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // INTERACTIVE ROOFTOP SOLAR PANELS
      // Angled coordinates matching the left side of pitch roof
      const panelP1 = { x: houseX - houseW * 0.45, y: roofLeftY - 8 };
      const panelP2 = { x: roofApexX - 10, y: roofApexY - 5 };
      const panelW = panelP2.x - panelP1.x;
      const panelH_3d = 12;

      ctx.save();
      // Main dark-blue backing panel frame
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.moveTo(panelP1.x, panelP1.y);
      ctx.lineTo(panelP2.x, panelP2.y);
      ctx.lineTo(panelP2.x + 3, panelP2.y + panelH_3d);
      ctx.lineTo(panelP1.x - 3, panelP1.y + panelH_3d);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Solar Cells Polygons (Blue glossy glass arrays)
      const gradientBlueCells = ctx.createLinearGradient(panelP1.x, panelP1.y, panelP2.x, panelP2.y + panelH_3d);
      gradientBlueCells.addColorStop(0, '#042f2e'); // dark solar emerald deep tone
      gradientBlueCells.addColorStop(0.5, '#0369a1'); // electric deep blue
      gradientBlueCells.addColorStop(1, '#0284c7'); // sky cyan
      ctx.fillStyle = gradientBlueCells;
      ctx.beginPath();
      ctx.moveTo(panelP1.x + 3, panelP1.y + 2);
      ctx.lineTo(panelP2.x - 3, panelP2.y + 2);
      ctx.lineTo(panelP2.x, panelP2.y + panelH_3d - 2);
      ctx.lineTo(panelP1.x, panelP1.y + panelH_3d - 2);
      ctx.closePath();
      ctx.fill();

      // Grid-Lines on the Solar Panel
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      const gridSegments = 6;
      for (let g = 1; g < gridSegments; g++) {
        const ratio = g / gridSegments;
        const topGridX = panelP1.x + 3 + (panelW - 6) * ratio;
        const topGridY = panelP1.y + 2 + (panelP2.y - panelP1.y) * ratio;
        const botGridX = panelP1.x + (panelW) * ratio;
        const botGridY = panelP1.y + panelH_3d - 2 + (panelP2.y - panelP1.y) * ratio;
        
        ctx.beginPath();
        ctx.moveTo(topGridX, topGridY);
        ctx.lineTo(botGridX, botGridY);
        ctx.stroke();
      }

      // PANELS SHIMMER
      // Periodic sweeping linear light specular sheen across solar panels
      const shimmerSpeed = 1.8;
      const shimmerPos = (time * shimmerSpeed) % 2.5 - 0.5; // continuous cycle range
      
      const shimmerGrad = ctx.createLinearGradient(
        panelP1.x + panelW * shimmerPos, panelP1.y,
        panelP1.x + panelW * (shimmerPos + 0.25), panelP1.y + panelH_3d
      );
      shimmerGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      shimmerGrad.addColorStop(0.5, `rgba(255, 255, 255, ${sunriseProgress * 0.45})`); // shimmers brighter at daytime
      shimmerGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = shimmerGrad;
      ctx.beginPath();
      ctx.moveTo(panelP1.x + 3, panelP1.y + 2);
      ctx.lineTo(panelP2.x - 3, panelP2.y + 2);
      ctx.lineTo(panelP2.x, panelP2.y + panelH_3d - 2);
      ctx.lineTo(panelP1.x, panelP1.y + panelH_3d - 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // WALL INVERTER BOX & Electrician connecting it
      const invX = houseX + houseW/2 - 25;
      const invY = houseY - houseH/2;
      const invW = 14;
      const invH = 22;

      ctx.save();
      // Metallic inverter body
      ctx.fillStyle = '#64748b'; // Silver
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.fillRect(invX, invY, invW, invH);
      ctx.strokeRect(invX, invY, invW, invH);

      // Blinking inverter status LED
      const isLedOn = Math.floor(time * 3) % 2 === 0;
      ctx.fillStyle = isLedOn ? '#22c55e' : '#15803d'; // Emerald pulsing status
      ctx.beginPath();
      ctx.arc(invX + invW/2, invY + 5, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ELECTRICIAN CHARACTER (crouched near inverter, connecting cables)
      const worker3X = invX + 16;
      const worker3Y = invY + invH + 8;
      
      // Let's check state: Electrician performs operations next to the inverter
      ctx.save();
      // Legs (Crouched state)
      ctx.strokeStyle = '#1e3a8a'; // Blue safety work pants
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(worker3X, groundY); // foot
      ctx.lineTo(worker3X - 8, groundY - 6); // knee bent
      ctx.lineTo(worker3X - 4, groundY - 14); // hip
      ctx.stroke();

      // Body / Torso (Safety orange vest)
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(worker3X - 6, groundY - 26, 7, 12);
      
      // Arm connecting inverter (animating back and forth slightly)
      const handSolderSway = Math.sin(time * 5.5) * 2.5;
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(worker3X - 5, groundY - 22);
      ctx.lineTo(invX + invW + 2, invY + invH - 4 + handSolderSway);
      ctx.stroke();

      // Head & White Hard Hat
      ctx.fillStyle = '#f3f4f6'; // Skin/Face tone base
      ctx.beginPath();
      ctx.arc(worker3X - 2, groundY - 31, 4, 0, Math.PI * 2);
      ctx.fill();
      // Hard hat
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(worker3X - 2, groundY - 33, 4.5, Math.PI, 0);
      ctx.fill();
      // Hat brim
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(worker3X - 8, groundY - 33);
      ctx.lineTo(worker3X + 3, groundY - 33);
      ctx.stroke();
      ctx.restore();

      // TINY SPARKS / CONNECTION GLOWS from Electrician's hand onto inverter
      if (Math.random() > 0.4) {
        sparks.push({
          x: invX + invW - 1,
          y: invY + invH - 4 + handSolderSway,
          vx: (Math.random() - 0.7) * 1.5,
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 1.8 + 0.6,
          alpha: 1.0,
          life: 1.0,
        });
      }
      
      ctx.save();
      for (let s = sparks.length - 1; s >= 0; s--) {
        const spark = sparks[s];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.alpha -= 0.04;
        spark.life -= 0.04;
        
        if (spark.life <= 0) {
          sparks.splice(s, 1);
          continue;
        }

        ctx.fillStyle = `rgba(34, 197, 94, ${spark.alpha})`; // glowing emerald connection sparks
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // THE LADDER leaning against the left wall of the house
      const ladderX = houseX - houseW/2 - 14;
      const ladderTopY = roofLeftY + 4;
      const ladderBottomY = groundY - 4;

      ctx.save();
      ctx.strokeStyle = '#64748b'; // aluminum ladder
      ctx.lineWidth = 2.5;
      
      // Left and right side rails of the ladder
      ctx.beginPath();
      ctx.moveTo(ladderX - 7, ladderBottomY);
      ctx.lineTo(ladderX - 4, ladderTopY);
      ctx.moveTo(ladderX + 7, ladderBottomY);
      ctx.lineTo(ladderX + 10, ladderTopY);
      ctx.stroke();

      // Ladder rungs
      ctx.lineWidth = 1.5;
      const rungCount = 10;
      for (let r = 0; r <= rungCount; r++) {
        const ratio = r / rungCount;
        const ly = ladderBottomY + (ladderTopY - ladderBottomY) * ratio;
        const lxLeft = ladderX - 7 + (3) * ratio;
        const lxRight = ladderX + 7 + (3) * ratio;
        ctx.beginPath();
        ctx.moveTo(lxLeft, ly);
        ctx.lineTo(lxRight, ly);
        ctx.stroke();
      }
      ctx.restore();

      // CLIMBING WORKER CHARACTER on the ladder
      // Slowly climbs up and down step by step over time
      const climberProgress = Math.sin(time * 0.4) * 0.45 + 0.45; // loop range 0 to 0.9
      const climberX = ladderX - 6 + (10 * climberProgress);
      const climberY = ladderBottomY + (ladderTopY - ladderBottomY) * climberProgress;

      ctx.save();
      // Legs climbing (alternating step angles)
      ctx.strokeStyle = '#1e3a8a';
      ctx.lineWidth = 3;
      const climberLegCycle = Math.sin(time * 6) * 3;
      ctx.beginPath();
      ctx.moveTo(climberX - 4, climberY + 12 + climberLegCycle);
      ctx.lineTo(climberX - 2, climberY + 6);
      ctx.moveTo(climberX + 4, climberY + 12 - climberLegCycle);
      ctx.lineTo(climberX + 2, climberY + 6);
      ctx.stroke();

      // Torso / safety vest
      ctx.fillStyle = '#eab308'; // neon yellow safety vest
      ctx.fillRect(climberX - 5, climberY - 6, 9, 13);

      // Arms grasping rungs
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(climberX - 4, climberY - 1);
      ctx.lineTo(climberX - 8, climberY - 5);
      ctx.moveTo(climberX + 4, climberY - 1);
      ctx.lineTo(climberX + 8, climberY - 5);
      ctx.stroke();

      // Head & Hard Hat (climbing worker wears orange hard hat)
      ctx.fillStyle = '#f3f4f6';
      ctx.beginPath();
      ctx.arc(climberX, climberY - 11, 3.8, 0, Math.PI * 2);
      ctx.fill();
      // Hat
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(climberX, climberY - 13, 4.2, Math.PI, 0);
      ctx.fill();
      ctx.restore();

      // ENGINEER INSPECTING ROOF (Stands on flat/upper roof and points)
      const engineerX = houseX + 20;
      const engineerY = houseY - houseH - 2;

      ctx.save();
      // Pants
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(engineerX - 3, engineerY);
      ctx.lineTo(engineerX - 3, engineerY - 12);
      ctx.moveTo(engineerX + 3, engineerY);
      ctx.lineTo(engineerX + 3, engineerY - 12);
      ctx.stroke();

      // Safety orange vest
      ctx.fillStyle = '#f97316';
      ctx.fillRect(engineerX - 5, engineerY - 24, 10, 13);

      // Clipboard arm holding plans / Right arm inspecting
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2.2;
      // holding clipboard
      ctx.beginPath();
      ctx.moveTo(engineerX - 4, engineerY - 20);
      ctx.lineTo(engineerX - 9, engineerY - 14);
      ctx.stroke();
      // Clipboard shape
      ctx.fillStyle = '#b45309'; // wooden board
      ctx.fillRect(engineerX - 12, engineerY - 17, 5, 7);

      // Pointing arm (moving up and down slowly)
      const pointAngle = Math.sin(time * 1.5) * 0.35 - 0.2;
      ctx.beginPath();
      ctx.moveTo(engineerX + 4, engineerY - 20);
      ctx.lineTo(engineerX + 13, engineerY - 20 + Math.sin(pointAngle) * 8);
      ctx.stroke();

      // Head & White Hard Hat
      ctx.fillStyle = '#f3f4f6';
      ctx.beginPath();
      ctx.arc(engineerX, engineerY - 28, 4, 0, Math.PI * 2);
      ctx.fill();
      // hat
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(engineerX, engineerY - 30, 4.5, Math.PI, 0);
      ctx.fill();
      // Brim
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(engineerX - 6, engineerY - 30);
      ctx.lineTo(engineerX + 6, engineerY - 30);
      ctx.stroke();
      ctx.restore();

      // WORKERS ARRIVE IN SERVICE VANS
      // Decelerates smoothly from left to park near house
      const vanTargetX = houseX - 165;
      const vanStartX = -150;
      const driveDuration = 8.0;
      const driveProgress = Math.min(1.0, time / driveDuration);
      
      // Decelerate ease function
      const easeOutQuad = (t: number) => t * (2 - t);
      const vanX = vanStartX + easeOutQuad(driveProgress) * (vanTargetX - vanStartX);
      const vanY = groundY + 16;
      const vanW = 90;
      const vanH = 45;

      ctx.save();
      // Shadows under the van
      ctx.fillStyle = 'rgba(2, 6, 23, 0.22)';
      ctx.beginPath();
      ctx.ellipse(vanX + vanW/2, vanY + 2, vanW * 0.48, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Van Body (Sleek aerodynamic service truck)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(vanX, vanY);
      ctx.lineTo(vanX + vanW * 0.8, vanY);
      ctx.lineTo(vanX + vanW, vanY - vanH * 0.35); // Slanted hood
      ctx.lineTo(vanX + vanW * 0.9, vanY - vanH); // Slanted windshield
      ctx.lineTo(vanX, vanY - vanH); // Flat top roof
      ctx.closePath();
      ctx.fill();

      // Van dark geometric panel window outline
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(vanX + vanW * 0.55, vanY - vanH * 0.85);
      ctx.lineTo(vanX + vanW * 0.84, vanY - vanH * 0.85);
      ctx.lineTo(vanX + vanW * 0.92, vanY - vanH * 0.38);
      ctx.lineTo(vanX + vanW * 0.55, vanY - vanH * 0.38);
      ctx.closePath();
      ctx.fill();

      // Windshield glossy reflection line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(vanX + vanW * 0.8, vanY - vanH * 0.8);
      ctx.lineTo(vanX + vanW * 0.88, vanY - vanH * 0.45);
      ctx.stroke();

      // Premium "Ashonika" Branding Logo on side of service van
      ctx.fillStyle = '#10b981'; // Green leaf icon circle
      ctx.beginPath();
      ctx.arc(vanX + vanW * 0.26, vanY - vanH * 0.52, 7, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#ffffff'; // White tiny inner leaf
      ctx.beginPath();
      ctx.ellipse(vanX + vanW * 0.26, vanY - vanH * 0.52, 2.5, 4.5, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();

      // Brand letters
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 9px var(--font-sans)';
      ctx.fillText('ASHONIKA', vanX + vanW * 0.08, vanY - vanH * 0.18);
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 7px var(--font-sans)';
      ctx.fillText('GREEN ENERGY', vanX + vanW * 0.08, vanY - vanH * 0.04);

      // Aluminum ladders stored on top of utility roof racks
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2.2;
      // Roof rack brackets
      ctx.beginPath();
      ctx.moveTo(vanX + 15, vanY - vanH);
      ctx.lineTo(vanX + 15, vanY - vanH - 3);
      ctx.moveTo(vanX + vanW - 25, vanY - vanH);
      ctx.lineTo(vanX + vanW - 25, vanY - vanH - 3);
      ctx.stroke();
      // Ladder rails
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(vanX + 5, vanY - vanH - 4);
      ctx.lineTo(vanX + vanW - 10, vanY - vanH - 4);
      ctx.moveTo(vanX + 12, vanY - vanH - 7);
      ctx.lineTo(vanX + vanW - 18, vanY - vanH - 7);
      ctx.stroke();

      // Rotating Rubber Wheels
      const drawWheel = (wx: number) => {
        ctx.save();
        ctx.translate(wx, vanY);
        
        // Rolling rotation angle linked to transit velocity
        const wheelRot = vanX * 0.08;
        ctx.rotate(wheelRot);

        // Tire rubber
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(0, 0, 11, 0, Math.PI * 2);
        ctx.fill();

        // Inner metallic hubcap
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fill();

        // Spokes showing rotation visual feedback
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-5, 0); ctx.lineTo(5, 0);
        ctx.moveTo(0, -5); ctx.lineTo(0, 5);
        ctx.stroke();
        ctx.restore();
      };

      drawWheel(vanX + 22); // Rear wheel
      drawWheel(vanX + vanW - 22); // Front wheel
      ctx.restore();

      // ANOTHER WORKER (Installer carrying solar panel from van to house)
      // Activated once service van successfully drives in and parks
      if (driveProgress >= 0.95) {
        const walkStartTime = Math.max(0, time - driveDuration);
        const cycleLength = 7.0; // 7 seconds complete loop
        const loopPhase = (walkStartTime % cycleLength) / cycleLength;

        let workerX = vanX + vanW - 5;
        let workerY = groundY;
        let isCarryingPanel = false;
        let facingDirection = 1; // 1 = right, -1 = left

        if (loopPhase < 0.42) {
          // Walking towards house carrying solar panel
          const ratio = loopPhase / 0.42;
          workerX = (vanX + vanW - 5) + ratio * ((ladderX - 15) - (vanX + vanW - 5));
          isCarryingPanel = true;
          facingDirection = 1;
        } else if (loopPhase < 0.52) {
          // Standing at ladder bottom unloading
          workerX = ladderX - 15;
          isCarryingPanel = true;
          facingDirection = 1;
        } else {
          // Unloaded, walking back empty-handed to the van
          const ratio = (loopPhase - 0.52) / 0.48;
          workerX = (ladderX - 15) - ratio * ((ladderX - 15) - (vanX + vanW - 5));
          isCarryingPanel = false;
          facingDirection = -1;
        }

        // DRAW WALK CYCLE ANIMATION
        ctx.save();
        const stepFreq = time * 7.5;
        const walkSwing = Math.sin(stepFreq) * 3.5;

        // Legs marching (alternating joints)
        ctx.strokeStyle = '#1e3a8a';
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(workerX, workerY);
        ctx.lineTo(workerX - 3 + walkSwing * facingDirection, workerY + 12); // Front leg
        ctx.moveTo(workerX, workerY);
        ctx.lineTo(workerX + 3 - walkSwing * facingDirection, workerY + 12); // Back leg
        ctx.stroke();

        // Safety vest body
        ctx.fillStyle = '#eab308'; // Bright neon yellow safety vest
        ctx.fillRect(workerX - 5, workerY - 12, 10, 14);

        // Arms structure (carrying panel or swinging empty)
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2.2;
        if (isCarryingPanel) {
          // Arms reaching out forward to carry a panel
          ctx.beginPath();
          ctx.moveTo(workerX - 3, workerY - 10);
          ctx.lineTo(workerX + 7 * facingDirection, workerY - 6);
          ctx.stroke();

          // Draw the solar panel being held
          ctx.save();
          ctx.translate(workerX + 10 * facingDirection, workerY - 8);
          ctx.rotate(-Math.PI / 8 * facingDirection);
          
          ctx.fillStyle = '#0284c7'; // Glass blue
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 1;
          ctx.fillRect(-10, -5, 20, 10);
          ctx.strokeRect(-10, -5, 20, 10);
          
          // Panel details
          ctx.strokeStyle = 'rgba(255,255,255,0.3)';
          ctx.beginPath();
          ctx.moveTo(-10, 0); ctx.lineTo(10, 0);
          ctx.moveTo(0, -5); ctx.lineTo(0, 5);
          ctx.stroke();
          ctx.restore();
        } else {
          // Normal arms swinging empty
          ctx.beginPath();
          ctx.moveTo(workerX, workerY - 10);
          ctx.lineTo(workerX - walkSwing * facingDirection, workerY - 4);
          ctx.stroke();
        }

        // Head & Hard Hat (white safety cap)
        ctx.fillStyle = '#f3f4f6';
        ctx.beginPath();
        ctx.arc(workerX, workerY - 17, 3.8, 0, Math.PI * 2);
        ctx.fill();
        // hard hat
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(workerX, workerY - 19, 4.2, Math.PI, 0);
        ctx.fill();
        ctx.restore();
      }

      // ELECTRICITY STARTS FLOWING THROUGH GLOWING ENERGY LINES
      // Glow wires running from Solar Panels -> Inverter -> Utility Grid Power Pole
      if (sunriseProgress > 0.1) {
        ctx.save();
        
        // Setup wires paths points
        const wirePoints = [
          { x: panelP2.x - 15, y: panelP2.y + 4 }, // Panel output junction
          { x: houseX + houseW/2 - 4, y: roofRightY + 15 }, // corner junction
          { x: invX + invW/2, y: invY }, // Inverter input
        ];

        const outputWirePoints = [
          { x: invX + invW/2, y: invY + invH }, // Inverter output
          { x: houseX + houseW/2 - 10, y: groundY - 15 }, // house base corner
          { x: poleX, y: poleY - 120 }, // power pole insulator junction
        ];

        // Draw ambient glow lines
        const drawGlowWire = (points: { x: number; y: number }[], glowColor: string, isPulsing: boolean) => {
          ctx.strokeStyle = 'rgba(34, 197, 94, 0.2)';
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (let p = 1; p < points.length; p++) {
            ctx.lineTo(points[p].x, points[p].y);
          }
          ctx.stroke();

          ctx.strokeStyle = glowColor;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Pulsing electrical charges traveling along wires
          if (isPulsing) {
            const flowSpeed = 1.4 + (sunriseProgress * 1.5); // speeds up during full bright sun
            const pulseProgress = (time * flowSpeed) % 1.0;
            
            // Linear interpolate coordinates to find exact pulse coordinates
            const getPointOnPath = (t: number, pts: { x: number; y: number }[]) => {
              const segmentCount = pts.length - 1;
              const scaledT = t * segmentCount;
              const segIdx = Math.floor(scaledT);
              const remainder = scaledT - segIdx;
              
              if (segIdx >= segmentCount) return pts[pts.length - 1];
              
              const pStart = pts[segIdx];
              const pEnd = pts[segIdx + 1];
              
              return {
                x: pStart.x + (pEnd.x - pStart.x) * remainder,
                y: pStart.y + (pEnd.y - pStart.y) * remainder,
              };
            };

            const pulse1 = getPointOnPath(pulseProgress, points);
            const pulse2 = getPointOnPath((pulseProgress + 0.5) % 1.0, points);

            // Glowing energy drops
            const drawEnergyDrop = (pulsePt: { x: number; y: number }) => {
              ctx.save();
              ctx.fillStyle = '#fef08a'; // bright gold electric drops
              ctx.shadowColor = '#fef08a';
              ctx.shadowBlur = 9;
              ctx.beginPath();
              ctx.arc(pulsePt.x, pulsePt.y, 3.5, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            };

            drawEnergyDrop(pulse1);
            drawEnergyDrop(pulse2);
          }
        };

        // Draw panel input wires with slow active flow
        drawGlowWire(wirePoints, '#4ade80', true);
        
        // Draw output utility power poles supply grid lines with faster flow as day breaks
        drawGlowWire(outputWirePoints, '#22c55e', true);
        
        // Draw standard aerial transmission power lines from pole to off-screen right
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.15)';
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(poleX + 25, poleY - 150);
        ctx.bezierCurveTo(poleX + 100, poleY - 130, width * 0.95, poleY - 110, width, poleY - 110);
        ctx.moveTo(poleX + 20, poleY - 120);
        ctx.bezierCurveTo(poleX + 100, poleY - 100, width * 0.95, poleY - 80, width, poleY - 80);
        ctx.stroke();

        ctx.restore();
      }

      ctx.restore(); // Restore camera translation layout

      if (isLooping) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    let isIntersecting = false;
    let isLooping = false;

    const startLoop = () => {
      if (!isLooping && isIntersecting) {
        isLooping = true;
        draw();
      }
    };

    const stopLoop = () => {
      isLooping = false;
      cancelAnimationFrame(animationFrameId);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.01 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id="hero-canvas-container"
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
