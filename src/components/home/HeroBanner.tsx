'use client';

import { LINKS } from '@/lib/constants';
import { img } from '@/lib/prefix';
import { motion } from 'framer-motion';
import { ArrowDown, Swords } from 'lucide-react';

const particles = [
  { left: '8%', top: '24%', delay: 0, duration: 8 },
  { left: '16%', top: '58%', delay: 1.1, duration: 9 },
  { left: '31%', top: '34%', delay: 0.8, duration: 7.2 },
  { left: '52%', top: '72%', delay: 2.2, duration: 10 },
  { left: '68%', top: '26%', delay: 1.5, duration: 8.4 },
  { left: '79%', top: '61%', delay: 0.3, duration: 9.5 },
  { left: '89%', top: '38%', delay: 1.8, duration: 7.8 },
  { left: '44%', top: '17%', delay: 2.5, duration: 10.2 },
];

export default function HeroBanner() {
  const scrollToDashboard = () => {
    const el = document.getElementById('alliance-dashboard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden rounded-2xl border border-border/80"
      style={{
        backgroundImage: `url(${img('/images/banners/map.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,160,23,0.32),rgba(10,10,15,0.88)_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/35 via-bg-primary/55 to-bg-primary/95" />

      {particles.map((particle, index) => (
        <span
          key={`${particle.left}-${particle.top}`}
          className="particle-float absolute h-2 w-2 rounded-full bg-accent"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            opacity: 0.4 + (index % 3) * 0.2,
            boxShadow: '0 0 12px rgba(212,160,23,0.75)',
          }}
        />
      ))}

      <motion.div
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 py-20 text-center"
        initial={{ opacity: 0, scale: 0.8, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-accent">
          <Swords size={14} />
          Alliance Command Nexus
        </span>
        <h1
          className="font-hero text-5xl font-bold tracking-[0.16em] text-accent sm:text-7xl md:text-8xl"
          style={{ textShadow: '0 0 10px rgba(212,160,23,0.7), 0 0 32px rgba(212,160,23,0.35)' }}
        >
          [ViKF]
        </h1>
        <p className="mt-4 max-w-2xl text-base text-text-primary sm:text-xl">
          Tactical intel, event timing, and hero dominance built for Server #2058 war nights.
        </p>

        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <motion.button
            type="button"
            onClick={scrollToDashboard}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent/50 bg-accent px-6 py-3 font-semibold text-black"
          >
            Enter HQ
            <ArrowDown size={16} />
          </motion.button>
          <motion.a
            href={LINKS.discord}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center rounded-lg border border-neon-blue/60 bg-neon-blue/20 px-6 py-3 font-semibold text-neon-blue"
          >
            Join Discord
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
