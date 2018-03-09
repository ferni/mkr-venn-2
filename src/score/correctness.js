import {circleContainsPoint, getDistance} from "../geometry";

// Gives score based on if the members are in and only in their respective groups
function getCorrectnessScore(data, model) {
  let score = 0;
  model.labels.forEach(label => {
    model.circles.forEach(circle => {
      label.getVertices().forEach(point => {
        if (circleContainsPoint(circle, point)) {
          if (circle.labels.some(l => l === label)) {
            score += 1;
          } else {
            // substract proportionally to how much is the point
            // inside a circle it's not supposed to
            score -= ((circle.r - getDistance(circle, point)) / 500); // todo: get the 500 value from actual canvas width
          }
        }
      })
    })
  });
  return score;
}

export default getCorrectnessScore;