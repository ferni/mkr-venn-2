/*
Gives the chart a score. The higher score the better.
 */

import getCorrectnessScore from './correctness';
import getOverlappingScore from './needless-overlapping';
import getAreasScore from './proportional-areas';
import getViewportScore from './fit-in-viewport';

const scoreWeight = {
  correctness: 10,
  viewport: 5,
  overlapping: 2,
  areas: 1
};

function getScore(data, model) {
  return (getCorrectnessScore(data, model) * scoreWeight.correctness) +
    (getOverlappingScore(data, model) * scoreWeight.overlapping) +
    (getViewportScore(data, model) * scoreWeight.viewport);
    // (getAreasScore(data, model) * scoreWeight.areas);
}

export { getScore, getCorrectnessScore, getOverlappingScore, getAreasScore};