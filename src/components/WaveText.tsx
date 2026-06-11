import React from 'react';
import { motion } from 'framer-motion';

export const WaveText = ({ lines, style }: { lines: string[], style?: React.CSSProperties }) => {
  let wordIndex = 0;

  return (
    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: '1.1', marginBottom: '40px', ...style }}>
      {lines.map((line, lineIndex) => {
        const words = line.split(" ");
        return (
          <React.Fragment key={lineIndex}>
            {words.map((word, wIndex) => {
              const currentDelay = wordIndex * 0.15;
              wordIndex++;
              return (
                <React.Fragment key={wIndex}>
                  <motion.span
                    style={{ display: 'inline-block' }}
                    animate={{
                      color: ["rgba(255,255,255,1)", "rgba(217,102,63,0)", "rgba(255,255,255,1)"],
                      WebkitTextStroke: ["2px rgba(217,102,63,0)", "2px rgba(217,102,63,1)", "2px rgba(217,102,63,0)"]
                    } as any}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                      delay: currentDelay,
                      times: [0, 0.5, 1]
                    }}
                  >
                    {word}
                  </motion.span>
                  {wIndex < words.length - 1 && <span>&nbsp;</span>}
                </React.Fragment>
              );
            })}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </h3>
  );
};
