'use client';

import LocalImage from '@/components/ui/LocalImage';
import { motion } from 'framer-motion';

export default function TypeTriangle() {
  return (
    <motion.div
      className="relative h-[240px] w-full rounded-lg border border-border bg-bg-secondary p-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="pointer-events-none absolute left-1/2 top-[62px] h-[2px] w-[145px] -translate-x-[68px] rotate-[122deg] bg-accent" />
      <div className="pointer-events-none absolute left-[84px] top-[188px] h-[2px] w-[140px] bg-accent" />
      <div className="pointer-events-none absolute left-1/2 top-[62px] h-[2px] w-[145px] translate-x-[-74px] rotate-[58deg] bg-accent" />

      <div className="absolute left-1/2 top-4 h-16 w-16 -translate-x-1/2 rounded-full border border-border bg-bg-tertiary p-3 text-center">
        <LocalImage
          src="/images/ui/tank.png"
          alt="Tank type"
          width={40}
          height={40}
          containerClassName="mx-auto h-8 w-8"
          className="h-full w-full object-contain"
          fallbackText="T"
        />
        <p className="mt-1 text-[10px]">Tank</p>
      </div>

      <div className="absolute bottom-4 left-4 h-16 w-16 rounded-full border border-border bg-bg-tertiary p-3 text-center">
        <LocalImage
          src="/images/ui/aircraft.png"
          alt="Aircraft type"
          width={40}
          height={40}
          containerClassName="mx-auto h-8 w-8"
          className="h-full w-full object-contain"
          fallbackText="A"
        />
        <p className="mt-1 text-[10px]">Aircraft</p>
      </div>

      <div className="absolute bottom-4 right-4 h-16 w-16 rounded-full border border-border bg-bg-tertiary p-3 text-center">
        <LocalImage
          src="/images/ui/missile.png"
          alt="Missile type"
          width={40}
          height={40}
          containerClassName="mx-auto h-8 w-8"
          className="h-full w-full object-contain"
          fallbackText="M"
        />
        <p className="mt-1 text-[10px]">Missile</p>
      </div>
    </motion.div>
  );
}
