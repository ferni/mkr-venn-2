import paper from "paper";

// Initialize
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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

function drawText(text) {
  ctx.font = "20px Arial";
  ctx.fillText(text, 30, (canvas.height / 2) - 30);
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


export {draw, getPaperText, drawText, clear};