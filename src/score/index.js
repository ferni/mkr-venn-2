/*
Gives the chart a score. The higher score the better.
 */

import getCorrectnessScore from './correctness';

function getScore(data, model) {
  return getCorrectnessScore(data, model);
}

function getBestScore(data, models) {
  // todo: optimize not giving a score multiple times to the same model
  return models.reduce((max, cur) => Math.max(getScore(data, max), getScore(data, cur)));
}

export { getBestScore, getScore };