import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { ExternalLink, Award, ShieldCheck, Cpu, Server, Sparkles, Plus, Code2, ArrowDown } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useIsMobile } from '../hooks/useIsMobile';

interface ProjectData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  badge?: string;
  icon: React.ReactNode;
  bullets: React.ReactNode[];
  tags: string[];
  githubUrl: string;
  gradient: string;
  accentColor: string;
}

const FEATURED_PROJECTS: ProjectData[] = [
  {
    id: 'stackbucks',
    number: '01',
    title: 'StackBucks',
    subtitle: 'End-to-End DevSecOps CI/CD Pipeline',
    category: 'DEVSECOPS · CI/CD · CLOUD',
    icon: <ShieldCheck size={24} />,
    bullets: [
      <>Eliminated manual deployment risk by building a <strong style={{ color: '#fff', fontWeight: 600 }}>full Jenkins CI/CD pipeline</strong> that containerises a Next.js app with <strong style={{ color: '#fff', fontWeight: 600 }}>Docker</strong> and deploys to <strong style={{ color: '#fff', fontWeight: 600 }}>Amazon EKS</strong>, reducing deployment to a <strong style={{ color: '#d9663f', fontWeight: 600 }}>single automated trigger</strong> via Jenkinsfile-driven GitOps.</>,
      <>Hardened the pipeline with <strong style={{ color: '#fff', fontWeight: 600 }}>Trivy</strong> image scanning, <strong style={{ color: '#fff', fontWeight: 600 }}>SonarQube SAST</strong>, and <strong style={{ color: '#fff', fontWeight: 600 }}>OWASP</strong> dependency checks at every stage, then surfaced cluster health through <strong style={{ color: '#fff', fontWeight: 600 }}>Prometheus + Grafana</strong> dashboards for real-time observability — implementing a <strong style={{ color: '#d9663f', fontWeight: 600 }}>shift-left security</strong> approach across the full SDLC.</>
    ],
    tags: ['Jenkins', 'Docker', 'Amazon EKS', 'GitOps', 'Trivy', 'SonarQube', 'OWASP', 'Prometheus', 'Grafana', 'Next.js'],
    githubUrl: 'https://github.com/xyushman',
    gradient: 'radial-gradient(circle at top right, rgba(217, 102, 63, 0.15), transparent 60%)',
    accentColor: '#d9663f'
  },
  {
    id: 'alchemyst',
    number: '02',
    title: 'Alchemyst AI',
    subtitle: 'Distributed Inference System',
    category: 'DISTRIBUTED SYSTEMS · INFRASTRUCTURE AS CODE',
    icon: <Cpu size={24} />,
    bullets: [
      <>Reduced infrastructure provisioning time to <strong style={{ color: '#38bdf8', fontWeight: 600 }}>near-zero</strong> by authoring <strong style={{ color: '#fff', fontWeight: 600 }}>Terraform IaC</strong> for a complete AWS environment (VPC, public/private subnets, NAT gateway, security groups, Elastic IP) with <strong style={{ color: '#fff', fontWeight: 600 }}>Ansible inventory auto-generated</strong> from Terraform outputs, eliminating all manual click-ops.</>,
      <>Achieved reliable <strong style={{ color: '#fff', fontWeight: 600 }}>distributed RPC inference</strong> across multiple EC2 instances through <strong style={{ color: '#fff', fontWeight: 600 }}>Ansible playbooks</strong> for end-to-end configuration management, removing manual server setup and enforcing <strong style={{ color: '#38bdf8', fontWeight: 600 }}>idempotent provisioning</strong>.</>
    ],
    tags: ['AWS', 'Terraform', 'Ansible', 'RPC', 'EC2', 'VPC', 'IaC', 'Python'],
    githubUrl: 'https://github.com/xyushman',
    gradient: 'radial-gradient(circle at top right, rgba(56, 189, 248, 0.15), transparent 60%)',
    accentColor: '#38bdf8'
  },
  {
    id: 'zenith',
    number: '03',
    title: 'Zenith',
    subtitle: 'AI-Powered Developer Security Platform',
    category: 'DEVSECOPS · AI TOOLING · HACKATHON WINNER',
    badge: '★ Top 100 / 30,000+ AMD Slingshot',
    icon: <Award size={24} />,
    bullets: [
      <>Prevented secret leakage at commit time by building a <strong style={{ color: '#fff', fontWeight: 600 }}>real-time VS Code extension</strong> (TypeScript) that performs <strong style={{ color: '#a855f7', fontWeight: 600 }}>inline SAST detection</strong> of hardcoded API keys and credentials as the developer types — with zero build-step overhead.</>,
      <>Reduced manual security audit time to a <strong style={{ color: '#a855f7', fontWeight: 600 }}>single CLI command</strong> by implementing a <strong style={{ color: '#fff', fontWeight: 600 }}>Python Click + Rich</strong> tool that produces colour-coded vulnerability reports, enabling plug-and-play <strong style={{ color: '#fff', fontWeight: 600 }}>CI/CD pipeline integration</strong>.</>
    ],
    tags: ['TypeScript', 'Python', 'VS Code Extension', 'SAST', 'Security', 'Click', 'Rich', 'AI'],
    githubUrl: 'https://github.com/xyushman',
    gradient: 'radial-gradient(circle at top right, rgba(168, 85, 247, 0.15), transparent 60%)',
    accentColor: '#a855f7'
  }
];

