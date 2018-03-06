/*
Gives the chart a score. The higher score the better.
 */

import getCorrectnessScore from './correctness';
import getOverlappingScore from './needless-overlapping';

function getScore(data, model) {
  return getCorrectnessScore(data, model) + getOverlappingScore(data, model);
}

export { getScore };