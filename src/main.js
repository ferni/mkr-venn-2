import data from './data';
import validateData from './validate-data';
import getModel from './get-model';
import { getScore, getBestScore } from "./score";
import optimizeScore from './optimize-score';
import paper from "paper";

validateData(data);
const canvas = document.getElementById('canvas');
paper.setup(canvas);
window.paper = paper;

// Activate a temp draw layer only for processing
const tempLayer = new paper.Layer();
let model = getModel(data);
model = optimizeScore(data, model, draw);
const score = getScore(data, model);
console.log('Final score is ' + score);


function draw(model) {
  // Remove temp layer and activate actual draw layer
  //paper.project.activeLayer.remove();
  //new paper.Layer();
  paper.project.activeLayer.clear();
  // Remake items for drawing in new layer
  model.labels.forEach(label => {
    label.paperItem = null;
    label.updatePaperItem();
  });
  model.circles.forEach(circle => {
    const shape = new paper.Shape.Circle(new paper.Point(circle.x, circle.y), circle.r);
    shape.strokeColor = 'black';
  });
  //canvas.msGetInputContext('2d');
  //canvas.clearReact
  paper.view.draw();
}
draw(model);
