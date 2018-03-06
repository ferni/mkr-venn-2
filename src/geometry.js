function getDistance(pointA, pointB) {
  return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
}

function circleContainsPoint(circle, point) {
  return getDistance(point, circle) <= circle.r;
}

function circlesOverlap(circleA, circleB) {
  return getDistance(circleA, circleB) < circleA.r + circleB.r;
}

export { getDistance, circleContainsPoint, circlesOverlap };