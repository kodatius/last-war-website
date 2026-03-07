'use client';

import { motion } from 'framer-motion';

export default function TypeTriangle() {
  return (
    <motion.svg
      viewBox="0 0 320 240"
      className="h-[240px] w-full rounded-lg border border-border bg-bg-secondary p-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#d4a017" />
        </marker>
      </defs>
      <circle cx="160" cy="40" r="26" fill="#22c55e" />
      <text x="160" y="45" textAnchor="middle" fill="#0a0a0f" fontSize="12" fontWeight="700">
        Tank
      </text>
      <circle cx="65" cy="190" r="26" fill="#3b82f6" />
      <text x="65" y="195" textAnchor="middle" fill="#0a0a0f" fontSize="11" fontWeight="700">
        Aircraft
      </text>
      <circle cx="255" cy="190" r="26" fill="#ef4444" />
      <text x="255" y="195" textAnchor="middle" fill="#0a0a0f" fontSize="11" fontWeight="700">
        Missile
      </text>

      <line x1="145" y1="62" x2="85" y2="163" stroke="#d4a017" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="90" y1="190" x2="225" y2="190" stroke="#d4a017" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="235" y1="164" x2="176" y2="63" stroke="#d4a017" strokeWidth="2" markerEnd="url(#arrow)" />
    </motion.svg>
  );
}
