import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform, AnimatePresence, useMotionValue } from 'framer-motion';
import { ExternalLink, Award, ShieldCheck, Cpu, Server, Plus, Code2, ArrowDown, Activity, Terminal, ShieldAlert, GitBranch, Database, Cloud, CheckCircle2, Package } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useIsMobile } from '../hooks/useIsMobile';

interface ProjectData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  badge?: string;
  status: string;
  icon: React.ReactNode;
  bullets: React.ReactNode[];
  tags: string[];
  githubUrl: string;
  accentColor: string;
  schematicType: 'cicd' | 'cloud' | 'sast' | 'multiaz' | 'fullstack';
}

const FEATURED_PROJECTS: ProjectData[] = [
  {
    id: 'stackbucks',
    number: '01',
    title: 'StackBucks',
    subtitle: 'End-to-End DevSecOps CI/CD Pipeline',
    category: 'DEVSECOPS · CI/CD · CLOUD',
    status: 'ONLINE // DEPLOYED',
    icon: <ShieldCheck size={20} />,
    schematicType: 'cicd',
    bullets: [
      <>Eliminated manual deployment risk by building a <strong style={{ color: '#fff', fontWeight: 600 }}>full Jenkins CI/CD pipeline</strong> that containerises a Next.js app with <strong style={{ color: '#fff', fontWeight: 600 }}>Docker</strong> and deploys to <strong style={{ color: '#fff', fontWeight: 600 }}>Amazon EKS</strong>, reducing deployment to a <strong style={{ color: '#d9663f', fontWeight: 600 }}>single automated trigger</strong> via Jenkinsfile-driven GitOps.</>,
      <>Hardened the pipeline with <strong style={{ color: '#fff', fontWeight: 600 }}>Trivy</strong> image scanning, <strong style={{ color: '#fff', fontWeight: 600 }}>SonarQube SAST</strong>, and <strong style={{ color: '#fff', fontWeight: 600 }}>OWASP</strong> dependency checks at every stage, then surfaced cluster health through <strong style={{ color: '#fff', fontWeight: 600 }}>Prometheus + Grafana</strong> dashboards for real-time observability.</>
    ],
    tags: ['Jenkins', 'Docker', 'Amazon EKS', 'GitOps', 'Trivy', 'SonarQube', 'OWASP', 'Prometheus', 'Grafana', 'Next.js'],
    githubUrl: 'https://github.com/xyushman',
    accentColor: '#d9663f'
  },
  {
    id: 'alchemyst',
    number: '02',
    title: 'Alchemyst AI',
    subtitle: 'Distributed Inference System',
    category: 'DISTRIBUTED SYSTEMS · IaC',
    status: 'ACTIVE // CLUSTER',
    icon: <Cpu size={20} />,
    schematicType: 'cloud',
    bullets: [
      <>Reduced infrastructure provisioning time to <strong style={{ color: '#38bdf8', fontWeight: 600 }}>near-zero</strong> by authoring <strong style={{ color: '#fff', fontWeight: 600 }}>Terraform IaC</strong> for a complete AWS environment (VPC, public/private subnets, NAT gateway, security groups, Elastic IP) with <strong style={{ color: '#fff', fontWeight: 600 }}>Ansible inventory auto-generated</strong> from Terraform outputs.</>,
      <>Achieved reliable <strong style={{ color: '#fff', fontWeight: 600 }}>distributed RPC inference</strong> across multiple EC2 instances through <strong style={{ color: '#fff', fontWeight: 600 }}>Ansible playbooks</strong> for end-to-end configuration management, removing manual server setup and enforcing <strong style={{ color: '#38bdf8', fontWeight: 600 }}>idempotent provisioning</strong>.</>
    ],
    tags: ['AWS', 'Terraform', 'Ansible', 'RPC', 'EC2', 'VPC', 'IaC', 'Python'],
    githubUrl: 'https://github.com/xyushman',
    accentColor: '#38bdf8'
  },
  {
    id: 'zenith',
    number: '03',
    title: 'Zenith',
    subtitle: 'AI-Powered Developer Security Platform',
    category: 'DEVSECOPS · AI TOOLING',
    badge: '★ Top 100 / 30,000+ AMD Slingshot',
    status: 'V1.4 // LIVE',
    icon: <Award size={20} />,
    schematicType: 'sast',
    bullets: [
      <>Prevented secret leakage at commit time by building a <strong style={{ color: '#fff', fontWeight: 600 }}>real-time VS Code extension</strong> (TypeScript) that performs <strong style={{ color: '#a855f7', fontWeight: 600 }}>inline SAST detection</strong> of hardcoded API keys and credentials as the developer types — with zero build-step overhead.</>,
      <>Reduced manual security audit time to a <strong style={{ color: '#a855f7', fontWeight: 600 }}>single CLI command</strong> by implementing a <strong style={{ color: '#fff', fontWeight: 600 }}>Python Click + Rich</strong> tool that produces colour-coded vulnerability reports, enabling plug-and-play <strong style={{ color: '#fff', fontWeight: 600 }}>CI/CD pipeline integration</strong>.</>
    ],
    tags: ['TypeScript', 'Python', 'VS Code Extension', 'SAST', 'Security', 'Click', 'Rich', 'AI'],
    githubUrl: 'https://github.com/xyushman',
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
    status: 'MULTI-AZ // PROD',
    icon: <Server size={20} />,
    schematicType: 'multiaz',
    bullets: [
      <>Achieved <strong style={{ color: '#10b981', fontWeight: 600 }}>high availability</strong> for a cloud-native web application by provisioning a <strong style={{ color: '#fff', fontWeight: 600 }}>multi-AZ AWS environment</strong> (VPC, public subnets, EC2, ALB) entirely via <strong style={{ color: '#fff', fontWeight: 600 }}>Terraform IaC</strong>, eliminating manual infrastructure management.</>,
      <>Enforced <strong style={{ color: '#10b981', fontWeight: 600 }}>least-privilege cloud security</strong> by configuring granular <strong style={{ color: '#fff', fontWeight: 600 }}>IAM roles</strong> and automating Apache server provisioning via <strong style={{ color: '#fff', fontWeight: 600 }}>Bash user-data scripts</strong>.</>
    ],
    tags: ['AWS', 'Multi-AZ', 'ALB', 'Terraform IaC', 'IAM', 'Bash', 'Linux', 'Security'],
    githubUrl: 'https://github.com/xyushman',
    accentColor: '#10b981'
  },
  {
    id: 'fossee-3pslcca',
    number: '05',
    title: '3psLCCA Suite',
    subtitle: 'Life Cycle Cost Assessment Architecture @ IIT Bombay',
    category: 'FULL STACK · DATA VISUALIZATION',
    status: 'RESEARCH // IITB',
    icon: <Code2 size={20} />,
    schematicType: 'fullstack',
    bullets: [
      <>Engineered the core web application for 3psLCCA at <strong style={{ color: '#fff', fontWeight: 600 }}>FOSSEE, IIT Bombay</strong>, building a modern React + Vite architecture with interactive <strong style={{ color: '#f59e0b', fontWeight: 600 }}>D3.js & Recharts</strong> data visualizations.</>,
      <>Streamlined container deployment workflows using <strong style={{ color: '#fff', fontWeight: 600 }}>Docker and AWS</strong>, enabling automated PDF report generation directly in the browser and establishing zero-downtime CI/CD pipelines.</>
    ],
    tags: ['React', 'Vite', 'D3.js', 'Recharts', 'Docker', 'AWS', 'JavaScript'],
    githubUrl: 'https://github.com/xyushman/3psLCCA-web',
    accentColor: '#f59e0b'
  }
];

