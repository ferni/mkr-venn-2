import paper from 'paper';

function drawModel(canvas, model) {
  var ctx = canvas.getContext('2d');
  paper.setup(canvas);

  ctx.strokeStyle = 'blue';
  model.labels.forEach(label => {
    new paper.PointText({
      point: {x: label.x, y: label.y},
      content: label.members.map(m => m.name).join(','),
      fillColor: 'black',
      fontFamily: 'Courier New',
      fontWeight: 'bold',
      fontSize: 25
    });
    ctx.arc(label.x, label.y, 3, 0, Math.PI * 2);
  });
  ctx.stroke();

  model.circles.forEach(circle => {
    const shape = new paper.Shape.Circle(new paper.Point(circle.x, circle.y), circle.r);
    shape.strokeColor = 'black';
  });

  paper.view.draw();
}

export default drawModel;