/*

Creates a model of labels and circles from the data.

 */

import makeCircle from "./vendor/smallest-enclosing-circle";
import { getPaperText } from "./drawing";

function point(x, y) {
  return {x, y};
}

function allEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

function haveSameGroups(members) {
  return members
    .map(m => m.groupIds)
    .reduce((acc, current) => {
      if (!acc) {
        return false;
      }
      if (allEqual(acc, current)) {
        return current;
      }
      return false;
    });
}

function label(pos, members) {
  if (!haveSameGroups(members)) {
    throw 'All members in the label must have identical group ids';
  }
  return {
    members,
    groupIds: members[0].groupIds,
    x: pos.x,
    y: pos.y,
    getText() {
      return this.members.map(m => m.name).join('\n');
    },
    getVertices() {
      const rect = getPaperText(this.getText(), {x: this.x, y: this.y}).bounds;
      return [rect.topLeft, rect.topRight, rect.bottomLeft, rect.bottomRight];
    },
    getArea() {
      return getPaperText(this.getText(), {x: this.x, y: this.y}).bounds.area;
    }
  };
}

// Sunflower script adapted from https://stackoverflow.com/a/28572551
function getDistributedPoints(n, alpha) {
  const canvas = document.getElementById('canvas');
  const RAD = Math.min(canvas.width, canvas.height) / 2;

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
    points.push(
      point((r * RAD * Math.cos(theta)) + (canvas.width / 2),
      (r * RAD * Math.sin(theta)) + (canvas.height / 2))
    );
  }
  return points;
}

function getModel({ groups, members }) {
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
      const pad = 5; // padding for parent circles
      this.circles = [];
      groups
        .sort((a, b) => { // children first
          if (a.parent === b.id) {
            return -1;
          } else if (b.parent === a.id) {
            return 1;
          }
          return 0;
        })
        .forEach(group => {
          const circle = Object.assign({}, group);
          // add members that belong to the group
          circle.labels = this.labels.filter(label => label.groupIds.some(id => id === group.id));

          const pointsInsideCircle = circle.labels
            .map(l => l.getVertices())
            .reduce((acc, current) => acc.concat(current), []) // concat all
            .concat(
              // add children circles' bound points
              this.circles
                .filter(c => c.parent === group.id)
                .map(c => [
                  point(c.x - c.r - pad, c.y), point(c.x + c.r + pad, c.y),
                  point(c.x, c.y + c.r + pad), point(c.x, c.y - c.r - pad)]
                )
                .reduce((acc, current) => acc.concat(current), []) // concat all
            );
          if (pointsInsideCircle.length === 0) {
            return;
          }
          // assign x, y and r
          Object.assign(circle, makeCircle(pointsInsideCircle));
          circle.r += 5; // give some "padding" to the circle
          this.circles.push(circle);
        });
    }
  };
  let labels = [];
  members.forEach(member => {
    let sameRolesLabel = labels.find(label => allEqual(label.groupIds, member.groupIds));
    if (sameRolesLabel) {
      sameRolesLabel.members.push(member);
    } else {
      labels.push(label({}, [member]));
    }
  });

  const points = getDistributedPoints(labels.length, 0);
  model.labels = points.map((point, index) => Object.assign(labels[index], point));
  model.updateCircles();
  return model;
}

export default getModel;