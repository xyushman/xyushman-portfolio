import React, { useEffect } from 'react';
import anime from 'animejs';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Projects() {
  useEffect(() => {
    anime({
      targets: '.deploy-item',
      translateY: [30, 0],
      opacity: [0, 1],
      delay: anime.stagger(150, { start: 100 }),
      easing: 'easeOutCubic',
      duration: 1000,
    });
  }, []);

  const projects = [
    {
      name: 'Microservices Automaton',
      role: 'Lead Architect',
      date: '2023',
      description: 'Automated the deployment of a 15-microservice architecture using ArgoCD and Helm charts on EKS.',
    },
    {
      name: 'Serverless Data Pipeline',
      role: 'Cloud Engineer',
      date: '2022',
      description: 'Built an event-driven AWS Lambda pipeline for processing high-throughput telemetry data to S3.',
    },
    {
      name: 'Terraform State Refactor',
      role: 'DevOps Engineer',
      date: '2021',
      description: 'Refactoring legacy infrastructure into modular, multi-region Terraform code for high availability.',
    }
  ];

  return (
    <div className="projects-page">
      <div className="deploy-item" style={{ marginBottom: '80px' }}>
        <h1 className="font-serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '16px', color: 'var(--text-main)' }}>
          Selected <span className="font-serif-italic">Work</span>
        </h1>
        <p className="text-muted" style={{ maxWidth: '600px', fontSize: '1.1rem' }}>
          A collection of infrastructure builds, deployment pipelines, and cloud architecture projects.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '0' }}>
        {projects.map((project, i) => (
          <div 
            key={i} 
            className="glass-card deploy-item"
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--text-main)' }}>{project.name}</h3>
              <motion.a 
                whileHover={{ x: 5, color: '#ffffff' }}
                href="#"
                style={{ color: 'var(--text-muted)' }}
              >
                <ArrowRight size={28} />
              </motion.a>
            </div>
            
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div className="font-mono text-muted" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {project.role}
              </div>
              <div className="font-mono text-dim" style={{ fontSize: '0.85rem' }}>
                {project.date}
              </div>
            </div>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginTop: '8px', maxWidth: '800px' }}>
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
