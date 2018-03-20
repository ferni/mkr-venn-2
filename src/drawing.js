import paper from "paper";

// Initialize
const canvas = document.getElementById('canvas');
paper.setup(canvas);

const cachedPaperTexts = {};

function makeText(content){
  return new paper.PointText({
    content: content,
    fillColor: 'black',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: 14
  });
}

function getPaperText(text, position) {
  let paperText;
  if (cachedPaperTexts[text]) {
    paperText = cachedPaperTexts[text];
    paperText.point = position;
    return paperText;
  }
  let activeAux = paper.project.activeLayer;
  const tempLayer = new paper.Layer();
  paperText = makeText(text);
  paperText.point = position;
  cachedPaperTexts[text] = paperText;
  tempLayer.remove();
  activeAux.activate();
  return paperText;
}

function draw(model) {
  model.labels.forEach(label => {
    const text = makeText(label.getText());
    text.point = {x: label.x, y: label.y};
  });
  model.circles.forEach(circle => {
    const shape = new paper.Shape.Circle(new paper.Point(circle.x, circle.y), circle.r);
    shape.strokeColor = circle.color || 'black';
  });
  paper.project.activeLayer.fitBounds(new paper.Rectangle(0, 0, canvas.width, canvas.height));
  paper.view.draw();
}

export {draw, getPaperText};