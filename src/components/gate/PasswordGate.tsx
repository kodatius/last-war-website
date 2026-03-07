'use client';

import { ALLIANCE_INFO } from '@/lib/constants';
import LocalImage from '@/components/ui/LocalImage';
import { img } from '@/lib/prefix';
import Cookies from 'js-cookie';
import { AnimatePresence, motion } from 'framer-motion';
import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react';

interface PasswordGateProps {
  children: ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [value, setValue] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const cookie = Cookies.get(ALLIANCE_INFO.cookieName);
    if (cookie === ALLIANCE_INFO.cookieValue) {
      setVerified(true);
    }
    setLoading(false);
  }, []);

  const gateVisible = useMemo(() => !loading && !verified, [loading, verified]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (value.trim() === ALLIANCE_INFO.password) {
      Cookies.set(ALLIANCE_INFO.cookieName, ALLIANCE_INFO.cookieValue, {
        expires: ALLIANCE_INFO.cookieDays,
      });
      setVerified(true);
      setShowError(false);
      return;
    }

    setShowError(true);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-primary text-text-secondary">
        Verifying access...
      </div>
    );
  }

  if (!verified) {
    return (
      <AnimatePresence>
        {gateVisible ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              className="w-full max-w-md rounded-lg border border-border bg-bg-secondary p-6 shadow-[0_0_25px_rgba(0,0,0,0.5)]"
              onSubmit={onSubmit}
              animate={showError ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border border-border bg-bg-tertiary">
                <LocalImage
                  src={img('/images/ui/logo.png')}
                  alt="Last War logo"
                  width={48}
                  height={48}
                  loading="eager"
                  className="h-full w-full object-cover"
                  containerClassName="h-full w-full"
                  fallbackText="LW"
                />
              </div>
              <p className="mt-4 text-sm text-text-secondary">Alliance access required</p>
              <h1 className="mt-2 text-3xl font-bold text-accent">[ViKF] Command Gate</h1>
              <p className="mt-2 text-sm text-text-secondary">Enter alliance password to continue.</p>

              <input
                type="password"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  if (showError) setShowError(false);
                }}
                className="mt-6 w-full rounded-lg border border-border bg-bg-tertiary px-4 py-3 outline-none ring-accent focus:ring-2"
                placeholder="Password"
              />

              {showError ? (
                <p className="mt-3 text-sm text-error">Wrong password. Ask in Discord.</p>
              ) : null}

              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-accent px-4 py-3 font-semibold text-black transition hover:bg-accent-light"
              >
                Enter War Room
              </button>
            </motion.form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    );
  }

  return <>{children}</>;
}
