import {circleContainsPoint} from "../geometry";

// Gives score based on if the members are in and only in their respective groups
function getCorrectnessScore(data, model) {
  let score = 0;
  model.labels.forEach(label => {
    model.circles.forEach(circle => {
      if (circleContainsPoint(circle, label)) {
        if (circle.labels.some(l => l === label)) {
          score += 1;
        } else {
          score -= 1;
        }
      }
    })
  });
  return score;
}

export default getCorrectnessScore;