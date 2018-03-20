
function getAreasScore(data, model) {
  let score = 0;
  const tolerance = 5; // per cent
  const ratios = model.circles.map(circle => {
    const labelsArea = circle.labels.reduce((areaSum, label) => areaSum + label.getArea(), 0);
    const circleArea = Math.PI * Math.pow(circle.r, 2);
    return circleArea / labelsArea;
  });
  const ratioSum = ratios.reduce((sum, ratio) => sum + ratio);
  const avg = ratioSum / ratios.length;
  ratios.forEach(ratio => {
    let diff = ratio - avg;
    if (diff < 0) {
      diff *= -1;
    }
    const diffPercentage = diff * 100 / avg;
    if (diffPercentage > tolerance) {
      score -= diffPercentage;
    }
  });
  return score;
}

export default getAreasScore;