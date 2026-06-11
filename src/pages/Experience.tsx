import React, { useEffect } from 'react';
import anime from 'animejs';

export default function Experience() {
  useEffect(() => {
    anime({
      targets: '.env-item',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(150, { start: 100 }),
      easing: 'easeOutQuad',
      duration: 800,
    });
  }, []);

  const environments = [
    {
      role: 'Senior Cloud Engineer',
      company: 'TechCorp Solutions',
      date: '2023 - Present',
      description: 'Leading the platform engineering team to build scalable internal developer platforms on top of Kubernetes.'
    },
    {
      role: 'DevOps Engineer',
      company: 'InnovateX Inc.',
      date: '2021 - 2023',
      description: 'Managed multi-cloud infrastructure and automated deployment pipelines, reducing build times by 40%.'
    },
    {
      role: 'Systems Administrator',
      company: 'CloudWorks',
      date: '2019 - 2021',
      description: 'Maintained Linux server fleets and implemented comprehensive monitoring using Prometheus and Grafana.'
    }
  ];

  return (
    <div className="experience-page">
      <div className="env-item" style={{ marginBottom: '80px' }}>
        <h1 className="font-serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '16px', color: 'var(--text-main)' }}>
          Professional <span className="font-serif-italic">Experience</span>
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {environments.map((env, i) => (
          <div key={i} className="glass-card env-item" style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '40px', alignItems: 'start', borderTop: '1px solid var(--border-light)', padding: '40px 0' }}>
            <div className="font-mono text-muted" style={{ fontSize: '0.9rem', paddingTop: '8px' }}>
              {env.date}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--text-main)' }}>{env.role}</h3>
              <div className="font-mono text-muted" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {env.company}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7, marginTop: '8px', maxWidth: '800px' }}>
                {env.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
