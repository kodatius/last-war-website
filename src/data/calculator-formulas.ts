import {
  armsRacePhases,
  armsRaceThresholds,
  calculateGatheringRate,
  calculateSpeedUpPoints,
  calculateTrainingPoints,
  eventFormulas,
  getNextThreshold,
  getThresholdAtPoints,
  resourceRates,
} from './raw/calculator-data';

export {
  armsRacePhases,
  armsRaceThresholds,
  calculateGatheringRate,
  calculateSpeedUpPoints,
  calculateTrainingPoints,
  eventFormulas,
  getNextThreshold,
  getThresholdAtPoints,
  resourceRates,
};

export const calculatorMilestones = armsRaceThresholds.map((threshold) => ({
  label: threshold.label,
  points: threshold.pointsRequired,
  rank: threshold.rank,
}));

export const resourceRateByType = resourceRates.reduce<Record<string, number>>((acc, rate) => {
  acc[rate.resource] = (acc[rate.resource] ?? 0) + rate.baseRatePerHour;
  return acc;
}, {});

export const armsRaceFormulaNotes = eventFormulas.map((formula) => ({
  name: formula.eventName,
  formula: formula.formula,
  example: formula.example,
}));
