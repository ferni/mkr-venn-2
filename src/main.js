import data from './data';
import validateData from './validate-data';
import getModel from './get-model';
import drawModel from './draw-model';
import { getScore, getBestScore } from "./score";
import optimizeScore from './optimize-score';

validateData(data);
let model = getModel(data);
model = optimizeScore(data, model);
const score = getScore(data, model);
console.log('Final score is ' + score);
const canvas = document.getElementById('canvas');
drawModel(canvas, model);