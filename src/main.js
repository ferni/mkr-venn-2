import data from './data';
import validateData from './validate-data';
import getModel from './get-model';
import drawModel from './draw-model';

validateData(data);
const model = getModel(data);
const canvas = document.getElementById('canvas');
drawModel(canvas, model);