// Interactive Cyber Schematic Header component simulating live terminal / architectural telemetry
const CyberSchematic: React.FC<{ type: ProjectData['schematicType']; accentColor: string }> = ({ type, accentColor }) => {
  if (type === 'cicd') {
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#fff', background: 'rgba(0,0,0,0.6)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: accentColor, fontSize: '0.7rem', letterSpacing: '0.1em' }}>
          <span>PIPELINE_TELEMETRY // GITOPS_STREAM</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Activity size={12} /> SYNCED</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {['GIT COMMIT', 'JENKINS BUILD', 'TRIVY SCAN', 'SONARQUBE SAST', 'EKS DEPLOY'].map((step, i) => (
            <React.Fragment key={step}>
              <div style={{ background: 'rgba(217, 102, 63, 0.15)', border: `1px solid ${accentColor}`, padding: '6px 10px', borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={12} color={accentColor} /> <span>{step}</span>
              </div>
              {i < 4 && <span style={{ color: 'var(--text-dim)' }}>→</span>}
            </React.Fragment>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '4px', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '10px' }}>
          <div><span style={{ color: 'var(--text-dim)' }}>PODS:</span> <strong style={{ color: accentColor }}>12/12 RUNNING</strong></div>
          <div><span style={{ color: 'var(--text-dim)' }}>SAST:</span> <strong style={{ color: '#10b981' }}>0 CRITICAL</strong></div>
          <div><span style={{ color: 'var(--text-dim)' }}>LATENCY:</span> <strong>14.2ms</strong></div>
        </div>
      </div>
    );
  }

  if (type === 'cloud') {
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#fff', background: 'rgba(0,0,0,0.6)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: accentColor, fontSize: '0.7rem', letterSpacing: '0.1em' }}>
          <span>AWS_TOPOLOGY // TERRAFORM_IAC</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Cloud size={12} /> VPC-ID: vpc-08a9f</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <div style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '10px' }}>
            <div style={{ color: accentColor }}>SUBNET-PUBLIC-1</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '4px' }}>NAT GATEWAY · ALB</div>
          </div>
          <div style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '10px' }}>
            <div style={{ color: accentColor }}>EC2-RPC-NODE-01</div>
            <div style={{ fontSize: '0.65rem', color: '#10b981', marginTop: '4px' }}>ANSIBLE PROVISIONED</div>
          </div>
          <div style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '10px' }}>
            <div style={{ color: accentColor }}>EC2-RPC-NODE-02</div>
            <div style={{ fontSize: '0.65rem', color: '#10b981', marginTop: '4px' }}>ANSIBLE PROVISIONED</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'sast') {
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#fff', background: 'rgba(0,0,0,0.6)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: accentColor, fontSize: '0.7rem', letterSpacing: '0.1em' }}>
          <span>VSCODE_INLINE_ENGINE // REALTIME_SAST</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Terminal size={12} /> SCANNING COMMIT</span>
        </div>
        <div style={{ background: '#080808', border: '1px solid rgba(168,85,247,0.3)', padding: '10px', borderRadius: '4px' }}>
          <div style={{ color: 'var(--text-muted)' }}>1 | <span style={{ color: '#f43f5e' }}>const</span> apiKey = <span style={{ color: '#fbbf24' }}>"AKIAIOSFODNN7EXAMPLE"</span>;</div>
          <div style={{ color: accentColor, marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={14} color="#f43f5e" /> <span>[ZENITH AI]: Hardcoded AWS Credential detected! Inline block active.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: 'rgba(0,0,0,0.6)', borderBottom: '1px solid rgba(255,255,255,0.08)', color: accentColor }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Database size={14} /> ARCHITECTURE_SCHEMA // VERIFIED</span>
      <span style={{ color: '#10b981' }}>100% HEALTHY</span>
    </div>
  );
};