const MORE_PROJECTS: ProjectData[] = [
  {
    id: 'aws-multiaz',
    number: '04',
    title: 'AWS Multi-AZ App',
    subtitle: 'Load-Balanced Cloud-Native Web Application',
    category: 'CLOUD ARCHITECTURE · HIGH AVAILABILITY',
    icon: <Server size={24} />,
    bullets: [
      <>Achieved <strong style={{ color: '#10b981', fontWeight: 600 }}>high availability</strong> for a cloud-native web application by provisioning a <strong style={{ color: '#fff', fontWeight: 600 }}>multi-AZ AWS environment</strong> (VPC, public subnets, EC2, ALB) entirely via <strong style={{ color: '#fff', fontWeight: 600 }}>Terraform IaC</strong>, eliminating manual infrastructure management.</>,
      <>Enforced <strong style={{ color: '#10b981', fontWeight: 600 }}>least-privilege cloud security</strong> by configuring granular <strong style={{ color: '#fff', fontWeight: 600 }}>IAM roles</strong> and automating Apache server provisioning via <strong style={{ color: '#fff', fontWeight: 600 }}>Bash user-data scripts</strong>, applying AWS governance and Linux sysadmin best practices.</>
    ],
    tags: ['AWS', 'Multi-AZ', 'ALB', 'Terraform IaC', 'IAM', 'Bash', 'Linux', 'Security'],
    githubUrl: 'https://github.com/xyushman',
    gradient: 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.15), transparent 60%)',
    accentColor: '#10b981'
  },
  {
    id: 'fossee-3pslcca',
    number: '05',
    title: '3psLCCA Suite',
    subtitle: 'Life Cycle Cost Assessment Architecture @ IIT Bombay',
    category: 'FULL STACK · DATA VISUALIZATION',
    icon: <Code2 size={24} />,
    bullets: [
      <>Engineered the core web application for 3psLCCA at <strong style={{ color: '#fff', fontWeight: 600 }}>FOSSEE, IIT Bombay</strong>, building a modern React + Vite architecture with interactive <strong style={{ color: '#f59e0b', fontWeight: 600 }}>D3.js & Recharts</strong> data visualizations.</>,
      <>Streamlined container deployment workflows using <strong style={{ color: '#fff', fontWeight: 600 }}>Docker and AWS</strong>, enabling automated PDF report generation directly in the browser and establishing zero-downtime CI/CD pipelines.</>
    ],
    tags: ['React', 'Vite', 'D3.js', 'Recharts', 'Docker', 'AWS', 'JavaScript'],
    githubUrl: 'https://github.com/xyushman/3psLCCA-web',
    gradient: 'radial-gradient(circle at top right, rgba(245, 158, 11, 0.15), transparent 60%)',
    accentColor: '#f59e0b'
  }
];

