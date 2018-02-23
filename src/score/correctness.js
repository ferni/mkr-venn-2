import {circleContainsPoint} from "../geometry";

// Gives score based on if the members are in and only in their respective groups
function getCorrectnessScore(data, model) {
  let score = 0;
  model.labels.forEach(label => {
    model.circles.forEach(circle => {
      if (circleContainsPoint(circle, label.pos)) {
        if (circle.labels.some(l => l === label)) {
          console.log(label.name + ' is correctly shown as belonging to ' + circle.name + ', increase score by 10');
          score += 10;
        } else {
          console.log(label.name + ' is incorrectly shown as belonging to ' + circle.name + ', reducing score by 5');
          score -= 5;
        }
      }
    })
  });
  return score;
}

export default getCorrectnessScore;