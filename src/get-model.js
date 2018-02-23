/*

Creates a model of labels and circles from the data.

 */

import makeCircle from "./vendor/smallest-enclosing-circle";

function point(x, y) {
  return {x, y};
}

// Sunflower script adapted from https://stackoverflow.com/a/28572551
function getDistributedPoints(n, alpha) {
  const RAD = 250;

  function distance(k, n, b) {
    if (k > n - b) {
      return RAD;
    }
    return Math.sqrt(k - 1 / 2) / Math.sqrt(n - (b + 1) / 2);     // apply square root
  }

  const b = Math.round(alpha * Math.sqrt(n)); // number of boundary points
  const phi = (Math.sqrt(5) + 1) / 2;           // golden ratio
  let points = [];
  for (let k = 1; k <= n; k++) {
    let r = distance(k, n, b);
    let theta = 2 * Math.PI * k / Math.pow(phi, 2);
    points.push(point((r * RAD * Math.cos(theta)) + RAD, (r * RAD * Math.sin(theta)) + RAD));
  }
  return points;
}

function getModel(data) {
  const model = {
    labels: [],
    circles: [],
    getCopy() {
      return Object.assign({}, this, {
        labels: this.labels.map(l => Object.assign({}, l)),
        circles: this.circles.map(c => Object.assign({}, c))
      });
    },
    updateCircles() {
      this.circles = data.groups.map(g => {
        const circle = Object.assign({}, g);
        // add members that belong to the group
        circle.labels = this.labels.filter(label => label.groupIds.some(id => id === g.id));
        // assign x, y and r
        Object.assign(circle, makeCircle(circle.labels));
        circle.r += 5; // give some "padding" to the circle
        return circle;
      });
    }
  };
  const points = getDistributedPoints(data.members.length, 0);
  model.labels = points.map((point, index) => Object.assign({}, point, data.members[index]));
  model.updateCircles();
  return model;
}

export default getModel;