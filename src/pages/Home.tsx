import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ToolkitNetwork } from '../components/ToolkitNetwork';

const Typewriter = ({ roles }: { roles: string[] }) => {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && text === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(currentRole.substring(0, text.length + (isDeleting ? -1 : 1)));
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, roles]);

  return <span>{text}<span style={{ borderRight: '2px solid #d9663f', animation: 'blink 1s step-end infinite' }}>&nbsp;</span></span>;
};

import { WaveText } from '../components/WaveText';
import { SelectedWork } from '../components/SelectedWork';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Home() {
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [50, 0],
              easing: 'easeOutExpo',
              duration: 1200,
              delay: anime.stagger(100),
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container">

      {/* NEW 100VH HERO WITH TYPEWRITER */}
      <div className="hero-section" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px' }}>
        <h1 style={{ fontSize: '5vw', margin: 0, fontWeight: 800 }}>Hi, I'm Ayushman</h1>
        <h2 style={{ fontSize: '3vw', color: '#d9663f', margin: 0, marginTop: '20px', fontFamily: 'var(--font-mono)' }}>
          - <Typewriter roles={['Cloud', 'DevOps', 'Full Stack', 'AI Builder', 'Competitive Programmer']} />
        </h2>

        <p style={{ fontSize: '1.2vw', opacity: 0.6, marginTop: '20px', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
          Ex Web-Dev intern @ FOSSEE, IIT Bombay | Open Source Contributor | Cloud  & Devops Native Enthusiast
        </p>

        {/* Call to Actions & Socials (From Screenshot) */}
        <div style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Top Row: Main Actions */}
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href="#projects" style={{ backgroundColor: '#d9663f', color: '#000', padding: '16px 32px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.2em', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              VIEW PROJECTS <span style={{ fontSize: '1.2rem', lineHeight: 0 }}>→</span>
            </a>
            <a href="#contact" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '16px 32px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.2em', display: 'inline-flex', alignItems: 'center' }}>
              GET IN TOUCH
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" style={{ color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.2em', opacity: 0.7, marginLeft: '20px' }}>
              RESUME ↓
            </a>
          </div>

          {/* Bottom Row: Social Links */}
          <div style={{ display: 'flex', gap: '50px', alignItems: 'center', opacity: 0.5, fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.2em', flexWrap: 'wrap' }}>
            <a href="https://github.com/xyushman" target="_blank" rel="noreferrer">GITHUB ↗</a>
            <a href="https://www.linkedin.com/in/ayushman-gupta04/" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
            <a href="https://leetcode.com/u/_xyu_sh" target="_blank" rel="noreferrer">LEETCODE ↗</a>
            <a href="https://codeforces.com/profile/HarukiOwO" target="_blank" rel="noreferrer">CODEFORCES ↗</a>
            <a href="https://www.codechef.com/users/xyushman" target="_blank" rel="noreferrer">CODECHEF ↗</a>
          </div>
        </div>
      </div>

      {/* THE 1200VH SCROLL TUNNEL GAP */}
      {/* This invisible space allows the user to scroll for a long time, driving the 3D Text Tunnel Animation! */}
      {!isMobile && (
        <div style={{ height: '1200vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ opacity: 0.2, fontSize: '14px', letterSpacing: '4px' }}>SCROLL — CAMERA TRAVELS THROUGH Z</p>
        </div>
      )}

      {/* 01 ABOUT & PROFILE.JSON (MOVED BELOW THE TUNNEL) */}
      <div className="section intro-section animate-on-scroll" style={{ padding: '150px 40px', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'flex-start' }}>

        {/* LEFT COLUMN: Narrative */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#d9663f', letterSpacing: '0.1em', marginBottom: '40px' }}>
            01 <span style={{ color: 'var(--text-muted)' }}>/ THE_GHOST_IN_THE_SHELL</span>
          </h2>

          <WaveText lines={[
            "An engineer",
            "obsessed with building",
            "systems that scale",
            "effortlessly and",
            "never go down."
          ]} />

          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
            I write code because I like the moment something I built actually works for someone else.
            What started as tinkering has turned into a deep passion for scalable architecture, cloud-native solutions, and building robust systems from the ground up.
          </p>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '60px' }}>
            Right now I'm focused on Cloud & DevOps, architecting infrastructure that doesn't break when it matters. I also enjoy competitive programming and exploring the intersection of AI and full-stack development.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', color: '#d9663f', display: 'flex', alignItems: 'center', gap: '10px', marginRight: '10px' }}>
              <span style={{ width: '20px', height: '1px', backgroundColor: '#d9663f' }}></span>
              CURRENTLY INTO
            </span>
            {['CLOUD NATIVE', 'DEVOPS', 'FULL-STACK', 'AI BUILDER', 'COMPETITIVE PROGRAMMING'].map(tag => (
              <span key={tag} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Data Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

          {/* PROFILE.JSON CARD */}
          <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '40px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '30px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--text-muted)' }}>PROFILE.JSON</span>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#d9663f', borderRadius: '50%' }}></span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-dim)', letterSpacing: '0.1em' }}>NAME</span>
                <span style={{ color: '#fff' }}>Ayushman Gupta</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-dim)', letterSpacing: '0.1em' }}>ROLE</span>
                <span style={{ color: '#fff', textAlign: 'right' }}>Cloud & DevOps · Full-Stack · AI</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-dim)', letterSpacing: '0.1em' }}>BASED</span>
                <span style={{ color: '#fff' }}>India</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-dim)', letterSpacing: '0.1em' }}>STATUS</span>
                <span style={{ color: '#fff', textAlign: 'right', maxWidth: '300px' }}>Open to DevOps & Cloud SRE roles · Internships · Freelance</span>
              </div>
            </div>
          </div>

          {/* STATS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ backgroundColor: '#020202', padding: '40px' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', fontStyle: 'italic', marginBottom: '10px' }}>2+</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-dim)' }}>YEARS SHIPPING</div>
            </div>
            <div style={{ backgroundColor: '#020202', padding: '40px' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', fontStyle: 'italic', marginBottom: '10px' }}>1.3K+</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-dim)' }}>PROBLEMS SOLVED</div>
            </div>
            <div style={{ backgroundColor: '#020202', padding: '40px' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', fontStyle: 'italic', marginBottom: '10px' }}>30+</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-dim)' }}>CONTESTS RATED</div>
            </div>
            <div style={{ backgroundColor: '#020202', padding: '40px' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', fontStyle: 'italic', marginBottom: '10px' }}>99.9%</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-dim)' }}>PROD UPTIME</div>
            </div>
          </div>
        </div>
      </div>

      {/* 02 EXPERIENCE & EDUCATION */}
      <div className="section experience-section animate-on-scroll" style={{ padding: '150px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#d9663f', letterSpacing: '0.1em', marginBottom: '40px' }}>
          02 <span style={{ color: 'var(--text-muted)' }}>/ EXPERIENCE · EDUCATION</span>
        </h2>
        
        <WaveText 
          lines={["Currently building in India."]} 
          style={{ marginBottom: '80px' }} 
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
          
          {/* LEFT LARGE CARD: FOSSEE */}
          <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '40px', backgroundColor: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#d9663f', marginBottom: '30px', textTransform: 'uppercase' }}>
              <span>• LIVE · REMOTE · INDIA</span>
              <span style={{ color: 'var(--text-dim)', textAlign: 'right' }}>MAY 2026<br/>— JULY 2026</span>
            </div>
            
            <div style={{ marginBottom: '40px' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontStyle: 'italic', marginBottom: '10px' }}>
                <a href="https://github.com/xyushman/3psLCCA-web" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>FOSSEE, IIT Bombay ↗</a>
              </h4>
              <div style={{ color: 'var(--text-muted)' }}>Web Development Intern</div>
            </div>

            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '30px' }}>
              3psLCCA — Life Cycle Cost Assessment
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <span style={{ color: '#d9663f' }}>—</span>
                <span>Engineered the core web application for 3psLCCA, building a modern, responsive React and Vite architecture with interactive D3.js data visualizations.</span>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <span style={{ color: '#d9663f' }}>—</span>
                <span>Implemented dynamic data rendering, interactive charts with Recharts, and automated PDF report generation directly in the browser using jsPDF.</span>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <span style={{ color: '#d9663f' }}>—</span>
                <span>Streamlined deployment pipelines using Docker and AWS, establishing a robust CI/CD workflow that reduced downtime and enabled rapid iteration.</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '40px' }}>
              {['REACT', 'VITE', 'D3.JS', 'RECHARTS', 'DOCKER'].map(tag => (
                <span key={tag} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: STACKED CARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* RIGHT TOP CARD: Freelance / Prior */}
            <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '40px', backgroundColor: 'rgba(255,255,255,0.02)', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#d9663f', marginBottom: '30px', textTransform: 'uppercase' }}>
                PRIOR · INDEPENDENT
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontStyle: 'italic', marginBottom: '10px' }}>Cloud Infrastructure & DevOps</h4>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Freelance Engineer</div>
              </div>

              <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px', flex: 1 }}>
                Designed and shipped robust CI/CD pipelines and managed scalable AWS infrastructure for early-stage startups, establishing high availability ahead of rollout.
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
                {['AWS', 'KUBERNETES', 'TERRAFORM', 'CI/CD'].map(tag => (
                  <span key={tag} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{tag}</span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                <span>DECEMBER 2023 — MAY 2024</span>
                <span style={{ color: '#fff' }}>LIVE ↗</span>
              </div>
            </div>

            {/* RIGHT BOTTOM CARD: Education */}
            <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '40px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#d9663f', marginBottom: '30px', textTransform: 'uppercase' }}>
                EDUCATION
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontStyle: 'italic', marginBottom: '10px' }}>Vellore Institute of Technology, Bhopal</h4>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>Bachelor of Technology — Computer Science and Engineering</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginTop: '30px' }}>
                <span>BHOPAL, INDIA</span>
                <span>SEPTEMBER 2023 — MAY 2027</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 03 EXPERIENCE TICKER */}
      <div className="section ticker-section" style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="ticker-content" style={{ display: 'flex', gap: '40px', paddingRight: '40px', animation: 'scroll-left 20s linear infinite' }}>
              <span style={{ fontSize: '4vw' }}>KUBERNETES</span>
              <span style={{ fontSize: '4vw', opacity: 0.5 }}>—</span>
              <span style={{ fontSize: '4vw' }}>AWS</span>
              <span style={{ fontSize: '4vw', opacity: 0.5 }}>—</span>
              <span style={{ fontSize: '4vw' }}>TERRAFORM</span>
              <span style={{ fontSize: '4vw', opacity: 0.5 }}>—</span>
              <span style={{ fontSize: '4vw' }}>DOCKER</span>
              <span style={{ fontSize: '4vw', opacity: 0.5 }}>—</span>
              <span style={{ fontSize: '4vw' }}>CI/CD</span>
              <span style={{ fontSize: '4vw', opacity: 0.5 }}>—</span>
            </div>
          ))}
        </div>
      </div>

      {/* 03 TOOLKIT NETWORK */}
      <ToolkitNetwork />

      {/* 04 SELECTED WORK */}
      <SelectedWork />

      {/* 08 CONTACT */}
      <div className="section animate-on-scroll" style={{ padding: '200px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', opacity: 0.5, marginBottom: '50px' }}>08 / CONTACT</h2>
        <a href="mailto:contact@example.com" style={{ fontSize: '8vw', textDecoration: 'none', color: '#fff', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '10px', display: 'inline-block' }}>
          INITIATE HANDSHAKE
        </a>
      </div>
    </div>
  );
}
