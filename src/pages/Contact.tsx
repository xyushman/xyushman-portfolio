import React, { useEffect } from 'react';
import anime from 'animejs';

export default function Contact() {
  useEffect(() => {
    anime({
      targets: '.access-item',
      translateY: [30, 0],
      opacity: [0, 1],
      delay: anime.stagger(150, { start: 100 }),
      easing: 'easeOutCubic',
      duration: 1000,
    });
  }, []);

  return (
    <div className="contact-page">
      <div className="access-item" style={{ marginBottom: '80px', textAlign: 'center' }}>
        <h1 className="font-serif" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', marginBottom: '24px', color: 'var(--text-main)' }}>
          Let's build something <br />
          <span className="font-serif-italic">extraordinary</span>.
        </h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
          I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </div>

      <div className="access-item" style={{ display: 'flex', justifyContent: 'center', marginBottom: '100px' }}>
        <a href="mailto:hello@ayushman.cloud" className="btn-primary" style={{ padding: '20px 40px', fontSize: '1rem' }}>
          hello@ayushman.cloud
        </a>
      </div>

      <div className="access-item grid-3" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span className="font-mono text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Socials</span>
          <a href="#" className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>Twitter / X ↗</a>
          <a href="#" className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>LinkedIn ↗</a>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span className="font-mono text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Code</span>
          <a href="#" className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>GitHub ↗</a>
          <a href="#" className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>Codeforces ↗</a>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span className="font-mono text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Location</span>
          <span className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>Kerala, India</span>
          <span className="font-serif text-dim" style={{ fontSize: '1.4rem' }}>10:45 PM Local Time</span>
        </div>
      </div>
    </div>
  );
}
