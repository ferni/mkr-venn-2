import data from './data';
import validateData from './validate-data';
import getModel from './get-model';
import { getScore, getOverlappingScore } from "./score";
import optimizeScore from './optimize-score';
import { draw } from './drawing';

validateData(data);
let model = getModel(data);
model = optimizeScore(data, model);
const score = getScore(data, model);

console.log('Final score is ' + score);
console.log('Overlapping score: ' + getOverlappingScore(data, model));

draw(model);