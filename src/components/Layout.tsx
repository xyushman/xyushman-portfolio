import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-container">
      <nav className="main-nav" style={{ padding: '40px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="font-mono text-muted" style={{ fontSize: '1.5rem', letterSpacing: '0.1em', color: 'var(--text-main)' }}>
          Ayu.
        </div>

        <div className="nav-links" style={{ display: 'flex', gap: '24px', flexDirection: 'column', alignItems: 'flex-end' }}>
          <a href="#contact" className="nav-link" style={{ fontSize: '0.85rem' }}>Contact</a>
          <a href="#" className="nav-link" style={{ fontSize: '0.85rem' }}>Resume</a>
          <a href="#" className="nav-link" style={{ fontSize: '0.85rem' }}>GitHub</a>
        </div>
      </nav>

      <main className="page-content" style={{ padding: '0' }}>
        {children}
      </main>
    </div>
  );
}