export const SelectedWork: React.FC = () => {
  const isMobile = useIsMobile();
  const moreRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);

  // Scroll setup for Kavy Porwal split curtain & horizontal panning
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    let animationFrameId: number;
    const updateScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        // Total scrollable distance inside the 500vh container (500vh - 100vh sticky viewport = 400vh)
        const maxScroll = 4 * vh;
        const scrolled = -rect.top;

        if (scrolled <= 0) {
          scrollProgress.set(0);
          if (viewportRef.current) {
            viewportRef.current.style.transform = 'translate3d(0px, 0px, 0px)';
          }
        } else if (scrolled >= maxScroll) {
          scrollProgress.set(1);
          if (viewportRef.current) {
            viewportRef.current.style.transform = `translate3d(0px, ${maxScroll}px, 0px)`;
          }
        } else {
          scrollProgress.set(scrolled / maxScroll);
          if (viewportRef.current) {
            viewportRef.current.style.transform = `translate3d(0px, ${scrolled}px, 0px)`;
          }
        }
      }
      animationFrameId = requestAnimationFrame(updateScroll);
    };
    updateScroll();
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollProgress]);

  // Curtains open instantly from 0 to 0.04, close completely from 0.84 to 0.92
  const curtainTopY = useTransform(scrollProgress, [0, 0.04, 0.84, 0.92, 1], ['0%', '-100%', '-100%', '0%', '0%']);
  const curtainBottomY = useTransform(scrollProgress, [0, 0.04, 0.84, 0.92, 1], ['0%', '100%', '100%', '0%', '0%']);

  // Horizontal Track pans between 0.04 and 0.84 across full-page wide cards
  const trackX = useTransform(
    scrollProgress,
    [0.04, 0.84],
    ['0vw', isMobile ? '-285vw' : '-276vw']
  );

  const handleLoadMore = () => {
    setShowMore(true);
    setTimeout(() => {
      moreRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const renderCard = (project: ProjectData, isFullWidth = false) => (
    <div
      key={project.id}
      className="kavy-project-card"
      style={{
        width: isFullWidth ? '100%' : (isMobile ? '90vw' : '88vw'),
        height: isFullWidth ? 'auto' : (isMobile ? '80vh' : '75vh'),
        minHeight: isFullWidth ? '450px' : 'auto',
        flexShrink: 0,
        // Inject dynamic card colors for CSS variables
        ['--card-accent' as any]: project.accentColor,
        ['--card-accent-glow' as any]: `${project.accentColor}33`,
      }}
    >
      {/* Scan Overlay */}
      <div className="scan-overlay" />

      {/* Deck Header Bar */}
      <div className="deck-header">
        <div>PROJECT_{project.number} // {project.id.toUpperCase()}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="status-dot" />
          <span>{project.status}</span>
        </div>
      </div>

      {/* Schematic Graphic Bar */}
      <CyberSchematic type={project.schematicType} accentColor={project.accentColor} />

      {/* Main Content Body */}
      <div className="deck-body" style={{ padding: isMobile ? '20px' : '28px', justifyContent: 'space-between', zIndex: 20 }}>
        <div>
          {/* Top category & badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: project.accentColor, letterSpacing: '0.12em' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {project.icon} {project.category}
              </span>
            </div>
            {project.badge && (
              <span style={{ background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.4)', color: '#e9d5ff', padding: '4px 12px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
                {project.badge}
              </span>
            )}
          </div>

          {/* Title & Subtitle */}
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2.2rem' : '2.8rem', fontStyle: 'italic', color: '#fff', margin: 0, lineHeight: 1.05 }}>
              {project.title}
            </h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {project.subtitle}
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)', marginBottom: '14px' }} />

          {/* Bullets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.5' }}>
            {project.bullets.map((bullet, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: project.accentColor, fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '1.1rem', lineHeight: '1.2' }}>&gt;</span>
                <div>{bullet}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Tags & Angled Action Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: 'var(--text-muted)',
                  padding: '5px 10px',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.05em'
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="action-btn">
            <FaGithub size={16} /> SOURCE CODE <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );

  // Replicating Kavy Porwal's 4th Archive Card
  // Replicating Kavy Porwal's 4th Archive Card (Screenshot 3)
  const renderArchiveCard = () => (
    <div
      className="kavy-project-card archive-card hoverable group"
      onClick={handleLoadMore}
      style={{
        width: isMobile ? '90vw' : '88vw',
        height: isMobile ? '80vh' : '75vh',
        flexShrink: 0,
        background: 'rgba(10, 10, 10, 0.95)',
        border: '2px solid #d9663f',
        boxShadow: '0 0 45px rgba(217, 102, 63, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isMobile ? '25px' : '40px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="archive-grid" />
      <div className="archive-scan" />

      {/* Top Left Header matching Screenshot 3 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', zIndex: 20 }}>
        <div style={{ textAlign: 'left', lineHeight: 1.4 }}>
          <div style={{ color: '#fff', letterSpacing: '0.1em', fontWeight: 700 }}>DATABASE_ACCESS</div>
          <div style={{ color: '#d9663f' }}>[LOCKED]</div>
        </div>
        <div className="status-dot" />
      </div>

      {/* Center Box & Glitch Typography matching Screenshot 3 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20, marginTop: 'auto', marginBottom: 'auto' }}>
        <div className="archive-core" style={{ marginBottom: '28px' }}>
          <div className="core-ring" />
          <Package size={42} color="#d9663f" />
        </div>

        <h3 className="glitch-text" style={{ fontFamily: 'var(--font-sans)', fontSize: isMobile ? '3.8rem' : '6rem', fontWeight: 800, color: '#fff', margin: 0, marginBottom: '14px', letterSpacing: '0.04em' }}>
          ARCHIVE
        </h3>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.75rem' : '0.85rem', color: '#a3a3a3', letterSpacing: '0.3em', textTransform: 'uppercase', margin: 0 }}>
          {showMore ? 'ACCESS_GRANTED // VIEWING_BELOW ↓' : 'ACCESS_ALL_PROJECTS'}
        </p>
      </div>

      {/* Bottom Action Footer */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#d9663f', letterSpacing: '0.2em', zIndex: 20, textAlign: 'center', width: '100%' }}>
        {showMore ? 'SCROLL DOWN TO VIEW PRODUCTION BUILDS ↓' : 'CLICK TO INITIALIZE NEXT BATCH →'}
      </div>
    </div>
  );

  return (
    <div id="projects">
      {/* 500vh container for cinematic Kavy Porwal pinned curtain scroll */}
      <div ref={sectionRef} style={{ height: isMobile ? 'auto' : '500vh', position: 'relative' }}>
        {isMobile ? (
          /* Mobile direct stacked layout with Kavy Porwal aesthetic */
          <div style={{ padding: '80px 20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#d9663f', letterSpacing: '0.15em' }}>
                04 // SELECTED WORKS
              </h2>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontStyle: 'italic', color: '#fff', margin: '8px 0 0 0' }}>
                Production-grade systems & cloud architecture.
              </p>
            </div>

            {FEATURED_PROJECTS.map((p) => renderCard(p))}
            {renderArchiveCard()}
          </div>
        ) : (
          /* Desktop hardware counter-translated viewport (completely eliminates @react-three/drei Scroll translation) */
          <div
            ref={viewportRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100vh',
              width: '100%',
              zIndex: 30,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              background: 'radial-gradient(circle at center, #0f0f0f 0%, #020202 100%)'
            }}
          >
            {/* Split Curtains with WORKS typography */}
            <motion.div className="works-curtain curtain-top" style={{ y: curtainTopY }}>
              <h2 className="split-work-text">WORKS</h2>
            </motion.div>

            <motion.div className="works-curtain curtain-bottom" style={{ y: curtainBottomY }}>
              <h2 className="split-work-text">WORKS</h2>
            </motion.div>

            {/* Section Title Background Header */}
            <div style={{ position: 'absolute', top: '20px', left: '60px', zIndex: 10 }}>
              <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#d9663f', letterSpacing: '0.2em', margin: 0 }}>
                04 // SELECTED WORKS
              </h2>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontStyle: 'italic', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                Production-grade systems & cloud architecture
              </p>
            </div>

            {/* Horizontal Gallery Track */}
            <motion.div
              style={{
                display: 'flex',
                gap: '4vw',
                paddingLeft: '6vw',
                paddingRight: '6vw',
                x: trackX,
                alignItems: 'center'
              }}
            >
              {FEATURED_PROJECTS.map((project) => renderCard(project))}
              {renderArchiveCard()}
            </motion.div>

            {/* Helper Pan Indicator */}
            <div style={{ position: 'absolute', bottom: '30px', left: '60px', display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.15em', zIndex: 10 }}>
              <span>SCROLL DOWN TO PAN ACROSS GALLERY</span>
              <span style={{ color: '#d9663f' }}>→</span>
            </div>
          </div>
        )}
      </div>

      {/* Expanded Archive Grid when Load More is triggered */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            ref={moreRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ padding: '100px 60px', maxWidth: '1400px', margin: '0 auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '20px', marginBottom: '60px', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#d9663f', letterSpacing: '0.2em' }}>
                NEXT BATCH // SHIPPED PRODUCTION BUILDS
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                100% CLOUD NATIVE · HIGH AVAILABILITY
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
