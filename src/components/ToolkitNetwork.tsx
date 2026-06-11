import React, { useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SKILLS } from '../data/skills';
import type { Category } from '../data/skills';
import { WaveText } from './WaveText';

const CATEGORIES: Category[] = [
  'LANGUAGES', 'FRONTEND', 'BACKEND', 'DATABASES', 'INFRA - DEVOPS', 'AI / ML'
];

export const ToolkitNetwork = () => {
  const [activeCategory, setActiveCategory] = React.useState<Category | 'ALL'>('ALL');
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["-15deg", "15deg"]); 
  const translateX = useTransform(smoothX, [-0.5, 0.5], ["30px", "-30px"]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], ["30px", "-30px"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const activeNodes = useMemo(() => {
    if (activeCategory === 'ALL') return SKILLS;
    return SKILLS.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  const lines = useMemo(() => {
    const arr = [];
    const threshold = activeCategory === 'ALL' ? 15 : 30; // tighter connections if ALL is selected
    for (let i = 0; i < activeNodes.length; i++) {
      for (let j = i + 1; j < activeNodes.length; j++) {
        const n1 = activeNodes[i];
        const n2 = activeNodes[j];
        const dist = Math.sqrt(Math.pow(n1.x - n2.x, 2) + Math.pow(n1.y - n2.y, 2));
        if (dist < threshold) {
          arr.push({ 
            id: `${n1.id}-${n2.id}`, 
            x1: n1.x, y1: n1.y, x2: n2.x, y2: n2.y, 
            color: activeCategory === 'ALL' ? 'rgba(255,255,255,0.05)' : n1.color 
          });
        }
      }
    }
    return arr;
  }, [activeNodes, activeCategory]);

  return (
    <div className="section animate-on-scroll" style={{ padding: '150px 40px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Title */}
      <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#d9663f', letterSpacing: '0.1em', marginBottom: '20px' }}>
        03 <span style={{ color: 'var(--text-muted)' }}>/ TOOLKIT</span>
      </h2>
      <WaveText lines={["The Neural Network."]} style={{ fontSize: '5rem', marginBottom: '60px' }} />

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <button 
          onClick={() => setActiveCategory('ALL')}
          style={{ 
            backgroundColor: activeCategory === 'ALL' ? '#d9663f' : 'transparent',
            color: activeCategory === 'ALL' ? '#000' : 'var(--text-muted)',
            border: activeCategory === 'ALL' ? '1px solid #d9663f' : '1px solid rgba(255,255,255,0.1)',
            padding: '10px 20px',
            fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em',
            cursor: 'pointer', transition: 'all 0.3s ease'
          }}
        >
          ALL ({SKILLS.length})
        </button>
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{ 
              backgroundColor: activeCategory === cat ? '#d9663f' : 'transparent',
              color: activeCategory === cat ? '#000' : 'var(--text-muted)',
              border: activeCategory === cat ? '1px solid #d9663f' : '1px solid rgba(255,255,255,0.1)',
              padding: '10px 20px',
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em',
              cursor: 'pointer', transition: 'all 0.3s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stage */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ position: 'relative', height: '600px', width: '100%', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', perspective: '1200px' }}
      >
        <motion.div
          style={{
            width: '100%', height: '100%', position: 'absolute',
            rotateX, rotateY, x: translateX, y: translateY,
            transformStyle: 'preserve-3d'
          }}
        >
        {/* SVG Lines */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {lines.map(line => (
            <line 
              key={line.id}
              x1={`${line.x1}%`} y1={`${line.y1}%`} x2={`${line.x2}%`} y2={`${line.y2}%`}
              stroke={line.color}
              strokeWidth={activeCategory === 'ALL' ? 1 : 2}
              opacity={activeCategory === 'ALL' ? 0.3 : 0.6}
              style={{ transition: 'all 0.5s ease' }}
            />
          ))}
        </svg>

        {/* Nodes */}
        {SKILLS.map(skill => {
          const isActive = activeCategory === 'ALL' || skill.category === activeCategory;
          const Icon = skill.icon;
          
          return (
            <div 
              key={skill.id}
              title={skill.label}
              style={{
                position: 'absolute',
                left: `${skill.x}%`,
                top: `${skill.y}%`,
                transform: `translate(-50%, -50%) ${isActive ? 'translateY(-6px) scale(1.15)' : 'scale(1)'}`,
                opacity: isActive ? 1 : 0.1,
                filter: isActive 
                  ? `drop-shadow(0 15px 15px rgba(0,0,0,0.6)) drop-shadow(0 5px 5px rgba(0,0,0,0.4)) drop-shadow(0 0 25px ${skill.color})` 
                  : 'grayscale(100%)',
                color: isActive ? skill.color : '#ffffff',
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Adds a bouncy 3D spring effect
                zIndex: isActive ? 10 : 1,
                cursor: 'pointer'
              }}
            >
              <Icon size={isActive ? 46 : 30} style={{ transition: 'all 0.5s ease' }} />
            </div>
          );
        })}
        </motion.div>
      </div>

      {/* Summary Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1px', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', marginTop: '40px' }}>
        {CATEGORIES.map(cat => {
          const count = SKILLS.filter(s => s.category === cat).length;
          return (
            <div key={cat} style={{ backgroundColor: '#020202', padding: '30px 20px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontStyle: 'italic', marginBottom: '10px', color: '#d9663f' }}>
                {count}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--text-dim)' }}>
                {cat}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
