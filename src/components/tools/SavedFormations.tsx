'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Formation } from '@/types';
import { useState } from 'react';

interface SavedFormationsProps {
  slots: Array<string | null>;
  onLoad: (slots: Array<string | null>) => void;
}

const STORAGE_KEY = 'fate_saved_formations_v1';

export default function SavedFormations({ slots, onLoad }: SavedFormationsProps) {
  const [name, setName] = useState('');
  const [formations, setFormations] = useLocalStorage<Formation[]>(STORAGE_KEY, []);

  const saveFormation = () => {
    if (!name.trim()) return;

    const formation: Formation = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: name.trim().slice(0, 32),
      slots,
      tags: [],
    };

    setFormations((current) => [formation, ...current].slice(0, 25));
    setName('');
  };

  const deleteFormation = (id: string) => {
    setFormations((current) => current.filter((formation) => formation.id !== id));
  };

  return (
    <section className="space-y-3 rounded-xl border border-border bg-bg-secondary/80 p-4">
      <h3 className="text-lg font-semibold">Saved Formations</h3>

      <div className="flex gap-2">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Formation name"
          className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm outline-none"
        />
        <button type="button" onClick={saveFormation} className="rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-black">
          Save
        </button>
      </div>

      <ul className="space-y-2">
        {formations.map((formation) => (
          <li key={formation.id} className="rounded-lg border border-border bg-bg-primary/35 px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium">{formation.name}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onLoad(formation.slots)}
                  className="text-xs text-accent hover:underline"
                >
                  Load
                </button>
                <button
                  type="button"
                  onClick={() => deleteFormation(formation.id)}
                  className="text-xs text-red-300 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
