'use client';

import { ALLIANCE_INFO, LINKS } from '@/lib/constants';
import { motion } from 'framer-motion';

const items = [`Server ${ALLIANCE_INFO.server}`, `Alliance ${ALLIANCE_INFO.name}`, 'Discord'];

export default function StatsBar() {
  return (
    <motion.section
      className="border-y border-border bg-bg-secondary/70"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05 } },
      }}
    >
      <div className="container-shell flex flex-wrap items-center justify-center gap-4 py-4 text-sm text-text-secondary sm:gap-8">
        {items.map((item) => (
          <motion.span key={item} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
            {item === 'Discord' ? (
              <a href={LINKS.discord} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                Discord
              </a>
            ) : (
              item
            )}
          </motion.span>
        ))}
      </div>
    </motion.section>
  );
}
