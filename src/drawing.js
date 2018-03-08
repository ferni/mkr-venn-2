import paper from "paper";

// Initialize
const canvas = document.getElementById('canvas');
paper.setup(canvas);

const dimensionsByText = {};

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

function getTextDimensions(text) {
  if (dimensionsByText[text]) {
    return dimensionsByText[text];
  }
  let activeAux = paper.project.activeLayer;
  const tempLayer = new paper.Layer();
  const paperText = makeText(text);
  const {width, height} = paperText.bounds;
  tempLayer.remove();
  activeAux.activate();
  return dimensionsByText[text] = {width, height};
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
  paper.view.draw();
}

export {draw, getTextDimensions};