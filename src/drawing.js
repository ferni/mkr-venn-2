import paper from "paper";

// Initialize
const canvas = document.getElementById('canvas');
paper.setup(canvas);

const cachedPaperTexts = {};

function makeText(content){
  console.log('making text' + content);
  return new paper.PointText({
    content: content,
    fillColor: 'black',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: 18
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
    label.getVertices().forEach(v => {
      const shape = new paper.Shape.Circle(new paper.Point(v.x, v.y), 1);
      shape.strokeColor = 'red';
    })
  });
  model.circles.forEach(circle => {
    const shape = new paper.Shape.Circle(new paper.Point(circle.x, circle.y), circle.r);
    shape.strokeColor = circle.color || 'black';
  });
  paper.view.draw();
}

export {draw, getPaperText};