export const SelectedWork: React.FC = () => {
  const isMobile = useIsMobile();
  const moreRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const scroll = useScroll();
  const progress = useMotionValue(0);
  const yValue = useMotionValue(0);
  const xTransform = useTransform(progress, [0, 1], ['0vw', isMobile ? '-270vw' : '-195vw']);
  const progressWidth = useTransform(progress, [0, 1], ['0%', '100%']);

  useFrame(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const maxScroll = 3 * vh;

    // -rect.top is exact physical pixels the 400vh container has scrolled past the top of the browser viewport
    const scrolled = -rect.top;

    if (scrolled <= 0) {
      progress.set(0);
      yValue.set(0);
    } else if (scrolled <= maxScroll) {
      progress.set(scrolled / maxScroll);
      yValue.set(scrolled);
    } else {
      progress.set(1);
      yValue.set(maxScroll);
    }
  });

  const handleLoadMore = () => {
    setShowMore(true);
    setTimeout(() => {
      moreRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const renderCard = (project: ProjectData, isFullWidth = false) => (
    <div
      key={project.id}
      style={{
        width: isFullWidth ? '100%' : (isMobile ? '85vw' : '60vw'),
        height: 'auto',
        maxHeight: isFullWidth ? 'none' : (isMobile ? 'none' : '68vh'),
        minHeight: isFullWidth ? '400px' : 'auto',
        flexShrink: 0,
        background: 'rgba(10, 10, 10, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        padding: isMobile ? '25px' : '35px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflowY: 'auto',
        backgroundImage: project.gradient,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Top Row */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: project.accentColor, letterSpacing: '0.15em' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {project.icon} PROJECT {project.number}
            </span>
            <span style={{ color: 'var(--text-dim)' }}>//</span>
            <span style={{ color: 'var(--text-muted)' }}>{project.category}</span>
          </div>
          {project.badge && (
            <span style={{ background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.4)', color: '#e9d5ff', padding: '6px 14px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
              {project.badge}
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '15px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2.2rem' : '2.8rem', fontStyle: 'italic', color: '#fff', margin: 0, lineHeight: 1.1 }}>
              {project.title}
            </h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              {project.subtitle}
            </div>
          </div>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.03)',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = project.accentColor;
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            }}
          >
            <FaGithub size={18} /> SOURCE <ExternalLink size={14} style={{ opacity: 0.7 }} />
          </a>
        </div>

        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)', marginBottom: '18px' }} />

        {/* Bullets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5', maxWidth: '95%' }}>
          {project.bullets.map((bullet, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: project.accentColor, fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '1.1rem', lineHeight: '1.3' }}>&gt;</span>
              <div>{bullet}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Tags Bottom Row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'var(--text-muted)',
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.05em'
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  // The 4th slide / End Card with the user's exact wording
  const renderEndCard = () => (
    <div
      style={{
        width: isMobile ? '85vw' : '60vw',
        height: 'auto',
        minHeight: isMobile ? '300px' : '380px',
        flexShrink: 0,
        background: 'linear-gradient(135deg, rgba(217, 102, 63, 0.15), rgba(10, 10, 10, 0.95))',
        border: '1px solid rgba(217, 102, 63, 0.4)',
        padding: isMobile ? '30px' : '45px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#d9663f', letterSpacing: '0.2em', marginBottom: '15px' }}>
        <Code2 size={18} /> <span>SYSTEM_ARCHIVE // DECRYPTED</span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2.4rem' : '3.5rem', fontStyle: 'italic', color: '#fff', margin: 0, marginBottom: '20px', lineHeight: 1.1 }}>
        Beyond the Surface.
      </h3>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.9rem' : '1.05rem', color: 'var(--text-main)', maxWidth: '650px', lineHeight: '1.7', marginBottom: '35px', opacity: 0.85 }}>
        You've explored the primary nodes. The remaining builds are production-grade cloud infrastructures and full-stack pipelines running in the wild — initialize the next sequence.
      </p>

      {!showMore ? (
        <button
          onClick={handleLoadMore}
          style={{
            background: '#d9663f',
            color: '#000',
            border: 'none',
            padding: '18px 40px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.95rem',
            letterSpacing: '0.2em',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 0 30px rgba(217, 102, 63, 0.4)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Plus size={18} /> INITIALIZE NEXT BATCH <ArrowDown size={18} />
        </button>
      ) : (
        <div style={{ fontFamily: 'var(--font-mono)', color: '#d9663f', fontSize: '1rem', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>SCROLL DOWN TO VIEW BATCH ↓</span>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div id="projects" className="section" style={{ padding: '100px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#d9663f', letterSpacing: '0.1em', marginBottom: '40px' }}>
          03 <span style={{ color: 'var(--text-muted)' }}>/ SELECTED WORK</span>
        </h2>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontStyle: 'italic', marginBottom: '50px', color: '#fff' }}>
          Production-grade systems & cloud architecture.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {FEATURED_PROJECTS.map((project) => renderCard(project))}
          {renderEndCard()}

          <AnimatePresence>
            {showMore && (
              <motion.div
                ref={moreRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '20px' }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#d9663f', letterSpacing: '0.2em', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
                  NEXT BATCH // SHIPPED PRODUCTION BUILDS
                </div>
                {MORE_PROJECTS.map((project) => renderCard(project))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div id="projects">
      <div ref={sectionRef} style={{ height: '400vh', position: 'relative' }}>
        <motion.div style={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          overflow: 'hidden', 
          position: 'relative',
          y: yValue
        }}>

          {/* Section Header */}
          <div style={{ position: 'absolute', top: '50px', left: '60px', zIndex: 10 }}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#d9663f', letterSpacing: '0.1em', margin: 0 }}>
              04 <span style={{ color: 'var(--text-muted)' }}>/ SELECTED WORK</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--text-dim)', margin: 0, marginTop: '8px' }}>
              Production-grade systems & cloud architecture
            </p>
          </div>

          {/* Scroll Progress Bar Top */}
          <div style={{ position: 'absolute', top: '130px', left: '60px', right: '60px', height: '1px', background: 'rgba(255, 255, 255, 0.1)', zIndex: 10 }}>
            <motion.div style={{ height: '100%', background: '#d9663f', width: progressWidth }} />
          </div>

          {/* Horizontal Motion Container panning left-to-right across items */}
          <motion.div
            style={{
              display: 'flex',
              gap: '5vw',
              paddingLeft: isMobile ? '7.5vw' : '20vw',
              paddingRight: '20vw',
              x: xTransform,
              alignItems: 'center',
              marginTop: '15px'
            }}
          >
            {FEATURED_PROJECTS.map((project) => renderCard(project))}
            {renderEndCard()}
          </motion.div>

          {/* Bottom Helper */}
          <div style={{ position: 'absolute', bottom: '40px', left: '60px', display: 'flex', alignItems: 'center', gap: '15px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
            <span>SCROLL DOWN TO PAN ACROSS WORK</span>
            <span style={{ color: '#d9663f' }}>→</span>
          </div>
        </motion.div>
      </div>

      {/* Expanded Grid when Load More is clicked */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            ref={moreRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ padding: '100px 60px', maxWidth: '1400px', margin: '0 auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '20px', marginBottom: '60px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#d9663f', letterSpacing: '0.2em' }}>
                NEXT BATCH // SHIPPED PRODUCTION BUILDS
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                100% FEATURE PARITY · CLOUD NATIVE
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
              {MORE_PROJECTS.map((project) => renderCard(project, true))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
