import paper from 'paper';

function drawModel(canvas, model) {
  var ctx = canvas.getContext('2d');
  paper.setup(canvas);

  ctx.strokeStyle = 'blue';
  model.labels.forEach(label => {
    new paper.PointText({
      point: label.pos,
      content: label.name,
      fillColor: 'black',
      fontFamily: 'Courier New',
      fontWeight: 'bold',
      fontSize: 25
    });
    ctx.arc(label.pos.x, label.pos.y, 3, 0, Math.PI * 2);
  });
  ctx.stroke();

  model.circles.forEach(circle => {
    const shape = new paper.Shape.Circle(new paper.Point(circle.x, circle.y), circle.r);
    shape.strokeColor = 'black';
  });

  paper.view.draw();
}

export default drawModel;