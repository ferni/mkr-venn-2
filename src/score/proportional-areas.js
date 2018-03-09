
function getAreasScore(data, model) {
  // The circle's area is nice when it is idealRatio times the sum of the labels' areas
  const idealRatio = 4;
  let score = 0;
  model.circles.forEach(circle => {
    const labelsArea = circle.labels.reduce((areaSum, label) => areaSum + label.getArea(), 0);
    const circleArea = Math.PI * Math.pow(circle.r, 2);
    const ratio = circleArea / labelsArea;
    let difference = idealRatio - ratio;
    if (difference < 0) {
      difference *= -1;
    }
    if (difference > 100) {
      score -= 1;
    } else {
      // it's close, but how much?
      score += (100 - difference) / 100;
    }
  });
  return score;
}

export default getAreasScore;