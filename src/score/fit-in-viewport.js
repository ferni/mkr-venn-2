

function getViewportScore(data, model) {
  const canvas = document.getElementById('canvas');
  let score = 0;
  let leftBound = Number.MAX_SAFE_INTEGER;
  let rightBound = Number.MIN_SAFE_INTEGER;
  let topBound = Number.MAX_SAFE_INTEGER;
  let bottomBound = Number.MIN_SAFE_INTEGER;
  model.labels.forEach(label => {
    if (label.x < 0 || label.x > canvas.width || label.y < 0 || label.y > canvas.height) {
      score -= 10;
    }
  });
  model.circles.forEach((circle) => {
    // don't overflow
    if (circle.x - circle.r <= 0 || circle.x + circle.r >= canvas.width ||
      circle.y - circle.r <= 0 || circle.y + circle.r >= canvas.height) {
      score -= 10;
    }
    // calculate bounds
    if (circle.x - circle.r < leftBound) {
      leftBound = circle.x - circle.r;
    }
    if (circle.x + circle.r > rightBound) {
      rightBound = circle.x + circle.r;
    }
    if (circle.y + circle.r > bottomBound) {
      bottomBound = circle.y + circle.r;
    }
    if (circle.y + circle.r < topBound) {
      topBound = circle.y - circle.r;
    }
  });

  // reward closeness to viewport bounds, penalize overflow
  const goodEnough = 10;
  const penalty = 5;
  const reward = 1;
  if (leftBound < 0) {
    score -= penalty * leftBound * -1;
  } else if (leftBound < goodEnough) {
    score += reward;
  } else {
    score += reward / leftBound;
  }
  if (rightBound > canvas.width) {
    score -= penalty * (rightBound - canvas.width);
  } else if (canvas.width - rightBound < goodEnough) {
    score += reward;
  } else {
    score += reward / (canvas.width - rightBound);
  }
  if (topBound < 0) {
    score -= penalty * topBound * -1;
  } else if (topBound < goodEnough) {
    score += reward;
  } else {
    score += reward / topBound;
  }
  if (bottomBound > canvas.height) {
    score -= penalty * (bottomBound - canvas.height);
  } else if (canvas.height - bottomBound < goodEnough) {
    score += reward;
  } else {
    score += reward / (canvas.height - bottomBound);
  }

  return score;
}

export default getViewportScore;