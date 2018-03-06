import { circlesOverlap } from '../geometry';

function getOverlappingScore(data, model) {
  let score = 0;
  for (let circleA of model.circles) {
    for (let circleB of model.circles) {
      if (circleA !== circleB &&
          circlesOverlap(circleA, circleB) &&
          !circleA.labels.some(l => circleB.labels.includes(l))
      ) {
        score--;
      }
    }
  }
  return score;
}

export default getOverlappingScore;