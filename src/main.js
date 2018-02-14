import data from './data';
import paper from 'paper';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// Create an empty project and a view for the canvas:
paper.setup(canvas);
// Create a Paper.js Path to draw a line into it:
var path = new paper.Path();
// Give the stroke a color
path.strokeColor = 'black';
var start = new paper.Point(100, 100);
// Move to start and draw a line from there
path.moveTo(start);
// Note that the plus operator on Point objects does not work
// in JavaScript. Instead, we need to call the add() function:
path.lineTo(start.add([ 200, -50 ]));


// place the members on the view as points

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
    points.push(new paper.Point((r * RAD * Math.cos(theta)) + RAD, (r * RAD * Math.sin(theta)) + RAD));
  }
  return points;
}

let points = getDistributedPoints(data.members.length, 0);
let labels = points.map((point, index) => ({
  text: data.members[index].name,
  member: data.members[index],
  pos: point
}));


labels.forEach((label) => {
  new paper.PointText({
    point: label.pos,
    content: label.text,
    fillColor: 'black',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: 25
  });
  ctx.strokeStyle = 'blue';
  console.log(label.pos);
  ctx.arc(label.pos.x, label.pos.y, 2, 0, Math.PI * 2);
  ctx.stroke();
});

// Draw the view now:
paper.view.draw();
