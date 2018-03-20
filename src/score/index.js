/*
Gives the chart a score. The higher score the better.
 */

import getCorrectnessScore from './correctness';
import getOverlappingScore from './needless-overlapping';
import getAreasScore from './proportional-areas';

const scoreWeight = {
  correctness: 10,
  overlapping: 2,
  areas: 2
};

function getScore(data, model) {
  return (getCorrectnessScore(data, model) * scoreWeight.correctness)
    + (getOverlappingScore(data, model) * scoreWeight.overlapping)
   + (getAreasScore(data, model) * scoreWeight.areas)
}

export { getScore, getCorrectnessScore, getOverlappingScore, getAreasScore};