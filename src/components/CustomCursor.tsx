import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Ghost } from 'lucide-react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 30); // 60px width / 2
      cursorY.set(e.clientY - 30); // 60px height / 2

      const target = e.target as HTMLElement;
      if (!target || typeof target.closest !== 'function') return;

      const isHoverable = 
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.glass-card') ||
        target.closest('.main-nav') ||
        target.closest('.site-footer');

      setIsHovering(!!isHoverable);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <Ghost size={24} color="black" style={{ opacity: 0.8 }} />
    </motion.div>
  );
}
