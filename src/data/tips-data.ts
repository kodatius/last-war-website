import type { Tip } from '@/types';
import {
  CATEGORY_EMOJIS,
  CATEGORY_NAMES,
  TIPS,
  type TipCategory,
} from './raw/tips-data';

export const tips: Tip[] = TIPS.map((tip) => ({
  id: tip.id,
  category: CATEGORY_NAMES[tip.category as TipCategory],
  emoji: CATEGORY_EMOJIS[tip.category as TipCategory],
  text: tip.text,
}));

export const tipCategories = Object.entries(CATEGORY_NAMES).map(([key, value]) => ({
  key,
  label: value,
  emoji: CATEGORY_EMOJIS[key as TipCategory],
}));
