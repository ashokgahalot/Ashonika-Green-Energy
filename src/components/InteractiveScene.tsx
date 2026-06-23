/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface EarthPoint {
  lat: number;
  lon: number;
  cosLat: number;
  sinLat: number;
  lonRadBase: number;
}

// Highly accurate, recognizable coordinates for major world landmasses
const LANDMASSES = [
  {
    name: 'North America',
    poly: [
      { lat: 9, lon: -83 }, { lat: 14, lon: -90 }, { lat: 16, lon: -95 }, { lat: 20, lon: -105 },
      { lat: 25, lon: -110 }, { lat: 24, lon: -112 }, { lat: 30, lon: -115 }, { lat: 32, lon: -117 },
      { lat: 34, lon: -120 }, { lat: 40, lon: -124 }, { lat: 48, lon: -125 }, { lat: 54, lon: -130 },
      { lat: 59, lon: -140 }, { lat: 60, lon: -145 }, { lat: 60, lon: -150 }, { lat: 61, lon: -160 },
      { lat: 65, lon: -168 }, { lat: 70, lon: -165 }, { lat: 72, lon: -156 }, { lat: 70, lon: -140 },
      { lat: 74, lon: -120 }, { lat: 74, lon: -100 }, { lat: 79, lon: -95 }, { lat: 75, lon: -83 },
      { lat: 66, lon: -83 }, { lat: 62, lon: -75 }, { lat: 58, lon: -63 }, { lat: 53, lon: -56 },
      { lat: 48, lon: -65 }, { lat: 43, lon: -70 }, { lat: 35, lon: -75 }, { lat: 25, lon: -80 },
      { lat: 25, lon: -97 }, { lat: 18, lon: -94 }, { lat: 9, lon: -83 }
    ]
  },
  {
    name: 'South America',
    poly: [
      { lat: 12, lon: -72 }, { lat: 10, lon: -60 }, { lat: 5, lon: -50 }, { lat: -5, lon: -35 },
      { lat: -10, lon: -35 }, { lat: -23, lon: -42 }, { lat: -34, lon: -53 }, { lat: -45, lon: -60 },
      { lat: -52, lon: -65 }, { lat: -55, lon: -68 }, { lat: -56, lon: -72 }, { lat: -45, lon: -75 },
      { lat: -30, lon: -72 }, { lat: -15, lon: -75 }, { lat: -5, lon: -81 }, { lat: 5, lon: -78 },
      { lat: 12, lon: -72 }
    ]
  },
  {
    name: 'Africa',
    poly: [
      { lat: 37, lon: 11 }, { lat: 32, lon: 32 }, { lat: 30, lon: 34 }, { lat: 12, lon: 43 },
      { lat: 11, lon: 51 }, { lat: -4, lon: 41 }, { lat: -22, lon: 35 }, { lat: -34, lon: 20 },
      { lat: -33, lon: 18 }, { lat: -15, lon: 12 }, { lat: -5, lon: 11 }, { lat: 5, lon: 9 },
      { lat: 4, lon: -9 }, { lat: 14, lon: -17 }, { lat: 21, lon: -17 }, { lat: 32, lon: -10 },
      { lat: 36, lon: 2 }, { lat: 37, lon: 11 }
    ]
  },
  {
    name: 'Eurasia',
    poly: [
      { lat: 36, lon: -6 }, { lat: 43, lon: -9 }, { lat: 48, lon: -5 }, { lat: 50, lon: 1 },
      { lat: 55, lon: 5 }, { lat: 60, lon: 5 }, { lat: 65, lon: 10 }, { lat: 70, lon: 20 },
      { lat: 71, lon: 26 }, { lat: 68, lon: 40 }, { lat: 67, lon: 60 }, { lat: 73, lon: 80 },
      { lat: 77, lon: 105 }, { lat: 73, lon: 125 }, { lat: 70, lon: 140 }, { lat: 71, lon: 165 },
      { lat: 66, lon: 170 }, { lat: 60, lon: 165 }, { lat: 51, lon: 156 }, { lat: 43, lon: 140 },
      { lat: 38, lon: 125 }, { lat: 35, lon: 120 }, { lat: 22, lon: 114 }, { lat: 20, lon: 110 },
      { lat: 15, lon: 108 }, { lat: 6, lon: 102 }, { lat: 1, lon: 104 }, { lat: 10, lon: 98 },
      { lat: 15, lon: 96 }, { lat: 22, lon: 90 }, { lat: 16, lon: 82 }, { lat: 8, lon: 77 },
      { lat: 15, lon: 74 }, { lat: 23, lon: 68 }, { lat: 25, lon: 60 }, { lat: 26, lon: 50 },
      { lat: 15, lon: 50 }, { lat: 12, lon: 44 }, { lat: 25, lon: 37 }, { lat: 30, lon: 34 },
      { lat: 31, lon: 34 }, { lat: 36, lon: 35 }, { lat: 41, lon: 29 }, { lat: 40, lon: 23 },
      { lat: 45, lon: 13 }, { lat: 38, lon: 15 }, { lat: 43, lon: 7 }, { lat: 41, lon: 3 },
      { lat: 36, lon: -6 }
    ]
  },
  {
    name: 'Australia',
    poly: [
      { lat: -22, lon: 113 }, { lat: -12, lon: 130 }, { lat: -11, lon: 136 }, { lat: -10, lon: 142 },
      { lat: -18, lon: 146 }, { lat: -26, lon: 153 }, { lat: -34, lon: 151 }, { lat: -38, lon: 145 },
      { lat: -35, lon: 136 }, { lat: -34, lon: 115 }, { lat: -22, lon: 113 }
    ]
  },
  {
    name: 'Greenland',
    poly: [
      { lat: 60, lon: -44 }, { lat: 65, lon: -35 }, { lat: 70, lon: -22 }, { lat: 79, lon: -17 },
      { lat: 83, lon: -30 }, { lat: 82, lon: -60 }, { lat: 76, lon: -68 }, { lat: 70, lon: -54 },
      { lat: 65, lon: -52 }, { lat: 60, lon: -44 }
    ]
  },
  {
    name: 'Madagascar',
    poly: [
      { lat: -12, lon: 49 }, { lat: -16, lon: 50 }, { lat: -25, lon: 47 }, { lat: -25, lon: 44 },
      { lat: -20, lon: 44 }, { lat: -15, lon: 47 }, { lat: -12, lon: 49 }
    ]
  },
  {
    name: 'Japan',
    poly: [
      { lat: 31, lon: 130 }, { lat: 33, lon: 133 }, { lat: 35, lon: 135 }, { lat: 40, lon: 141 },
      { lat: 45, lon: 142 }, { lat: 43, lon: 145 }, { lat: 36, lon: 140 }, { lat: 34, lon: 138 },
      { lat: 31, lon: 130 }
    ]
  },
  {
    name: 'United Kingdom-Ireland',
    poly: [
      { lat: 50, lon: -5 }, { lat: 52, lon: -6 }, { lat: 55, lon: -7 }, { lat: 59, lon: -3 },
      { lat: 56, lon: -2 }, { lat: 51, lon: 1 }, { lat: 50, lon: -5 }
    ]
  }
];

// Precompute Bounding Boxes for lightspeed performance
const PRECOMPUTED_LANDMASSES = LANDMASSES.map(item => {
  let minLat = 180, maxLat = -180, minLon = 180, maxLon = -180;
  item.poly.forEach(pt => {
    if (pt.lat < minLat) minLat = pt.lat;
    if (pt.lat > maxLat) maxLat = pt.lat;
    if (pt.lon < minLon) minLon = pt.lon;
    if (pt.lon > maxLon) maxLon = pt.lon;
  });
  return {
    ...item,
    minLat,
    maxLat,
    minLon,
    maxLon
  };
});

function isPointInPolygon(lat: number, lon: number, polygon: { lat: number; lon: number }[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lon, yi = polygon[i].lat;
    const xj = polygon[j].lon, yj = polygon[j].lat;
    
    const intersect = ((yi > lat) !== (yj > lat))
        && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function checkIsLand(lat: number, lon: number): boolean {
  // Grid containment check against land polygons
  for (const land of PRECOMPUTED_LANDMASSES) {
    if (lat >= land.minLat && lat <= land.maxLat && lon >= land.minLon && lon <= land.maxLon) {
      if (isPointInPolygon(lat, lon, land.poly)) {
        return true;
      }
    }
  }
  return false;
}

const generateEarthPoints = (): EarthPoint[] => {
  const pts: EarthPoint[] = [];
  // 1.8 spacing creates an exceptionally detailed, premium, recognizable digital grid of Earth, ultra-optimized for performance
  const step = 1.8;
  for (let lat = -80; lat <= 80; lat += step) {
    const latRad = (lat * Math.PI) / 180;
    const cosLat = Math.cos(latRad);
    const sinLat = Math.sin(latRad);
    for (let lon = -180; lon < 180; lon += step) {
      if (checkIsLand(lat, lon)) {
        pts.push({
          lat,
          lon,
          cosLat,
          sinLat,
          lonRadBase: (lon * Math.PI) / 180,
        });
      }
    }
  }
  return pts;
};

const REAL_EARTH_POINTS = generateEarthPoints();

export default function InteractiveScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

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

    // Set up canvas sizing
    const resizeCanvas = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    // Use ResizeObserver for responsive sizing as requested in guidelines
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    resizeCanvas();

    // Solar panels 3D coordinates
    interface Panel3D {
      x: number;
      y: number;
      z: number;
      rotX: number;
      rotY: number;
      scale: number;
      speed: number;
    }

    const panels: Panel3D[] = [
      { x: -180, y: -80, z: 120, rotX: 0.3, rotY: 0.4, scale: 0.8, speed: 0.01 },
      { x: 190, y: -160, z: -80, rotX: -0.4, rotY: 0.2, scale: 0.7, speed: 0.008 },
      { x: 250, y: 80, z: 50, rotX: 0.2, rotY: -0.5, scale: 1.0, speed: 0.012 },
      { x: -280, y: 150, z: -100, rotX: -0.1, rotY: 0.6, scale: 0.9, speed: 0.007 },
    ];

    // Particles system
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      color: string;
    }

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * 800,
      y: Math.random() * 600,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.8 - 0.2,
      alpha: Math.random() * 0.7 + 0.3,
      color: Math.random() > 0.4 ? '#4ADE80' : '#FFC107',
    }));

    let globeRot = 0;
    let time = 0;

    const draw = () => {
      if (!ctx || !canvas) return;

      // Clear with dark tech gradient tone
      ctx.clearRect(0, 0, width, height);

      // Draw background ambient rays
      const sunX = width * 0.85;
      const sunY = height * 0.2;
      const bgGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, width * 0.8);
      bgGrad.addColorStop(0, 'rgba(11, 143, 77, 0.15)'); // Emerald Green glow
      bgGrad.addColorStop(0.3, 'rgba(255, 193, 7, 0.04)'); // Solar Yellow
      bgGrad.addColorStop(0.7, 'rgba(7, 27, 47, 0)'); // Dark Blue backdrop
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      time += 0.01;
      globeRot += 0.0015;

      // Draw dynamic solar lightning rays
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 4; i++) {
        const angle = time * 0.2 + (i * Math.PI) / 2;
        const beamGrad = ctx.createOuterGlowLinearGradient
          ? ctx.createOuterGlowLinearGradient()
          : ctx.createLinearGradient(sunX, sunY, sunX - Math.cos(angle) * width, sunY + Math.sin(angle) * height);
        
        beamGrad.addColorStop(0, 'rgba(255, 193, 7, 0.18)');
        beamGrad.addColorStop(0.5, 'rgba(11, 143, 77, 0.05)');
        beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(sunX, sunY);
        ctx.lineTo(sunX - Math.cos(angle - 0.08) * width * 1.2, sunY + Math.sin(angle - 0.08) * height * 1.2);
        ctx.lineTo(sunX - Math.cos(angle + 0.08) * width * 1.2, sunY + Math.sin(angle + 0.08) * height * 1.2);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // 3D holographic Rotating Earth Globe
      // Position globe at the right side of the screen on desktop, center-bottom on mobile
      const isMobile = width < 768;
      const globeX = isMobile ? width / 2 : width * 0.72;
      const globeY = isMobile ? height * 0.75 : height * 0.52;
      const globeRadius = isMobile ? Math.min(width * 0.38, 160) : Math.min(width * 0.25, 230);

      // Globe Atmosphere aura
      const auraGrad = ctx.createRadialGradient(globeX, globeY, globeRadius * 0.9, globeX, globeY, globeRadius * 1.4);
      auraGrad.addColorStop(0, 'rgba(11, 143, 77, 0.3)');
      auraGrad.addColorStop(0.5, 'rgba(11, 143, 77, 0.1)');
      auraGrad.addColorStop(0.8, 'rgba(7, 27, 47, 0.01)');
      auraGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(globeX, globeY, globeRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Deep glowing blue ocean background
      ctx.save();
      const oceanGrad = ctx.createRadialGradient(globeX, globeY, globeRadius * 0.2, globeX, globeY, globeRadius);
      oceanGrad.addColorStop(0, '#04162e'); // Deep ocean navy
      oceanGrad.addColorStop(0.7, '#020914'); // Dark ocean body
      oceanGrad.addColorStop(0.97, '#0a2342'); // Cyan/blue atmospheric rim glow
      oceanGrad.addColorStop(1, '#0e345e'); // Outer edge glow stroke
      ctx.fillStyle = oceanGrad;
      ctx.beginPath();
      ctx.arc(globeX, globeY, globeRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Grid/Globe Spherical Sphere Lines
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.25)';
      ctx.lineWidth = 1;

      // Back half of latitude lines
      for (let lat = -75; lat <= 75; lat += 15) {
        const rad = (lat * Math.PI) / 180;
        const flatRadius = globeRadius * Math.cos(rad);
        const yOffset = globeRadius * Math.sin(rad);

        const radiusX = Math.abs(flatRadius);
        const radiusY = Math.abs(flatRadius * 0.3);

        // Latitude ring
        ctx.beginPath();
        ctx.ellipse(globeX, globeY + yOffset, radiusX, radiusY, 0, Math.PI, Math.PI * 2);
        ctx.stroke();
      }

      // Back half of longitude lines
      for (let lon = 0; lon < 180; lon += 30) {
        const rad = ((lon + globeRot * 50) * Math.PI) / 180;
        const cosVal = Math.cos(rad);
        const radiusX = Math.abs(globeRadius * cosVal);
        const rotation = cosVal < 0 ? Math.PI : 0;
        ctx.beginPath();
        ctx.ellipse(globeX, globeY, radiusX, Math.abs(globeRadius), rotation, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();
      }

      // Draw Earth continent points simulating digital grid mapping
      ctx.fillStyle = 'rgba(74, 222, 128, 0.7)';
      
      REAL_EARTH_POINTS.forEach((pt) => {
        // High density Earth rotation aligned properly in radians using precomputed math
        const lonRad = pt.lonRadBase + globeRot;
        const cosLon = Math.cos(lonRad);
        const sinLon = Math.sin(lonRad);

        // Calculate depth (Z value where positive is facing the observer)
        const z3d = pt.cosLat * cosLon;

        // Check if facing the viewer (Z > 0) with a tiny buffer
        if (z3d > 0.05) {
          const px = globeX + globeRadius * pt.cosLat * sinLon;
          const py = globeY - globeRadius * pt.sinLat;
          
          // Size based on depth to create 3D curving effect
          const sz = (z3d * 2.1) + 0.4;

          // Spherical shading: dots closer to the edge fade out smoothly
          ctx.fillStyle = `rgba(52, 211, 153, ${z3d * 0.9})`;

          ctx.beginPath();
          ctx.arc(px, py, sz, 0, Math.PI * 2);
          ctx.fill();

          // Luminous pulses from nodes on landmark corporate capital locations
          const isLandmark = 
            (pt.lat >= 24 && pt.lat <= 30 && pt.lon >= 74 && pt.lon <= 78) || // Delhi/Netaji Subhash Place (Main Hub)
            (pt.lat >= 38 && pt.lat <= 42 && pt.lon >= -76 && pt.lon <= -72) || // New York area
            (pt.lat >= 33 && pt.lat <= 36 && pt.lon >= 138 && pt.lon <= 141) || // Tokyo area
            (pt.lat >= 50 && pt.lat <= 53 && pt.lon >= -2 && pt.lon <= 1) || // London
            (pt.lat >= -35 && pt.lat <= -32 && pt.lon >= 149 && pt.lon <= 152); // Sydney

          if (isLandmark && Math.random() > 0.98) {
            ctx.save();
            ctx.fillStyle = '#FFC107';
            ctx.strokeStyle = 'rgba(255, 193, 7, 0.7)';
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#FFC107';
            ctx.beginPath();
            ctx.arc(px, py, sz * 1.8, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(px, py, sz * 4.5, 0, Math.PI * 2);
            ctx.lineWidth = 0.75;
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      // Front half of latitude/longitude lines to overlap continents properly
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.45)';
      for (let lat = -75; lat <= 75; lat += 15) {
        const rad = (lat * Math.PI) / 180;
        const flatRadius = globeRadius * Math.cos(rad);
        const yOffset = globeRadius * Math.sin(rad);

        const radiusX = Math.abs(flatRadius);
        const radiusY = Math.abs(flatRadius * 0.3);

        ctx.beginPath();
        ctx.ellipse(globeX, globeY + yOffset, radiusX, radiusY, 0, 0, Math.PI);
        ctx.stroke();
      }

      // Sphere Silhouette Ring
      ctx.strokeStyle = 'rgba(11, 143, 77, 0.8)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(globeX, globeY, globeRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Energy supply power lines pulsing from Globe node to the upper left
      ctx.save();
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.3)';
      ctx.lineWidth = 1.5;
      const targetPoint = { x: width * 0.2, y: height * 0.4 };

      ctx.beginPath();
      ctx.moveTo(globeX, globeY);
      ctx.bezierCurveTo(globeX - 100, globeY - 200, targetPoint.x + 150, targetPoint.y + 100, targetPoint.x, targetPoint.y);
      ctx.stroke();

      // Drawing the pulsing current node
      const pulseProgress = (time * 0.5) % 1;
      const getBezierPoint = (t: number, p0: any, p1: any, p2: any, p3: any) => {
        const cx = 3 * (p1.x - p0.x);
        const bx = 3 * (p2.x - p1.x) - cx;
        const ax = p3.x - p0.x - cx - bx;
        const cy = 3 * (p1.y - p0.y);
        const by = 3 * (p2.y - p1.y) - cy;
        const ay = p3.y - p0.y - cy - by;

        const xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
        const yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;
        return { x: xt, y: yt };
      };

      const pulsePt = getBezierPoint(
        pulseProgress,
        { x: globeX, y: globeY },
        { x: globeX - 100, y: globeY - 200 },
        { x: targetPoint.x + 150, y: targetPoint.y + 100 },
        targetPoint
      );

      ctx.fillStyle = '#FFC107';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#FFC107';
      ctx.beginPath();
      ctx.arc(pulsePt.x, pulsePt.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Floating 3D Solar Panels
      // We calculate local coordinate projections affected by mouse sway
      const swayX = (mousePosRef.current.x - width / 2) * 0.05;
      const swayY = (mousePosRef.current.y - height / 2) * 0.05;

      panels.forEach((p, idx) => {
        p.rotY += p.speed;
        p.rotX = Math.sin(time * 0.5 + idx) * 0.15;

        // Coordinates adjusted by sway and center
        const posX = globeX + p.x + swayX;
        const posY = globeY + p.y + swayY;

        ctx.save();
        ctx.translate(posX, posY);

        // Apply 3D-like panel rotation outline
        const cosY = Math.cos(p.rotY);
        const sinY = Math.sin(p.rotY);
        const cosX = Math.cos(p.rotX);
        const sinX = Math.sin(p.rotX);

        // Local panel vertices relative to its center
        const pw = 45 * p.scale;
        const ph = 30 * p.scale;

        const vertices = [
          { x: -pw, y: -ph, z: 0 },
          { x: pw, y: -ph, z: 0 },
          { x: pw, y: ph, z: 0 },
          { x: -pw, y: ph, z: 0 },
        ];

        // Project vertices with rotation around X & Y axis
        const projected = vertices.map((v) => {
          // Rot Y
          let x1 = v.x * cosY - v.z * sinY;
          let z1 = v.x * sinY + v.z * cosY;
          // Rot X
          let y2 = v.y * cosX - z1 * sinX;
          let z2 = v.y * sinX + z1 * cosX;

          // Simple perspective projection factor
          const d = 250;
          const factor = d / (d + z2);

          return {
            x: x1 * factor,
            y: y2 * factor,
            z: z2,
          };
        });

        // Drawing Panel backglow
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(11, 143, 77, 0.4)';

        // Panel Surface
        const panelGrad = ctx.createLinearGradient(-pw, -ph, pw, ph);
        panelGrad.addColorStop(0, '#071B2F');
        panelGrad.addColorStop(0.5, '#0F3156');
        panelGrad.addColorStop(1, '#1A5088');

        ctx.fillStyle = panelGrad;
        ctx.strokeStyle = '#4ADE80';
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        for (let k = 1; k < 4; k++) {
          ctx.lineTo(projected[k].x, projected[k].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Solar metal gridlines
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.4)';
        ctx.lineWidth = 0.8;
        ctx.shadowBlur = 0; // disable shadow for interior details

        // Draw longitudinal grids
        for (let step = 0.25; step < 1; step += 0.25) {
          const topX = projected[0].x + (projected[1].x - projected[0].x) * step;
          const topY = projected[0].y + (projected[1].y - projected[0].y) * step;
          const botX = projected[3].x + (projected[2].x - projected[3].x) * step;
          const botY = projected[3].y + (projected[2].y - projected[3].y) * step;

          ctx.beginPath();
          ctx.moveTo(topX, topY);
          ctx.lineTo(botX, botY);
          ctx.stroke();
        }

        // Horizontal partition
        const midLX = (projected[0].x + projected[3].x) / 2;
        const midLY = (projected[0].y + projected[3].y) / 2;
        const midRX = (projected[1].x + projected[2].x) / 2;
        const midRY = (projected[1].y + projected[2].y) / 2;
        ctx.beginPath();
        ctx.moveTo(midLX, midLY);
        ctx.lineTo(midRX, midRY);
        ctx.stroke();

        ctx.restore();
      });

      // Update and Draw floating corporate energy particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Reset if goes off limits
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10 || p.x > width + 10) {
          p.x = Math.random() * width;
        }

        // Draw particle with glow
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0; // restore

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
